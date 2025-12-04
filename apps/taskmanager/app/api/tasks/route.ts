import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/authOptions";

interface SessionWithId {
    user: {
        id: string;
    };
}

export async function GET(){
    const session = await getServerSession(authOptions);
    if (!(session as SessionWithId)?.user?.id) {
        return NextResponse.json(
          { error: "Unauthorized" }, 
          { status: 401 }
        );
      }

    try{
        const tasks = await prisma.task.findMany({
            where: { userId: (session as SessionWithId).user.id },
            orderBy: [
                {order: "asc"},
                {createdAt: "desc"}
            ]
        });
        return NextResponse.json(tasks);
    } catch (error){
        return NextResponse.json(
            {error: `Failed to fetch tasks: ${error}`},
            { status: 500 }
        )
    }
}

export async function POST(request: NextRequest){
    const session = await getServerSession(authOptions);
    if (!(session as SessionWithId)?.user?.id) {
        return NextResponse.json(
          { error: "Unauthorized" }, 
          { status: 401 }
        );
      }
    try{
        const body = await request.json();
        

        const maxOrder = await prisma.task.findFirst({
            where: { userId: (session as SessionWithId).user.id },
            orderBy: { order: "desc" },
            select: { order: true }
        });

        const newOrder = maxOrder ? maxOrder.order + 1 : 0;

        const task = await prisma.task.create({
            data: {
                title: body.title,
                description: body.description,
                status: body.status || "TODO",
                category: body.category,
                priority: body.priority || "MEDIUM",
                dueDate: body.dueDate ? new Date(body.dueDate) : null,
                userId: (session as SessionWithId).user.id,
                order: newOrder,
            }
        });
        console.log("Task to return", task);
        return NextResponse.json(task, { status: 201})
    } catch (error){
        console.error("Prisma error:", error);
        return NextResponse.json(
            {error: `Failed to fetch tasks: ${error}`},
            { status: 500 }
        )
    }
}