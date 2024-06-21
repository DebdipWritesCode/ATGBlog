exports.createResetPasswordEmail = (name, _id) => {
    return `
        <html>
        <head>
            <style>
                body {
                    font-family: Arial, sans-serif;
                    background-color: #f7f7f7;
                    margin: 0;
                    padding: 0;
                }
                .container {
                    max-width: 600px;
                    margin: 0 auto;
                    background-color: #ffffff;
                    padding: 20px;
                    border-radius: 8px;
                    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
                }
                h1 {
                    color: #333333;
                }
                p {
                    color: #555555;
                }
                a {
                    color: #2F6CE5;
                    text-decoration: none;
                }
                .button {
                    display: inline-block;
                    padding: 10px 20px;
                    margin-top: 20px;
                    font-size: 16px;
                    color: #ffffff;
                    background-color: yellow;
                    border-radius: 5px;
                    text-decoration: none;
                }
            </style>
        </head>
        <body>
            <div class="container">
                <h1>Password Reset Request</h1>
                <p>Hello ${name},</p>
                <p>We received a request to reset your password. Please click the link below to set a new password:</p>
                <p><a href="https://atg-blog-djh3.vercel.app/reset-password/${_id}" class="button">Reset Password</a></p>
                <p>If you did not request a password reset, please ignore this email.</p>
                <p>Thank you,<br>Your Company Team</p>
            </div>
        </body>
        </html>
    `;
};
