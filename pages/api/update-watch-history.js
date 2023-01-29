import { connectToDatabase } from "../../lib/mongodb";
import { jwtVerify }from "jose";

const KEY = new TextEncoder().encode(
    process.env.NEXT_PUBLIC_JWT_SECRET,
)
  

const handler=async(req, res)=>{
    try{
     const {accessToken,addedVideo}= req.body;
     const { database } = await connectToDatabase();
     const collection = database.collection('users');
     const {payload} = await jwtVerify(accessToken,KEY);
     await collection.updateOne({email:payload.email},{ $pull: {watchlist:{id:addedVideo.id}} });
     const addVideoResponse = await collection.updateOne({email:payload.email},{ $push: {watchlist:addedVideo}});
     if(addVideoResponse)
      return res.status(200).json({result:'success',message:'Updated watch history'});
      else
       return res.status(500).json({result:'success',message:'Something went wrong. Please try again'});
    }
    catch(e){
        return res.status(500).json({result:'failed',message:'Server down. Please try later'});
    }
}

export default handler;