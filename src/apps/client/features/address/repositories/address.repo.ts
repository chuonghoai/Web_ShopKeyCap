import type { ApiResponse } from "../../../../../core/api/apiResponse";
import type { 
    Address, 
    DeliveryInfoModel, 
    CreateAddressRequestModel, 
    UpdateAddressRequestModel, 
    ProvinceModel, 
    DistrictModel, 
    WardModel 
} from "../models/address.model";

export interface AddressRepo {
    getShippingInfo(addressId?: number): Promise<ApiResponse<DeliveryInfoModel | null>>;
    getAddresses(): Promise<ApiResponse<Address[]>>;

    createAddress(request: CreateAddressRequestModel): Promise<ApiResponse<Address>>;
    updateAddress(id: number, request: UpdateAddressRequestModel): Promise<ApiResponse<Address>>;
    deleteAddress(id: number): Promise<ApiResponse<null>>;
    setDefaultAddress(id: number): Promise<ApiResponse<null>>;

    getProvinces(): Promise<ProvinceModel[]>;
    getDistricts(provinceId: number): Promise<DistrictModel[]>;
    getWards(districtId: number): Promise<WardModel[]>;
    getLocationFromAddress(address: string): Promise<{ latitude: number; longitude: number }>;
}
