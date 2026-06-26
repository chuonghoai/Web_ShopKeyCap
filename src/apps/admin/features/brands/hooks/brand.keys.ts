export const brandKeys = {
    all: ['brands'] as const,
    lists: () => [...brandKeys.all, 'list'] as const,
};
