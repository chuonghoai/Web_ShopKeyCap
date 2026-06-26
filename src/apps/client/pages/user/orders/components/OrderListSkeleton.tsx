import React from 'react';

export const OrderListSkeleton: React.FC = () => {
    return (
        <div className="flex flex-col gap-4">
            {[1, 2, 3].map((i) => (
                <div key={i} className="bg-white rounded-2xl border border-slate-200 overflow-hidden animate-pulse">
                    <div className="px-5 py-4 border-b border-slate-100 flex justify-between">
                        <div className="flex gap-3">
                            <div className="w-24 h-6 bg-slate-200 rounded-lg"></div>
                            <div className="w-20 h-6 bg-slate-200 rounded-lg"></div>
                        </div>
                        <div className="w-32 h-6 bg-slate-200 rounded-lg"></div>
                    </div>
                    <div className="p-5 flex gap-4">
                        <div className="w-20 h-20 bg-slate-200 rounded-xl shrink-0"></div>
                        <div className="flex-1 py-1 space-y-3">
                            <div className="w-2/3 h-5 bg-slate-200 rounded"></div>
                            <div className="w-1/3 h-4 bg-slate-200 rounded"></div>
                            <div className="w-12 h-4 bg-slate-200 rounded"></div>
                        </div>
                    </div>
                    <div className="px-5 py-4 bg-slate-50 flex justify-between items-center">
                        <div className="w-24 h-8 bg-slate-200 rounded-lg"></div>
                        <div className="w-28 h-10 bg-slate-200 rounded-xl"></div>
                    </div>
                </div>
            ))}
        </div>
    );
};
