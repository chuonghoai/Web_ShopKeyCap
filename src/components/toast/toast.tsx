import { useState, useEffect } from "react";
import { useToastStore } from "../../core/store/useToastStore";
import type { ToastMessage } from "../../core/store/useToastStore";

export type ToastType = "success" | "error" | "warning" | "info";

const ToastItem = ({ type, message }: ToastMessage & { onRemove: () => void }) => {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        requestAnimationFrame(() => setIsVisible(true));
        const hideTimer = setTimeout(() => setIsVisible(false), 5700);
        return () => clearTimeout(hideTimer);
    }, []);

    const styles = {
        success: "bg-[#0f172a]/90 text-blue-400 border-blue-500/50",
        error: "bg-[#0f172a]/90 text-red-400 border-red-500/50",
        warning: "bg-[#0f172a]/90 text-amber-400 border-amber-500/50",
        info: "bg-[#0f172a]/90 text-sky-400 border-sky-500/50",
    }[type];

    return (
        <div className={`pointer-events-auto flex items-center gap-3 min-w-[320px] p-4 rounded-xl border backdrop-blur-md shadow-[0_0_15px_rgba(0,0,0,0.3)] transition-all duration-300 ease-out transform ${styles} ${isVisible ? "translate-y-0 opacity-100" : "-translate-y-4 opacity-0"}`}>
            <div className="shrink-0">
                <span className="text-[18px]">●</span>
            </div>
            {/* {icons} */}
            <span className="text-[14px] font-semibold tracking-wide">
                {message}
            </span>
        </div>
    );
};

export const ToastContainer = () => {
    const toasts = useToastStore((state) => state.toasts);
    const removeToast = useToastStore((state) => state.removeToast);

    return (
        <div className="fixed top-6 left-1/2 -translate-x-1/2 z-9999 flex flex-col gap-3 pointer-events-none">
            {toasts.map((t) => (
                <ToastItem key={t.id} {...t} onRemove={() => removeToast(t.id)} />
            ))}
        </div>
    );
};