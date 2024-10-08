import React, { useState } from 'react'
import toast from 'react-hot-toast';
import { useAuthContext } from '../context/AuthContext';

export default function useLogin() {
    const [loading, setLoading] = useState(false);
    const { setAuthUser } = useAuthContext();

    const login = async ({username, password}) => {
        const success = handleInputErrors({username, password});
        if (!success) return;

        setLoading(true);

        try {
            const response = await fetch("/api/auth/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({username, password})
            });
    
            const data = await response.json();
            if (data.error) {
                throw new Error(data.error);
            }
            
            toast.success("Logged successfully!");
            setAuthUser(data);
            localStorage.setItem("chat-user", JSON.stringify(data));

        } catch (error) {
            toast.error(error.message);    
        } finally {
            setLoading(false);
        }
    }

    return {loading, login}
}

function handleInputErrors ({ username, password }) {
    if (!username || !password) {
        toast.error("Please fill all the fields!");
        return false;
    }

    return true;
}