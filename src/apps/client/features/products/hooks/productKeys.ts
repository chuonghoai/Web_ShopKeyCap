export const productKeys = {
    all: ['products'] as const,
    lists: () => [...productKeys.all, 'list'] as const,
    list: (page: number, filters: any) => [...productKeys.lists(), page, { filters }] as const,
    details: () => [...productKeys.all, 'detail'] as const,
    detail: (id: number) => [...productKeys.details(), id] as const,
    related: (ids: number[]) => [...productKeys.all, 'related', ids] as const,
    homepageSections: () => [...productKeys.all, 'homepage-sections'] as const,
    filters: () => [...productKeys.all, 'filters'] as const,
};
