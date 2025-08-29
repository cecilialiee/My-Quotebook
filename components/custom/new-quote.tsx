
import { Card, CardContent, CardFooter, CardHeader } from "../ui/card";
import { Input } from "../ui/input";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { getServerSupabase } from "@/lib/supabase/server";
import { Button } from "../ui/button";

export default function NewQuote() {

  async function createQuote(formData: FormData) {
    "use server";

    const title = formData.get("title")?.toString() ?? "";
    const text = formData.get("text")?.toString() ?? "";
    const person = formData.get("person")?.toString() ?? "";

    const supabase = getServerSupabase();
    const { error } = await supabase.from("quotes").insert([{ title, text, person }]);
    if (error) {
      console.error("Insert failed:", error.message);
      return;
    }

    // Refresh data and go back to the dashboard
    revalidatePath("/dashboard");
    redirect("/dashboard");

  }


  return (
    <Card className="bg-white w-[400px] max-w-lg h-[400px] shadow-sm flex flex-col items-center p-2">
      <form action={createQuote} className="space-y-4">
        <CardHeader className="p-6 pb-4 space-y-8">
          <Input name="title" placeholder="Quote" className="h-18 text-lg md:text-lg font-custom"></Input>
        </CardHeader>
        <CardContent className="px-6 pb-4 space-y-8">
          <Input name="text" placeholder="Context" maxLength={60} className="h-18 text-lg md:text-lg font-custom "></Input>
          <Input name="person" placeholder="Said by" className="h-12 text-lg md:text-lg font-custom"></Input>
        </CardContent>
        <CardFooter className="px-6 pb-8">
          <Button type="submit" className="w-full bg-[#16345C] text-white font-custom">
            Save
          </Button>
        </CardFooter>

      </form>
    </Card>

  )

};

