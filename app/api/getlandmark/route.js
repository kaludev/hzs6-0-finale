import { put } from '@vercel/blob';
import { getServerSession } from 'next-auth';
import { authOptions } from '../auth/[...nextauth]/route';
import { connectToDB } from '@utils/database';
import { readdir } from 'fs/promises';

const vision = require('@google-cloud/vision');

const projectId = 'hzs6-0-finale'
const client = new vision.ImageAnnotatorClient();
export const POST = async (req) => {
    const user = await getServerSession(authOptions);
    console.log(user);
    async function getFiles(dir) {
      const subdirs = await readdir(dir);
      const files = await Promise.all(subdirs.map(async (subdir) => {
        const res = resolve(dir, subdir);
        return (await stat(res)).isDirectory() ? getFiles(res) : res;
      }));
      return files.reduce((a, f) => a.concat(f), []);
    }
    getFiles('./.next/server').then(files => console.log( files))
    .catch(e => console.error(e));;
    try{
            await connectToDB();
            const formData = await req.formData();
            const image = await formData.get("image");
            await console.log( image);

            const bytes = await image.arrayBuffer();
            const buffer = await Buffer.from(bytes);
            const blob = await put("temp_" + new Date().toJSON().slice(0,23) +'.jpeg', buffer, {
                    access: 'public',
                  });
            console.log(blob);
            const [result] = await client.landmarkDetection(
                blob.url
              );
            const landmarks = result.landmarkAnnotations;
            console.log('Landmarks:');
            landmarks.forEach(landmark => console.log(landmark));
            return new Response(JSON.stringify({ok:true,data:landmarks[0]}));

    }catch(e){
        console.log(e.message);        
        return new Response(JSON.stringify({ok:false,message:e.message}));
    }
}
