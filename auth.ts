/* eslint-disable @typescript-eslint/ban-ts-comment */
import NextAuth from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import Credentials from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import { prisma } from "@/constants/config/db";

export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: PrismaAdapter(prisma),
  providers: [
    Credentials({
      credentials: {
        email: {},
        password: {},
      },

      authorize: async (credentials) => {
        const { email, password } = credentials as {
          email: string;
          password: string;
        };

        try {
          const user = await prisma.user.findUnique({
            where: {
              email,
            },
          });

          if (!user) return null;
          const match = bcrypt.compare(password, user.password);
          if (!match) return null;

          // eslint-disable-next-line @typescript-eslint/no-unused-vars
          const { password: _removed, ...SafeUser } = user;
          return SafeUser;
        } catch (error) {
          console.log(error);
        }
        return null;
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/auth/login",
  },
  callbacks: {
    authorized: async ({ auth }) => {
      return !!auth;
    },
  },
});
