import Link from "next/link";
import { Button } from "../ui/button";

const NewQuoteButton = () => {

  return (
    <Link href={"/newQuote"}>
      <Button className="bg-[#16345C] w-64 font-custom text-xl">
        New Quote
      </Button>
    </Link>
  )
};

export default NewQuoteButton;
