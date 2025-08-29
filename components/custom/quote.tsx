import { Quote } from "@/types/types";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../ui/card";

interface QuoteProps {
  quote: Quote;
}

const QuoteCard = ({ quote }: QuoteProps) => {
  return (
    <>
      <Card className="max-h-[600px] max-w-[1000px] min-h-32 min-w-64 flex flex-col">
        <CardHeader className="pb-3 border-b border-slate-400">
          <CardTitle className="text-[#16345C] ">{quote.title}</CardTitle>
        </CardHeader>
        <CardContent className="py-5 flex-1 overflow-hidden">
          <CardDescription className="leading-relaxed">{quote.text}</CardDescription>
        </CardContent>

        <CardFooter className="mt-auto pt-0 text-white bg-[#16345C] rounded-b-xl flex items-center gap-2 px-3 py-4">
          <div className="font-custom">
            <p>Said by: </p>
          </div>
          <div className="text-[#c2d1ee]">
            {quote.person}
          </div>
        </CardFooter>
      </Card>
    </>
  )
};

export default QuoteCard;