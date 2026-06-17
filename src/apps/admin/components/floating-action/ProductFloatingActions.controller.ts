import { useNavigate } from "react-router-dom";

export const useProductFloatingActionsController = (mode: 'list' | 'detail', productId?: number, onSave?: () => void) => {
    const navigate = useNavigate();

    const handleCreateNew = () => {
        navigate('/admin/products/new');
    };

    const handleSave = () => {
        if (onSave) {
            onSave();
        }
    };

    return {
        handleCreateNew,
        handleSave,
    };
};
