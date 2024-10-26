"use server";

import { ID } from "appwrite";
import { databases } from "@/app/appwrite";

import crypto from "crypto";


function sha256Encrypt(text) {
  return crypto.createHash("sha256").update(text).digest("hex");
}

const now = new Date();

  
export async function create_new_project(proj_name,collaborators) {
    var project_info = {
        project_name: proj_name,
        api_key: sha256Encrypt(proj_name+now.toString()),
        user_collaborators: collaborators
    };

    await databases.createDocument(
        process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID,
        process.env.NEXT_PUBLIC_PROJECT_COLLECTION_ID,
        ID.unique(),
        project_info
    );
}

export async function view_project() {
    var project_info = await databases.listDocuments(
        process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID,
        process.env.NEXT_PUBLIC_PROJECT_COLLECTION_ID
    );

    console.log(project_info);

    project_info.documents.forEach(info_piece => {
        console.log(`Title: ${info_piece.api_key}\nDescription: ${inf.project_name}\n`);
    });
}

export async function update_project(id, updatedFields) {
    try {
        await databases.updateDocument(
            process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID,
            process.env.NEXT_PUBLIC_PROJECT_COLLECTION_ID,
            id,
            updatedFields
        );
        console.log(`Bug report with ID ${id} updated successfully.`);
    } catch (error) {
        console.error(`Error updating bug report with ID ${id}:`, error);
    }
}

export async function delete_project(id) {
    try {
        await databases.deleteDocument(
            process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID,
            process.env.NEXT_PUBLIC_PROJECT_COLLECTION_ID,
            id
        );
        console.log(`Bug report with ID ${id} deleted successfully.`);
    } catch (error) {
        console.error(`Error deleting bug report with ID ${id}:`, error);
    }
}

