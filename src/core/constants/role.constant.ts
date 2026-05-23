export const ROLE = {
    ADMIN: "ADMIN",
    STAFF: "STAFF",
    CLIENT: "CLIENT",
} as const;

export type ROLE = (typeof ROLE)[keyof typeof ROLE];