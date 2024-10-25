'use server';

import { ID } from "appwrite";
import { databases } from "@/app/appwrite";

  
export async function create_new_user(username, user_email) {
    var user_entry = {
        username: username,
        user_email: user_email
    };


    await databases.createDocument(
        process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID,
        process.env.NEXT_PUBLIC_USER_COLLECTION_ID,
        ID.unique(),
        user_entry
    );
}

export async function view_user_info() {
    var user_info = await databases.listDocuments(
        process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID,
        process.env.NEXT_PUBLIC_USER_COLLECTION_ID
    );

    user_info.documents.forEach(info_piece => {
        console.log(`Title: ${info_piece.user_email}\nDescription: ${info_piece.username}\n}\n\n`);
    });
}

export async function update_user_info(id, updatedFields) {
    try {
        await databases.updateDocument(
            process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID,
            process.env.NEXT_PUBLIC_USER_COLLECTION_ID,
            id,
            updatedFields
        );
        console.log(`Bug report with ID ${id} updated successfully.`);
    } catch (error) {
        console.error(`Error updating bug report with ID ${id}:`, error);
    }
}

export async function delete_user(id) {
    try {
        await databases.deleteDocument(
            process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID,
            process.env.NEXT_PUBLIC_USER_COLLECTION_ID,
            id
        );
        console.log(`Bug report with ID ${id} deleted successfully.`);
    } catch (error) {
        console.error(`Error deleting bug report with ID ${id}:`, error);
    }
}

