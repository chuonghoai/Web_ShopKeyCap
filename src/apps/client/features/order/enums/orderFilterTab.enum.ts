import { EOrderStatus } from "./orderStatus.enum";

export const EOrderFilterTab = {
    ALL: 'ALL',
    ...EOrderStatus
} as const;

export type EOrderFilterTab = typeof EOrderFilterTab[keyof typeof EOrderFilterTab];
