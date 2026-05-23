import { createContext, useContext, useState, useEffect, type ReactNode, useCallback } from "react";

export type ToastType = "success" | "error" | "warning" | "info";

interface ToastMessage {
    id: string;
    type: ToastType;
    message: string;
}

interface ToastContextType {
    toast: (message: string, type?: ToastType) => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export const useToast = () => {
    const context = useContext(ToastContext);
    if (!context) {
        throw new Error("useToast must be used within a ToastProvider");
    }
    return context;
};

const ToastItem = ({ type, message, onRemove }: ToastMessage & { onRemove: () => void }) => {
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

export const ToastProvider = ({ children }: { children: ReactNode }) => {
    const [toasts, setToasts] = useState<ToastMessage[]>([]);

    const addToast = useCallback((message: string, type: ToastType = "info") => {
        const id = Math.random().toString(36).substring(2, 9);
        setToasts((prev) => [...prev, { id, type, message }]);

        setTimeout(() => {
            setToasts((prev) => prev.filter((t) => t.id !== id));
        }, 3000);
    }, []);

    return (
        <ToastContext.Provider value={{ toast: addToast }}>
            {children}
            <div className="fixed top-6 left-1/2 -translate-x-1/2 z-9999 flex flex-col gap-3 pointer-events-none">
                {toasts.map((t) => (
                    <ToastItem key={t.id} {...t} onRemove={() => { }} />
                ))}
            </div>
        </ToastContext.Provider>
    );
};