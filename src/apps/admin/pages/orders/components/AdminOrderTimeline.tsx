import React from 'react';
import type { OrderStatusHistoryModel } from '../../../features/orders/models/order.model';
import { useAdminOrderTimelineViewModel } from '../cpnControllers/adminOrderTimeline.viewmodel';
import { EOrderStatus } from '../../../../client/features/order/enums/orderStatus.enum';

const ORDER_STEPS = [
    { status: EOrderStatus.PENDING, label: 'Chờ xử lý', icon: 'pending_actions' },
    { status: EOrderStatus.PREPARING, label: 'Đang chuẩn bị', icon: 'inventory' },
    { status: EOrderStatus.SHIPPING, label: 'Đang giao', icon: 'local_shipping' },
    { status: EOrderStatus.SUCCESS, label: 'Đã giao', icon: 'check_circle' },
];

interface AdminOrderTimelineProps {
    history: OrderStatusHistoryModel[];
}

export const AdminOrderTimeline: React.FC<AdminOrderTimelineProps> = ({ history }) => {
    const { sortedHistory } = useAdminOrderTimelineViewModel(history);

    const isCancelled = sortedHistory.some(h => h.toStatus === EOrderStatus.CANCELLED);
    
    let currentStepIndex = -1;
    if (!isCancelled) {
        for (let i = ORDER_STEPS.length - 1; i >= 0; i--) {
            if (sortedHistory.some(h => h.toStatus === ORDER_STEPS[i].status)) {
                currentStepIndex = i;
                break;
            }
        }
    }

    return (
        <div className="bg-white rounded-2xl border border-slate-200 p-6 overflow-x-auto no-scrollbar">
            <h3 className="text-base font-bold text-slate-900 mb-6 flex items-center gap-2">
                <span className="material-icons-outlined text-slate-400">timeline</span>
                Tiến trình đơn hàng
            </h3>

            {isCancelled ? (
                <div className="flex items-center gap-4 p-4 bg-red-50 text-red-600 rounded-xl border border-red-100">
                    <span className="material-icons-outlined text-[24px]">cancel</span>
                    <div>
                        <h4 className="font-bold">Đơn hàng đã bị hủy</h4>
                        <p className="text-sm text-red-500 mt-1">
                            {sortedHistory.find(h => h.toStatus === EOrderStatus.CANCELLED)?.note || 'Không có lý do'}
                        </p>
                    </div>
                </div>
            ) : (
                <div className="relative min-w-150">
                    <div className="flex justify-between">
                        {ORDER_STEPS.map((step, index) => {
                            const isCompleted = index <= currentStepIndex;
                            const isCurrent = index === currentStepIndex;
                            
                            const historyItem = sortedHistory.find(h => h.toStatus === step.status);
                            
                            return (
                                <div key={step.status} className="flex flex-col items-center relative z-10 flex-1">
                                    <div className={`w-10 h-10 rounded-full flex items-center justify-center border-2 mb-3 bg-white transition-colors duration-300 ${
                                        isCurrent ? 'border-blue-600 text-blue-600 ring-4 ring-blue-50' : 
                                        isCompleted ? 'border-blue-600 bg-blue-600 text-white' : 
                                        'border-slate-200 text-slate-300'
                                    }`}>
                                        <span className="material-icons-outlined text-[20px]">{step.icon}</span>
                                    </div>
                                    <h4 className={`text-sm font-bold text-center ${
                                        isCurrent ? 'text-blue-600' :
                                        isCompleted ? 'text-slate-900' :
                                        'text-slate-400'
                                    }`}>{step.label}</h4>
                                    
                                    {isCompleted && historyItem && (
                                        <div className="text-xs text-slate-500 text-center mt-1 w-full max-w-30">
                                            {new Date(historyItem.createdAt).toLocaleDateString('vi-VN', { day: '2-digit', month: '2-digit', year: 'numeric' })}
                                            <br />
                                            {new Date(historyItem.createdAt).toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' })}
                                        </div>
                                    )}

                                    {/* Connecting Line */}
                                    {index < ORDER_STEPS.length - 1 && (
                                        <div className={`absolute top-5 left-[50%] w-full h-0.5 -z-10 transition-colors duration-300 ${
                                            index < currentStepIndex ? 'bg-blue-600' : 'bg-slate-100'
                                        }`} />
                                    )}
                                </div>
                            );
                        })}
                    </div>
                </div>
            )}
        </div>
    );
};
