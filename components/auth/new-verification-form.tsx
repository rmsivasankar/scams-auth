"use client"

import { CardWrapper } from "./card-wrapper";
import { BeatLoader } from "react-spinners";
import { useSearchParams } from "next/navigation";

export const NewVerificationForm = ()=> {
    const searchParams = useSearchParams();
    const token = searchParams.get("token");
    return(
        <CardWrapper
            headerLabel="Confirming your verification"
            backButtonLabel="Back to login"
            backButtonHref="/auth/login"
        >
            <div className="flex items-center w-full justify-center">
                <BeatLoader />
            </div>
        </CardWrapper>
    )
}
