import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";

export async function POST(request: NextRequest){
    try{
        const body = await request.json();

        const { name, email, password } = body;

        if(!email || ! password){
            return NextResponse.json({error: "Email and password required"}, { status: 400})
        }

        const passwordHash = bcrypt.hashSync(password, 10);

        const existingUser = await prisma.user.findUnique({
            where: { email },
        });

        if(existingUser){
            return NextResponse.json({error: "User already exists"}, { status: 400})
        }

        const user = await prisma.user.create({
            data: { name, email, passwordHash},
        });


        const userWithoutPassword = {
            id: user.id,
            name: user.name,
            email: user.email,
        };

        return NextResponse.json(userWithoutPassword, { status: 201 });
    } catch (error){
        console.error(error);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}
