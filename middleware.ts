import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'
import { getToken } from 'next-auth/jwt'
import { Role } from './@types/enum'

const secret = process.env.NEXTAUTH_SECRET

export async function middleware(req: NextRequest) {
  const protectedRoutes = [/^\/home(.*)$/]

  const superAdminRoutes = [/^\/poles\/new(.*)$/, /^\/poles(.*)$/]

  // const adminRoutes = [];

  const leaderRoutes = [
    /^\/users(.*)$/,
    /^\/users\/new(.*)$/,
    /^\/users\/waiting-list(.*)$/,
    /^\/users\/waiting-list\/new(.*)$/,
    /^\/pole(.*)$/,
    /^\/pole\/stock-items(.*)$/,
    /^\/pole\/stock-items\/new(.*)$/,
  ]

  const token = await getToken({ req, secret })

  //@ts-ignore
  const role = token?.user.role

  if (req.nextUrl.pathname === '/' && token) {
    return NextResponse.redirect(new URL('/home', req.url))
  }

  if (protectedRoutes.some((route) => route.test(req.nextUrl.pathname))) {
    if (!token) return NextResponse.redirect(new URL('/', req.url))
  }

  if (superAdminRoutes.some((route) => route.test(req.nextUrl.pathname))) {
    if (role !== Role.ADMIN) {
      return NextResponse.redirect(new URL('/home', req.url))
    }
  }

  // if (adminRoutes.some((route) => route.test(req.nextUrl.pathname))) {
  //   if (role !== Roles.SuperAdmin && role !== Roles.Admin) {
  //     return NextResponse.redirect(new URL("/home", req.url));
  //   }
  // }

  if (leaderRoutes.some((route) => route.test(req.nextUrl.pathname))) {
    if (role !== Role.ADMIN && role !== Role.GUEST && role !== Role.MANAGER) {
      return NextResponse.redirect(new URL('/home', req.url))
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    '/',
    '/home(.*)',
    '/poles',
    '/poles/new(.*)',
    '/users(.*)',
    '/users/new(.*)',
    '/users/waiting-list(.*)',
    '/users/waiting-list/new(.*)',
    '/pole(.*)',
    '/pole/stock-items(.*)',
    '/pole/stock-items/new(.*)',
  ],
}
