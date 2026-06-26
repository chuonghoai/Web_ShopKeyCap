import { useEffect } from "react";

const DEFAULT_TITLE = "Cyber Key - Mạnh mẽ, thanh lịch, đẳng cấp";

export const useDocumentTitle = (title?: string) => {
    useEffect(() => {
        document.title = title || DEFAULT_TITLE;
        return () => {
            document.title = DEFAULT_TITLE;
        };
    }, [title]);
};