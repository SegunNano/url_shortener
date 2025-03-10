import { urlSuffixer } from "./utils.js";

const resetPassword = (updatedUser, req) => {
    const { username, resetPasswordToken, resetPasswordTokenExpiration } = updatedUser;
    return `
    <html>
<head>
    <style>
        @import url('https://fonts.googleapis.com/css2?family=Cormorant:wght@400;700&display=swap');
    </style>
</head>
<body style="margin: 0; padding: 0; font-family: 'Cormorant', serif; background-color: #f9fafa; color: #272523;">
    <table width="100%" cellpadding="0" cellspacing="0" style="margin: 0; padding: 20px; background-color: #f9fafa;">
        <tr>
            <td align="center">
                <table width="600px" cellpadding="0" cellspacing="0"
                    style="background-color: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 2px 6px rgba(0,0,0,0.15);">
                    <!-- Header -->
                    <tr>
                        <td
                            style="background-color: #272523; padding: 20px 40px; text-align: center; color: #f9fafa; font-size: 18px; font-weight: bold;">
                            Nano-URL - Reset Your Password
                        </td>
                    </tr>
                    <!-- Body -->
                    <tr>
                        <td style="padding: 30px 40px;">
                            <p style="font-size: 14px; margin-bottom: 20px; line-height: 1.5;">
                                Hello ${username},
                            </p>
                            <p style="font-size: 14px; margin-bottom: 20px; line-height: 1.5;">
                                We received a request to reset your password. Please click the button below to reset your password:
                            </p>
                            <!-- Reset Password Button -->
                            <div style="text-align: center; margin: 30px 0;">
                                <a href=${urlSuffixer(req)}auth/reset-password/${resetPasswordToken} style="display: inline-block; padding: 10px 20px; font-size: 16px; font-weight: bold; color: #f9fafa; background-color: #272523; text-decoration: none; border-radius: 8px;">
                                    Reset Password
                                </a>
                            </div>
                            <div style="font-size: 14px; color: #555; text-align: center; line-height: 1.5;">
                                <p>This link will expire in ${resetPasswordTokenExpiration}.</p>
                                <p>If you didn’t request this email, please ignore it.</p>
                            </div>
                        </td>
                    </tr>
                    <!-- Footer -->
                    <tr>
                        <td
                            style="background-color: #f9fafa; padding: 20px 40px; text-align: center; font-size: 12px; color: #777;">
                            <p>Need help? Contact our support team at <a href="mailto:oluuseguun@gmail.com" style="color: #272523; text-decoration: none;">support@nano-url.com</a>.</p>
                            <p style="margin: 0;">&copy; 2025 Nano-URL. All rights reserved.</p>
                        </td>
                    </tr>
                </table>
            </td>
        </tr>
    </table>
</body>
</html>
`;
};

