// homepage.controller.ts
import { useNavigate } from "react-router-dom";
import type { RecommendedProductRequest } from "../../features/products/dto/recommendedProductRequest.dto";
import { useHomepageStore } from "./homepage.store";

export const useHomepageController = () => {
    const store = useHomepageStore();
    const navigate = useNavigate();

    /**
     * Chuyển filter object thành query string rồi điều hướng đến /products.
     *
     * Ví dụ: filter = { categorySlug: 'gaming', limit: 10 }
     *   → /products?categorySlug=gaming&limit=10
     *
     * Được gọi khi người dùng bấm "Xem tất cả" ở mỗi Section.
     */
    const handleViewAll = (filter?: RecommendedProductRequest) => {
        if (!filter) {
            navigate('/products');
            return;
        }

        // Lọc bỏ key có giá trị undefined/null trước khi đưa vào URLSearchParams
        const params = new URLSearchParams();
        (Object.entries(filter) as [string, unknown][]).forEach(([key, value]) => {
            if (value === undefined || value === null) return;
            if (Array.isArray(value)) {
                // Mảng: excludeTypes=['ban-phim'] → ?excludeTypes=ban-phim (append nhiều lần nếu có nhiều phần tử)
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