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
import type { AddressRepo } from "./address.repo";

export class AddressMockRepo implements AddressRepo {
    private addresses: Address[] = [
        {
            id: 1,
            fullName: "Nguyễn Văn A",
            phone: "0987654321",
            province: { code: "SG", name: "Hồ Chí Minh" },
            district: { code: "D1", name: "Quận 1" },
            ward: { code: "W1", name: "Phường Bến Nghé" },
            street: "Số 227 Nguyễn Văn Cừ",
            fullAddress: "Số 227 Nguyễn Văn Cừ, Phường Bến Nghé, Quận 1, Hồ Chí Minh",
            latitude: 10.762622,
            longitude: 106.660172,
            isDefault: true,
        },
        {
            id: 2,
            fullName: "Nguyễn Văn B",
            phone: "0123456789",
            province: { code: "SG", name: "Hồ Chí Minh" },
            district: { code: "D1", name: "Quận 1" },
            ward: { code: "W1", name: "Phường Phạm Ngũ Lão" },
            street: "Số 123 Phạm Ngũ Lão",
            fullAddress: "Số 123 Phạm Ngũ Lão, Phường Phạm Ngũ Lão, Quận 1, Hồ Chí Minh",
            latitude: 10.767520,
            longitude: 106.694600,
            isDefault: false,
        }
    ];

    async getShippingInfo(addressId?: number): Promise<ApiResponse<DeliveryInfoModel | null>> {
        const address = addressId
            ? this.addresses.find(a => a.id === addressId)
            : this.addresses.find(a => a.isDefault);

        if (!address) {
            return {
                success: true,
                message: "Không tìm thấy địa chỉ",
                data: null
            };
        }

        const today = new Date();
        const earliest = new Date(today);
        earliest.setDate(earliest.getDate() + 2);
        const latest = new Date(today);
        latest.setDate(latest.getDate() + 4);

        return {
            success: true,
            message: "Lấy địa chỉ thành công",
            data:
            {
                address,
                shippingTime: {
                    earliestDay: earliest.toISOString(),
                    latestDay: latest.toISOString(),
                }
            }
        };
    }

    async getAddresses(): Promise<ApiResponse<Address[]>> {
        return {
            success: true,
            message: "Lấy danh sách địa chỉ thành công",
            data: this.addresses
        };
    }

    async createAddress(request: CreateAddressRequestModel): Promise<ApiResponse<Address>> {
        if (request.isDefault) {
            this.addresses.forEach(a => a.isDefault = false);
        }

        const newAddress: Address = {
            id: Math.max(...this.addresses.map(a => a.id), 0) + 1,
            fullName: request.recipientName,
            phone: request.phone,
            province: { code: request.provinceCode, name: request.provinceName },
            district: { code: request.districtCode, name: request.districtName },
            ward: { code: request.wardCode, name: request.wardName },
            street: request.street || "",
            fullAddress: request.fullAddress || "",
            latitude: request.latitude,
            longitude: request.longitude,
            isDefault: request.isDefault || false,
        };

        this.addresses.push(newAddress);

        return {
            success: true,
            message: "Thêm địa chỉ thành công",
            data: newAddress
        };
    }

    async updateAddress(id: number, request: UpdateAddressRequestModel): Promise<ApiResponse<Address>> {
        const index = this.addresses.findIndex(a => a.id === id);
        if (index === -1) {
            return { success: false, message: "Không tìm thấy địa chỉ", data: null as any };
        }

        if (request.isDefault) {
            this.addresses.forEach(a => a.isDefault = false);
        }

        const updatedAddress: Address = {
            ...this.addresses[index],
            fullName: request.recipientName,
            phone: request.phone,
            province: { code: request.provinceCode, name: request.provinceName },
            district: { code: request.districtCode, name: request.districtName },
            ward: { code: request.wardCode, name: request.wardName },
            street: request.street || "",
            fullAddress: request.fullAddress || "",
            latitude: request.latitude,
            longitude: request.longitude,
            isDefault: request.isDefault || false,
        };

        this.addresses[index] = updatedAddress;

        return {
            success: true,
            message: "Cập nhật địa chỉ thành công",
            data: updatedAddress
        };
    }

    async deleteAddress(id: number): Promise<ApiResponse<null>> {
        this.addresses = this.addresses.filter(a => a.id !== id);
        return {
            success: true,
            message: "Xóa địa chỉ thành công",
            data: null
        };
    }

    async setDefaultAddress(id: number): Promise<ApiResponse<null>> {
        this.addresses.forEach(a => a.isDefault = a.id === id);
        return {
            success: true,
            message: "Đặt địa chỉ mặc định thành công",
            data: null
        };
    }

    async getProvinces(): Promise<ProvinceModel[]> {
        return [
            { id: 1, name: "Hồ Chí Minh" },
            { id: 2, name: "Hà Nội" }
        ];
    }

    async getDistricts(provinceId: number): Promise<DistrictModel[]> {
        if (provinceId === 1) {
            return [
                { id: 1, name: "Quận 1" },
                { id: 2, name: "Quận 2" }
            ];
        }
        return [];
    }

    async getWards(districtId: number): Promise<WardModel[]> {
        if (districtId === 1) {
            return [
                { id: "1", name: "Phường Bến Nghé" },
                { id: "2", name: "Phường Phạm Ngũ Lão" }
            ];
        }
        return [];
    }

    async getLocationFromAddress(address: string): Promise<{ latitude: number; longitude: number }> {
        return {
            latitude: 10.762622,
            longitude: 106.660172
        };
    }
}
