"use server";

import { ID } from "appwrite";
import {databases} from "./appwrite";
import { getUser } from "./getUser";
import crypto from "crypto";


function sha256Encrypt(text) {
  return crypto.createHash("sha256").update(text).digest("hex");
}

const now = new Date();


export async function addNewProject({
    ownerEmail, ownerProjectIds,
    proj_name, collaborators_email
}) {
    const owner = await getUser(ownerEmail)
    const ownerId = owner.documents[0].$id

    // for each collaborator email, get the user document
    // and extract the user ID
    let collaboratorIDs = [];
    await Promise.all(collaborators_email.map(async email => {
        const user = await getUser(email);
        if (user.documents.length) {
            collaboratorIDs.push(user.documents[0].$id);
        }
    }));

    const projectObj = {
        name: proj_name,
        api_key: sha256Encrypt(proj_name+now.toString()),
        users: collaboratorIDs
    };

    const newId = ID.unique()
    await databases.createDocument(
        process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID,
        process.env.NEXT_PUBLIC_PROJECT_COLLECTION_ID,
        newId,
        projectObj
    );

    await databases.updateDocument(
        process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID,
        process.env.NEXT_PUBLIC_USER_COLLECTION_ID,
        ownerId,
        {
            projects: [...ownerProjectIds, newId]
        }
    )

    console.log("PROJECT NEW:", newId, projectObj)
}