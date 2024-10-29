import { NextResponse } from "next/server";
import { getProjectByAPIKey } from "@/lib/db/getProject";
import { createNewBugReport } from "@/lib/db/bug-queries";
export async function POST(req) {
  try {
    const secretKey = req.headers.get("X-Secret-Key");

    const apiExists = true;
    const project = await getProjectByAPIKey(secretKey);
    if (!project) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    const projectId = project["$id"];
    console.log("Project ID:", projectId);
    if (!secretKey || !apiExists) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const data = await req.json();

    console.log("Received body:", data);

    const requiredParams = ["title", "description"];
    const optionalParams = ["reporteeEmail", "images"];

    for (const param of requiredParams) {
      if (!data[param]) {
        return NextResponse.json(
          { error: `Missing required parameter: ${param}` },
          { status: 400 },
        );
      }
    }

    for (const param of optionalParams) {
      if (!data[param]) {
        data[param] = null;
      }
    }

    await createNewBugReport({
      title: data.title,
      description: data.description,
      reporteeEmail: data.reporteeEmail,
      imageUrls: data.images,
      projectId,
    });
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error parsing JSON:", error);
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }
}
