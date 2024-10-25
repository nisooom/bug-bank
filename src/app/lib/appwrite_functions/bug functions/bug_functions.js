'use server';

import { ID } from "appwrite";
import { databases } from "@/app/appwrite";

  
export async function create_new_bug_report(title, desc, sensitivity, images, status, reportee_email) {
    var bug_report = {
        title: title,
        description: desc,
        sensitivity: false,
        image_example: images,
        status: status,
        reportee_email: reportee_email
    };


    await databases.createDocument(
        process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID,
        process.env.NEXT_PUBLIC_BUG_COLLECTION_ID,
        ID.unique(),
        bug_report
    );
}

export async function view_bug_report() {
    var bug_info = await databases.listDocuments(
        process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID,
        process.env.NEXT_PUBLIC_BUG_COLLECTION_ID
    );

    console.log(bug_info);

    bug_info.documents.forEach(info_piece => {
        console.log(`Title: ${info_piece.title}\nDescription: ${info_piece.description}\nIs Bug Sensitive: ${info_piece.sensitivity}\n\n`);
    });
}

export async function update_bug_report(id, updatedFields) {
    try {
        await databases.updateDocument(
            process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID,
            process.env.NEXT_PUBLIC_BUG_COLLECTION_ID,
            id,
            updatedFields
        );
        console.log(`Bug report with ID ${id} updated successfully.`);
    } catch (error) {
        console.error(`Error updating bug report with ID ${id}:`, error);
    }
}

export async function delete_bug_report(id) {
    try {
        await databases.deleteDocument(
            process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID,
            process.env.NEXT_PUBLIC_BUG_COLLECTION_ID,
            id
        );
        console.log(`Bug report with ID ${id} deleted successfully.`);
    } catch (error) {
        console.error(`Error deleting bug report with ID ${id}:`, error);
    }
}

