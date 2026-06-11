import React from 'react';

export const OrderDetailSkeleton: React.FC = () => {
    return (
        <div className="flex flex-col lg:flex-row gap-6 animate-pulse">
            <div className="flex-1 flex flex-col gap-6">
                {/* Header info */}
                <div className="bg-white rounded-2xl border border-slate-200 p-6">
                    <div className="w-32 h-6 bg-slate-200 rounded mb-4"></div>
                    <div className="w-48 h-4 bg-slate-200 rounded"></div>
                </div>

                {/* Timeline */}
                <div className="bg-white rounded-2xl border border-slate-200 p-6 h-75">
                    <div className="w-40 h-6 bg-slate-200 rounded mb-6"></div>
                    <div className="space-y-6">
                        <div className="w-3/4 h-4 bg-slate-200 rounded"></div>
                        <div className="w-1/2 h-4 bg-slate-200 rounded"></div>
                    </div>
                </div>

                {/* Products */}
                <div className="bg-white rounded-2xl border border-slate-200 p-6">
                    <div className="w-32 h-6 bg-slate-200 rounded mb-6"></div>
                    <div className="flex gap-4 mb-4">
                        <div className="w-20 h-20 bg-slate-200 rounded-xl"></div>
                        <div className="flex-1 space-y-3">
                            <div className="w-full h-4 bg-slate-200 rounded"></div>
                            <div className="w-1/2 h-4 bg-slate-200 rounded"></div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="w-full lg:w-90 flex flex-col gap-6">
                {/* Delivery */}
                <div className="bg-white rounded-2xl border border-slate-200 p-6 h-50">
                    <div className="w-40 h-6 bg-slate-200 rounded mb-6"></div>
                    <div className="space-y-4">
                        <div className="w-full h-4 bg-slate-200 rounded"></div>
                        <div className="w-3/4 h-4 bg-slate-200 rounded"></div>
                    </div>
                </div>

                {/* Summary */}
                <div className="bg-white rounded-2xl border border-slate-200 p-6 h-50">
                    <div className="w-32 h-6 bg-slate-200 rounded mb-6"></div>
                    <div className="space-y-4">
                        <div className="w-full h-4 bg-slate-200 rounded"></div>
                        <div className="w-full h-4 bg-slate-200 rounded"></div>
                    </div>
                </div>
            </div>
        </div>
    );
};
