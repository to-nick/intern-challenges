"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function useRequireAuth(){
    const { data: session, status } = useSession();
    const router = useRouter();
    const [showExpiredMessage, setShowExpiredMessage] = useState(false);

    useEffect(() => {
        if (!session?.expires) return;

        const checkExpiration = () => {
            const expiresAt = new Date(session.expires);
            const now = new Date();
            
            // If session expired, show message and redirect
            if (expiresAt < now && !showExpiredMessage) {
                setShowExpiredMessage(true);
                setTimeout(() => {
                    router.push("/auth/login");
                }, 2000);
            }
        };

        checkExpiration();
       
        const interval = setInterval(checkExpiration, 5000);
        
        return () => clearInterval(interval);
    }, [session?.expires, router, showExpiredMessage]);
    

    return {
        session,
        status,
        showExpiredMessage,
    }
}