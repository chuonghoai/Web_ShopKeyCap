import { useEffect, useState, type ChangeEvent, type FormEvent } from "react";
import { useSearchParams } from "react-router-dom";
import { useProductsStore } from "./products.store";
import type { FilterState } from "../../features/products/dto/filterState.dto";
import { SORT_OPTIONS, type SortOption } from "../../features/products/model/filter.model";

export const useProductsController = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const store = useProductsStore();

    const [currentPage, setCurrentPage] = useState<number>(1);
    const [pageInput, setPageInput] = useState<string>("1");

    const currentSort = searchParams.get("sort") as SortOption | "";
    const currentCategory = searchParams.get("categorySlug") || "";
    const currentType = searchParams.get("typeSlug") || "";
    const currentBrands = searchParams.getAll("brandSlugs");
    const currentInStock = searchParams.get("inStock") === "true";
    const currentPriceMin = searchParams.get("priceMin");
    const currentPriceMax = searchParams.get("priceMax");
    const currentPriceValue = `${currentPriceMin || ""}-${currentPriceMax || ""}`;

    useEffect(() => {
        const filterState: FilterState = {};

        const keyword = searchParams.get("keyword");
        if (keyword) filterState.keyword = keyword;

        const categorySlug = searchParams.get("categorySlug");
        if (categorySlug) filterState.categorySlug = categorySlug;

        const typeSlug = searchParams.get("typeSlug");
        if (typeSlug) filterState.typeSlug = typeSlug;

        const brandSlugs = searchParams.getAll("brandSlugs");
        if (brandSlugs.length > 0) filterState.brandSlugs = brandSlugs;

        const inStock = searchParams.get("inStock");
        if (inStock !== null) filterState.inStock = inStock === "true";

        const sort = searchParams.get("sort");
        if (sort) filterState.sort = sort as SortOption;
        else {
            updateFilter("sort", SORT_OPTIONS[0].slug, true);
        }

        const priceMin = searchParams.get("priceMin");
        if (priceMin) filterState.priceMin = Number(priceMin);

        const priceMax = searchParams.get("priceMax");
        if (priceMax) filterState.priceMax = Number(priceMax);

        const pageParam = searchParams.get("page");
        const pageToFetch = pageParam ? Number(pageParam) : 1;
        setCurrentPage(pageToFetch);
        setPageInput(String(pageToFetch));

        store.fetchProducts(pageToFetch, filterState);
    }, [searchParams]);

    const updateFilter = (key: string, value: string | null | string[], replaceHistory: boolean = false) => {
        const newParams = new URLSearchParams(searchParams);

        if (value === null || value === "" || (Array.isArray(value) && value.length === 0)) {
            newParams.delete(key);
        } else if (Array.isArray(value)) {
            newParams.delete(key);
            value.forEach(v => newParams.append(key, v));
        } else {
            newParams.set(key, value);
        }

        newParams.set("page", "1");
        setSearchParams(newParams, { replace: replaceHistory });
    };

    /**
     * Handle thay đổi tùy chọn sắp xếp
     */
    const handleSortChange = (e: ChangeEvent<HTMLInputElement>) => {
        updateFilter("sort", e.target.value);
    };

    /**
     * Handle thay đổi lọc category
     */
    const handleCategoryChange = (categorySlug: string) => {
        updateFilter("categorySlug", currentCategory === categorySlug ? null : categorySlug);
    };

    /**
     * Handle thay đổi lọc type
     */
    const handleTypeChange = (typeSlug: string) => {
        updateFilter("typeSlug", currentType === typeSlug ? null : typeSlug);
    };

    /**
     * Handle thay đổi lọc brand
     */
    const handleBrandChange = (brandSlug: string) => {
        const newBrands = currentBrands.includes(brandSlug)
            ? currentBrands.filter(b => b !== brandSlug)
            : [...currentBrands, brandSlug];
        updateFilter("brandSlugs", newBrands);
    };

    /**
     * Handle thay đổi lọc inStock
     */
    const handleInStockChange = (e: ChangeEvent<HTMLInputElement>) => {
        updateFilter("inStock", e.target.checked ? "true" : null);
    };

    /**
     * Handle thay đổi lọc price
     */
    const handlePriceChange = (min: number | null, max: number | null) => {
        const targetValue = `${min || ""}-${max || ""}`;
        const newParams = new URLSearchParams(searchParams);

        if (currentPriceValue === targetValue) {
            newParams.delete("priceMin");
            newParams.delete("priceMax");
        } else {
            if (min !== null) newParams.set("priceMin", String(min));
            else newParams.delete("priceMin");

            if (max !== null) newParams.set("priceMax", String(max));
            else newParams.delete("priceMax");
        }

        newParams.set("page", "1");
        setSearchParams(newParams);
    };

    /**
     * Handle thay đổi page
     */
    const handlePageChange = (newPage: number) => {
        searchParams.set("page", String(newPage));
        setSearchParams(searchParams);
    };

    /**
     * Handle thay đổi page trực tiếp từ bàn phím
     */
    const handlePageSubmit = (e: FormEvent) => {
        e.preventDefault();
        let newPage = parseInt(pageInput, 10);

        if (isNaN(newPage) || newPage < 1) {
            newPage = 1;
        } else if (newPage > store.totalPages) {
            newPage = store.totalPages;
        }

        handlePageChange(newPage);
        setPageInput(String(newPage));
    };

    /**
     * Handle reset bộ lọc và kiểm tra có bộ lọc nào đang được chọn ko
     */
    const handleResetFilter = () => {
        setSearchParams({});
    }
    const hasActiveFilter = Boolean(
        currentCategory !== "" ||
        currentType !== "" ||
        currentBrands.length > 0 ||
        currentInStock === true ||
        currentPriceValue !== "-"
    );

    return {
        products: store.products,
        filter: store.filter,
        isLoading: store.isLoading,
        currentPage,
        totalPages: store.totalPages,

        // UI States
        currentSort,
        currentCategory,
        currentType,
        currentBrands,
        currentInStock,
        currentPriceValue,

        hasActiveFilter,
        pageInput,

        // Handlers
        handlePageChange,
        handleSortChange,
        handleCategoryChange,
        handleTypeChange,
        handleBrandChange,
        handleInStockChange,
        handlePriceChange,
        handleResetFilter,

        setPageInput,
        handlePageSubmit,
    };
};