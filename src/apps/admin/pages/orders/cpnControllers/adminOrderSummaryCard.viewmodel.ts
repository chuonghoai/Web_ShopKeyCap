import { formatCurrency } from "../../../../../utils/currency.util";

export const useAdminOrderSummaryCardViewModel = (subTotal: number, shippingFee: number, totalAmount: number) => {
    return {
        formattedSubTotal: formatCurrency(subTotal),
        formattedShippingFee: formatCurrency(shippingFee),
        formattedTotalAmount: formatCurrency(totalAmount)
    };
};
