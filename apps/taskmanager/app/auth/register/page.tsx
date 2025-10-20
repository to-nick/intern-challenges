"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function register(){
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");


    const router = useRouter();


    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");
        try{
            const response = await fetch("/api/auth/register", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ name, email, password }),
            });
            
            const data = await response.json();
            if(!response.ok){
                setError(data.error || "Failed to register")
                return
            }
            console.log("Registration successful:", data);
            router.push("/api/auth/signin");
        } catch (error){
            console.error("Failed to register:", error);
        }
    };

    return (
        <div className="flex justify-center items-center h-screen">
            <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow p-6 mb-6">
                <h2 className="text-xl font-bold text-black mb-4">Register</h2>
                <div className="space-y-4 flex flex-col gap-1 text-gray-700">
                    <label htmlFor="name">
                        Name
                    </label>
                    <input type="text" 
                            id="name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="border border-gray-400 rounded px-2 py-1"
                            required>
                            </input>
                    <label htmlFor="email">
                        Email
                    </label>
                    <input type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="border border-gray-400 rounded px-2 py-1"
                        required>
                    </input>
                    <label htmlFor="password">
                        Password
                    </label>
                    <input type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="border border-gray-400 rounded px-2 py-1"
                        required>
                    </input>
                    <button type="submit" className="bg-indigo-600 text-white py-2 rounded hover:bg-indigo-700 transition">Register</button>
                    {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
                </div>
            </form>
        </div>
    );
}