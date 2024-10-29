// /api/report/route.js
import { NextResponse } from "next/server";
import { createNewBugReport } from "@/lib/db/bug-queries";
import { getProjectByAPIKey } from "@/lib/db/getProject";
// Enable CORS for specific origin
const corsHeaders = {
  "Access-Control-Allow-Origin": "http://localhost:3001",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, X-Secret-Key",
};

export async function OPTIONS() {
  return new NextResponse(null, {
    status: 204,
    headers: corsHeaders,
  });
}

export async function POST(req) {
  // Add CORS headers to all responses
  const baseHeaders = {
    ...corsHeaders,
    "Content-Type": "application/json",
  };

  const secretKey = req.headers.get("X-Secret-Key");
  if (!secretKey) {
    return NextResponse.json(
      {
        success: false,
        error: "Missing API key",
      },
      {
        status: 401,
        headers: baseHeaders,
      },
    );
  }

  const apiKeyExists = await getProjectByAPIKey(secretKey);

  if (!apiKeyExists) {
    return NextResponse.json(
      {
        success: false,
        error: "Invalid API key",
      },
      {
        status: 401,
        headers: baseHeaders,
      },
    );
  }
  const projectID = apiKeyExists.$id;

  try {
    // Log incoming request
    console.log("Received POST request to /api/report");

    // Parse request body
    const data = await req.json();
    console.log("Request data:", data);

    // Validate required fields
    const requiredFields = ["title", "description"];
    const missingFields = requiredFields.filter((field) => !data[field]);

    if (missingFields.length > 0) {
      console.log("Missing required fields:", missingFields);
      return NextResponse.json(
        {
          success: false,
          error: `Missing required fields: ${missingFields.join(", ")}`,
        },
        {
          status: 400,
          headers: baseHeaders,
        },
      );
    }

    // Create the bug report
    const result = await createNewBugReport({
      title: data.title,
      description: data.description,
      reporteeEmail: data.reporteeEmail,
      imageUrls: data.images || null,
      projectId: projectID,
    });

    console.log("Bug report created successfully:", result);

    return NextResponse.json(
      {
        success: true,
        message: "Bug report created successfully",
        data: result,
      },
      {
        status: 200,
        headers: baseHeaders,
      },
    );
  } catch (error) {
    console.error("Error processing bug report:", error);

    return NextResponse.json(
      {
        success: false,
        error: "Failed to process bug report",
        details: error.message,
      },
      {
        status: 500,
        headers: baseHeaders,
      },
    );
  }
}
