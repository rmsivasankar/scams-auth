import { useSession } from "next-auth/react";

export const useCurrentuser = () => {
    const session = useSession();

    return session.data?.user;
    
}