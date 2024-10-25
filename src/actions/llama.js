"use server";
import { Client, Databases } from "appwrite";

const client = new Client()
    .setEndpoint('https://cloud.appwrite.io/v1') // Your API Endpoint
    .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT); // Your project ID

const databases = new Databases(client);


export async function GetDocumentAndSendToLlama(docID) {
    try {
        const document = await databases.getDocument(
            process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID,
            process.env.NEXT_PUBLIC_APPWRITE_COLLECTION_ID,
            docID
        );
        const response = await fetch(
            `${process.env.LLAMA_URL}`,
            {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(document),
            }
        );
        return await response.json();
    } catch (error) {
        console.error('Error sending document to LLAMA:', error);
        throw error;
    }
}
