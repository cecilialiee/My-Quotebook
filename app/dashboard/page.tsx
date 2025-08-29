import NewQuoteButton from "@/components/custom/new-quote-button";
import QuoteCard from "@/components/custom/quote";
import { getServerSupabase } from "@/lib/supabase/server";
import { getAdminSupabase } from "@/lib/supabase/admin";
import { Quote } from "@/types/types";
import { cookies } from "next/headers";
import { createHash } from "crypto";
import { redirect } from "next/navigation";

async function getQuotes(): Promise<Quote[]> {
  const supabase = getServerSupabase();
  const { data: quotes, error } = await supabase.from("quotes").select("*");
  if (error) {
    console.error("Error fetching quotes:", error.message);
    return [];
  }
  return quotes ?? [];
}

export default async function Dashboard() {
  // --- Session check ---
  const token = (await cookies()).get("qb_session")?.value;
  if (!token) redirect("/login");

  const tokenHash = createHash("sha256").update(token).digest("hex");
  const supabaseAdmin = getAdminSupabase();

  const { data: session, error: sessErr } = await supabaseAdmin
    .from("sessions")
    .select("user_id, expires_at")
    .eq("token_hash", tokenHash)
    .maybeSingle();

  if (sessErr) {
    console.error("Session select error:", sessErr.message);
    redirect("/login");
  }

  if (!session || new Date(session.expires_at) < new Date()) {
    redirect("/login");
  }

  // (Optional) you can fetch the logged-in user's info
  // const { data: user } = await supabase
  //   .from("quotebook")
  //   .select("email")
  //   .eq("id", session.user_id)
  //   .maybeSingle();

  const quotes = await getQuotes();

  return (
    <div className="min-h-screen w-full flex flex-col items-center bg-[#c2d1ee]">
      <h1 className="font-custom text-6xl p-10 text-[#16345C]">Quotes</h1>

      <div className="mx-auto max-w-6xl max-h-6xl px-10 py-10 w-full flex items-center gap-10">
        {quotes.map((quote: Quote) => (
          <QuoteCard key={quote.id} quote={quote} />
        ))}
      </div>

      <div className="w-full flex justify-center p-y-10 mt-auto mb-20">
        <NewQuoteButton />
      </div>
    </div>
  );
}
