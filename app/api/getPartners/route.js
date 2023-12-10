import { getServerSession } from 'next-auth';
import { authOptions } from '../auth/[...nextauth]/route';
import { connectToDB } from '@utils/database';
import Partner from '@models/partner';
import { NextResponse } from 'next/server';

export const GET = async (req) => {
    try{
        await connectToDB();
        const partners = await Partner.find({});
        return NextResponse.json({ok:true, data: partners}, {status: 200});
    }
    catch(e){
        console.log(e.message);
        return NextResponse.json({error: "Greska"}, {status: 500});
    }
}