import { USE_MOCK } from "../../../../../core/config/useMock.config";
import type { AddressRepo } from "../repositories/address.repo";
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

    async createAddress(request: CreateAddressRequestModel): Promise<ApiResponse<Address>> {
        return this.addressRepo.createAddress(request);
    }

    async updateAddress(id: number, request: UpdateAddressRequestModel): Promise<ApiResponse<Address>> {
        return this.addressRepo.updateAddress(id, request);
    }

    async deleteAddress(id: number): Promise<ApiResponse<null>> {
        return this.addressRepo.deleteAddress(id);
    }

    async setDefaultAddress(id: number): Promise<ApiResponse<null>> {
        return this.addressRepo.setDefaultAddress(id);
    }

    async getProvinces(): Promise<ProvinceModel[]> {
        return this.addressRepo.getProvinces();
    }

    async getDistricts(provinceId: number): Promise<DistrictModel[]> {
        return this.addressRepo.getDistricts(provinceId);
    }

    async getWards(districtId: number): Promise<WardModel[]> {
        return this.addressRepo.getWards(districtId);
    }

    async getLocationFromAddress(address: string): Promise<{ latitude: number; longitude: number }> {
        return this.addressRepo.getLocationFromAddress(address);
    }
}

export const addressService = new AddressService(USE_MOCK ? new AddressMockRepo() : new AddressApiRepo());
