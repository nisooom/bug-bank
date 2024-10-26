"use server";
import { client } from "../auth";
import { Databases } from "appwrite";

const databases = new Databases(client);

export async function getBugsFromAPI(apikey) {
  try {
    const collectionId = process.env.NEXT_PUBLIC_PROJECT_COLLECTION_ID;
    const response = await databases.listDocuments(
        process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID,
        collectionId, 
        [
            Query.equal("api_key", apikey)
        ]
);

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

