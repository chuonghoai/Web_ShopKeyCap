import React from 'react';
import { type Control, type UseFormRegister, type UseFormSetValue } from 'react-hook-form';
import { Trash2, Plus, Check, X } from 'lucide-react';
import { useVariantPricingController, makeAttributeKey } from '../cpnControllers/VariantPricingTable.controller';

interface Props {
    control: Control<any>;
    register: UseFormRegister<any>;
    setValue: UseFormSetValue<any>;
    isEditing: boolean;
}

export const VariantPricingTable: React.FC<Props> = ({ control, setValue, isEditing }) => {
    const ctrl = useVariantPricingController(control, setValue);
    const { variants, generatedCombinations, validOptions } = ctrl;

    if (generatedCombinations.length === 0 && variants.length === 0) {
        return null;
    }

    return (
        <div className="mt-6 flex flex-col gap-3">

            {/* Variant Table */}
            {variants.length > 0 && (
                <div className="border border-slate-200 rounded-xl overflow-hidden bg-white shadow-sm">
                    <div className="bg-slate-50 px-5 py-3 border-b border-slate-200 flex justify-between items-center">
                        <h3 className="text-sm font-bold text-slate-800 uppercase tracking-wider">
                            Cấu hình từng phân loại
                        </h3>
                        <span className="text-xs text-slate-500 font-medium">
                            {variants.length} phân loại
                        </span>
                    </div>

                    <div className="overflow-x-auto w-full">
                        <table className="w-full text-left border-collapse min-w-225">
                            <thead>
                                <tr className="bg-slate-50/50 text-xs text-slate-500 uppercase tracking-wider border-b border-slate-200">
                                    <th className="px-4 py-3 font-bold w-[15%]">SKU</th>
                                    <th className="px-4 py-3 font-bold w-[20%]">Thuộc tính</th>
                                    <th className="px-4 py-3 font-bold w-[15%] min-w-32.5">Giá bán</th>
                                    <th className="px-4 py-3 font-bold w-[15%] min-w-32.5">Giá gốc</th>
                                    <th className="px-4 py-3 font-bold w-[10%] min-w-32.5">% Giảm</th>
                                    <th className="px-4 py-3 font-bold w-[15%] min-w-17.5">Tồn kho</th>
                                    {isEditing && (
                                        <th className="px-4 py-3 font-bold w-[10%] text-center">
                                            Thao tác
                                        </th>
                                    )}
                                </tr>
                            </thead>

                            <tbody className="divide-y divide-slate-100">
                                {variants.map((variant, idx) => {
                                    const attributesLabel = Object.values(variant.attributes || {}).join(' - ');
                                    const rowKey = makeAttributeKey(variant.attributes || {}) || String(idx);

                                    return (
                                        <tr
                                            key={rowKey}
                                            className="hover:bg-slate-50/50 transition-colors"
                                        >
                                            {/* SKU */}
                                            <td className="px-4 py-4">
                                                <input
                                                    type="text"
                                                    value={variant.sku || ''}
                                                    onChange={(e) =>
                                                        ctrl.handleVariantFieldChange(idx, 'sku', e.target.value)
                                                    }
                                                    disabled={!isEditing}
                                                    className="text-xs font-mono font-bold text-slate-700 bg-slate-100 px-2 py-1.5 rounded w-full outline-none focus:ring-1 focus:ring-blue-400 border border-transparent focus:border-blue-400 disabled:bg-transparent disabled:border-transparent"
                                                />
                                            </td>

                                            {/* Attributes Label */}
                                            <td className="px-4 py-4 text-sm font-medium text-slate-800">
                                                {attributesLabel}
                                            </td>

                                            {/* Giá bán */}
                                            <td className="px-4 py-4">
                                                <input
                                                    type="text"
                                                    value={
                                                        variant.price
                                                            ? Number(variant.price).toLocaleString('vi-VN')
                                                            : ''
                                                    }
                                                    onChange={(e) => {
                                                        const raw = e.target.value.replace(/\./g, '').replace(/,/g, '');
                                                        ctrl.handleVariantPriceSync(idx, 'price', Number(raw) || 0);
                                                    }}
                                                    disabled={!isEditing}
                                                    placeholder="0"
                                                    className="w-full px-3 py-1.5 text-sm rounded border border-slate-300 focus:border-blue-500 outline-none font-bold text-blue-600 disabled:bg-transparent disabled:border-transparent"
                                                />
                                            </td>

                                            {/* Giá gốc */}
                                            <td className="px-4 py-4">
                                                <input
                                                    type="text"
                                                    value={
                                                        variant.originalPrice
                                                            ? Number(variant.originalPrice).toLocaleString('vi-VN')
                                                            : ''
                                                    }
                                                    onChange={(e) => {
                                                        const raw = e.target.value.replace(/\./g, '').replace(/,/g, '');
                                                        ctrl.handleVariantPriceSync(idx, 'originalPrice', Number(raw) || 0);
                                                    }}
                                                    disabled={!isEditing}
                                                    placeholder="0"
                                                    className="w-full px-3 py-1.5 text-sm rounded border border-slate-300 focus:border-blue-500 outline-none font-bold text-slate-600 disabled:bg-transparent disabled:border-transparent"
                                                />
                                            </td>

                                            {/* % Giảm */}
                                            <td className="px-4 py-4">
                                                <div className="relative">
                                                    <input
                                                        type="number"
                                                        value={variant.percentDiscount || 0}
                                                        onChange={(e) =>
                                                            ctrl.handleVariantPriceSync(
                                                                idx,
                                                                'percentDiscount',
                                                                Number(e.target.value) || 0
                                                            )
                                                        }
                                                        disabled={!isEditing}
                                                        className="w-full px-3 py-1.5 pr-6 text-sm rounded border border-slate-300 focus:border-blue-500 outline-none font-bold text-orange-600 disabled:bg-transparent disabled:border-transparent"
                                                    />
                                                    {isEditing && (
                                                        <span className="absolute right-2 top-1/2 -translate-y-1/2 text-xs font-bold text-slate-400">
                                                            %
                                                        </span>
                                                    )}
                                                </div>
                                            </td>

                                            {/* Tồn kho */}
                                            <td className="px-4 py-4">
                                                <input
                                                    type="number"
                                                    value={variant.stockQuantity || 0}
                                                    onChange={(e) =>
                                                        ctrl.handleVariantFieldChange(
                                                            idx,
                                                            'stockQuantity',
                                                            Number(e.target.value)
                                                        )
                                                    }
                                                    disabled={!isEditing}
                                                    placeholder="0"
                                                    className="w-full px-3 py-1.5 text-sm rounded border border-slate-300 focus:border-blue-500 outline-none font-medium text-slate-800 disabled:bg-transparent disabled:border-transparent"
                                                />
                                            </td>

                                            {/* Thao tác */}
                                            {isEditing && (
                                                <td className="px-4 py-4 text-center">
                                                    <button
                                                        type="button"
                                                        onClick={() => ctrl.handleDeleteVariant(idx)}
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
            )}

            {/* Add Variant Section */}
            {isEditing && generatedCombinations.length > 0 && (
                <div>
                    {!ctrl.addPanelOpen ? (
                        /* Nút mở panel */
                        <button
                            type="button"
                            onClick={ctrl.handleOpenAddPanel}
                            disabled={ctrl.allCombinationsFilled()}
                            className="w-full flex items-center justify-center gap-2 py-2.5 px-4 border-2 border-dashed border-slate-300 rounded-xl text-sm font-bold text-slate-500 hover:border-blue-400 hover:text-blue-600 hover:bg-blue-50/50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:border-slate-300 disabled:hover:text-slate-500 disabled:hover:bg-transparent"
                            title={
                                ctrl.allCombinationsFilled()
                                    ? 'Tất cả tổ hợp đã được tạo đủ'
                                    : 'Thêm biến thể thủ công'
                            }
                        >
                            <Plus className="w-4 h-4" />
                            {ctrl.allCombinationsFilled()
                                ? 'Đã đủ tất cả phân loại'
                                : 'Thêm Variant'}
                        </button>
                    ) : (
                        /* Add Variant Panel */
                        <div className="border border-blue-200 rounded-xl bg-blue-50/20 p-5 shadow-sm">
                            {/* Panel Header */}
                            <div className="flex items-center justify-between mb-4">
                                <h4 className="text-sm font-bold text-slate-700 flex items-center gap-2">
                                    <Plus className="w-4 h-4 text-blue-500" />
                                    Thêm Variant mới
                                </h4>
                                <button
                                    type="button"
                                    onClick={ctrl.handleCloseAddPanel}
                                    className="p-1 text-slate-400 hover:text-slate-600 rounded transition-colors"
                                    title="Đóng"
                                >
                                    <X className="w-4 h-4" />
                                </button>
                            </div>

                            {/* Option Dropdowns */}
                            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 mb-4">
                                {validOptions.map((option) => (
                                    <div key={option.name} className="space-y-1.5">
                                        <label className="block text-xs font-bold text-slate-600">
                                            {option.name}
                                        </label>
                                        <select
                                            value={ctrl.partialSelection[option.name] || ''}
                                            onChange={(e) =>
                                                ctrl.handlePartialSelect(option.name, e.target.value)
                                            }
                                            className="w-full px-3 py-2 text-sm rounded-md border border-slate-300 outline-none focus:border-blue-500 bg-white text-slate-800 font-medium"
                                        >
                                            <option value="">Chọn {option.name}...</option>
                                            {option.values.map((value) => {
                                                const available = ctrl.checkOptionValueAvailable(
                                                    option.name,
                                                    value
                                                );
                                                return (
                                                    <option
                                                        key={value}
                                                        value={value}
                                                        disabled={!available}
                                                    >
                                                        {value}
                                                        {!available ? ' (đã có)' : ''}
                                                    </option>
                                                );
                                            })}
                                        </select>
                                    </div>
                                ))}
                            </div>

                            {/* Duplicate warning */}
                            {ctrl.isSelectionDuplicate() && (
                                <p className="text-xs text-red-500 font-medium mb-3 flex items-center gap-1">
                                    <X className="w-3.5 h-3.5 shrink-0" />
                                    Tổ hợp này đã tồn tại trong bảng.
                                </p>
                            )}

                            {/* Panel Actions */}
                            <div className="flex gap-2 justify-end">
                                <button
                                    type="button"
                                    onClick={ctrl.handleCloseAddPanel}
                                    className="px-4 py-2 text-sm font-bold text-slate-600 bg-white border border-slate-300 rounded-lg hover:bg-slate-50 transition-colors"
                                >
                                    Hủy
                                </button>
                                <button
                                    type="button"
                                    onClick={ctrl.handleConfirmAddVariant}
                                    disabled={!ctrl.isAddPanelReady() || ctrl.isSelectionDuplicate()}
                                    className="px-4 py-2 text-sm font-bold text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-1.5"
                                >
                                    <Check className="w-4 h-4" />
                                    Thêm vào bảng
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};
