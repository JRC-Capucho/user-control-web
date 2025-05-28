import CredentialsProvider from 'next-auth/providers/credentials'
import api from '../../services/api'
import NextAuth, { type IUser, type NextAuthOptions } from 'next-auth'

const nextAuthOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        if (!credentials) throw new Error('Credentials not provided')
        try {
          const response = await api.post(`${process.env.API_URL}/login`, {
            email: credentials.email,
            password: credentials.password,
          })

          const { user, accessToken: token } = response.data

          if (!user || !token) {
            throw new Error('Authentication failed: missing user or token data')
          }

          return { ...user, token }
        } catch (error) {
          console.error('Error in authorize function:', error)
          throw new Error('Authentication failed')
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.user = user as unknown as IUser['data']['user']
        token.token = (user as any).token // Inclui o token no JWT
      }
      return token
    },
    async session({ session, token }) {
      if (token.user) {
        session.user = token.user as unknown as IUser['data']['user']
      }
      if (token.token) {
        session.token = token.token as string // Passa o token para a sessão
      }
      return session
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: '/',
  },
}

const handler = NextAuth(nextAuthOptions)

export { handler as GET, handler as POST }
