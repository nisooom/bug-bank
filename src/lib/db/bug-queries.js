"use server";

import { ID, Query } from "appwrite";
import { databases } from "./appwrite";

// only these fields are used for creating a new bug report
// all other fields are supposed to be updated using `updateBug`
export const createNewBugReport = async ({
  title,
  description,
  reporteeEmail = null,
  imageUrls = [],
  projectId,
}) => {
  const report = {
    title,
    description,
    imageUrls,
    reporteeEmail,
    projectId,
  };

  const newId = ID.unique()
  await databases.createDocument(
    process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID,
    process.env.NEXT_PUBLIC_BUG_COLLECTION_ID,
    newId,
    report,
  );

  console.log("BUG CREATE:", newId, JSON.stringify(report))
};

export const updateBug = async ({ bugId, data }) => {
  await databases.updateDocument(
    process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID,
    process.env.NEXT_PUBLIC_BUG_COLLECTION_ID,
    bugId,
    data,
  );

  console.log("BUG UPDATE:", bugId, JSON.stringify(data))
};

/* UNTESTED FUNCTION */
export const getUsersAssigned = async (bugId) => {
  const doc = await databases.getDocument(
    process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID,
    process.env.NEXT_PUBLIC_BUG_COLLECTION_ID,
    bugId,
    [Query.select("usersAssigned")],
  );

  return doc.usersAssigned;
};

/* UNTESTED FUNCTION */
export const assignUsers = async ({ bugId, userId }) => {
  const prevUsersAssigned = getUsersAssigned(bugId);

  await databases.updateDocument(
    process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID,
    process.env.NEXT_PUBLIC_BUG_COLLECTION_ID,
    bugId,
    {
      usersAssigned: [...prevUsersAssigned, userId],
    },
  );
};

/* UNTESTED FUNCTION */
export const unassignUsers = async ({ bugId, userId }) => {
  const prevUsersAssigned = getUsersAssigned(bugId);

  await databases.updateDocument(
    process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID,
    process.env.NEXT_PUBLIC_BUG_COLLECTION_ID,
    bugId,
    {
      usersAssigned: prevUsersAssigned.filter((user) => user !== userId),
    },
  );
};
