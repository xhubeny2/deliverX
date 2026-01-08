import type { NextAuthConfig } from 'next-auth';

export const authConfig = {
  pages: {
    signIn: '/login',
  },
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;

      // Protected routes
      const isOnDashboard = nextUrl.pathname.startsWith('/dashboard');
      const isOnLoginPage = nextUrl.pathname.startsWith('/login');

      // 1. If is not logged in and tries to access protected pages
      if (isOnDashboard) {
        return isLoggedIn;
      }

      // 2. Is Logged and goes to login page
      if (isLoggedIn && isOnLoginPage) {
        return Response.redirect(new URL('/dashboard', nextUrl));
      }

      // 3. Other pages
      return true;
    },
  },
  providers: [], // Add providers with an empty array for now
} satisfies NextAuthConfig;
