import Image from "next/image";
import { Poppins } from "next/font/google"
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { LoginButton } from "@/components/auth/login-button";

const font = Poppins({
  subsets: ["latin"],
  weight: ["600"]
})

export default function Home() {
  return (
    <main className="flex h-full flex-col items-center justify-center bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-500 to-red-500">
      <div className="space-y-6 text-center">
        <h1 className={cn
        ("text-6xl font-semibold text-white drop-shadow-md",
          font.className,
        )}>
          ⏏️SCAMS
        </h1>
        <p className="text-white text-lg">
          Secure Cloud Access Management System
        </p>
        <p className="text-white font-semibold text-xl">AUTH SERVICE</p>
        <div>
          <LoginButton>
            <Button variant="secondary" size="lg">Sign in</Button>
          </LoginButton>
        </div>
      </div>
    </main>
  );
}
