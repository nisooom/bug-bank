"use server";

import { client, databases} from "@/lib/db/appwrite";

import { Query } from "appwrite";


export async function getProjects({email}){


    try {
        const response = await databases.listDocuments(
            process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID,
            process.env.NEXT_PUBLIC_USER_COLLECTION_ID,
            [
                Query.equal("user_email", email)
            ]
        );
        let projectIds = response.documents[0].projects.map(projectId => projectId["$id"]);
        // console.log(response.documents[0].projects);

        const projects = await Promise.all(projectIds.map(async projectId => {
            const project = await databases.getDocument(
                process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID,
                process.env.NEXT_PUBLIC_PROJECT_COLLECTION_ID,
                projectId
            );
            return project;
        }));
        // console.log("Projects of user:");
        // console.log(projects);
        return projects;

    } catch (error) {
        console.error("Error fetching projects of user:", error);
    }
}
