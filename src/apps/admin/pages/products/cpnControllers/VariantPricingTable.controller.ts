import { useEffect, useRef, useState, useMemo } from 'react';
import { useWatch, type Control, type UseFormSetValue } from 'react-hook-form';
import type { ProductOption, ProductVariant } from '../../../../client/features/products/model/variant.model';
import { generateSlug } from '../../../../../utils/string.utils';

export interface VariantCombination {
    attributes: Record<string, string>;
    skuSuffix: string;
    attributesLabel: string;
}

interface DefaultPricing {
    price: number;
    originalPrice: number;
    percentDiscount: number;
    stockQuantity: number;
}

// Pure Functions

export const makeAttributeKey = (attributes: Record<string, string>): string => {
    return JSON.stringify(
        Object.keys(attributes)
            .sort()
            .reduce((acc, key) => { acc[key] = attributes[key]; return acc; }, {} as Record<string, string>)
    );
};

export const matchAttributes = (
    variantAttrs: Record<string, string>,
    comboAttrs: Record<string, string>
): boolean => {
    const vKeys = Object.keys(variantAttrs || {});
    const cKeys = Object.keys(comboAttrs);
    if (vKeys.length !== cKeys.length) return false;
    return cKeys.every(k => variantAttrs[k] === comboAttrs[k]);
};

export const generateVariantCombinations = (options: ProductOption[]): VariantCombination[] => {
    const validOptions = options.filter(o => o.name && o.values && o.values.length > 0);
    if (validOptions.length === 0) return [];

    let combinations: Record<string, string>[] = validOptions[0].values.map(v => ({
        [validOptions[0].name]: v,
    }));

    for (let i = 1; i < validOptions.length; i++) {
        const option = validOptions[i];
        const newCombinations: Record<string, string>[] = [];
        for (const combo of combinations) {
            for (const value of option.values) {
                newCombinations.push({ ...combo, [option.name]: value });
            }
        }
        combinations = newCombinations;
    }

    return combinations.map(attrObj => {
        const values = Object.values(attrObj);
        const skuSuffix = values.map(attr => generateSlug(attr).toUpperCase()).join('-');
        return { skuSuffix, attributesLabel: values.join(' - '), attributes: attrObj };
    });
};

export const mergeAndSyncVariants = (
    combinations: VariantCombination[],
    existingVariants: ProductVariant[],
    defaults: DefaultPricing
): ProductVariant[] => {
    return combinations.map(combo => {
        const existing = existingVariants.find(v =>
            matchAttributes(v.attributes || {}, combo.attributes)
        );
        if (existing) return existing;
        return {
            sku: combo.skuSuffix,
            attributes: combo.attributes,
            price: defaults.price,
            originalPrice: defaults.originalPrice,
            percentDiscount: defaults.percentDiscount,
            stockQuantity: defaults.stockQuantity,
        } as ProductVariant;
    });
};

export const isVariantListEqual = (a: ProductVariant[], b: ProductVariant[]): boolean => {
    if (a.length !== b.length) return false;
    return a.every((va, i) =>
        makeAttributeKey(va.attributes || {}) === makeAttributeKey(b[i].attributes || {})
    );
};

export const isVariantAlreadyExists = (
    attributes: Record<string, string>,
    existingVariants: ProductVariant[]
): boolean => {
    const key = makeAttributeKey(attributes);
    return existingVariants.some(v => makeAttributeKey(v.attributes || {}) === key);
};

export const checkValueAvailable = (
    optionName: string,
    value: string,
    partialSelection: Record<string, string>,
    generatedCombinations: VariantCombination[],
    existingVariants: ProductVariant[]
): boolean => {
    const testSelection = { ...partialSelection, [optionName]: value };
    return generatedCombinations
        .filter(combo => Object.entries(testSelection).every(([k, v]) => combo.attributes[k] === v))
        .some(combo => !isVariantAlreadyExists(combo.attributes, existingVariants));
};

export const addNewVariant = (
    combo: VariantCombination,
    existingVariants: ProductVariant[],
    defaults: DefaultPricing
): ProductVariant[] => {
    return [
        ...existingVariants,
        {
            sku: combo.skuSuffix,
            attributes: combo.attributes,
            price: defaults.price,
            originalPrice: defaults.originalPrice,
            percentDiscount: defaults.percentDiscount,
            stockQuantity: defaults.stockQuantity,
        } as ProductVariant,
    ];
};

export const deleteVariant = (variants: ProductVariant[], index: number): ProductVariant[] =>
    variants.filter((_, i) => i !== index);

export const updateVariantField = (
    variants: ProductVariant[],
    index: number,
    field: keyof ProductVariant,
    value: number | string
): ProductVariant[] => {
    const updated = [...variants];
    updated[index] = { ...updated[index], [field]: value };
    return updated;
};

