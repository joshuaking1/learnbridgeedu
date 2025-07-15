// frontend/src/app/api/auth/signup/route.ts
import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function POST(request: NextRequest) {
  const requestUrl = new URL(request.url);
  const formData = await request.formData();
  const email = String(formData.get("email"));
  const password = String(formData.get("password"));
  const fullName = String(formData.get("full_name"));
  const cookieStore = cookies();
  const supabase = createRouteHandlerClient({ cookies: () => cookieStore });

  const { error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      // This passes the full_name to the trigger we created in Phase 2
      data: {
        full_name: fullName,
      },
      // This is the URL users are sent to after clicking the link in the confirmation email
      emailRedirectTo: `${requestUrl.origin}/api/auth/callback`,
    },
  });

  if (error) {
    // Log the error for debugging
    console.error("Sign-up Error:", error);
    // Redirect to a generic error page or the same page with an error message
    return NextResponse.redirect(
      `${requestUrl.origin}/signup?error=Could not authenticate user. Please try again.`,
      { status: 301 }
    );
  }

  // Redirect to a page that tells the user to check their email
  return NextResponse.redirect(
    `${requestUrl.origin}/login?message=Check your email to complete the sign-up process.`,
    { status: 301 }
  );
}
