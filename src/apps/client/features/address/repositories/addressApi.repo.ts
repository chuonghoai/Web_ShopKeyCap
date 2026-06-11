import { apiClient } from "../../../../../core/api/apiClient";
import type { ApiResponse } from "../../../../../core/api/apiResponse";
import type { Address, DeliveryInfoModel } from "../models/address.model";
import type { AddressRepo } from "./address.repo";

export class AddressApiRepo implements AddressRepo {
    /**
     * GET /address/shipping?addressId={addressId}
     * @param addressId?
     * @returns DeliveryInfoModel
     * 
     * Mô tả:
     *  - nếu có truyền addressId, lấy thông tin và ước lượng thời gian giao đến địa chỉ đó
     *  - nếu ko truyền addessId, lấy địa chỉ mặc định và ước lượng thời gian giao đến địa chỉ mặc định
     */
    async getShippingInfo(addressId?: number): Promise<ApiResponse<DeliveryInfoModel | null>> {
        const params = addressId ? { addressId } : undefined;
        return apiClient.get<ApiResponse<DeliveryInfoModel | null>>("/address/shipping", { params });
    }

    /**
     * GET /address
     * @returns Address[]
     * 
     * Mô tả:
     *  - Lấy danh sách địa chỉ của user
     *  - Địa chỉ mặc định phải đứng đầu list
     */
    async getAddresses(): Promise<ApiResponse<Address[]>> {
        return apiClient.get<ApiResponse<Address[]>>("/address");
    }
}
