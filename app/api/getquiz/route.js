import { getServerSession } from 'next-auth';
import { authOptions } from '../auth/[...nextauth]/route';
import { connectToDB } from '@utils/database';
import Quiz from '@models/quiz';

export const GET = async (req) => {
    const user = await getServerSession(authOptions);
    console.log(user);
    try{
            await connectToDB();
            const requestedLandmark = Quiz.findById(user.user.active_quiz)
            return new Response(JSON.stringify({ok:true,data:requestedLandmark}));

    }catch(e){
        console.log(e.message);        
        return new Response(JSON.stringify({ok:false,message:e.message}));
    }
}
