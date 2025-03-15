import { NextRequest, NextResponse } from 'next/server';

export const runtime = 'edge';
export const maxDuration = 300;

export async function POST(req: NextRequest) {
  try {
    const {
      inputs,
      user,
      files,
      appId
    } = await req.json();

    // Check if API key is provided
    const apiKey = req.headers.get('authorization')?.split(' ')[1];
    if (!apiKey) {
      return NextResponse.json(
        { error: 'Missing API key' },
        { status: 401 }
      );
    }

    // Check if appId is provided
    if (!appId) {
      return NextResponse.json(
        { error: 'Missing appId' },
        { status: 400 }
      );
    }

    // Prepare the request data
    const data = {
      inputs,
      user: user || 'default-user',
      response_mode: 'streaming',
      files
    };

    // Make the request to the Dify API
    const baseUrl = process.env.NEXT_PUBLIC_DIFY_API_URL || 'https://api.dify.ai/v1';
    const url = `${baseUrl}/completion-messages`;

    // Create a TransformStream to process the response
    const { readable, writable } = new TransformStream();
    
    // Make the fetch request
    fetch(`${url}?app_id=${appId}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`
      },
      body: JSON.stringify(data)
    }).then(async (response) => {
      if (!response.ok) {
        const errorData = await response.json();
        const writer = writable.getWriter();
        writer.write(new TextEncoder().encode(JSON.stringify({ error: errorData })));
        writer.close();
        return;
      }

      const reader = response.body?.getReader();
      const writer = writable.getWriter();

      if (!reader) {
        writer.write(new TextEncoder().encode(JSON.stringify({ error: 'No response body' })));
        writer.close();
        return;
      }

      try {
        while (true) {
          const { done, value } = await reader.read();
          if (done) break;
          writer.write(value);
        }
      } catch (error) {
        console.error('Error reading from stream:', error);
      } finally {
        writer.close();
        reader.releaseLock();
      }
    }).catch((error) => {
      console.error('Error making request to Dify API:', error);
      const writer = writable.getWriter();
      writer.write(new TextEncoder().encode(JSON.stringify({ error: error.message })));
      writer.close();
    });

    // Return the stream response
    return new Response(readable, {
      headers: {
        'Content-Type': 'text/plain; charset=utf-8'
      }
    });
  } catch (error: any) {
    console.error('Error in Dify workflow API:', error);
    return NextResponse.json(
      { error: error.message || 'An error occurred' },
      { status: 500 }
    );
  }
}