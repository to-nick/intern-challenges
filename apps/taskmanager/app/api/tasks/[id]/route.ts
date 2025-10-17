import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

interface Params {
    params: { id: string };
  }

export async function GET(request: NextRequest, context: Params) {
    const { id } = context.params
    try {
      const task = await prisma.task.findUnique({
        where: { id },
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

export async function PATCH(request: NextRequest, context: Params) {
    const { id } = context.params
    try{
        const body = await request.json()
        const task = await prisma.task.update({
            where: { id },
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

export async function DELETE( request: NextRequest, context: Params) {
    const { id } = context.params
    try{
        await prisma.task.delete({
            where: { id },
        });
        return NextResponse.json({ success: true });
    } catch (error){
        return NextResponse.json(
            {error: `Failed to fetch tasks: ${error instanceof Error ? error.message : String(error)}`},
            { status: 500 }
        )
    }
}