import type { OtpPurpose } from "./otp.dto";

export interface RegisterRequest {
    email: string;
    otp: string;
    otpPurpose: OtpPurpose;
    password: string;
    confirmPassword: string;
}