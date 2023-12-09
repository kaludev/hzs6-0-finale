import { put } from '@vercel/blob';
import { getServerSession } from 'next-auth';
import { authOptions } from '../auth/[...nextauth]/route';
import { connectToDB } from '@utils/database';

const vision = require('@google-cloud/vision');

export const POST = async (req) => {
    const user = await getServerSession(authOptions);
    console.log(user);
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
        console.log(e.message);
    }
}
