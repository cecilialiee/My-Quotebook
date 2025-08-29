import Link from "next/link";
import { Button } from "../ui/button";

const LoginButton = () => {

  return (
    <Link href={"/login"}>
      <Button className="bg-[#16345C] w-64 font-custom text-xl">
        Log in
      </Button>
    </Link>
  )
};

export default LoginButton;

