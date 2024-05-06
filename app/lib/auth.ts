import { db } from '@/app/lib/prisma'
import { PrismaAdapter } from '@auth/prisma-adapter'
import { Adapter } from 'next-auth/adapters'
import GoogleProvider from 'next-auth/providers/google'

export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
  ],
  adapter: PrismaAdapter(db) as Adapter,
  callbacks: {
    async session({ session, user }: any) {
      session.user = { ...session.user, id: user.id }

      return session
    },
  },
}
