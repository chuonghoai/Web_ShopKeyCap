export const ROLE = {
    ADMIN: "ADMIN",
    STAFF: "STAFF",
    USER: "USER",
} as const;

export type ROLE = (typeof ROLE)[keyof typeof ROLE];