import type { ApiResponse } from "../../../../../core/api/apiResponse";
import type { DeliveryInfoModel } from "../models/address.model";

export interface ProfileRepo {
    getDefaultAddressAndShippingTime(): Promise<ApiResponse<DeliveryInfoModel>>;
}
