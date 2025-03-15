import { useState, useCallback } from 'react';
import { useChat, Message } from 'ai/react';

interface UseDifyChatOptions {
  apiKey: string;
  appId: string;
  initialMessages?: Message[];
  onResponse?: (response: Response) => void;
  onError?: (error: Error) => void;
}

export function useDifyChat({
  apiKey,
  appId,
  initialMessages = [],
  onResponse,
  onError,
}: UseDifyChatOptions) {
  const [conversationId, setConversationId] = useState<string>('');
  
  // Use Vercel's useChat hook with our custom API endpoint
  const chatHelpers = useChat({
    api: '/api/dify/chat',
    initialMessages,
    body: {
      apiKey,
      appId,
      conversationId,
    },
    onResponse: (response) => {
      // Extract conversation ID from response headers if available
      const responseConversationId = response.headers.get('x-conversation-id');
      if (responseConversationId) {
        setConversationId(responseConversationId);
      }
      
      onResponse?.(response);
    },
    onError,
  });

  // Add a method to reset conversation
  const resetConversation = useCallback(() => {
    setConversationId('');
    chatHelpers.reload();
  }, [chatHelpers]);

  return {
    ...chatHelpers,
    conversationId,
    resetConversation,
  };
}