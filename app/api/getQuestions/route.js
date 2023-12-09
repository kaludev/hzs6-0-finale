import { connectToDB } from '@utils/database';
import { put } from '@vercel/blob';
import { getServerSession } from 'next-auth';
import { authOptions } from '../auth/[...nextauth]/route';

const vision = require('@google-cloud/vision');

const projectId = 'hzs6-0-finale'
const client = new vision.ImageAnnotatorClient();
export const POST = async (req) => {
    const user = await getServerSession(authOptions);
    try{
            await connectToDB();
            const formData = await req.formData();
            const image = await formData.get("image");
            await console.log( image);

            const bytes = await image.arrayBuffer();
            const buffer = await Buffer.from(bytes);
            const blob = await put("temp_" + new Date().toJSON().slice(0,23) +'.jpg', buffer, {
                    access: 'public',
                  });
            console.log(blob);
            const [result] = await client.landmarkDetection(
                blob.url
              );
            const landmarks = result.landmarkAnnotations;
            console.log('Landmarks:');
            landmarks.forEach(landmark => console.log(landmark));
            return new Response(JSON.stringify({ok:true,data:blob}));

    }catch(e){
        console.log(e.message);        
        return new Response(JSON.stringify({ok:false,message:e.message}));
    }
}
