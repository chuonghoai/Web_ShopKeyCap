export const ProfileSkeleton = () => {
    return (
        <div className="space-y-6 animate-pulse">
            <div className="bg-white rounded-2xl border border-slate-200/60 p-6 sm:p-8 flex flex-col md:flex-row items-center md:items-start gap-6">
                <div className="w-24 h-24 md:w-28 md:h-28 rounded-full bg-slate-200 shrink-0"></div>
                <div className="flex-1 flex flex-col items-center md:items-start justify-center pt-2 space-y-3 w-full">
                    <div className="h-7 bg-slate-200 rounded-md w-48"></div>
                    <div className="h-5 bg-slate-200 rounded-md w-32"></div>
                </div>
                <div className="h-10 bg-slate-200 rounded-xl w-32 mt-4 md:mt-0"></div>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-white rounded-2xl border border-slate-200/60 p-6 sm:p-8">
                    <div className="h-6 bg-slate-200 rounded-md w-40 mb-8"></div>
                    <div className="space-y-6">
                        <div className="space-y-2"><div className="h-4 bg-slate-200 rounded-md w-20"></div><div className="h-5 bg-slate-200 rounded-md w-32"></div></div>
                        <div className="space-y-2"><div className="h-4 bg-slate-200 rounded-md w-20"></div><div className="h-5 bg-slate-200 rounded-md w-48"></div></div>
                        <div className="space-y-2"><div className="h-4 bg-slate-200 rounded-md w-24"></div><div className="h-5 bg-slate-200 rounded-md w-32"></div></div>
                    </div>
                </div>
                <div className="bg-white rounded-2xl border border-slate-200/60 p-6 sm:p-8">
                    <div className="h-6 bg-slate-200 rounded-md w-40 mb-8"></div>
                    <div className="grid grid-cols-2 gap-4">
                        <div className="h-32 bg-slate-200 rounded-xl"></div>
                        <div className="h-32 bg-slate-200 rounded-xl"></div>
                        <div className="h-32 bg-slate-200 rounded-xl col-span-2 sm:col-span-1"></div>
                    </div>
                </div>
            </div>
        </div>
    );
};
