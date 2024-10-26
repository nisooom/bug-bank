export const runtime = "edge";

export const region = ["bom1", "hnd1"];

import { Client, Databases } from "appwrite";
import { ollama } from "ollama-ai-provider";
import { generateText } from "ai";
const client = new Client()
  .setEndpoint("https://cloud.appwrite.io/v1") // Your API Endpoint
  .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT); // Your project ID
import { createOllama } from "ollama-ai-provider";

const databases = new Databases(client);
const model = ollama("mistral");

export async function GetDocumentAndSendToLlama(docID) {
  try {
    const document = await databases.getDocument(
      process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID,
      process.env.NEXT_PUBLIC_APPWRITE_COLLECTION_ID,
      docID,
    );
    const response = await fetch(`${process.env.LLAMA_URL}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(document),
    });
    return await response.json();
  } catch (error) {
    console.error("Error sending document to LLAMA:", error);
    throw error;
  }
}

export async function TalkWithLlama({ title, description }) {
  try {
    const response = await fetch(`${process.env.LLAMA_URL}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ title, description }),
    });
    console.log("response", response);
    return await response.json();
  } catch (error) {
    console.error("Error sending document to LLAMA:", error);
    throw error;
  }
}

export async function TalkWithLlamaLocal({ content }) {
  try {
    const { text } = await generateText({
      model: model,
      system:
        "Given a big report from a user summarise it overall" +
        "should be less than 50 words always.",
      prompt: content,
    });
    return text;
  } catch (error) {
    console.error("Error sending document to LLAMA:", error);
    throw error;
  }
}
