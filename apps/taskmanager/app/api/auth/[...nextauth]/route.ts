import NextAuth, { type NextAuthOptions } from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { prisma } from "@/lib/prisma";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";

export const authOptions: NextAuthOptions = {
    adapter: PrismaAdapter(prisma),
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: { label: "Email", type: "email" },
                password: { label: "Password", type: "password" }
            }, async authorize(credentials){
             if(!credentials?.email || !credentials?.password){
              return null;
             }
             const user = await prisma.user.findUnique({
              where: { email: credentials.email }
             });
             if(!user || !user.passwordHash){
              return null;
             }
             const passwordsMatch = await bcrypt.compare(credentials.password, user.passwordHash);
             if(!passwordsMatch){
              return null;
             }
             return {
              id: user.id,
              name: user.name,
              email: user.email,
             };
            } 
        }),
    ],
    session: {
      strategy: "jwt" as const
    },
    secret: process.env.NEXTAUTH_SECRET,
    debug: process.env.NODE_ENV === "development",
    callbacks: {
      async session({session, token}) {
        return {
          ...session,
          user: {
            ...session.user,
            id: token.sub,
          },
        };
      }
    }
  };

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };