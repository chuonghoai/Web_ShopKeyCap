import type { ApiResponse } from "../../../../../core/api/apiResponse";
import type { Address, DeliveryInfoModel } from "../models/address.model";
import type { AddressRepo } from "./address.repo";

export class AddressMockRepo implements AddressRepo {
    private addresses: Address[] = [
        {
            id: "addr_1",
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
            id: "addr_2",
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

    async getShippingInfo(addressId?: string): Promise<ApiResponse<DeliveryInfoModel | null>> {
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
}
