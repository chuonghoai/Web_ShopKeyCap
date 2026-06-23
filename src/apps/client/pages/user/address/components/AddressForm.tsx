import { useAddressFormController } from '../cpnController/useAddressForm.controller';
import { MapPin, CheckCircle2, Navigation } from 'lucide-react';
import clsx from 'clsx';
import LeafletLocationMap from './LeafletLocationMap';

interface AddressFormProps {
    mode: 'create' | 'edit';
    addressId: number | null;
    onCancel: () => void;
    onSuccess: () => void;
}

export default function AddressForm({ mode, addressId, onCancel, onSuccess }: AddressFormProps) {
    const {
        recipientName, setRecipientName,
        phone, setPhone,
        provinceCode, handleProvinceChange,
        districtCode, handleDistrictChange,
        wardCode, handleWardChange,
        street, handleStreetChange,
        isDefault, setIsDefault,
        provinces, districts, wards,
        isFullAddressReady,
        handleVerifyAddress, isVerifying,
        showMap, latitude, longitude, handleMapLocationChange,
        handleSubmit, isSubmitting,
        isEditModeAndCurrentlyDefault
    } = useAddressFormController(mode, addressId, onSuccess, onCancel);

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
                <h2 className="text-xl font-medium text-slate-800">
                    {mode === 'create' ? 'Thêm địa chỉ mới' : 'Cập nhật địa chỉ'}
                </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div className="space-y-1.5">
                    <label className="text-sm font-medium text-slate-700">Người nhận <span className="text-red-500">*</span></label>
                    <input 
                        type="text" 
                        value={recipientName}
                        onChange={(e) => setRecipientName(e.target.value)}
                        className="w-full px-4 py-2.5 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition-all bg-slate-50/50"
                        placeholder="Họ và tên người nhận"
                        required
                    />
                </div>
                
                <div className="space-y-1.5">
                    <label className="text-sm font-medium text-slate-700">Số điện thoại <span className="text-red-500">*</span></label>
                    <input 
                        type="tel" 
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className="w-full px-4 py-2.5 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition-all bg-slate-50/50"
                        placeholder="Ví dụ: 0901234567"
                        pattern="^0\d{9}$"
                        title="Số điện thoại phải bắt đầu bằng số 0 và có 10 chữ số"
                        required
                    />
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                <div className="space-y-1.5">
                    <label className="text-sm font-medium text-slate-700">Tỉnh/Thành phố <span className="text-red-500">*</span></label>
                    <select
                        value={provinceCode}
                        onChange={(e) => handleProvinceChange(e.target.value)}
                        className="w-full px-4 py-2.5 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition-all bg-slate-50/50 appearance-none"
                        required
                    >
                        <option value="">Chọn Tỉnh/Thành phố</option>
                        {provinces.map((p) => (
                            <option key={p.id} value={p.id.toString()}>{p.name}</option>
                        ))}
                    </select>
                </div>

                <div className="space-y-1.5">
                    <label className="text-sm font-medium text-slate-700">Quận/Huyện <span className="text-red-500">*</span></label>
                    <select
                        value={districtCode}
                        onChange={(e) => handleDistrictChange(e.target.value)}
                        disabled={!provinceCode}
                        className="w-full px-4 py-2.5 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition-all bg-slate-50/50 appearance-none disabled:opacity-50 disabled:bg-slate-100"
                        required
                    >
                        <option value="">Chọn Quận/Huyện</option>
                        {districts.map((d) => (
                            <option key={d.id} value={d.id.toString()}>{d.name}</option>
                        ))}
                    </select>
                </div>

                <div className="space-y-1.5">
                    <label className="text-sm font-medium text-slate-700">Phường/Xã <span className="text-red-500">*</span></label>
                    <select
                        value={wardCode}
                        onChange={(e) => handleWardChange(e.target.value)}
                        disabled={!districtCode}
                        className="w-full px-4 py-2.5 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition-all bg-slate-50/50 appearance-none disabled:opacity-50 disabled:bg-slate-100"
                        required
                    >
                        <option value="">Chọn Phường/Xã</option>
                        {wards.map((w) => (
                            <option key={w.id} value={w.id.toString()}>{w.name}</option>
                        ))}
                    </select>
                </div>
            </div>

            <div className="space-y-1.5">
                <label className="text-sm font-medium text-slate-700">Địa chỉ cụ thể <span className="text-red-500">*</span></label>
                <div className="flex gap-3">
                    <input 
                        type="text" 
                        value={street}
                        onChange={(e) => handleStreetChange(e.target.value)}
                        className="flex-1 px-4 py-2.5 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition-all bg-slate-50/50"
                        placeholder="Số nhà, Tên đường, Tòa nhà..."
                        required
                    />
                    <button 
                        type="button"
                        onClick={handleVerifyAddress}
                        disabled={!isFullAddressReady || isVerifying}
                        className="px-5 py-2.5 bg-slate-800 text-white rounded-lg font-medium hover:bg-slate-700 transition-colors disabled:opacity-50 flex items-center gap-2 whitespace-nowrap"
                    >
                        <Navigation className={clsx("w-4 h-4", isVerifying && "animate-pulse")} />
                        Xác minh
                    </button>
                </div>
                <p className="text-xs text-slate-500">Vui lòng điền đủ thông tin để tiến hành xác minh vị trí trên bản đồ.</p>
            </div>

            {showMap && (
                <div className="mt-6 rounded-xl overflow-hidden border border-slate-200 shadow-sm relative">
                    <div className="bg-slate-50 p-3 border-b border-slate-200 flex items-center gap-2 text-sm text-slate-700">
                        <MapPin className="w-4 h-4 text-orange-500" />
                        Bạn có thể kéo điểm đánh dấu để chỉnh xác vị trí giao hàng.
                    </div>
                    <div className="h-75 w-full bg-slate-100 z-0">
                        <LeafletLocationMap 
                            latitude={latitude}
                            longitude={longitude}
                            onLocationChange={handleMapLocationChange}
                        />
                    </div>
                </div>
            )}

            <div className="pt-4 flex items-center justify-between border-t border-slate-100">
                <label className="flex items-center gap-3 cursor-pointer group">
                    <div className="relative flex items-center">
                        <input 
                            type="checkbox" 
                            checked={isDefault}
                            onChange={(e) => setIsDefault(e.target.checked)}
                            disabled={isEditModeAndCurrentlyDefault}
                            className="w-5 h-5 border-2 border-slate-300 rounded peer appearance-none checked:bg-orange-600 checked:border-orange-600 focus:ring-2 focus:ring-orange-500/20 focus:outline-none transition-all disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
                        />
                        <CheckCircle2 className="w-3.5 h-3.5 text-white absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 opacity-0 peer-checked:opacity-100 pointer-events-none" />
                    </div>
                    <span className="text-slate-700 font-medium group-hover:text-slate-900 transition-colors">
                        Đặt làm địa chỉ mặc định
                    </span>
                </label>

                <div className="flex items-center gap-3">
                    <button 
                        type="button"
                        onClick={onCancel}
                        disabled={isSubmitting}
                        className="px-6 py-2.5 text-slate-600 font-medium hover:bg-slate-100 rounded-lg transition-colors disabled:opacity-50"
                    >
                        Hủy bỏ
                    </button>
                    <button 
                        type="submit"
                        disabled={isSubmitting || !isFullAddressReady}
                        className="px-6 py-2.5 bg-orange-600 text-white font-medium rounded-lg hover:bg-orange-700 shadow-sm transition-colors disabled:opacity-50 flex items-center gap-2"
                    >
                        {isSubmitting ? 'Đang lưu...' : (mode === 'create' ? 'Tạo địa chỉ' : 'Lưu thay đổi')}
                    </button>
                </div>
            </div>
        </form>
    );
}
