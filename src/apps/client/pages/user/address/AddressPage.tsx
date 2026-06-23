import { useAddressPageController } from './AddressPage.controller';
import AddressForm from './components/AddressForm';
import AddressList from './components/AddressList';

export default function AddressPage() {
    const {
        mode,
        selectedAddressId,
        handleAddNew,
        handleEdit,
        handleCancelForm,
        handleFormSuccess
    } = useAddressPageController();

    return (
        <div className="w-full">
            <div className="mb-6">
                <h1 className="text-2xl font-serif text-slate-800 tracking-tight">Sổ địa chỉ</h1>
                <p className="text-slate-500 mt-1 text-sm">Quản lý các địa chỉ giao nhận của bạn</p>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-slate-200/60 p-6 min-h-100">
                {mode === 'list' && (
                    <AddressList 
                        onAddNew={handleAddNew} 
                        onEdit={handleEdit} 
                    />
                )}
                
                {(mode === 'create' || mode === 'edit') && (
                    <AddressForm 
                        mode={mode}
                        addressId={selectedAddressId}
                        onCancel={handleCancelForm}
                        onSuccess={handleFormSuccess}
                    />
                )}
            </div>
        </div>
    );
}
