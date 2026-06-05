import { useNavigate } from "react-router-dom";
import type { RecommendedProductRequest } from "../../features/products/dto/recommendedProductRequest.dto";
import { useHomepageSectionsQuery } from "../../features/products/hooks/queries/useHomepageSections.query";

export const useHomepageController = () => {
    const navigate = useNavigate();
    const { data: sections = [], isLoading } = useHomepageSectionsQuery();

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
        isLoading,
        sections,

        // Handlers
        handleViewAll,
    };
};