// middleware.js
import { auth } from "@/auth";

export default auth((req) => {
  // Your custom middleware logic here
  const isAuthenticated = !!req.auth;
  const isAccessingProtectedRoute = req.nextUrl.pathname.startsWith('/admin');
  
  if (isAccessingProtectedRoute && !isAuthenticated) {
    return Response.redirect(new URL('/auth/login', req.url));
  }
});

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
