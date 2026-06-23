import { useState } from "react";

export type ViewMode = 'list' | 'create' | 'edit';

export const useAddressPageController = () => {
    const [mode, setMode] = useState<ViewMode>('list');
    const [selectedAddressId, setSelectedAddressId] = useState<number | null>(null);

    const handleAddNew = () => {
        setSelectedAddressId(null);
        setMode('create');
    };

    const handleEdit = (addressId: number) => {
        setSelectedAddressId(addressId);
        setMode('edit');
    };

    const handleCancelForm = () => {
        setSelectedAddressId(null);
        setMode('list');
    };

    const handleFormSuccess = () => {
        setSelectedAddressId(null);
        setMode('list');
    };

    return {
        mode,
        selectedAddressId,
        handleAddNew,
        handleEdit,
        handleCancelForm,
        handleFormSuccess
    };
};
