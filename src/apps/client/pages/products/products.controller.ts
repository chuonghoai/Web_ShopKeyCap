import { useEffect, useState, type ChangeEvent } from "react";
import { useSearchParams } from "react-router-dom";
import { useProductsStore } from "./products.store";
import type { FilterState } from "../../features/products/dto/filterState.dto";
import type { SortOption } from "../../features/products/model/filter.model";


export const useProductsController = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const store = useProductsStore();

    const [currentPage, setCurrentPage] = useState<number>(1);

    const currentSort = searchParams.get("sort") as SortOption | "";
    const currentCategory = searchParams.get("categorySlug") || "";
    const currentType = searchParams.get("typeSlug") || "";
    const currentBrands = searchParams.getAll("brandSlugs");
    const currentInStock = searchParams.get("inStock") === "true";

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

        const priceMin = searchParams.get("priceMin");
        if (priceMin) filterState.priceMin = Number(priceMin);

        const priceMax = searchParams.get("priceMax");
        if (priceMax) filterState.priceMax = Number(priceMax);

        const pageParam = searchParams.get("page");
        const pageToFetch = pageParam ? Number(pageParam) : 1;
        setCurrentPage(pageToFetch);

        store.fetchProducts(pageToFetch, filterState);
    }, [searchParams]);

    const updateFilter = (key: string, value: string | null | string[]) => {
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
        setSearchParams(newParams);
    };

    const handleSortChange = (e: ChangeEvent<HTMLSelectElement>) => {
        updateFilter("sort", e.target.value);
    };

    const handleCategoryChange = (categorySlug: string) => {
        updateFilter("categorySlug", currentCategory === categorySlug ? null : categorySlug);
    };

    const handleTypeChange = (typeSlug: string) => {
        updateFilter("typeSlug", currentType === typeSlug ? null : typeSlug);
    };

    const handleBrandChange = (brandSlug: string) => {
        const newBrands = currentBrands.includes(brandSlug)
            ? currentBrands.filter(b => b !== brandSlug)
            : [...currentBrands, brandSlug];
        updateFilter("brandSlugs", newBrands);
    };

    const handleInStockChange = (e: ChangeEvent<HTMLInputElement>) => {
        updateFilter("inStock", e.target.checked ? "true" : null);
    };

    const handlePageChange = (newPage: number) => {
        searchParams.set("page", String(newPage));
        setSearchParams(searchParams);
    };

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

        // Handlers
        handlePageChange,
        handleSortChange,
        handleCategoryChange,
        handleTypeChange,
        handleBrandChange,
        handleInStockChange
    };
};