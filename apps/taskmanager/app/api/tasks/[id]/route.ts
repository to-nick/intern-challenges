import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

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