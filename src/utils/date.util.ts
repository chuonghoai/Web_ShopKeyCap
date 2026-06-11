export const formatDateTime = (dateStr: string | Date): string => {
    return new Date(dateStr).toLocaleString('vi-VN');
};

export const formatDate = (dateStr: string | Date): string => {
    return new Date(dateStr).toLocaleDateString('vi-VN');
};
