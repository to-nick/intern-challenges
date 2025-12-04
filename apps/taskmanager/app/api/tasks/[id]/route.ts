import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { authOptions } from "../../auth/authOptions";
import { getServerSession } from "next-auth";

interface SessionWithId {
  user: {
    id: string;
  };
}
export async function GET(
  _request: NextRequest,
  ctx: { params: Promise<{ id: string }> }
) {
  const session = await getServerSession(authOptions);
  if (!(session as SessionWithId)?.user?.id) {
    return NextResponse.json(
      { error: "Unauthorized" }, 
      { status: 401 }
    );
  }
  try {
    const { id } = await ctx.params;
    const task = await prisma.task.findUnique({
      where: { id },
    });
    if (!task) {
      return NextResponse.json({ error: "Task not found" }, { status: 404 });
    }
    return NextResponse.json(task);
  } catch {
    return NextResponse.json(
      { error: "Failed to fetch task" },
      { status: 500 }
    );
  }
}

export async function PATCH(
    _request: NextRequest,
    ctx: { params: Promise<{ id: string }>}
) {
    const session = await getServerSession(authOptions);
    if (!(session as SessionWithId)?.user?.id) {
        return NextResponse.json(
          { error: "Unauthorized" }, 
          { status: 401 }
        );
      }
    try{
        const { id } = await ctx.params;
        const body = await _request.json()
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

export async function DELETE( 
    _request: NextRequest, 
    ctx: { params: Promise<{ id: string }> }
) {
    const session = await getServerSession(authOptions);
    if (!(session as SessionWithId)?.user?.id) {
        return NextResponse.json(
          { error: "Unauthorized" }, 
          { status: 401 }
        );
      }
    try{const { id } = await ctx.params;
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