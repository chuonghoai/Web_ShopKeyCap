import type { ApiResponse } from "../../../../../core/api/apiResponse";
import type { Address, DeliveryInfoModel } from "../models/address.model";

export interface AddressRepo {
    getShippingInfo(addressId?: string): Promise<ApiResponse<DeliveryInfoModel | null>>;
    getAddresses(): Promise<ApiResponse<Address[]>>;
}
