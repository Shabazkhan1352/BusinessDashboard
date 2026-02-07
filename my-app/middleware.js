import { NextResponse } from "next/server";



const middleware = (request) => {
  
    const token = request.cookies.get('token')?.value;
    const protectedRoutes = [
        '/dashboard'
    ]
    const isProtected = protectedRoutes.some((route) =>
        request.nextUrl.pathname.startsWith(route)
    );

    if (isProtected && !token){
        return NextResponse.redirect(new URL("/login",request.url))
    }

    return NextResponse.next();
}
export default middleware

export const config = {
  matcher: [
    "/dashboard/:path*",
    
  ],
};
