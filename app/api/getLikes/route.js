import { connectToDB } from "@utils/database";

import User from "@models/user";
//GET post by id 
export const GET = async (req) => {
    try{
        await connectToDB();
        const points = await User.find({});
        console.log(points);
        const sortedPoints = points.sort((a,b) =>{return b.points - a.points})
        console.log(sortedPoints);
        return new Response(JSON.stringify({ok:true,data:sortedPoints}),{
            status: 200
        })
    }catch(err){
        return new Response("Greska pri prikazivanju rang liste",{status: 500})
    }
}