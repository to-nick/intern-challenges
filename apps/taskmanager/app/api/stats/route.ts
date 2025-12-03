import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";

export async function GET(request: NextRequest){
    const session = await getServerSession(authOptions);
    if (!(session as any)?.user?.id) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    try{
        const allTasks = await prisma.task.findMany({
            where: { userId: (session as any).user.id },
            select: {status: true, category: true},
        });

        console.log("allTasks:", allTasks);

        const statusCounts = {
            TODO: 0,
            IN_PROGRESS: 0,
            DONE: 0,
        }

        allTasks.forEach((task) => {
            statusCounts[task.status as keyof typeof statusCounts]++;
        })

        const statusDistribution = [
            {
                name: "To Do",
                value: statusCounts.TODO,
                status: "TODO",
            },

            {
                name: "In Progress",
                value: statusCounts.IN_PROGRESS,
                status: "IN_PROGRESS",
            },

            {
                name: "Completed",
                value: statusCounts.DONE,
                status: "DONE",
            }
        ];

        const categoryCounts = {
            WORK: 0,
            PERSONAL: 0,
            LEARNING: 0,
            HOME: 0,
            HEALTH: 0,
            FINANCE: 0,
            TRAVEL: 0,
            ENTERTAINMENT: 0,
            SOCIAL: 0,
            OTHER: 0,
        }

        allTasks.forEach((task) => {
            categoryCounts[task.category as keyof typeof categoryCounts]++;
        })

        const categoryDistribution = Object.entries(categoryCounts).map(([category, count]) => ({
            name: category.charAt(0) + category.slice(1).toLowerCase(),
            value: count,
            category: category,
        }));

        console.log("categoryCounts:", categoryCounts);
        console.log("categoryDistribution:", categoryDistribution);



        return NextResponse.json({ statusDistribution, categoryDistribution }, { status: 200 });  
    } catch (error){
        console.error("Failed to fetch stats:", error);
        return NextResponse.json(
            {error: `Failed to fetch stats: ${error}`},
            { status: 500 }
        )
    }
}