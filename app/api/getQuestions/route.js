"use client"
import { put } from '@vercel/blob';

const vision = require('@google-cloud/vision');

export const POST = async (req) => {
    const user = await getServerSession(authOptions);
    try{
            await connectToDB();
            const formData = await req.formData();
            const image = await formData.get("image");
            await console.log( image);

            const bytes = await image.arrayBuffer();
            const buffer = await Buffer.from(bytes);
            const blob = await put("temp_" + new Date().toJSON().slice(0,10) +'.jpg', buffer, {
                    access: 'public',
                  });
            console.log(blob);
    }catch(e){
        
    }
}
