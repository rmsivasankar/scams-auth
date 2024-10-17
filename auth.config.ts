import GitHub from "next-auth/providers/github"
import bcrypt from "bcryptjs";
import type { NextAuthConfig } from "next-auth"
import Credentials from "next-auth/providers/credentials";
 
import { LoginSchema } from "./schemas";
import { getUserByEmail } from "./data/user";

// Notice this is only an object, not a full Auth.js instance
export default {
  providers: [
    Credentials({
        async authorize(credentials) {
            const validateFields = LoginSchema.safeParse(credentials);

            if(validateFields.success) {
                const { email, password } = validateFields.data;
                const user = await getUserByEmail(email);

                if (!user || !user.password) return null;

                const passwordmatch = await bcrypt.compare (
                    password,
                    user.password,
                );
                if (passwordmatch) return user;
            }
        }
    })
  ],
} satisfies NextAuthConfig