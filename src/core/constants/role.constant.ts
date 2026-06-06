export const ROLE = {
    ADMIN: "admin",
    STAFF: "staff",
    USER: "user",
} as const;

export type ROLE = (typeof ROLE)[keyof typeof ROLE];