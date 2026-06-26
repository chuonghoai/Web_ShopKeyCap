import { apiClient } from "../../../../../core/api/apiClient";
import type { ApiResponse } from "../../../../../core/api/apiResponse";
import { ApiException } from "../../../../../core/exceptions/api.exception";
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
import axios from "axios";

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

    async createAddress(request: CreateAddressRequestModel): Promise<ApiResponse<Address>> {
        return apiClient.post<ApiResponse<Address>>("/address", request);
    }

    async updateAddress(id: number, request: UpdateAddressRequestModel): Promise<ApiResponse<Address>> {
        return apiClient.put<ApiResponse<Address>>(`/address/${id}`, request);
    }

    async deleteAddress(id: number): Promise<ApiResponse<null>> {
        return apiClient.delete<ApiResponse<null>>(`/address/${id}`);
    }

    async setDefaultAddress(id: number): Promise<ApiResponse<null>> {
        return apiClient.patch<ApiResponse<null>>(`/address/${id}/default`);
    }

    async getProvinces(): Promise<ProvinceModel[]> {
        const res = await axios.get("https://fe-online-gateway.ghn.vn/shiip/public-api/masterdata/province");
        const data = res.data?.data || res.data;

        return data.map((item: any) => ({
            id: item.province_id || item.id,
            name: item.province_name || item.name
        }));
    }

    async getDistricts(provinceId: number): Promise<DistrictModel[]> {
        const res = await axios.get("https://fe-online-gateway.ghn.vn/shiip/public-api/masterdata/district", {
            params: { province_id: provinceId }
        });

        const data = res.data?.data || res.data;

        return data.map((item: any) => ({
            id: item.district_id || item.id,
            name: item.district_name || item.name
        }));
    }

    async getWards(districtId: number): Promise<WardModel[]> {
        const res = await axios.get("https://fe-online-gateway.ghn.vn/shiip/public-api/masterdata/ward", {
            params: { district_id: districtId }
        });

        const data = res.data?.data || res.data;

        return data.map((item: any) => ({
            id: item.ward_code || item.id,
            name: item.ward_name || item.name
        }));
    }

    async getLocationFromAddress(address: string): Promise<{ latitude: number; longitude: number; }> {
        const res = await axios.get("https://nominatim.openstreetmap.org/search", {
            params: {
                q: address,
                format: "json",
                limit: 1
            }
        });

        const data = res.data?.data || res.data;

        if (!data || data.length === 0)
            throw new ApiException("Không tìm thấy tọa độ", 404);

        return {
            latitude: Number(data[0].lat),
            longitude: Number(data[0].lon)
        };
    }
}
