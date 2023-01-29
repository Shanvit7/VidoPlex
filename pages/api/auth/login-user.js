import { connectToDatabase } from "../../../lib/mongodb";
import { SignJWT } from "jose";

const KEY = new TextEncoder().encode(
    process.env.NEXT_PUBLIC_JWT_SECRET
)
const alg = 'HS256';

const handler=async(req, res)=>{
    try{
    const {email,password} = await req.body;
     const { database } = await connectToDatabase();
     const collection = database.collection('users');
     const response = await collection.findOne({email:email,password:password});
     if(response){
         return res.status(200).json({
            result:'success',
            message:'User logged successsfully',
            token: await new SignJWT({
                email
            })
            .setProtectedHeader({alg})
            .sign(KEY)
        });
     } 
     return res.status(401).json({result:'failed',message:'Invalid Credentials'});
    }
    catch(e){
        console.log(e);
    }
}

export default handler;
  