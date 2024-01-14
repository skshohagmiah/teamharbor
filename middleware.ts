import NextAuth from "next-auth"
import authConfig from "./auth.config"
import { NextResponse } from "next/server"

export const {auth} = NextAuth(authConfig)

export default auth((req) => {
  // req.auth
  const authenticated = req.auth?.user

  if(!authenticated){
    return NextResponse.rewrite(new URL('/', req.url))
  }
  const authRoutes = ['/api/auth']
  if(req.nextUrl.pathname.startsWith('/')){
    return null
  }
  if(req.nextUrl.pathname.startsWith(authRoutes[0])){
    return null
  }
})

// Optionally, don't invoke Middleware on some paths
export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
}