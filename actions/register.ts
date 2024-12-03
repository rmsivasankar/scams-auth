"use server";

import { db } from "@/lib/db";
import bcrypt from "bcrypt";
import * as z from "zod";
import { RegisterSchema } from "@/schemas";
import { getUserByEmail } from "@/data/user";
import { generateVerificationToken } from "@/lib/tokens";
import { sendVerificationEmail } from "@/lib/mail";

export const register = async (values: z.infer<typeof RegisterSchema>) => {
    const validateFields = RegisterSchema.safeParse(values);

    if(!validateFields.success) {
        return {error: "Invalid Fields!"};
    }

    const { email, password, name } = validateFields.data;
    const hashedPassword = await bcrypt.hash(password, 10);

    const existingUser = await getUserByEmail(email);

    if (existingUser) {
        return { error: "Email already in use! "}
    }

    await db.user.create( {
        data: {
            name,
            email,
            password: hashedPassword,
        }
    });

    const verificationToken = await generateVerificationToken(email);
    await sendVerificationEmail(
        verificationToken.email,
        verificationToken.token,
    )
    // Send Verification Token Email

    return {success: "Confirmation Email Sent"};
};
