"use client";

import Link from "next/link";
import { signOut } from "next-auth/react";
import StatusPieChart from "./components/StatusPieChart";
import CategoryBarChart from "./components/categoryBarChart";
import CompletionPercentage from "./components/completionPercentage";
import useRequireAuth from "../hooks/useRequireAuth";


export default function Stats(){

    const { session, showExpiredMessage } = useRequireAuth();

    if (showExpiredMessage) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <p className="text-lg text-gray-600 mb-2">
                        Your session has expired. Redirecting to login...
                    </p>
                </div>
            </div>
        );
    }

    return (
        <main className="mx-5">
            <div className="flex flex-row gap-4 justify-end mt-4">
                <Link href="/" className="bg-indigo-600 text-white py-2 px-4 rounded hover:bg-indigo-700 transition">Home</Link>
                <button onClick={() => signOut( {callbackUrl: "/auth/login"} )} className="bg-indigo-600 text-white py-2 px-4 rounded hover:bg-indigo-700 transition">Logout</button>
            </div>
            <div className="container mx-auto px-4 py-8">
                <h1 className="text-2xl font-bold mb-6">Task Statistics</h1>
                <p className="text-gray-600"> View insights on your task distribution and progress.</p>
            </div>
            <div className="mb-4">
                <CompletionPercentage />
            </div>
            <div className="flex flex-col md:flex-row  gap-4 items-center justify-center w-full">
                <div className="w-full md:w-1/2">
                <StatusPieChart />
                </div>
                <div className="w-full md:w-1/2">
                <CategoryBarChart />
                </div>
            </div>
        </main>
    )
}