import type { ApiResponse } from "../../../../../core/api/apiResponse";
import { apiClient } from "../../../../../core/api/apiClient";
import type { DeliveryInfoModel } from "../models/address.model";
import type { ProfileRepo } from "./profile.repo";

export class ProfileApiRepo implements ProfileRepo {
    /**
     * GET /profile/address/default-with-shipping
     * @returns DeliveryInfoModel
     * 
     * Mô tả:
     *  - Env của backend cần lưu tọa độ mặc định của cửa hàng
     *  - Tính toán logic để ước lượng được thời gian giao hàng và trả về theo ShippingTime (earliestDay và latestDay)
     */
    async getDefaultAddressAndShippingTime(): Promise<ApiResponse<DeliveryInfoModel>> {
        return apiClient.get<ApiResponse<DeliveryInfoModel>>("/profile/address/default-with-shipping");
    }
}
