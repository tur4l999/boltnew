/**
 * Verification Service
 * Handles email and SMS verification code sending
 */

export interface VerificationResponse {
  success: boolean;
  message: string;
  expiresIn?: number; // seconds
}

/**
 * Send verification email
 * @param email - User's email address
 * @returns Promise with verification response
 */
export async function sendEmailVerification(email: string): Promise<VerificationResponse> {
  // Simulate API call
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log(`[VERIFICATION] Email sent to: ${email}`);
      resolve({
        success: true,
        message: 'Təsdiqləmə kodu email-ə göndərildi',
        expiresIn: 600, // 10 minutes
      });
    }, 1000);
  });
}

/**
 * Send verification SMS
 * @param phone - User's phone number
 * @returns Promise with verification response
 */
export async function sendSMSVerification(phone: string): Promise<VerificationResponse> {
  // Simulate API call
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log(`[VERIFICATION] SMS sent to: ${phone}`);
      resolve({
        success: true,
        message: 'Təsdiqləmə kodu SMS ilə göndərildi',
        expiresIn: 300, // 5 minutes
      });
    }, 1000);
  });
}

/**
 * Verify email code
 * @param email - User's email address
 * @param code - Verification code
 * @returns Promise with verification result
 */
export async function verifyEmailCode(email: string, code: string): Promise<VerificationResponse> {
  // Simulate API call
  return new Promise((resolve) => {
    setTimeout(() => {
      // Demo: accept any 6-digit code
      const isValid = /^\d{6}$/.test(code);
      console.log(`[VERIFICATION] Email verification for ${email}: ${isValid ? 'SUCCESS' : 'FAILED'}`);
      
      resolve({
        success: isValid,
        message: isValid ? 'Email təsdiqləndi' : 'Yanlış təsdiqləmə kodu',
      });
    }, 1500);
  });
}

/**
 * Verify phone code
 * @param phone - User's phone number
 * @param code - Verification code
 * @returns Promise with verification result
 */
export async function verifySMSCode(phone: string, code: string): Promise<VerificationResponse> {
  // Simulate API call
  return new Promise((resolve) => {
    setTimeout(() => {
      // Demo: accept any 6-digit code
      const isValid = /^\d{6}$/.test(code);
      console.log(`[VERIFICATION] SMS verification for ${phone}: ${isValid ? 'SUCCESS' : 'FAILED'}`);
      
      resolve({
        success: isValid,
        message: isValid ? 'Telefon nömrəsi təsdiqləndi' : 'Yanlış təsdiqləmə kodu',
      });
    }, 1500);
  });
}

/**
 * Generate a random 6-digit verification code (for demo purposes)
 * In production, this would be done on the backend
 */
export function generateVerificationCode(): string {
  return Math.floor(100000 + Math.random() * 900000).toString();
}
