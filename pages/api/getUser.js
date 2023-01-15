import { connectToDatabase } from "../../lib/mongodb";

const handler=async(req, res)=>{
    try{
     const {email}= req.body;
     const { database } = await connectToDatabase();
     const collection = database.collection('users');
     const response = await collection.findOne({email:email});
     if(response){
        return res.status(200).json(response);
     }
     return res.status(404).json({message:'User not found',status:'failed'});
    }
    catch(e){
        console.log(e);
        return  res.status(500).json({result:'failed',message:'Something went wrong. Please Try Again'});
    }
}

export default handler;