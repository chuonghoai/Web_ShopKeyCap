export const ERole = {
    ADMIN: "admin",
    STAFF: "staff",
    USER: "user",
} as const;

export type ERole = (typeof ERole)[keyof typeof ERole];
