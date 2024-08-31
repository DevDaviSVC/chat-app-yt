import React, { useState } from 'react'
import toast from 'react-hot-toast';
import { useAuthContext } from '../context/AuthContext';
import useConversation from '../zustand/useConversation';

export default function useLogout() {
    const [loading, setLoading] = useState(false);
    const { setSelectedConversation } = useConversation();
    const { setAuthUser } = useAuthContext();

    const logout = async () => {
        setLoading(true);
        try {
            const response = await fetch("/api/auth/logout", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                }
            });

            const data = await response.json();

            if (data.error) {
                throw new Error(data.error);
            }

            setAuthUser(null);
            localStorage.removeItem("chat-user");
            toast.success(data.message);

        } catch (error) {
            toast.error("Something went wrong...");
        } finally {
            setLoading(false);
        }
    }

    return { logout, loading };
}
