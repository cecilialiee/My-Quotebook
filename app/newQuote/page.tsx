import NewQuote from "@/components/custom/new-quote";

export default async function newQuote() {
  return (
    <div className="min-h-screen w-full bg-[#c2d1ee] flex flex-col items-center">
      <h1 className="font-custom text-6xl p-10 text-[#16345C]">New Quote</h1>
      <div>
        <NewQuote></NewQuote>

      </div>
    </div>
  )
}