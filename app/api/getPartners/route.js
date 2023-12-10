import { getServerSession } from 'next-auth';
import { authOptions } from '../auth/[...nextauth]/route';
import { connectToDB } from '@utils/database';
import Partner from '@models/partner';
import { NextResponse } from 'next/server';
import { uid } from 'uid';
import QRCode from 'qrcode';



export const GET = async (req) => {
    
    try{
        await connectToDB();
        const partners = await Partner.find({});
        const qrPartners =  partners.forEach(async (partner) => {
            const code = partner.name + "-"+uid()
            if(partner.offers.length == 0) {
                await Partner.findByIdAndUpdate(partner._id,{
                    $addToSet:{ offers : code}
            },{new: true})
            }
            await QRCode.toString(code, {
                errorCorrectionLevel: 'H',
                type: 'svg'
              },function(err, data) {
                if (err) throw err;
                console.log(data);
                partner.qr = data;
              })
            console.log(partner.qr);
        })

        return NextResponse.json({ok:true, data: partners}, {status: 200});
    }
    catch(e){
        console.log(e.message);
        return NextResponse.json({error: "Greska"}, {status: 500});
    }
}