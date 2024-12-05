import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export const sendTwoFactorEmail = async (
    email: string,
    token: string
) => {

    await resend.emails.send({
        from: "send@panimalar.in",
        to: email,
        subject: "2FA Code",
        html: `<p> Your 2FA Code ${token}</p>`
    });
};


export const sendVerificationEmail = async (
    email: string,
    token: string
) => {
    const confirmLink = `http://localhost:3000/auth/new-verification?token=${token}`;

    await resend.emails.send({
        from: "send@panimalar.in",
        to: email,
        subject: "Confirm your email",
        html: `<p> <a href="${confirmLink}">here</a> to confirm email.</p>`
    });
};

export const sendResetEmail = async (
    email: string,
    token: string
) => {
    const resetLink = `http://localhost:3000/auth/new-password?token=${token}`;

    await resend.emails.send({
        from: "send@panimalar.in",
        to: email,
        subject: "Reset your Password",
        html: `<p> <a href="${resetLink}">here</a> to reset password.</p>`
    });
};