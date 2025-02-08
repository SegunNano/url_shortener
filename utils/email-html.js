const verifyEmail = (token, tokenExpires) => {
    return `<!DOCTYPE html>
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
                            style="background-color: #272523; padding: 20px 40px; text-align: center; color: #f9fafa; font-size: 24px; font-weight: bold;">
                            Verify Your Email
                        </td>
                    </tr>
                    <!-- Body -->
                    <tr>
                        <td style="padding: 30px 40px;">
                            <p style="font-size: 18px; margin-bottom: 20px; line-height: 1.5;">
                                Hello,
                            </p>
                            <p style="font-size: 16px; margin-bottom: 20px; line-height: 1.5;">
                                Thank you for signing up! Please use the 5-digit verification code below to verify your
                                email address:
                            </p>
                            <p
                                style="font-size: 36px; font-weight: bold; text-align: center; color: #272523; margin: 30px 0;">
                             ${token}
                            </p>
                            <p style="font-size: 14px; color: #555; text-align: center; line-height: 1.5;">
                                This code will expire in ${tokenExpires} minutes. If you didn’t request this email, please ignore
                                it.
                            </p>
                        </td>
                    </tr>
                    <!-- Footer -->
                    <tr>
                        <td
                            style="background-color: #f9fafa; padding: 20px 40px; text-align: center; font-size: 12px; color: #777;">
                            <p>Need help? Contact our support team at <a href="mailto:segunfadipe@gmail.com"
                                    style="color: #272523; text-decoration: none;">support@nano_url.com</a>.</p>
                            <p style="margin: 0;">&copy; 2025 Your Company Name. All rights reserved.</p>
                        </td>
                    </tr>
                </table>
            </td>
        </tr>
    </table>
</body>

</html>`;
};

const generateVerificationEmail = (updatedUser) => {
    const { username, verifyEmailToken, verifyEmailTokenExpiration } = updatedUser;
    const digits = verifyEmailToken.split('').map(digit => `<span style="display: inline-block; background-color: #f9fafa; color: #272523; font-size: 36px; font-weight: bold; padding: 15px 20px; border: 2px solid #272523; border-radius: 8px;">${digit}</span>`).join('');
    return `
    < !DOCTYPE html >
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
                        <table width="600px" cellpadding="0" cellspacing="0" style="background-color: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 2px 6px rgba(0,0,0,0.15);">
                            <!-- Header -->
                            <tr>
                                <td style="background-color: #272523; padding: 20px 40px; text-align: center; color: #f9fafa; font-size: 24px; font-weight: bold;">
                                    Nano-URL - Verify Your Email
                                </td>
                            </tr>
                            <!-- Body -->
                            <tr>
                                <td style="padding: 30px 40px;">
                                    <p style="font-size: 18px; margin-bottom: 20px; line-height: 1.5;">
                                        Hello ${username},
                                    </p>
                                    <p style="font-size: 16px; margin-bottom: 20px; line-height: 1.5;">
                                        Thank you for signing up for Nano-URL! Please use the 5-digit verification code below to verify your email address:
                                    </p>
                                    <!-- Verification Code -->
                                    <div style="display: flex; justify-content: center; gap: 10px; margin: 30px 0;">
                                       ${digits}
                                    </div>
                                    <p style="font-size: 14px; color: #555; text-align: center; line-height: 1.5;">
                                        This code will expire in ${verifyEmailTokenExpiration}. 
                                        </p>
                                        <p>If you didn’t request this email, please ignore it.
                                    </p>
                                </td>
                            </tr>
                            <!-- Footer -->
                            <tr>
                                <td style="background-color: #f9fafa; padding: 20px 40px; text-align: center; font-size: 12px; color: #777;">
                                    <p>Need help? Contact our support team at <a href="mailto:segunfadipe@gmail.com" style="color: #272523; text-decoration: none;">support@nano-url.com</a>.</p>
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

export { verifyEmail, generateVerificationEmail };