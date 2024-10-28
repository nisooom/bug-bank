"use server";
import {client, databases} from "@/lib/db/appwrite";
import { Query } from "appwrite";

export async function getUser(email){
    try {
        const response = await databases.listDocuments(
            process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID,
            process.env.NEXT_PUBLIC_USER_COLLECTION_ID,
            [
                Query.equal("user_email", email)
            ]
        );
        return response;
    } catch (error) {
        console.error("Error fetching user:", error);
    }
}