import { connectToDatabase } from "../../lib/mongodb";
import { withIronSessionApiRoute } from "iron-session/next";
import {ironOptions} from '../../lib/ironConfig';

const handler=async(req, res)=>{
    try{
    const {email,password} = await req.body;
     const { database } = await connectToDatabase();
     const collection = database.collection('users');
     const response = await collection.findOne({email:email,password:password});
     if(response){
         const sessionUser = {email:email,isLoggedIn:true};
         req.session.user = sessionUser;
         await req.session.save();
         return res.status(200).json({result:'success',message:'User logged successsfully',email:email});
     } 
     return res.status(401).json({result:'failed',message:'Invalid Credentials'});
    }
    catch(e){
        console.log(e);
    }
}

export default withIronSessionApiRoute(handler,ironOptions);
  