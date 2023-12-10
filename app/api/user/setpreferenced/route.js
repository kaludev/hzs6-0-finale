
import User from "@models/user";
import { connectToDB } from "@utils/database";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { authOptions } from '../../auth/[...nextauth]/route';

export const GET = async (req) => {
    const session = await getServerSession(authOptions);
    console.log(session);
    if(session?.user){
        try{
            await connectToDB();
            const user = await User.findOneAndUpdate({ email: session?.user.email},{ isPersonalized : true},{
                new: true
            });
            console.log(user);
            return NextResponse.json({ok: true}, { status: 200 });
        }
        catch(e){
            console.log(e.message);
            return NextResponse.json({ok:false,error: "Greska"}, {status: 500});
        }
    }else{
        return NextResponse.json({ok:false,error: "Greska"}, {status: 500});
    }
    
}