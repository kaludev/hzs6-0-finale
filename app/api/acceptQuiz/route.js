import User from "@models/user";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { authOptions } from "../auth/[...nextauth]/route";

export const POST = async (req) => {
    const session = await getServerSession(authOptions);
    try{    
        const quiz = await req.json();
        const user = await User.findOneAndUpdate({_id: session?.user._id}, {active_quiz: quiz}, {new: true});
        console.log(user);
        return NextResponse.json({ok: true, data: user}, {status: 200});
    }
    catch(e){
        console.log(e.message);
        return NextResponse.json({error: "Greska"}, {status: 500});
    }
}