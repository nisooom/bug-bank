'use server'

import { ID, Query } from "appwrite"
import { databases } from "./appwrite"


// only these fields are used for creating a new bug report
// all other fields are supposed to be updated using `updateBug`
export const createNewBugReport = async ({
    title, description, sensitivity, priority, reporteeEmail,
    projectId,
}) => {
    const report = {
        title,
        description,
        sensitivity: sensitivity ?? false,
        priority: priority ?? "High",
        reporteeEmail: reporteeEmail ?? null,
        projectId,
    }

    await databases.createDocument(
        process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID,
        process.env.NEXT_PUBLIC_BUG_COLLECTION_ID,
        ID.unique(),
        report,
    )
}


export const getBugById = async (bugId) => {
    const doc = await databases.getDocument(
        process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID,
        process.env.NEXT_PUBLIC_BUG_COLLECTION_ID,
        bugId,
    )
    return doc
}


export const updateBug = async ({bugId, data}) => {
    await databases.updateDocument(
        process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID,
        process.env.NEXT_PUBLIC_BUG_COLLECTION_ID,
        bugId,
        data,
    )
}


// just mark it as resolved instead
export const deleteBug = async (bugId) => {
    await databases.deleteDocument(
        process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID,
        process.env.NEXT_PUBLIC_BUG_COLLECTION_ID,
        bugId,
    )
}


export const getBugsByProjectId = async (projectId) => {
    const docs = await databases.listDocuments(
        process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID,
        process.env.NEXT_PUBLIC_BUG_COLLECTION_ID,
        [
            Query.equal("projectId", projectId),
        ]
    )
    return docs
}


export const getUsersAssigned = async (bugId) => {
    const doc = await databases.getDocument(
        process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID,
        process.env.NEXT_PUBLIC_BUG_COLLECTION_ID,
        bugId,
        [
            Query.select("usersAssigned"),
        ],
    )

    return doc.usersAssigned
}


export const assignUsers = async ({bugId, userId}) => {
    const prevUsersAssigned = getUsersAssigned(bugId)

    await databases.updateDocument(
        process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID,
        process.env.NEXT_PUBLIC_BUG_COLLECTION_ID,
        bugId,
        {
            usersAssigned: [...prevUsersAssigned, userId],
        },
    )
}


export const unassignUsers = async ({bugId, userId}) => {
    const prevUsersAssigned = getUsersAssigned(bugId)

    await databases.updateDocument(
        process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID,
        process.env.NEXT_PUBLIC_BUG_COLLECTION_ID,
        bugId,
        {
            usersAssigned: prevUsersAssigned.filter(user => user !== userId),
        },
    )
}
