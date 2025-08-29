import LoginButton from "@/components/custom/login-button";



export default function Home() {
  return (
    <div className="min-h-screen w-full flex flex-col items-center bg-[#c2d1ee] justify-center">
      <h1 className="text-[#16345C] font-custom text-8xl mb-10">My Quotebook</h1>
      <LoginButton />

      <p className="m-3 text-white ">Create a new Quotebook</p>

    </div>
  )
}
