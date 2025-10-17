import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(
    request: NextRequest,
    { params }: { params: { id: string } }
  ) {
    try {
      const task = await prisma.task.findUnique({
        where: { id: params.id },
      });
      if (!task) {
        return NextResponse.json({ error: "Task not found" }, { status: 404 });
      }
      return NextResponse.json(task);
    } catch (error) {
      return NextResponse.json(
        { error: "Failed to fetch task" },
        { status: 500 }
      );
    }
  }

export async function PATCH(
    request: NextRequest,
    { params }: { params: { id: string }}
) {
    try{
        const body = await request.json()
        const task = await prisma.task.update({
            where: { id: params.id },
            data: body,
        });
        return NextResponse.json(task);
    } catch (error) {
        return NextResponse.json(
            {error: `Failed to fetch tasks: ${error instanceof Error ? error.message : String(error)}`},
            { status: 500 }
        )
    }
}

export async function DELETE( request: NextRequest, 
    { params }: { params: { id: string } }
) {
    try{
        await prisma.task.delete({
            where: { id: params.id },
        });
        return NextResponse.json({ success: true });
    } catch (error){
        return NextResponse.json(
            {error: `Failed to fetch tasks: ${error instanceof Error ? error.message : String(error)}`},
            { status: 500 }
        )
    }
}