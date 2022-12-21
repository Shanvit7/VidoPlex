import { connectToDatabase } from "../../lib/mongodb";

export default async function handler(req, res) {
    try{
     const { database } = await connectToDatabase();
     const collection = database.collection('users');
     const response = await collection.insertOne(req.body);
     const receivedId = response.insertedId.toString();
     res.status(200).json({result:'sucesss',_id:receivedId});
    }
    catch(e){
        console.log(e);
    }
}
  