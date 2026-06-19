export const staffKeys = {
    all: ['admin-staffs'] as const,
    lists: () => [...staffKeys.all, 'list'] as const,
    list: (params: { page: number; limit?: number; search?: string }) => [...staffKeys.lists(), params] as const,
    details: () => [...staffKeys.all, 'detail'] as const,
    detail: (id: number) => [...staffKeys.details(), id] as const,
};
