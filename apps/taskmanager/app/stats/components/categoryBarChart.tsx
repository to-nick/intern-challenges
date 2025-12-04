"use client";

import { useState, useEffect } from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from "recharts";
import { useSession } from "next-auth/react";

interface CategoryDistribution {
    name: string;
    value: number;
    category: string;
}

const CATEGORY_COLORS = {
    WORK: "#3b82f6",
    PERSONAL: "#10b981",
    LEARNING: "#f59e0b",
    HOME: "#ef4444",
    HEALTH: "#8b5cf6",
    FINANCE: "#06b6d4",
    TRAVEL: "#ec4899",
    ENTERTAINMENT: "#f97316",
    SOCIAL: "#14b8a6",
    OTHER: "#94a3b8",
  };


export default function CategoryBarChart(){

    const { data: session } = useSession();
    const [categoryDistribution, setCategoryDistribution] = useState<CategoryDistribution[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (session){
            const fetchCategoryDistribution = async () => {
                try{
                    setLoading(true);
                    setError(null);

                    const response = await fetch("/api/stats");
                    if (!response.ok){
                        throw new Error("Failed to fetch category distribution");
                    }
                    const data = await response.json();
                    setCategoryDistribution(data.categoryDistribution);
                } catch (error){
                    setError(error instanceof Error ? error.message : "Failed to fetch category distribution");
                } finally {
                    setLoading(false);
                }
            };
            fetchCategoryDistribution();
        }
    }, [session]);

    if (loading) {
        return (
            <div>
                <p>Loading...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div>
                <p className="text-red-500">{error}</p>
            </div>
        )
    }

    if((!categoryDistribution)) {
        return (
            <div>
                <p className="text-gray-500">No stats available. Add tasks to see stats.</p>
            </div>
        )
    }

    return (
        <div className="border border-gray-200 rounded-lg p-4 display-flex flex-col items-center justify-center">
                    <h2 className="text-center text-lg font-bold">Tasks By Category</h2>
            <ResponsiveContainer width="100%" height={400}>
                <BarChart data={categoryDistribution}>
                    <XAxis 
                        dataKey="name"
                        angle={-45}
                        textAnchor="end"
                        height={100}
                        tick={ {fontSize: 12} } />
                    <YAxis 
                        tick={ {fontSize: 12} } />
                    <Tooltip 
                        formatter={(value: number) => [`${value} tasks`, "Count"]}
                        labelStyle={{ color: "#333" }}
                    />
                    <Bar 
                        dataKey="value" 
                        radius={[8, 8, 0, 0]}>
                            {categoryDistribution.map((entry: CategoryDistribution, index: number) => {
                                const color = CATEGORY_COLORS[entry.category as keyof typeof CATEGORY_COLORS] || "#94a3b8";
                                return (
                                    <Cell key={`cell-${index}`} fill={color} />
                                );
                            })}
                        </Bar>
                </BarChart>
            </ResponsiveContainer>
        </div>
    )
}