import {prisma} from '@/lib/prisma';
import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';

export async function POST(req){
const body = await req.json();

const { name , email , password, role} = body;

try{
    const existingUser = await prisma.user.findUnique({
        where : {email},
    })

    if(existingUser){
        return NextResponse.json({error : "User already exists"}, {status : 400});

    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
        data: {
            name , email , password : hashedPassword, role,
        },
    });

    return NextResponse.json({
        message : "User Registered Successfully",
        user,
    });
}
catch (error){
    return NextResponse.json(
        {
            error : error.message,
        },
        {
            status : 500
        }
    )
};


}