import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/route";

interface SessionWithId {
    user: {
        id: string;
    };
}

export async function PATCH(request: NextRequest){
    const session = await getServerSession(authOptions);
    if(!(session as SessionWithId)?.user?.id){
        return NextResponse.json(
            {error: "Unauthorized"}, 
            {status: 401});
    }
    try{
        const body = await request.json();
        const { taskIds } = body;
        const updatePromises = taskIds.map((taskId: string, index: number) => {
            return prisma.task.updateMany({
                where: {
                    id: taskId,
                    userId: (session as SessionWithId).user.id,
                },
                data: {
                    order: index,
                },
            });
        });
        await Promise.all(updatePromises);
        return NextResponse.json({ Success: true}, {status: 200});
        } catch (error){
            console.error("Failed to reorder tasks:", error);
            return NextResponse.json(
                {error: `Failed to reorder tasks: ${error}`}, 
                {status: 500});
        }
    }
