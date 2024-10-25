// app/api/handler/route.js
import { NextRequest, NextResponse } from 'next/server';
import { Client, Databases } from 'appwrite';

import { getBugsFromAPI } from '@/lib/db/getReports';

const client = new Client();
client
  .setEndpoint('http://localhost:8000/v1') // Your API Endpoint
  .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT) // Your project ID

const database = new Databases(client);


export async function POST(request) {
  try {
    const body = await request.json(); // Parse the incoming JSON body

    // Debugging: Log the body to see what is received
    console.log('Received body:', body);

    // Get the API key from the body

    // Fetch the bugs from the Appwrite API
    const bugs = await getBugsFromAPI(body.apikey);


    // Return a response
    return NextResponse.json({ "message": bugs });
  } catch (error) {
    console.error('Error parsing JSON:', error);
    return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 });
  }
}
