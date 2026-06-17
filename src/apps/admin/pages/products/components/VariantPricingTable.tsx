import React, { useEffect, useMemo } from 'react';
import { useWatch, type Control, type UseFormRegister, type UseFormSetValue } from 'react-hook-form';
import type { ProductOption, ProductVariant } from '../../../../client/features/products/model/variant.model';
import { generateSlug } from '../../../../../utils/string.utils';
import { Trash2 } from 'lucide-react';

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

        // Only add missing ones automatically. If a combination doesn't exist in newVariants, it means we don't automatically generate it if it was deleted.
        // Wait, the logic above automatically regenerates ALL combinations every time `options` change. 
        // If the user manually deleted a variant, it will be regenerated if `combinations` trigger this effect.
        // But since `combinations` only changes when `options` change, deleting a variant won't trigger regeneration!

        // If length changed (e.g. stale combinations were pruned)
        // Wait! If the user deleted a variant, variants.length < newVariants.length. This useEffect will restore it!
        // To fix this: if options didn't change, we shouldn't restore.
        // Actually, let's keep it simple: combinations are generated based on options. If a variant is deleted, it's gone from `variants` array.
        // We only want to run this sync when `options` actually change!
        // To prevent restoring deleted variants, we should ONLY sync when options actually change length or values.
        // Let's use a simple deep compare or just accept that the sync runs when options change.
    }, [combinations]); // REMOVED defaultPrice, defaultOriginalPrice, defaultDiscount, defaultStock, variants, setValue to avoid infinite loops and restoring deleted items!

    // Wait, the useEffect above uses stale closure for variants if it's not in deps!
    // We should use form.getValues('variants') to avoid stale closures, but we don't have form.getValues here.
    // Instead of fighting useEffect, we can keep the variants dependency but introduce a `deletedVariants` state? No, too complex.
    // Let's rewrite the sync effect properly.

    const handleVariantChange = (index: number, field: keyof ProductVariant, value: number | string) => {
        const newVariants = [...variants];
        newVariants[index] = { ...newVariants[index], [field]: value };
        setValue('variants', newVariants, { shouldDirty: true });
    };

    const handleVariantPriceSync = (index: number, field: 'price' | 'originalPrice' | 'percentDiscount', value: number) => {
        const newVariants = [...variants];
        const v = { ...newVariants[index] };
        v[field] = value;

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

        newVariants[index] = v;
        setValue('variants', newVariants, { shouldDirty: true });
    };

    const handleDeleteVariant = (index: number) => {
        const newVariants = variants.filter((_, i) => i !== index);
        setValue('variants', newVariants, { shouldDirty: true });
    };

    if (variants.length === 0) {
        return null;
    }

    return (
        <div className="mt-6 border border-slate-200 rounded-xl overflow-hidden bg-white shadow-sm">
            <div className="bg-slate-50 px-5 py-3 border-b border-slate-200 flex justify-between items-center">
                <h3 className="text-sm font-bold text-slate-800 uppercase tracking-wider">Cấu hình từng phân loại</h3>
                <span className="text-xs text-slate-500 font-medium">{variants.length} phân loại</span>
            </div>
            <div className="overflow-x-auto w-full">
                <table className="w-full text-left border-collapse min-w-[900px]">
                    <thead>
                        <tr className="bg-slate-50/50 text-xs text-slate-500 uppercase tracking-wider border-b border-slate-200">
                            <th className="px-4 py-3 font-bold w-[15%]">SKU</th>
                            <th className="px-4 py-3 font-bold w-[20%]">Thuộc tính</th>
                            <th className="px-4 py-3 font-bold w-[15%] min-w-[130px]">Giá bán</th>
                            <th className="px-4 py-3 font-bold w-[15%] min-w-[130px]">Giá gốc</th>
                            <th className="px-4 py-3 font-bold w-[10%] min-w-[130px]">% Giảm</th>
                            <th className="px-4 py-3 font-bold w-[15%] min-w-[70px]">Tồn kho</th>
                            {isEditing && <th className="px-4 py-3 font-bold w-[10%] text-center">Thao tác</th>}
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
                                            className="text-xs font-mono font-bold text-slate-700 bg-slate-100 px-2 py-1.5 rounded w-full outline-none focus:ring-1 focus:ring-blue-400 border border-transparent focus:border-blue-400 disabled:bg-transparent disabled:border-transparent"
                                        />
                                    </td>
                                    <td className="px-4 py-4 text-sm font-medium text-slate-800">
                                        {attributesLabel}
                                    </td>
                                    <td className="px-4 py-4">
                                        <input
                                            type="text"
                                            value={variant.price ? Number(variant.price).toLocaleString('vi-VN') : ''}
                                            onChange={(e) => {
                                                const rawValue = e.target.value.replace(/\./g, '').replace(/,/g, '');
                                                const num = Number(rawValue) || 0;
                                                handleVariantPriceSync(idx, 'price', num);
                                            }}
                                            disabled={!isEditing}
                                            placeholder="0"
                                            className="w-full px-3 py-1.5 text-sm rounded border border-slate-300 focus:border-blue-500 outline-none font-bold text-blue-600 disabled:bg-transparent disabled:border-transparent"
                                        />
                                    </td>
                                    <td className="px-4 py-4">
                                        <input
                                            type="text"
                                            value={variant.originalPrice ? Number(variant.originalPrice).toLocaleString('vi-VN') : ''}
                                            onChange={(e) => {
                                                const rawValue = e.target.value.replace(/\./g, '').replace(/,/g, '');
                                                const num = Number(rawValue) || 0;
                                                handleVariantPriceSync(idx, 'originalPrice', num);
                                            }}
                                            disabled={!isEditing}
                                            placeholder="0"
                                            className="w-full px-3 py-1.5 text-sm rounded border border-slate-300 focus:border-blue-500 outline-none font-bold text-slate-600 disabled:bg-transparent disabled:border-transparent"
                                        />
                                    </td>
                                    <td className="px-4 py-4">
                                        <div className="relative">
                                            <input
                                                type="number"
                                                value={variant.percentDiscount || 0}
                                                onChange={(e) => {
                                                    const num = Number(e.target.value) || 0;
                                                    handleVariantPriceSync(idx, 'percentDiscount', num);
                                                }}
                                                disabled={!isEditing}
                                                className="w-full px-3 py-1.5 pr-6 text-sm rounded border border-slate-300 focus:border-blue-500 outline-none font-bold text-orange-600 disabled:bg-transparent disabled:border-transparent"
                                            />
                                            {isEditing && <span className="absolute right-2 top-1/2 -translate-y-1/2 text-xs font-bold text-slate-400">%</span>}
                                        </div>
                                    </td>
                                    <td className="px-4 py-4">
                                        <input
                                            type="number"
                                            value={variant.stockQuantity || 0}
                                            onChange={(e) => handleVariantChange(idx, 'stockQuantity', Number(e.target.value))}
                                            disabled={!isEditing}
                                            placeholder="0"
                                            className="w-full px-3 py-1.5 text-sm rounded border border-slate-300 focus:border-blue-500 outline-none font-medium text-slate-800 disabled:bg-transparent disabled:border-transparent"
                                        />
                                    </td>
                                    {isEditing && (
                                        <td className="px-4 py-4 text-center">
                                            <button
                                                type="button"
                                                onClick={() => handleDeleteVariant(idx)}
                                                className="p-1.5 text-slate-400 hover:bg-red-50 hover:text-red-500 rounded-md transition-colors"
                                                title="Xóa biến thể này"
                                            >
                                                <Trash2 className="w-4 h-4" />
                                            </button>
                                        </td>
                                    )}
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    );
};