const welcomeEmail = updatedUser => {
    const { username } = updatedUser;
    return `
<html>
<head>
    <style>
        @import url('https://fonts.googleapis.com/css2?family=Cormorant:wght@400;700&display=swap');
    </style>
</head>
<body style="margin: 0; padding: 0; font-family: 'Cormorant', serif; background-color: #f9fafa; color: #272523;">
    <table width="100%" cellpadding="0" cellspacing="0" style="margin: 0; padding: 20px; background-color: #f9fafa;">
        <tr>
            <td align="center">
                <table width="600px" cellpadding="0" cellspacing="0"
                    style="background-color: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 2px 6px rgba(0,0,0,0.15);">
                    <!-- Header -->
                    <tr>
                        <td
                            style="background-color: #272523; padding: 20px 40px; text-align: center; color: #f9fafa; font-size: 18px; font-weight: bold;">
                            Welcome to Nano-URL!
                        </td>
                    </tr>
                    <!-- Body -->
                    <tr>
                        <td style="padding: 30px 40px;">
                            <p style="font-size: 14px; margin-bottom: 20px; line-height: 1.5;">
                                Hello ${username},
                            </p>
                            <p style="font-size: 14px; margin-bottom: 20px; line-height: 1.5;">
                                We’re thrilled to have you on board! Your email address has been successfully verified, and you’re now ready to unlock the full potential of Nano-URL.
                            </p>
                            <p style="font-size: 14px; margin-bottom: 20px; line-height: 1.5;">
                                Feel free to explore our platform and take advantage of all the amazing features we’ve designed to help you simplify your URL management. If you ever need assistance, our support team is here to help.
                            </p>
                            <p style="font-size: 14px; color: #555; text-align: center; line-height: 1.5;">
                                Thank you for choosing Nano-URL!
                            </p>
                        </td>
                    </tr>
                    <!-- Footer -->
                    <tr>
                        <td
                            style="background-color: #f9fafa; padding: 20px 40px; text-align: center; font-size: 12px; color: #777;">
                            <p>Need help? Contact our support team at <a href="mailto:oluuseguun@gmail.com"
                                    style="color: #272523; text-decoration: none;">support@nano-url.com</a>.</p>
                            <p style="margin: 0;">&copy; 2025 Nano-URL. All rights reserved.</p>
                        </td>
                    </tr>
                </table>
            </td>
        </tr>
    </table>
</body>
</html>

    `;
};
const generateVerificationEmail = updatedUser => {
    const { username, verifyEmailToken, verifyEmailTokenExpiration } = updatedUser;
    return `
<html>
<head>
    <style>
        @import url('https://fonts.googleapis.com/css2?family=Cormorant:wght@400;700&display=swap');
    </style>
</head>
<body style="margin: 0; padding: 0; font-family: 'Cormorant', serif; background-color: #f9fafa; color: #272523;">
    <table width="100%" cellpadding="0" cellspacing="0" style="margin: 0; padding: 20px; background-color: #f9fafa;">
        <tr>
            <td align="center">
                <table width="600px" cellpadding="0" cellspacing="0"
                    style="background-color: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 2px 6px rgba(0,0,0,0.15);">
                    <!-- Header -->
                    <tr>
                        <td
                            style="background-color: #272523; padding: 20px 40px; text-align: center; color: #f9fafa; font-size: 18px; font-weight: bold;">
                            Nano-URL - Verify Your Email
                        </td>
                    </tr>
                    <!-- Body -->
                    <tr>
                        <td style="padding: 30px 40px;">
                            <p style="font-size: 14px; margin-bottom: 20px; line-height: 1.5;">
                                Hello ${username},
                            </p>
                            <p style="font-size: 14px; margin-bottom: 20px; line-height: 1.5;">
                                Thank you for signing up for Nano-URL! Please use the 5-digit verification code below to
                                verify your email address:
                            </p>
                            <!-- Verification Code -->
                            <p
                                style="font-size: 36px; font-weight: bold; text-align: center; color: #272523; margin: 30px 0;">
                                ${verifyEmailToken}
                            </p>
                            <div style="font-size: 14px; color: #555; text-align: center; line-height: 1.5;">
                                <p>This code will expire in ${verifyEmailTokenExpiration}. </p>
                                <p>If you didn’t request this email, please ignore it.</p>
                            </div>
                        </td>
                    </tr>
                    <!-- Footer -->
                    <tr>
                        <td
                            style="background-color: #f9fafa; padding: 20px 40px; text-align: center; font-size: 12px; color: #777;">
                            <p>Need help? Contact our support team at <a href="mailto:oluuseguun@gmail.com"
                                    style="color: #272523; text-decoration: none;">support@nano-url.com</a>.</p>
                            <p style="margin: 0;">&copy; 2025 Nano-URL. All rights reserved.</p>
                        </td>
                    </tr>
                </table>
            </td>
        </tr>
    </table>
</body>
</html >
`;
};



export { resetPassword, generateVerificationEmail, welcomeEmail };