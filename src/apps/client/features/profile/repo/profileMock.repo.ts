import type { ApiResponse } from "../../../../../core/api/apiResponse";
import type { DeliveryInfoModel, Address } from "../models/address.model";
import type { ProfileRepo } from "./profile.repo";

export class ProfileMockRepo implements ProfileRepo {
    async getDefaultAddressAndShippingTime(): Promise<ApiResponse<DeliveryInfoModel | null>> {
        const address: Address = {
            id: "addr_1",
            fullName: "Nguyễn Văn A",
            phone: "0987654321",
            province: { code: "SG", name: "Hồ Chí Minh" },
            district: { code: "D1", name: "Quận 1" },
            ward: { code: "W1", name: "Phường Bến Nghé" },
            street: "Số 227 Nguyễn Văn Cừ",
            latitude: 10.762622,
            longitude: 106.660172,
            isDefault: true,
        };

        const today = new Date();
        const earliest = new Date(today);
        earliest.setDate(earliest.getDate() + 2);
        const latest = new Date(today);
        latest.setDate(latest.getDate() + 4);

        const HAVE_ADDRESS = true;
        let dateRes: DeliveryInfoModel | null = null;
        if (HAVE_ADDRESS) {
            dateRes = {
                address,
                shippingTime: {
                    earliestDay: earliest.toISOString(),
                    latestDay: latest.toISOString(),
                }
            }
        }
        else dateRes = null;

        return {
            success: true,
            message: "Lấy địa chỉ thành công",
            data: dateRes
        };
    }
}
