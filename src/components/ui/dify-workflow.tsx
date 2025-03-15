'use client';

import { useState } from 'react';
import { useDifyWorkflow } from '@/hooks/use-dify-workflow';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';

interface DifyWorkflowProps {
  apiKey: string;
  appId: string;
  title?: string;
  inputFields: Array<{
    name: string;
    label: string;
    type: 'text' | 'number' | 'email';
    placeholder?: string;
    required?: boolean;
  }>;
}

export function DifyWorkflow({ 
  apiKey, 
  appId, 
  title = 'Execute Workflow', 
  inputFields 
}: DifyWorkflowProps) {
  const [inputs, setInputs] = useState<Record<string, any>>({});
  const [result, setResult] = useState<string | null>(null);
  
  const { executeWorkflow, isLoading, error } = useDifyWorkflow({
    apiKey,
    appId,
    onSuccess: (data) => {
      if (data.choices && data.choices.length > 0) {
        setResult(data.choices[0].message.content);
      } else {
        setResult(JSON.stringify(data, null, 2));
      }
    },
  });

  const handleInputChange = (name: string, value: string) => {
    setInputs((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setResult(null);
    await executeWorkflow(inputs);
  };

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          {inputFields.map((field) => (
            <div key={field.name} className="space-y-2">
              <Label htmlFor={field.name}>{field.label}</Label>
              <Input
                id={field.name}
                type={field.type}
                placeholder={field.placeholder}
                required={field.required}
                value={inputs[field.name] || ''}
                onChange={(e) => handleInputChange(field.name, e.target.value)}
              />
            </div>
          ))}
          
          <Button type="submit" disabled={isLoading} className="w-full">
            {isLoading ? 'Processing...' : 'Execute Workflow'}
          </Button>
        </form>

        {error && (
          <div className="mt-4 p-4 bg-red-100 text-red-800 rounded-md">
            {error.message}
          </div>
        )}

        {result && (
          <div className="mt-4">
            <h3 className="text-lg font-medium mb-2">Result:</h3>
            <div className="p-4 bg-gray-100 rounded-md whitespace-pre-wrap">
              {result}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}