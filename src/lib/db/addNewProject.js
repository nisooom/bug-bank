"use server";

import { ID } from "appwrite";
import {databases} from "./appwrite";
import { getUser } from "./getUser";
import crypto from "crypto";


function sha256Encrypt(text) {
  return crypto.createHash("sha256").update(text).digest("hex");
}

const now = new Date();


export async function addNewProject({proj_name, collaborators_email}) {

    // for each collaborator email, get the user document
    // and extract the user ID
    console.log(collaborators_email);
    let collaboratorID = [];
    await Promise.all(collaborators_email.map(async email => {
        const user = await getUser(email);
        if (user.documents.length) {
            collaboratorID.push(user.documents[0].$id);
        }
    }));

    console.log(collaboratorID);

    let project_info = {
        name: proj_name,
        api_key: sha256Encrypt(proj_name+now.toString()),
        users: collaboratorID
    };

    await databases.createDocument(
        process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID,
        process.env.NEXT_PUBLIC_PROJECT_COLLECTION_ID,
        ID.unique(),
        project_info
    );
}