export const syncVariantPricing = (
    variants: ProductVariant[],
    index: number,
    field: 'price' | 'originalPrice' | 'percentDiscount',
    value: number
): ProductVariant[] => {
    const updated = [...variants];
    const v = { ...updated[index], [field]: value };

    if (field === 'price') {
        if (v.originalPrice && v.originalPrice > 0 && value <= v.originalPrice) {
            v.percentDiscount = Math.round(((v.originalPrice - value) / v.originalPrice) * 100);
        }
    } else if (field === 'originalPrice') {
        if (v.price && value > 0 && v.price <= value) {
            v.percentDiscount = Math.round(((value - v.price) / value) * 100);
        }
    } else if (field === 'percentDiscount') {
        if (v.originalPrice && v.originalPrice > 0) {
            v.price = Math.round(v.originalPrice * (1 - value / 100));
        }
    }

    updated[index] = v;
    return updated;
};

// Hook

export const useVariantPricingController = (
    control: Control<any>,
    setValue: UseFormSetValue<any>
) => {
    const options: ProductOption[] = useWatch({ control, name: 'options' }) || [];
    const variants: ProductVariant[] = useWatch({ control, name: 'variants' }) || [];

    const defaultPrice: number = useWatch({ control, name: 'price' }) || 0;
    const defaultOriginalPrice: number = useWatch({ control, name: 'originalPrice' }) || 0;
    const defaultDiscount: number = useWatch({ control, name: 'percentDiscount' }) || 0;
    const defaultStock: number = useWatch({ control, name: 'stockQuantity' }) || 0;

    const [addPanelOpen, setAddPanelOpen] = useState(false);
    const [partialSelection, setPartialSelection] = useState<Record<string, string>>({});

    const variantsRef = useRef<ProductVariant[]>(variants);
    variantsRef.current = variants;

    const defaultsRef = useRef<DefaultPricing>({
        price: defaultPrice,
        originalPrice: defaultOriginalPrice,
        percentDiscount: defaultDiscount,
        stockQuantity: defaultStock,
    });
    defaultsRef.current = {
        price: defaultPrice,
        originalPrice: defaultOriginalPrice,
        percentDiscount: defaultDiscount,
        stockQuantity: defaultStock,
    };

    const validOptions = options.filter(o => o.name && o.values && o.values.length > 0);

    const generatedCombinations = useMemo(
        () => generateVariantCombinations(options),
        [JSON.stringify(options)]
    );

    useEffect(() => {
        if (generatedCombinations.length === 0) {
            if (variantsRef.current.length > 0) {
                setValue('variants', [], { shouldDirty: true });
            }
            return;
        }

        const merged = mergeAndSyncVariants(
            generatedCombinations,
            variantsRef.current,
            defaultsRef.current
        );

        if (!isVariantListEqual(merged, variantsRef.current)) {
            setValue('variants', merged, { shouldDirty: true });
        }
    }, [generatedCombinations]);

    // Variant Mutation Handlers

    const handleDeleteVariant = (index: number) =>
        setValue('variants', deleteVariant(variants, index), { shouldDirty: true });

    const handleVariantFieldChange = (
        index: number,
        field: keyof ProductVariant,
        value: string | number
    ) => setValue('variants', updateVariantField(variants, index, field, value), { shouldDirty: true });

    const handleVariantPriceSync = (
        index: number,
        field: 'price' | 'originalPrice' | 'percentDiscount',
        value: number
    ) => setValue('variants', syncVariantPricing(variants, index, field, value), { shouldDirty: true });

    // Add Variant Panel Handlers

    const handleOpenAddPanel = () => {
        setPartialSelection({});
        setAddPanelOpen(true);
    };

    const handleCloseAddPanel = () => {
        setAddPanelOpen(false);
        setPartialSelection({});
    };

    const handlePartialSelect = (optionName: string, value: string) =>
        setPartialSelection(prev => ({ ...prev, [optionName]: value }));

    const handleConfirmAddVariant = () => {
        if (!isAddPanelReady()) return;
        const combo = generatedCombinations.find(c => matchAttributes(c.attributes, partialSelection));
        if (!combo || isVariantAlreadyExists(combo.attributes, variants)) return;
        setValue('variants', addNewVariant(combo, variants, defaultsRef.current), { shouldDirty: true });
        handleCloseAddPanel();
    };

    // Computed / Query

    const checkOptionValueAvailable = (optionName: string, value: string): boolean =>
        checkValueAvailable(optionName, value, partialSelection, generatedCombinations, variants);

    const isAddPanelReady = (): boolean =>
        validOptions.every(o => !!partialSelection[o.name]);

    const isSelectionDuplicate = (): boolean =>
        isAddPanelReady() && isVariantAlreadyExists(partialSelection, variants);

    const allCombinationsFilled = (): boolean =>
        generatedCombinations.length > 0 &&
        generatedCombinations.every(combo => isVariantAlreadyExists(combo.attributes, variants));

    return {
        // Data
        variants,
        generatedCombinations,
        validOptions,

        // Add Variant panel state
        addPanelOpen,
        partialSelection,
        
        // Variant mutation
        handleDeleteVariant,
        handleVariantFieldChange,
        handleVariantPriceSync,
        
        // Add Variant panel
        handleOpenAddPanel,
        handleCloseAddPanel,
        handlePartialSelect,
        handleConfirmAddVariant,
        
        // Queries
        checkOptionValueAvailable,
        isAddPanelReady,
        isSelectionDuplicate,
        allCombinationsFilled,
    };
};
