import React, { useEffect, useMemo } from 'react';
import { useWatch, type Control, type UseFormRegister, type UseFormSetValue } from 'react-hook-form';
import type { ProductOption, ProductVariant } from '../../../../client/features/products/model/variant.model';
import { generateSlug } from '../../../../../utils/string.utils';

interface Props {
    control: Control<any>;
    register: UseFormRegister<any>;
    setValue: UseFormSetValue<any>;
    isEditing: boolean;
}

const generateCombinations = (options: ProductOption[]) => {
    const validOptions = options.filter(o => o.name && o.values && o.values.length > 0);
    if (validOptions.length === 0) return [];
    
    let combinations: Record<string, string>[] = validOptions[0].values.map(v => ({ [validOptions[0].name]: v }));
    
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
        return {
            skuSuffix,
            attributesLabel: values.join(' - '),
            attributes: attrObj
        };
    });
};

export const VariantPricingTable: React.FC<Props> = ({ control, register, setValue, isEditing }) => {
    const options = useWatch({ control, name: 'options' }) || [];
    const variants: ProductVariant[] = useWatch({ control, name: 'variants' }) || [];
    
    // UI default values
    const defaultPrice = useWatch({ control, name: 'price' }) || 0;
    const defaultOriginalPrice = useWatch({ control, name: 'originalPrice' }) || 0;
    const defaultDiscount = useWatch({ control, name: 'percentDiscount' }) || 0;
    const defaultStock = useWatch({ control, name: 'stockQuantity' }) || 0;

    const combinations = useMemo(() => generateCombinations(options), [options]);

    useEffect(() => {
        if (combinations.length === 0) {
            if (variants.length > 0) {
                setValue('variants', [], { shouldDirty: true });
            }
            return;
        }

        let isChanged = false;
        const newVariants: ProductVariant[] = [];

        combinations.forEach(combo => {
            // Match existing variant by attributes
            const existing = variants.find(v => {
                const vKeys = Object.keys(v.attributes || {});
                const cKeys = Object.keys(combo.attributes);
                if (vKeys.length !== cKeys.length) return false;
                return vKeys.every(k => v.attributes[k] === combo.attributes[k]);
            });

            if (existing) {
                newVariants.push(existing);
            } else {
                isChanged = true;
                newVariants.push({
                    sku: combo.skuSuffix, 
                    attributes: combo.attributes,
                    price: defaultPrice,
                    originalPrice: defaultOriginalPrice,
                    percentDiscount: defaultDiscount,
                    stockQuantity: defaultStock
                } as ProductVariant);
            }
        });

        // If length changed (e.g. stale combinations were pruned)
        if (variants.length !== newVariants.length) {
            isChanged = true;
        } else {
            // Even if length is same, check if order changed
            const orderChanged = variants.some((v, idx) => v !== newVariants[idx]);
            if (orderChanged) {
                isChanged = true;
            }
        }

        if (isChanged) {
            setValue('variants', newVariants, { shouldDirty: true });
        }
    }, [combinations, defaultPrice, defaultOriginalPrice, defaultDiscount, defaultStock, variants, setValue]);

    if (variants.length === 0) {
        return null;
    }

    const handleVariantChange = (index: number, field: keyof ProductVariant, value: number | string) => {
        const newVariants = [...variants];
        newVariants[index] = { ...newVariants[index], [field]: value };
        setValue('variants', newVariants, { shouldDirty: true });
    };

    return (
        <div className="mt-6 border border-slate-200 rounded-xl overflow-hidden bg-white shadow-sm">
            <div className="bg-slate-50 px-5 py-3 border-b border-slate-200 flex justify-between items-center">
                <h3 className="text-sm font-bold text-slate-800 uppercase tracking-wider">Cấu hình từng phân loại</h3>
            </div>
            <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="bg-slate-50/50 text-xs text-slate-500 uppercase tracking-wider border-b border-slate-200">
                            <th className="px-4 py-3 font-bold w-[15%]">SKU</th>
                            <th className="px-4 py-3 font-bold w-[25%]">Thuộc tính</th>
                            <th className="px-4 py-3 font-bold w-[15%]">Giá bán</th>
                            <th className="px-4 py-3 font-bold w-[15%]">Giá gốc</th>
                            <th className="px-4 py-3 font-bold w-[15%]">% Giảm</th>
                            <th className="px-4 py-3 font-bold w-[15%]">Tồn kho</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                        {variants.map((variant, idx) => {
                            const attributesLabel = Object.values(variant.attributes || {}).join(' - ');

                            return (
                                <tr key={idx} className="hover:bg-slate-50/50 transition-colors">
                                    <td className="px-4 py-4">
                                        <input 
                                            type="text" 
                                            value={variant.sku || ''}
                                            onChange={(e) => handleVariantChange(idx, 'sku', e.target.value)}
                                            disabled={!isEditing}
                                            className="text-xs font-mono font-bold text-slate-700 bg-slate-100 px-2 py-1.5 rounded w-full outline-none focus:ring-1 focus:ring-blue-400 border border-transparent focus:border-blue-400"
                                        />
                                    </td>
                                    <td className="px-4 py-4 text-sm font-medium text-slate-800">
                                        {attributesLabel}
                                    </td>
                                    <td className="px-4 py-4">
                                        <input 
                                            type="number" 
                                            value={variant.price || 0}
                                            onChange={(e) => handleVariantChange(idx, 'price', Number(e.target.value))}
                                            disabled={!isEditing}
                                            className="w-full px-2 py-1.5 text-sm rounded border border-slate-300 focus:border-blue-500 outline-none font-medium text-blue-600"
                                        />
                                    </td>
                                    <td className="px-4 py-4">
                                        <input 
                                            type="number" 
                                            value={variant.originalPrice || 0}
                                            onChange={(e) => handleVariantChange(idx, 'originalPrice', Number(e.target.value))}
                                            disabled={!isEditing}
                                            className="w-full px-2 py-1.5 text-sm rounded border border-slate-300 focus:border-blue-500 outline-none font-medium text-slate-600"
                                        />
                                    </td>
                                    <td className="px-4 py-4">
                                        <div className="relative">
                                            <input 
                                                type="number" 
                                                value={variant.percentDiscount || 0}
                                                onChange={(e) => handleVariantChange(idx, 'percentDiscount', Number(e.target.value))}
                                                disabled={!isEditing}
                                                className="w-full px-2 py-1.5 pr-6 text-sm rounded border border-slate-300 focus:border-blue-500 outline-none font-medium text-orange-600"
                                            />
                                            <span className="absolute right-2 top-1/2 -translate-y-1/2 text-xs font-bold text-slate-400">%</span>
                                        </div>
                                    </td>
                                    <td className="px-4 py-4">
                                        <input 
                                            type="number" 
                                            value={variant.stockQuantity || 0}
                                            onChange={(e) => handleVariantChange(idx, 'stockQuantity', Number(e.target.value))}
                                            disabled={!isEditing}
                                            className="w-full px-2 py-1.5 text-sm rounded border border-slate-300 focus:border-blue-500 outline-none font-medium text-slate-800"
                                        />
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    );
};
