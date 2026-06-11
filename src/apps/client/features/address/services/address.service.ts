import { USE_MOCK } from "../../../../../core/config/useMock.config";
import type { AddressRepo } from "../repositories/address.repo";
import type { ApiResponse } from "../../../../../core/api/apiResponse";
import type { Address, DeliveryInfoModel } from "../models/address.model";
import { AddressApiRepo } from "../repositories/addressApi.repo";
import { AddressMockRepo } from "../repositories/addressMock.repo";

export class AddressService {
    private readonly addressRepo: AddressRepo;
    
    constructor(addressRepo: AddressRepo) {
        this.addressRepo = addressRepo;
    }

    async getShippingInfo(addressId?: number): Promise<ApiResponse<DeliveryInfoModel | null>> {
        return this.addressRepo.getShippingInfo(addressId);
    }

    async getAddresses(): Promise<ApiResponse<Address[]>> {
        return this.addressRepo.getAddresses();
    }
}

export const addressService = new AddressService(USE_MOCK ? new AddressMockRepo() : new AddressApiRepo());
