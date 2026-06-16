export const productKeys = {
    all: ['admin-products'] as const,
    lists: () => [...productKeys.all, 'list'] as const,
    list: (params: { page: number; limit?: number; search?: string }) => [...productKeys.lists(), params] as const,
    details: () => [...productKeys.all, 'detail'] as const,
    detail: (id: number) => [...productKeys.details(), id] as const,
};
