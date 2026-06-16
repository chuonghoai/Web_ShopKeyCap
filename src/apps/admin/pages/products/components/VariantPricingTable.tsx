import React, { useMemo } from 'react';
import { useWatch, type Control, type UseFormRegister, type UseFormSetValue } from 'react-hook-form';
import type { ProductOption } from '../../../../client/features/products/model/variant.model';
import type { VariantOverride } from '../../../features/products/models/create-product.request';
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
    
    let combinations: { attributes: string[] }[] = validOptions[0].values.map(v => ({ attributes: [v] }));
    
    for (let i = 1; i < validOptions.length; i++) {
        const currentValues = validOptions[i].values;
        const newCombinations: { attributes: string[] }[] = [];
        for (const combo of combinations) {
            for (const value of currentValues) {
                newCombinations.push({ attributes: [...combo.attributes, value] });
            }
        }
        combinations = newCombinations;
    }
    
    return combinations.map(c => {
        const skuSuffix = c.attributes.map(attr => generateSlug(attr).toUpperCase()).join('-');
        return {
            skuSuffix,
            attributesLabel: c.attributes.join(' - ')
        };
    });
};

export const VariantPricingTable: React.FC<Props> = ({ control, register, setValue, isEditing }) => {
    const options = useWatch({ control, name: 'options' }) || [];
    const variantOverrides: VariantOverride[] = useWatch({ control, name: 'variantOverrides' }) || [];
    
    // Default prices to display as placeholder
    const defaultPrice = useWatch({ control, name: 'price' }) || 0;
    const defaultOriginalPrice = useWatch({ control, name: 'originalPrice' }) || 0;
    const defaultDiscount = useWatch({ control, name: 'percentDiscount' }) || 0;
    const defaultStock = useWatch({ control, name: 'stockQuantity' }) || 0;

    const combinations = useMemo(() => generateCombinations(options), [options]);

    if (combinations.length === 0) {
        return null;
    }

    const handleToggleOverride = (sku: string, checked: boolean) => {
        if (checked) {
            // Remove override
            const newOverrides = variantOverrides.filter(vo => vo.sku !== sku);
            setValue('variantOverrides', newOverrides, { shouldDirty: true });
        } else {
            // Add override
            const newOverrides = [...variantOverrides, { 
                sku, 
                price: defaultPrice, 
                originalPrice: defaultOriginalPrice, 
                percentDiscount: defaultDiscount, 
                stockQuantity: defaultStock 
            }];
            setValue('variantOverrides', newOverrides, { shouldDirty: true });
        }
    };

    const handleOverrideChange = (sku: string, field: keyof VariantOverride, value: number) => {
        const newOverrides = variantOverrides.map(vo => {
            if (vo.sku === sku) {
                return { ...vo, [field]: value };
            }
            return vo;
        });
        setValue('variantOverrides', newOverrides, { shouldDirty: true });
    };

    const formatVND = (num: number) => Number(num).toLocaleString('vi-VN');

    return (
        <div className="mt-6 border border-slate-200 rounded-xl overflow-hidden bg-white shadow-sm">
            <div className="bg-slate-50 px-5 py-3 border-b border-slate-200 flex justify-between items-center">
                <h3 className="text-sm font-bold text-slate-800 uppercase tracking-wider">Cấu hình giá trị đè (Variant Overrides)</h3>
            </div>
            <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="bg-slate-50/50 text-xs text-slate-500 uppercase tracking-wider border-b border-slate-200">
                            <th className="px-4 py-3 font-bold w-[15%]">SKU</th>
                            <th className="px-4 py-3 font-bold w-[15%]">Thuộc tính</th>
                            <th className="px-4 py-3 font-bold text-center w-[10%]">Giá Mặc định</th>
                            <th className="px-4 py-3 font-bold w-[15%]">Giá bán</th>
                            <th className="px-4 py-3 font-bold w-[15%]">Giá gốc</th>
                            <th className="px-4 py-3 font-bold w-[15%]">% Giảm</th>
                            <th className="px-4 py-3 font-bold w-[15%]">Tồn kho</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                        {combinations.map((combo, idx) => {
                            // Assuming base product slug/sku prefix is handled elsewhere or we just use suffix as SKU
                            const sku = combo.skuSuffix;
                            const override = variantOverrides.find(vo => vo.sku === sku);
                            const isDefault = !override;

                            return (
                                <tr key={idx} className="hover:bg-slate-50/50 transition-colors">
                                    <td className="px-4 py-4">
                                        <span className="text-xs font-mono font-bold text-slate-700 bg-slate-100 px-2 py-1 rounded">{sku}</span>
                                    </td>
                                    <td className="px-4 py-4 text-sm font-medium text-slate-800">
                                        {combo.attributesLabel}
                                    </td>
                                    <td className="px-4 py-4 text-center">
                                        <input 
                                            type="checkbox" 
                                            checked={isDefault}
                                            onChange={(e) => handleToggleOverride(sku, e.target.checked)}
                                            disabled={!isEditing}
                                            className="w-4 h-4 text-blue-600 rounded border-slate-300 cursor-pointer disabled:cursor-not-allowed"
                                        />
                                    </td>
                                    <td className="px-4 py-4">
                                        {isDefault ? (
                                            <span className="text-sm font-medium text-slate-400">{formatVND(defaultPrice)}</span>
                                        ) : (
                                            <input 
                                                type="number" 
                                                value={override.price || 0}
                                                onChange={(e) => handleOverrideChange(sku, 'price', Number(e.target.value))}
                                                disabled={!isEditing}
                                                className="w-full px-2 py-1.5 text-sm rounded border border-slate-300 focus:border-blue-500 outline-none font-medium text-blue-600"
                                            />
                                        )}
                                    </td>
                                    <td className="px-4 py-4">
                                        {isDefault ? (
                                            <span className="text-sm font-medium text-slate-400">{formatVND(defaultOriginalPrice)}</span>
                                        ) : (
                                            <input 
                                                type="number" 
                                                value={override.originalPrice || 0}
                                                onChange={(e) => handleOverrideChange(sku, 'originalPrice', Number(e.target.value))}
                                                disabled={!isEditing}
                                                className="w-full px-2 py-1.5 text-sm rounded border border-slate-300 focus:border-blue-500 outline-none font-medium text-slate-600"
                                            />
                                        )}
                                    </td>
                                    <td className="px-4 py-4">
                                        {isDefault ? (
                                            <span className="text-sm font-medium text-slate-400">{defaultDiscount}%</span>
                                        ) : (
                                            <div className="relative">
                                                <input 
                                                    type="number" 
                                                    value={override.percentDiscount || 0}
                                                    onChange={(e) => handleOverrideChange(sku, 'percentDiscount', Number(e.target.value))}
                                                    disabled={!isEditing}
                                                    className="w-full px-2 py-1.5 pr-6 text-sm rounded border border-slate-300 focus:border-blue-500 outline-none font-medium text-orange-600"
                                                />
                                                <span className="absolute right-2 top-1/2 -translate-y-1/2 text-xs font-bold text-slate-400">%</span>
                                            </div>
                                        )}
                                    </td>
                                    <td className="px-4 py-4">
                                        {isDefault ? (
                                            <span className="text-sm font-medium text-slate-400">{defaultStock}</span>
                                        ) : (
                                            <input 
                                                type="number" 
                                                value={override.stockQuantity || 0}
                                                onChange={(e) => handleOverrideChange(sku, 'stockQuantity', Number(e.target.value))}
                                                disabled={!isEditing}
                                                className="w-full px-2 py-1.5 text-sm rounded border border-slate-300 focus:border-blue-500 outline-none font-medium text-slate-800"
                                            />
                                        )}
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
