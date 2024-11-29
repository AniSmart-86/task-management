// import mongoose from "mongoose";
// const uri = `process.env.MONGO_URL`;


// const _db = async()=>{
//     try{
//         mongoose.set('strictQuery', true);
//         const connect = await mongoose.connect(uri);
//         console.log("Connected to MongoDB",connect.connection.host,
//         connect.connection.name);
//     }catch(err){
//         console.log(err);
//         process.exit(1);
//     }
// }

// export default _db;








// const { MongoClient, ServerApiVersion } = require('mongodb');
// const uri = "mongodb+srv://aniokechukwu540:<db_password>@cluster1.4y17w.mongodb.net/?retryWrites=true&w=majority&appName=Cluster1";

// // Create a MongoClient with a MongoClientOptions object to set the Stable API version
// const client = new MongoClient(uri, {
//   serverApi: {
//     version: ServerApiVersion.v1,
//     strict: true,
//     deprecationErrors: true,
//   }
// });

// async function _db() {
//   try {
//     // Connect the client to the server	(optional starting in v4.7)
//     await client.connect();
//     // Send a ping to confirm a successful connection
//     await client.db("admin").command({ ping: 1 });
//     console.log("Pinged your deployment. You successfully connected to MongoDB!");
//   } finally {
//     // Ensures that the client will close when you finish/error
//     await client.close();
//   }
// }
// run().catch(console.dir);
