export const generateSlug = (text: string): string => {
    return text
        .toString()
        .toLowerCase()
        .normalize('NFD') // Tách dấu ra khỏi ký tự
        .replace(/[\u0300-\u036f]/g, '') // Loại bỏ dấu
        .replace(/[đĐ]/g, 'd') // Chuyển đ thành d
        .replace(/[^a-z0-9\s-]/g, '') // Bỏ ký tự đặc biệt
        .trim()
        .replace(/\s+/g, '-') // Thay khoảng trắng bằng gạch ngang
        .replace(/-+/g, '-'); // Tránh các gạch ngang liên tiếp
};
