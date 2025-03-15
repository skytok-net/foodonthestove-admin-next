import { NextRequest, NextResponse } from 'next/server';
import { DifyClient } from 'dify-client';

export const runtime = 'edge';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    
    // Extract OpenAI-style parameters
    const {
      messages,
      model,
      temperature,
      max_tokens,
      stream = false,
      // Dify-specific parameters
      dify_api_key,
      dify_app_id,
    } = body;

    // Validate Dify-specific parameters
    if (!dify_api_key) {
      return NextResponse.json(
        { error: { message: 'Missing dify_api_key parameter' } },
        { status: 400 }
      );
    }

    if (!dify_app_id) {
      return NextResponse.json(
        { error: { message: 'Missing dify_app_id parameter' } },
        { status: 400 }
      );
    }

    // Validate messages
    if (!messages || !Array.isArray(messages) || messages.length === 0) {
      return NextResponse.json(
        { error: { message: 'Invalid or missing messages parameter' } },
        { status: 400 }
      );
    }

    // Extract the last user message as the query
    const lastUserMessage = messages.findLast(msg => msg.role === 'user');
    if (!lastUserMessage) {
      return NextResponse.json(
        { error: { message: 'No user message found in the messages array' } },
        { status: 400 }
      );
    }

    // Initialize Dify client with string URL
    const difyClient = new DifyClient(
      dify_api_key,
      process.env.NEXT_PUBLIC_DIFY_API_URL || 'https://api.dify.ai/v1'
    );

    // Prepare conversation history if needed
    const conversationId = req.headers.get('x-conversation-id') || '';
    
    // Prepare the request data
    const requestData = {
      query: typeof lastUserMessage.content === 'string' 
        ? lastUserMessage.content 
        : JSON.stringify(lastUserMessage.content),
      inputs: {},
      response_mode: stream ? 'streaming' : 'blocking',
      conversation_id: conversationId,
      user: 'openai-compatible-user',
    };

    // Make direct API call instead of using the client
    const baseURL = process.env.NEXT_PUBLIC_DIFY_API_URL || 'https://api.dify.ai/v1';
    
    // Handle streaming response
    if (stream) {
      // Create a TransformStream to process the response
      const { readable, writable } = new TransformStream();
      
      // Make the fetch request
      fetch(`${baseURL}/chat-messages?app_id=${dify_app_id}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${dify_api_key}`
        },
        body: JSON.stringify(requestData)
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
      }).catch((error: Error) => {
        console.error('Error making request to Dify API:', error);
        const writer = writable.getWriter();
        writer.write(new TextEncoder().encode(JSON.stringify({ error: error.message })));
        writer.close();
      });

      return new Response(readable, {
        headers: {
          'Content-Type': 'text/plain; charset=utf-8',
          'x-conversation-id': conversationId,
        },
      });
    } 
    // Handle blocking response
    else {
      const response = await fetch(`${baseURL}/chat-messages?app_id=${dify_app_id}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${dify_api_key}`
        },
        body: JSON.stringify(requestData)
      });

      if (!response.ok) {
        const errorData = await response.json();
        return NextResponse.json(
          { error: { message: 'Dify API error', details: errorData } },
          { status: response.status }
        );
      }

      const responseData = await response.json();
      
      // Format response to match OpenAI's format
      const openAICompatibleResponse = {
        id: `chatcmpl-${Date.now()}`,
        object: 'chat.completion',
        created: Math.floor(Date.now() / 1000),
        model: model || 'dify-chat',
        choices: [
          {
            index: 0,
            message: {
              role: 'assistant',
              content: responseData.answer || '',
            },
            finish_reason: 'stop',
          },
        ],
        usage: {
          prompt_tokens: 0, // Dify doesn't provide token counts
          completion_tokens: 0,
          total_tokens: 0,
        },
      };

      return NextResponse.json(openAICompatibleResponse, {
        headers: {
          'x-conversation-id': responseData.conversation_id || '',
        },
      });
    }
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
    console.error('Error in OpenAI-compatible API:', error);
    return NextResponse.json(
      { error: { message: errorMessage } },
      { status: 500 }
    );
  }
}