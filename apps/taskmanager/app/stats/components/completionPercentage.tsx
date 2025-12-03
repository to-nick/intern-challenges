"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";

interface StatusDistribution {
    name: string;
    value: number;
    status: string;
    [key: string]: any;
}

interface StatResponse {
    statusDistribution: StatusDistribution[];
}

export default function CompletionPercentage(){
    const { data: session } = useSession();
    const [stats, setStats] = useState<StatResponse | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (session){
            const fetchStats = async () => {
                try{
                    setLoading(true);
                    setError(null);

                    const response = await fetch("/api/stats");
                    if (!response.ok){
                        throw new Error("Failed to fetch stats");
                    }
                    const data = await response.json();
                    console.log("data:", data);
                    
                    setStats(data);
                } catch (error){
                    setError(error instanceof Error ? error.message : "Failed to fetch stats");
                } finally {
                    setLoading(false);
                }
            };

            fetchStats();
        }
    }, [session]);

    const totalTasks = stats?.statusDistribution.reduce((total, value) => total + value.value, 0) || 0;
    const completedTasks = stats?.statusDistribution.find((value) => value.status === "DONE")?.value || 0;
    const completionPercentage = Math.round((completedTasks / totalTasks) * 100);

    const getColorClass = () => {
        if (completionPercentage >= 80) return "text-green-600";
        if (completionPercentage >= 50) return "text-yellow-600";
        return "text-red-600";
      };
    
      const getBgColorClass = () => {
        if (completionPercentage >= 80) return "bg-green-200 border-green-400";
        if (completionPercentage >= 50) return "bg-yellow-200 border-yellow-400";
        return "bg-red-200 border-red-400";
      };

    if (error) {
        return (
            <div>
                <p className="text-red-500">{error}</p>
            </div>
        )
    }

    if((!stats || stats.statusDistribution.length === 0)) {
        return (
            <div>
                <p className="text-gray-500">No stats available. Add tasks to see stats.</p>
            </div>
        )
    }

    if (loading) {
    return (
        <div className="border border-gray-200 rounded-lg p-4 display-flex flex-col items-center justify-center">
            <h1>Completion Percentage</h1>
        </div>
        )
    }

    return (
        <div className={`${getBgColorClass()} rounded-lg p-4 flex md:flex-row flex-col gap-4 items-center justify-around`}>
            <div>
                <p className={`${getColorClass()} text-lg font-bold`}>Completion Percentage: {completionPercentage}%</p>
            </div>
            <div>
                <p className={`${getColorClass()} text-lg font-bold`}>{completedTasks} / {totalTasks} tasks completed</p>
            </div>
        </div>
    )
}
