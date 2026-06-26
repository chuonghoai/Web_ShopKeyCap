import React from 'react';
import type { OrderStatusHistoryModel } from '../../../../features/order/models/order.model';
import { useOrderTimelineViewModel } from '../cpnController/orderTimeline.viewmodel';

interface OrderTimelineProps {
    history: OrderStatusHistoryModel[];
}

export const OrderTimeline: React.FC<OrderTimelineProps> = ({ history }) => {
    const { timelineItems } = useOrderTimelineViewModel(history);

    if (timelineItems.length === 0) return null;

    return (
        <div className="bg-white rounded-2xl border border-slate-200 p-6">
            <h3 className="text-base font-bold text-slate-900 mb-6 flex items-center gap-2">
                <span className="material-icons-outlined text-slate-400">timeline</span>
                Lịch sử đơn hàng
            </h3>

            <div className="relative pl-3">
                <div className="absolute left-4.75 top-4 bottom-4 w-0.5 bg-slate-100"></div>

                <div className="flex flex-col gap-8">
                    {timelineItems.map((h) => {
                        return (
                            <div key={h.id} className="relative flex gap-5">
                                <div className={`relative z-10 w-4 h-4 rounded-full border-4 border-white shadow-sm mt-1 shrink-0 ${h.isLast ? 'bg-blue-600' : 'bg-slate-300'
                                    }`}></div>

                                <div className="flex-1 min-w-0">
                                    <div className="flex items-center gap-2">
                                        <h4 className={`text-sm font-medium ${h.isLast ? 'text-slate-900' : 'text-slate-600'}`}>
                                            {h.statusInfo.label}
                                        </h4>
                                    </div>
                                    <div className="mt-1 text-xs text-slate-500 flex items-center gap-1.5">
                                        <span className="material-icons-outlined text-[14px]">schedule</span>
                                        {h.formattedDate}
                                    </div>
                                    {h.note && (
                                        <div className="mt-2 p-3 bg-slate-50 rounded-xl border border-slate-100 text-sm text-slate-700 italic">
                                            "{h.note}"
                                        </div>
                                    )}
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};
