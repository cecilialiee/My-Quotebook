"use client";

import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { Input } from "../ui/input";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Button } from "../ui/button";

export default function AuthLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState<string | null>(null);
  const router = useRouter();
  const supabase = createClientComponentClient();

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setErr(null)
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) {
      setErr(error.message);
      return;
    }

    router.push("/dashboard");
    router.refresh();
  }

  return (
    <form onSubmit={onSubmit} className="space-y-3 max-w-sm w-full">
      <Input name="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
      <Input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
      {err && <p className="text-sm text-red-600">{err}</p>}
      <Button type="submit" className="w-full">Log in</Button>

    </form>
  )


}