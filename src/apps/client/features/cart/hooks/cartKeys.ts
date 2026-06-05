export const cartKeys = {
    all: ['cart'] as const,
    summary: () => [...cartKeys.all, 'summary'] as const,
    items: () => [...cartKeys.all, 'items'] as const,
};
