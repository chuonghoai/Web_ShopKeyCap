import { useNavigate } from "react-router-dom";
import type { RecommendedProductRequest } from "../../features/products/dto/recommendedProductRequest.dto";
import { useHomepageStore } from "./homepage.store";

export const useHomepageController = () => {
    const store = useHomepageStore();
    const navigate = useNavigate();

    const handleViewAll = (filter?: RecommendedProductRequest) => {
        if (!filter) {
            navigate('/products');
            return;
        }

        const params = new URLSearchParams();
        (Object.entries(filter) as [string, unknown][]).forEach(([key, value]) => {
            if (value === undefined || value === null) return;
            if (Array.isArray(value)) {
                value.forEach(v => params.append(key, String(v)));
            } else {
                params.set(key, String(value));
            }
        });

        navigate(`/products?${params.toString()}`);
    };

    return {
        // Data
        isLoading: store.isLoading,
        sections: store.sections,

        // Handlers
        handleViewAll,
    };
};