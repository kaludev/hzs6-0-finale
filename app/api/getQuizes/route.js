import Quiz from "@models/quiz";
import { connectToDB } from "@utils/database";
import { NextResponse } from "next/server";

export const GET = async (req) => {
    try{
        await connectToDB();
        const quizes = await Quiz.find({});
        return NextResponse.json({ok: true, data: quizes}, { status: 200 });
    }
    catch(e){
        console.log(e.message);
        return NextResponse.json({error: "Greska"}, {status: 500});
    }
}