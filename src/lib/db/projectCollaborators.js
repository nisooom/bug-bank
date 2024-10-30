"use server";

import { databases } from "./appwrite";


export const setProjectCollaborators = async ({ projectId, collaboratorsIds }) => {
    await databases.updateDocument(
        process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID,
        process.env.NEXT_PUBLIC_PROJECT_COLLECTION_ID,
        projectId,
        {
            users: collaboratorsIds,
        },
    );

    console.log("PROJECT COLLABORATORS:", projectId, collaboratorsIds)
}
