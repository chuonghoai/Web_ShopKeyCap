import type { OtpPurpose } from "./otp.dto";

export interface ResetPasswordRequest {
    email: string;
    otp: string;
    otpPurpose: OtpPurpose;
    newPassword: string;
    confirmPassword: string;
}