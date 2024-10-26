"use server";
import { client } from "../auth";
import { Databases } from "appwrite";
import { Query } from "appwrite";

const databases = new Databases(client);

export async function getProjectsOfUser(email) {
    try {
        console.log(email);
        const response = await databases.listDocuments(
            process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID,
            process.env.NEXT_PUBLIC_USER_COLLECTION_ID,
            [
                Query.equal("user_email", email)
            ]
        );
        
        var projectIds = response.documents[0].projectIds.map(projectId => projectId["$id"]);
        
        const projects = await Promise.all(projectIds.map(async projectId => {
            const project = await databases.getDocument(
                process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID,
                process.env.NEXT_PUBLIC_PROJECT_COLLECTION_ID,
                projectId
            );
            return project;
        }));

        return JSON.stringify(projects);

    } catch (error) {
        console.error("Error fetching projects of user:", error);
    }
}