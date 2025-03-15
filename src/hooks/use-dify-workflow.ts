import { useState } from 'react';

interface UseDifyWorkflowOptions {
  apiKey: string;
  appId: string;
  onSuccess?: (data: any) => void;
  onError?: (error: Error) => void;
}

export function useDifyWorkflow({
  apiKey,
  appId,
  onSuccess,
  onError,
}: UseDifyWorkflowOptions) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const [data, setData] = useState<any>(null);

  const executeWorkflow = async (inputs: Record<string, any>, responseMode: 'streaming' | 'blocking' = 'blocking') => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/dify/workflow', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          apiKey,
          appId,
          inputs,
          responseMode,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to execute workflow');
      }

      if (responseMode === 'streaming') {
        // Return the response for streaming handling
        onSuccess?.(response);
        return response;
      } else {
        // Parse and return JSON for blocking mode
        const result = await response.json();
        setData(result);
        onSuccess?.(result);
        return result;
      }
    } catch (err: unknown) {    
      setError(err instanceof Error ? err : new Error('Unknown error'));
      onError?.(err instanceof Error ? err : new Error('Unknown error'));
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    executeWorkflow,
    isLoading,
    error,
    data,
  };
}