import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { getAdminSupabase } from "@/lib/supabase/admin";
import bcrypt from "bcryptjs";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import { randomBytes, createHash } from "crypto";



export default function LoginPage() {
  async function verify(formData: FormData) {
    "use server";

    const email = String(formData.get("email") || "").trim().toLowerCase();
    const password = String(formData.get("password") || "");
    if (!email || !password) redirect("/login?error=invalid");

    const supabase = getAdminSupabase();

    const { data: qb, error } = await supabase
      .from("quotebook")
      .select("id, password_hash")
      .eq("email", email)
      .maybeSingle();

    if (error || !qb) redirect("/login?error=invalid");

    const ok = await bcrypt.compare(password, qb.password_hash);
    if (!ok) redirect("/login?error=invalid");

    //create session
    const token = randomBytes(32).toString("hex");
    const tokenHash = createHash("sha256").update(token).digest("hex");
    const expiresAt = new Date(Date.now() + 1000 * 60 * 60 * 24 * 30);

    const { error: sessErr } = await supabase
      .from("sessions")
      .insert({
        user_id: qb.id,
        token_hash: tokenHash,
        expires_at: expiresAt.toISOString(),
      });

    if (sessErr) redirect("/login?error=server");

    // HttpOnly cookie with raw token
    const cookieStore = await cookies();
    cookieStore.set("qb_session", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24 * 30, // 30 days
    });

    redirect("/dashboard");
  }

  return (
    <div className="min-h-screen w-full bg-[#c2d1ee] flex flex-col items-center">
      <h1 className="font-custom text-6xl p-10 text-[#16345C]">Log in</h1>
      <form action={verify} className="space-y-3 w-full max-w-sm">
        <Input name="email" type="email" placeholder="Email" required />
        <Input name="password" type="password" placeholder="Password" required />
        <Button type="submit" className="w-full">Log in</Button>
      </form>
    </div>
  );
}
