export const typeKeys = {
    all: ['types'] as const,
    lists: () => [...typeKeys.all, 'list'] as const,
};
