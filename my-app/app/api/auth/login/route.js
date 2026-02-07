import {prisma} from '@/lib/prisma';
import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import { generateToken } from '@/lib/auth';

export async function POST(req){
    const body = await req.json();
    const {email , password} = body;

    try{
        const user = await prisma.user.findUnique({
            where: {email},
        });

        if(!user){
            return NextResponse.json(
                {
                message : "Invalid email or password"
            }, 
        {
            status : 401,
        });


    }
    const isValid = await bcrypt.compare(password , user.password);

    if(!isValid){
        return NextResponse.json(
            {message : "Invalid email or password"},
            {status : 401}
            )
    }

    const token = generateToken(user);
    const res =  NextResponse.json(
       {message : "Login Successfull" ,  user : {
        id : user.id,
        name : user.name,
        email : user.email,
        role : user.role,
       }}, 
      
    );

  res.headers.set(
  "Set-Cookie",
  `token=${token}; HttpOnly; Path=/; Max-Age=86400; SameSite=Lax`
);

    return res
}
catch(error){
    return NextResponse.json(
        {error : error.message},
        {status : 500}
    );
}

}