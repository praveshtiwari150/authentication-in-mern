import { VERIFICATION_EMAIL_TEMPLATE, PASSWORD_RESET_REQUEST_TEMPLATE, PASSWORD_RESET_SUCCESS_TEMPLATE } from "./emailTemplates.js";
import { mailtrapClient, sender } from "./mailtrap.config.js";

export const sendVerificationEmail = async (email, verificationToken) => {
    const recipient = [{ email }];

    try {
        const response = await mailtrapClient.send({
            from: sender,
            to: recipient,
            subject: "Verify your email.",
            html: VERIFICATION_EMAIL_TEMPLATE.replace("{verificationToken}", verificationToken),
            category: "Email Verification"
        });

        console.log("Email sent successfully", response);
    }

    catch (error) {
        console.error(`Error sending verification email: ${error}`);
        throw new Error(`Error sending verification email: ${error}`);
    }
}

export const sendWelcomeEmail = async (email, name) => {
    const recipient = [{ email }];

    try {
        const response = await mailtrapClient.send({
            from: sender,
            to: recipient,
            template_uuid: "f7980a46-c97f-42eb-93a1-7ab8a7abb4be",
            template_variables: {
                "company_info_name": "Auth Company",
                "name": name
            }
        });

        console.log("Welcome email sent successfully", response);
    }

    catch (error) {
        console.log('Error while sending welcome email: ', error);
        throw new Error(`Error sending welcome email: ${error}`);
    }
}

export const sendPasswordResetEmail = async (email, resetURL) => {
    const recipient = [{ email }];

    try {
        const response = await mailtrapClient.send({
            from: sender,
            to: recipient,
            subject: "Reset Your Password",
            html: PASSWORD_RESET_REQUEST_TEMPLATE.replace("{resetURL}", resetURL),
            category: "Password Reset"
        })

        console.log("Reset password email sent.")
    }

    catch (error) {
        console.log('Error while sending reset email: ', error);
        throw new Error(`Error sending reset email: ${error}`);
    }
}

export const sendResetSuccessEmail = async (email) => {
    const recipient = [{ email }];

    try {
        const response = await mailtrapClient.send({
            from: sender,
            to: recipient,
            subject: "Password Reset Successfull",
            html: PASSWORD_RESET_SUCCESS_TEMPLATE,
            category: "Password Reset"
        });

        console.log("Password reset email sent successfully: ", response);
    }

    catch (error) {
        console.log('Error while sending password reset email: ', error);
        throw new Error('Error while sending password reset email: ', error);
        
    }
}