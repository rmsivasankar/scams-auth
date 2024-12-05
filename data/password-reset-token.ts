import { db } from "@/lib/db";

export const getPasswordResetToken = async (token: String) => {
    try {
        const passwordResetToken = await db.passwordResetToken.findUnique({
            where: { token }
        });
    return passwordResetToken;
    }
    catch {
        return null;
    }
}

export const getPasswordResetTokenByEmail = async (email: String) => {
    try {
        const passwordResetToken = await db.passwordResetToken.findFirst({
            where: { email }
        });
    return passwordResetToken;
    }
    catch {
        return null;
    }
}