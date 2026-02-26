import { NextRequest, NextResponse } from "next/server";

const ADMIN_KEY = process.env.ADMIN_KEY ?? "";

export async function POST(req: NextRequest) {
  const form = await req.formData();
  const password = form.get("password");

  if (!ADMIN_KEY || password !== ADMIN_KEY) {
    return NextResponse.redirect(new URL("/admin", req.url), { status: 303 });
  }

  const res = NextResponse.redirect(new URL("/admin", req.url), { status: 303 });
  res.cookies.set("admin_auth", ADMIN_KEY, {
    httpOnly: true,
    secure: true,
    sameSite: "lax",
    maxAge: 60 * 60 * 24 * 7, // 7 days
    path: "/admin",
  });
  return res;
}
