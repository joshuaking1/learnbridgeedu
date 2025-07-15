// frontend/src/app/api/auth/login/route.ts
import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function POST(request: NextRequest) {
  const requestUrl = new URL(request.url);
  const formData = await request.formData();
  const email = String(formData.get("email"));
  const password = String(formData.get("password"));
  const cookieStore = cookies();
  const supabase = createRouteHandlerClient({ cookies: () => cookieStore });

  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    console.error("Login Error:", error);
    return NextResponse.redirect(
      `${requestUrl.origin}/login?error=Invalid credentials. Please try again.`,
      { status: 301 }
    );
  }

  // On successful login, the middleware will handle redirection to the correct page
  // so we simply redirect to the root of the site.
  return NextResponse.redirect(requestUrl.origin, {
    status: 301,
  });
}
