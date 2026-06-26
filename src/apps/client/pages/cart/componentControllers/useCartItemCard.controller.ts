import { useState, useEffect } from "react";
import type { ChangeEvent, KeyboardEvent } from "react";
import type { CartItemModel } from "../../../features/cart/model/cart.model";

export const useCartItemCardController = (
    item: CartItemModel,
    onUpdateQuantity: (variantId: number, newQty: number) => void
) => {
    const targetId = item.variant?.id || item.product.id;
    const quantity = item.variant?.quantity || 1;
    const stockQuantity = item.variant?.stockQuantity ?? 0;

    const [inputValue, setInputValue] = useState(quantity.toString());

    // Sync from server state when not focused/modified
    useEffect(() => {
        setInputValue(quantity.toString());
    }, [quantity]);

    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        const val = e.target.value;
        if (/^\d*$/.test(val)) {
            setInputValue(val);
        }
    };

    const handleBlur = () => {
        let validValue = parseInt(inputValue, 10);
        
        if (isNaN(validValue) || validValue < 1) {
            validValue = 1;
        } else if (stockQuantity > 0 && validValue > stockQuantity) {
            validValue = stockQuantity;
        }
        
        setInputValue(validValue.toString());
        
        if (validValue !== quantity) {
            onUpdateQuantity(targetId, validValue);
        }
    };

    const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            e.currentTarget.blur();
        }
    };

    const handleIncrease = () => {
        let newQty = parseInt(inputValue, 10) || quantity;
        newQty += 1;
        if (stockQuantity > 0 && newQty > stockQuantity) {
            newQty = stockQuantity;
        }
        setInputValue(newQty.toString());
        onUpdateQuantity(targetId, newQty);
    };

    const handleDecrease = () => {
        let newQty = parseInt(inputValue, 10) || quantity;
        newQty -= 1;
        if (newQty < 1) newQty = 1;
        setInputValue(newQty.toString());
        onUpdateQuantity(targetId, newQty);
    };

    return {
        inputValue,
        handleInputChange,
        handleBlur,
        handleKeyDown,
        handleIncrease,
        handleDecrease,
        isDecreaseDisabled: parseInt(inputValue, 10) <= 1 || isNaN(parseInt(inputValue, 10)),
        isIncreaseDisabled: stockQuantity > 0 && parseInt(inputValue, 10) >= stockQuantity
    };
};
