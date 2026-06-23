import { useState, useEffect, useMemo } from 'react';
import { useAddressesQuery } from '../../../../features/address/hooks/queries/useAddresses.query';
import { useProvincesQuery } from '../../../../features/address/hooks/queries/useProvinces.query';
import { useDistrictsQuery } from '../../../../features/address/hooks/queries/useDistricts.query';
import { useWardsQuery } from '../../../../features/address/hooks/queries/useWards.query';
import { useCreateAddressMutation } from '../../../../features/address/hooks/mutations/useCreateAddress.mutation';
import { useUpdateAddressMutation } from '../../../../features/address/hooks/mutations/useUpdateAddress.mutation';
import { useLocationFromAddressMutation } from '../../../../features/address/hooks/mutations/useLocationFromAddress.mutation';
import type { CreateAddressRequestModel } from '../../../../features/address/models/address.model';

export const useAddressFormController = (
    mode: 'create' | 'edit',
    addressId: number | null,
    onSuccess: () => void,
    onCancel: () => void
) => {
    const { data: addresses } = useAddressesQuery();
    const createMutation = useCreateAddressMutation();
    const updateMutation = useUpdateAddressMutation();
    const geocodeMutation = useLocationFromAddressMutation();

    // Form state
    const [recipientName, setRecipientName] = useState('');
    const [phone, setPhone] = useState('');
    const [provinceCode, setProvinceCode] = useState('');
    const [districtCode, setDistrictCode] = useState('');
    const [wardCode, setWardCode] = useState('');
    const [street, setStreet] = useState('');
    const [isDefault, setIsDefault] = useState(false);
    
    // Map / Location state
    const [latitude, setLatitude] = useState<number | undefined>();
    const [longitude, setLongitude] = useState<number | undefined>();
    const [showMap, setShowMap] = useState(false);

    // Populate data for edit mode
    useEffect(() => {
        if (mode === 'edit' && addressId && addresses) {
            const addr = addresses.find(a => a.id === addressId);
            if (addr) {
                setRecipientName(addr.fullName);
                setPhone(addr.phone);
                setProvinceCode(addr.province.code);
                setDistrictCode(addr.district.code);
                setWardCode(addr.ward.code);
                setStreet(addr.street);
                setIsDefault(addr.isDefault);
                if (addr.latitude && addr.longitude) {
                    setLatitude(addr.latitude);
                    setLongitude(addr.longitude);
                    setShowMap(true);
                }
            }
        }
    }, [mode, addressId, addresses]);

    // Query administrative boundaries
    const { data: provinces = [] } = useProvincesQuery();
    
    const provinceIdNum = provinceCode ? parseInt(provinceCode, 10) : undefined;
    const districtIdNum = districtCode ? parseInt(districtCode, 10) : undefined;

    const { data: districts = [] } = useDistrictsQuery(provinceIdNum);
    const { data: wards = [] } = useWardsQuery(districtIdNum);

    // Derived states
    const provinceName = useMemo(() => provinces.find(p => p.id.toString() === provinceCode)?.name || '', [provinces, provinceCode]);
    const districtName = useMemo(() => districts.find(d => d.id.toString() === districtCode)?.name || '', [districts, districtCode]);
    const wardName = useMemo(() => wards.find(w => w.id.toString() === wardCode)?.name || '', [wards, wardCode]);

    const isFullAddressReady = Boolean(provinceName && districtName && wardName && street);
    const fullAddressString = isFullAddressReady ? `${street}, ${wardName}, ${districtName}, ${provinceName}` : '';

    const handleProvinceChange = (val: string) => {
        setProvinceCode(val);
        setDistrictCode('');
        setWardCode('');
        setShowMap(false);
    };

    const handleDistrictChange = (val: string) => {
        setDistrictCode(val);
        setWardCode('');
        setShowMap(false);
    };

    const handleWardChange = (val: string) => {
        setWardCode(val);
        setShowMap(false);
    };

    const handleStreetChange = (val: string) => {
        setStreet(val);
        setShowMap(false);
    };

    const handleVerifyAddress = () => {
        if (!isFullAddressReady) return;
        geocodeMutation.mutate(fullAddressString, {
            onSuccess: (data) => {
                if (data && data.latitude && data.longitude) {
                    setLatitude(data.latitude);
                    setLongitude(data.longitude);
                }
                setShowMap(true);
            },
            onError: () => {
                setShowMap(true);
            }
        });
    };

    const handleMapLocationChange = (lat: number, lng: number) => {
        setLatitude(lat);
        setLongitude(lng);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        
        if (!recipientName || !phone || !isFullAddressReady) {
            alert('Vui lòng điền đầy đủ thông tin bắt buộc');
            return;
        }

        const payload: CreateAddressRequestModel = {
            recipientName,
            phone,
            provinceCode,
            provinceName,
            districtCode,
            districtName,
            wardCode,
            wardName,
            street,
            fullAddress: fullAddressString,
            latitude,
            longitude,
            isDefault
        };

        if (mode === 'create') {
            createMutation.mutate(payload, {
                onSuccess: () => onSuccess()
            });
        } else if (mode === 'edit' && addressId) {
            updateMutation.mutate({ id: addressId, request: payload }, {
                onSuccess: () => onSuccess()
            });
        }
    };

    const isSubmitting = createMutation.isPending || updateMutation.isPending;
    const isEditModeAndCurrentlyDefault = mode === 'edit' && addressId && addresses?.find(a => a.id === addressId)?.isDefault;

    return {
        recipientName, setRecipientName,
        phone, setPhone,
        provinceCode, handleProvinceChange,
        districtCode, handleDistrictChange,
        wardCode, handleWardChange,
        street, handleStreetChange,
        isDefault, setIsDefault,
        
        provinces, districts, wards,
        
        isFullAddressReady,
        handleVerifyAddress,
        isVerifying: geocodeMutation.isPending,
        
        showMap, latitude, longitude, handleMapLocationChange,
        
        handleSubmit, isSubmitting,
        onCancel,
        isEditModeAndCurrentlyDefault
    };
};
