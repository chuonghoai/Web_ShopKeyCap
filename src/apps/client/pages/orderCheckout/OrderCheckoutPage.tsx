import React from 'react';
import { useOrderCheckoutController } from './useOrderCheckout.controller';
import { DeliveryAddressSection } from './components/DeliveryAddressSection';
import { ProductListSection } from './components/ProductListSection';
import { OrderSummarySection } from './components/OrderSummarySection';
import { PaymentMethodSection } from './components/PaymentMethodSection';
import { CheckoutActionSection } from './components/CheckoutActionSection';
import { Link } from 'react-router-dom';

const OrderCheckoutPage: React.FC = () => {
    const controller = useOrderCheckoutController();

    return (
        <div className="max-w-full min-h-screen bg-slate-50/50 pb-20">
            {/* Header */}
            <div className="bg-white border-b border-slate-100 mb-6 sticky top-0 z-20">
                <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
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

            <div className="max-w-full mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col lg:flex-row gap-8 items-start">
                    {/* Left Column */}
                    <div className="flex-1 w-full min-w-0">
                        <DeliveryAddressSection
                            deliveryInfo={controller.deliveryInfo ?? null}
                            isLoading={controller.isLoading}
                        />

                        <ProductListSection
                            items={controller.preparedData?.items || []}
                            isLoading={controller.isLoading}
                            formatPrice={controller.formatPrice}
                        />
                    </div>

                    {/* Right Column */}
                    <div className="w-full lg:w-95 shrink-0 space-y-6">
                        <PaymentMethodSection
                            selectedMethod={controller.selectedPaymentMethod}
                            onSelectMethod={controller.setSelectedPaymentMethod}
                        />

                        <OrderSummarySection
                            subTotal={controller.preparedData?.subTotal || 0}
                            shippingFee={controller.preparedData?.shippingFee}
                            totalAmount={controller.preparedData?.totalAmount || 0}
                            formatPrice={controller.formatPrice}
                            isLoading={controller.isLoading}
                        />
                    </div>
                </div>
            </div>

            <CheckoutActionSection
                onCheckout={controller.handleCheckout}
                isSubmitting={controller.isSubmitting}
                isDisabled={!controller.deliveryInfo?.address?.id}
                totalAmount={controller.preparedData?.totalAmount || 0}
                formatPrice={controller.formatPrice}
            />
        </div>
    );
};

export default OrderCheckoutPage;
