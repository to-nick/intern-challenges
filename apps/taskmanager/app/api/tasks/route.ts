import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { Session } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";

export async function GET(request: NextRequest){
    const session = await getServerSession(authOptions);
    if (!(session as any)?.user?.id) {
        return NextResponse.json(
          { error: "Unauthorized" }, 
          { status: 401 }
        );
      }

    try{
        const tasks = await prisma.task.findMany({
            where: { userId: (session as any).user.id },
            orderBy: {createdAt: "desc"}
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
    if (!(session as any)?.user?.id) {
        return NextResponse.json(
          { error: "Unauthorized" }, 
          { status: 401 }
        );
      }
    try{
        const body = await request.json();
        
        const task = await prisma.task.create({
            data: {
                title: body.title,
                description: body.description,
                status: body.status || "TODO",
                priority: body.priority || "MEDIUM",
                dueDate: body.dueDate ? new Date(body.dueDate) : null,
                userId: (session as any).user.id,
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