"use server";

import { client, databases } from "@/lib/db/appwrite";
import { ID } from "appwrite";
import { Query } from "appwrite";

export async function addUserToDatabase(user) {
    

    const {name, email} = user;

    try {

        //console.log(user.email);
        // if not exists
        // create new document
        const check = await databases.listDocuments(
            process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID,
            process.env.NEXT_PUBLIC_USER_COLLECTION_ID,
            [
                Query.equal("user_email", user.email)
            ]
        );
        //console.log(check);
        
        if (check.total > 0){
            //console.log("User already exists in database");
            return;
        }else{
            //console.log("Trying to add new user");
            //console.log(ID.unique());
            //console.log(user);
            var user_entry = {
                username: name,
                user_email: email,
            };
            const uniqueID = ID.unique();
            //console.log(uniqueID);
            const response = await databases.createDocument(
                process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID,
                process.env.NEXT_PUBLIC_USER_COLLECTION_ID,
                uniqueID,
                user_entry
            );
            //console.log("User added to database:", response);
            return response;
        }
        
    } catch (error) {
        console.error("Error adding user to database:", error);
    }
}