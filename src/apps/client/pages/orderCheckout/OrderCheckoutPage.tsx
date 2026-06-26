import React from 'react';
import { useOrderCheckoutController } from './useOrderCheckout.controller';
import { DeliveryAddressSection } from './components/DeliveryAddressSection';
import { ProductListSection } from './components/ProductListSection';
import { OrderSummarySection } from './components/OrderSummarySection';
import { PaymentMethodSection } from './components/PaymentMethodSection';
import { CheckoutActionSection } from './components/CheckoutActionSection';
import { VoucherSection } from './components/VoucherSection';
import { PaymentMethodModal } from './components/PaymentMethodModal';
import { VoucherModal } from './components/VoucherModal';
import { AddressSelectionModal } from './components/AddressSelectionModal';
import { Link } from 'react-router-dom';

const OrderCheckoutPage: React.FC = () => {
    const controller = useOrderCheckoutController();

    return (
        <div className="max-w-full min-h-screen bg-slate-50/50 pb-10">
            {/* Header */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 sticky top-0 z-20 pt-4 mb-2.5">
                <div className="bg-white rounded-md shadow-sm border border-slate-200 h-16 px-8 flex items-center justify-between gap-4">
                    <div className="flex items-center gap-3">
                        <Link
                            to="/cart"
                            className="p-2 -ml-2 rounded-xl text-slate-400 hover:text-blue-600 hover:bg-blue-50 transition-colors"
                        >
                            <span className="material-icons-outlined text-[24px]">arrow_back</span>
                        </Link>
                        <div className="h-6 w-px bg-slate-200"></div>
                        <h1 className="text-xl font-bold text-slate-900">Thanh toán</h1>
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="bg-white rounded-md shadow-sm border border-slate-200 overflow-hidden px-8">
                    <DeliveryAddressSection
                        deliveryInfo={controller.deliveryInfo ?? null}
                        isLoading={controller.isLoading}
                        formatDate={controller.formatDate}
                        onChangeAddress={() => controller.setIsAddressModalOpen(true)}
                    />

                    <div className="h-px bg-slate-200 w-full"></div>

                    <ProductListSection
                        items={controller.preparedData?.items || []}
                        isLoading={controller.isLoading}
                        formatPrice={controller.formatPrice}
                    />

                    <div className="h-px bg-slate-200 w-full border-dashed"></div>

                    <VoucherSection
                        onOpenModal={() => controller.setIsVoucherModalOpen(true)}
                    />

                    <div className="h-px bg-slate-200 w-full border-dashed"></div>

                    <PaymentMethodSection
                        selectedMethod={controller.selectedPaymentMethod}
                        onOpenModal={() => controller.setIsPaymentModalOpen(true)}
                    />

                    <div className="h-px bg-slate-200 w-full"></div>

                    <OrderSummarySection
                        subTotal={controller.preparedData?.subTotal || 0}
                        shippingFee={controller.preparedData?.shippingFee}
                        totalAmount={controller.preparedData?.totalAmount || 0}
                        formatPrice={controller.formatPrice}
                        isLoading={controller.isLoading}
                    />

                    <CheckoutActionSection
                        onCheckout={controller.handleCheckout}
                        isSubmitting={controller.isSubmitting}
                        isDisabled={!controller.deliveryInfo?.address?.id}
                    />
                </div>
            </div>

            {/* Modals */}
            <PaymentMethodModal
                isOpen={controller.isPaymentModalOpen}
                onClose={() => controller.setIsPaymentModalOpen(false)}
                selectedMethod={controller.selectedPaymentMethod}
                onSelectMethod={controller.setSelectedPaymentMethod}
            />

            <VoucherModal
                isOpen={controller.isVoucherModalOpen}
                onClose={() => controller.setIsVoucherModalOpen(false)}
            />

            <AddressSelectionModal
                open={controller.isAddressModalOpen}
                selectedAddressId={controller.selectedAddressId}
                onClose={() => controller.setIsAddressModalOpen(false)}
                onSelect={controller.handleSelectAddress}
            />
        </div>
    );
};

export default OrderCheckoutPage;
