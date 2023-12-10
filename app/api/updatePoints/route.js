import { connectToDB } from "@utils/database";
import { NextResponse } from "next/server";
import { getServerSession } from 'next-auth';
import { authOptions } from '../auth/[...nextauth]/route';
import User from "@models/user";

export const POST = async (req) => {
    try{
        const session = await getServerSession(authOptions);
        console.log(session?.user);
        await connectToDB();
        const points = await req.json();
        console.log(points);
        const updatedUser = await User.findOneAndUpdate({email: session?.user.email}, {points: points.points}, {new: true});
        return NextResponse.json({ok: true, data: updatedUser}, { status: 200});
    }
    catch(e){
        console.log(e.message);
        return NextResponse.json({error: "Greska"}, { status: 500});
    }
}