import { MongoClient } from "mongodb";
// import dotenv from "dotenv";

// dotenv.config();



let client;
export const connectToMongoDB = () => {
    MongoClient.connect(process.env.DB_URL).then(clientInstance => {
        client = clientInstance;
        console.log("Mongodb is connected");
    })
        .catch(err => {
            console.log(err);
        })
}

export const getDb = () => {
    return client.db();
}
