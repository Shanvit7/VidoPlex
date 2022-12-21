import { connectToDatabase } from "../../lib/mongodb";

export default async function handler(req, res) {
    try{
    const { database } = await connectToDatabase();
    const collection = database.collection('test123');
    res.status(200).json({results:'ok'});
    }
    catch(e){
        console.log(e);
    }
}
  