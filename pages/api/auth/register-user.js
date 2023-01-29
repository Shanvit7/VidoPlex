import { connectToDatabase } from "../../../lib/mongodb";

const handler=async(req, res)=>{
    try{
     const {email,password}= req.body;
     const { database } = await connectToDatabase();
     const collection = database.collection('users');
     await collection.insertOne({email:email,password:password,watchlist:[],likedTitles:[],watchHistory:[]});
     return res.status(200).json({result:'success',message:'User created successfully'});
    }
    catch(e){
        console.log(e);
         res.status(500).json({result:'failed',message:'Error while creating user. Please try again'});
    }
}

export default handler;
  