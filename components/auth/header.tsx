import { Poppins } from "next/font/google";

import { cn } from "@/lib/utils";

const font = Poppins({
    subsets: ["latin"],
    weight: ["600"],
});

interface HeaderProps {
    label: string;
};

export const Header = ({label,}: HeaderProps) => {
    return (
        <div className="w-full flex flex-col gap-y-4 items-center justify-center">
            <h1 className={cn(
            "text-3xl font-semibold",
                font.className,
            )}>
                🖲️ SCAMS
            </h1>
            <p className="text-sm font-bold">Secure Cloud Access Management System</p>
            <p className="text-red-600 text-sm font-bold">Authentication System</p>
            <p className="text-muted-foreground text-sm">
                {label}
            </p>
        </div>
    )
}