import { connectToDatabase } from "../../lib/mongodb";
import { jwtVerify }from "jose";

const KEY = new TextEncoder().encode(
    process.env.NEXT_PUBLIC_JWT_SECRET,
)
  

const handler=async(req, res)=>{
    try{
     const { accessToken }= req.body;
     const { database } = await connectToDatabase();
     const collection = database.collection('users');
     const {payload} = await jwtVerify(accessToken,KEY);
     const response = await collection.findOne({email:payload.email});
     if(response){
        return res.status(200).json({result:'success',message:'Liked titles received',data:response.likedTitles.reverse()});
     } else{
        return res.status(500).json({result:'failed',message:'Something went wrong. Please try again'})
     } 
    }
    catch(e){
        return  res.status(500).json({result:'failed',message:'Server down. Please try later'});
    }
}

export default handler;