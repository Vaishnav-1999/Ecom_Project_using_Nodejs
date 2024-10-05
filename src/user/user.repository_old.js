import { getDb } from "../config/mongodb.js";
import { ApplicationError } from "../error-handler/application-error.js";
export class UserRepository {
    constructor(){
        this.collection = "users";
    }
    async signUp(newUser) {

        // 1.Get Database
        try {
            const db = getDb();
            // 2.Get Collection
            const collection = db.collection(this.collection);
            await collection.insertOne(newUser);
            return newUser;
        } catch (error) {
            console.log(error);
            throw new ApplicationError("Something went wrong", 503);
        }
    }

    async signIn(email, password) {

        // 1.Get Database
        try {
            const db = getDb();
            // 2.Get Collection
            const collection = db.collection(this.collection);
            return await collection.findOne({ email, password });
        } catch (error) {
            console.log(error);
            throw new ApplicationError("Something went wrong", 503);
        }
    }

    async findByEmail(email) {

        // 1.Get Database
        try {
            const db = getDb();
            // 2.Get Collection
            const collection = db.collection(this.collection);
            return await collection.findOne({ email });
        } catch (error) {
            console.log(error);
            throw new ApplicationError("Something went wrong", 503);
        }
    }
}