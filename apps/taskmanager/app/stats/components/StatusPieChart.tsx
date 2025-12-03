"use client"

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from "recharts";

interface StatusDistribution {
  name: string;
  value: number;
  status: string;
  [key: string]: any;
}

interface StatResponse {
    statusDistribution: StatusDistribution[];
}

const COLOURS = {
    TODO: "#94a3b8",
    IN_PROGRESS: "#3b82f6", 
    DONE: "#10b981",    
};

export default function Stats(){

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


    if (loading) {
        return (
            <div>
                <p>Loading...</p>
            </div>
        );
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

    return (
                <div className="border border-gray-200 rounded-lg p-4 display-flex flex-col items-center justify-center">
                    <h2 className="text-center text-lg font-bold">Task Distribution</h2>
                    <ResponsiveContainer width="100%" height={400}>

                        <PieChart>
                            <Pie 
                                data={stats.statusDistribution}
                                dataKey="value"
                                nameKey="name"
                                cx="50%"
                                cy="50%"
                                outerRadius={120}

                                label
                                fill="#8884d8"
                                >
                                    {stats.statusDistribution.map((entry, index) => {
                                        const colour = COLOURS[entry.status as keyof typeof COLOURS] || "#8884d8";

                                        return (
                                            <Cell 
                                                key={`cell-${index}`}
                                                fill={colour} 
                                            />
                                        )
                                    })}
                                </Pie>
                                <Tooltip
                                    formatter={(value: number, name: string) => {
                                        return [`${value} tasks`, name.charAt(0).toUpperCase() + name.slice(1)];
                                    }}
                                />
                                <Legend />
                        </PieChart>
                    </ResponsiveContainer>
                </div>
)}