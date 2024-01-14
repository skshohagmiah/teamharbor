import NextAuth from "next-auth"
import authConfig from "./auth.config"
import { NextResponse } from "next/server"

export const {auth} = NextAuth(authConfig)

export default auth((req) => {
  // req.auth
  const authenticated = req.auth?.user

  if(req.nextUrl.pathname === '/' ){
    return null
  }
  
  const authRoutes = ['/api/auth']

  if(req.nextUrl.pathname.startsWith(authRoutes[0])){
    return null
  }

  if(!authenticated){
    return NextResponse.rewrite(new URL('/', req.url))
  }
})

// Optionally, don't invoke Middleware on some paths
export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
}