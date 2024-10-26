"use server";
import { Client, Databases } from "appwrite";
import { Query } from "appwrite";

const client = new Client();
client
    .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT) // Your API Endpoint
    .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT) // Your project ID

const databases = new Databases(client);

export async function getBugsFromAPI(apikey) {
  try {
    console.log(apikey);
    const collectionId = process.env.NEXT_PUBLIC_PROJECT_COLLECTION_ID;
    const response = await databases.listDocuments(
        process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID,
        collectionId, 
        [
            Query.equal("api_key", apikey)
        ]
    );

    console.log(response);
    const bugIDs = response.documents[0].bugIds.map(bugId => bugId["$id"]);

    console.log(bugIDs);
    
    const bugs = await Promise.all(bugIDs.map(async bugID => {
        // Fetching the document directly using bugID
        const bug = await databases.getDocument(
          process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID,       // Database ID
          process.env.NEXT_PUBLIC_BUG_COLLECTION_ID,         // Collection ID
          bugID                                              // Document ID (bugID)
        );
        return bug;
      }));

    return JSON.stringify(bugs);

  } catch (error) {
    console.error("Error fetching project API:", error);
  }
}

