import GitHub from "next-auth/providers/github"
import bcrypt from "bcryptjs";
import type { NextAuthConfig } from "next-auth"
import Credentials from "next-auth/providers/credentials";
import Google from "next-auth/providers/google"
import { LoginSchema } from "./schemas";
import { getUserByEmail } from "./data/user";

// Notice this is only an object, not a full Auth.js instance
export default {
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    GitHub({
      clientId: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
    }),
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