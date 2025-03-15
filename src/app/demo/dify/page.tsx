'use client';

import { useState } from 'react';
import { DifyChat } from '@/components/ui/dify-chat';
import { DifyWorkflow } from '@/components/ui/dify-workflow';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export default function DifyDemoPage() {
  const [apiKey, setApiKey] = useState('');
  const [chatAppId, setChatAppId] = useState('');
  const [workflowAppId, setWorkflowAppId] = useState('');
  const [isConfigured, setIsConfigured] = useState(false);

  const handleConfigure = (e: React.FormEvent) => {
    e.preventDefault();
    setIsConfigured(true);
  };

  const workflowInputFields = [
    {
      name: 'name',
      label: 'Your Name',
      type: 'text' as const,
      placeholder: 'Enter your name',
      required: true,
    },
    {
      name: 'topic',
      label: 'Topic',
      type: 'text' as const,
      placeholder: 'Enter a topic',
      required: true,
    },
  ];

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-8 text-center">Dify AI Integration Demo</h1>

      {!isConfigured ? (
        <Card className="max-w-md mx-auto">
          <CardHeader>
            <CardTitle>Configure Dify Integration</CardTitle>
            <CardDescription>
              Enter your Dify API key and application IDs to get started.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleConfigure} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="apiKey">Dify API Key</Label>
                <Input
                  id="apiKey"
                  value={apiKey}
                  onChange={(e) => setApiKey(e.target.value)}
                  placeholder="Enter your Dify API key"
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="chatAppId">Chat Application ID</Label>
                <Input
                  id="chatAppId"
                  value={chatAppId}
                  onChange={(e) => setChatAppId(e.target.value)}
                  placeholder="Enter your Dify Chat App ID"
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="workflowAppId">Workflow Application ID</Label>
                <Input
                  id="workflowAppId"
                  value={workflowAppId}
                  onChange={(e) => setWorkflowAppId(e.target.value)}
                  placeholder="Enter your Dify Workflow App ID"
                />
              </div>
              
              <button
                type="submit"
                className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700"
              >
                Configure
              </button>
            </form>
          </CardContent>
        </Card>
      ) : (
        <Tabs defaultValue="chat" className="max-w-4xl mx-auto">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="chat">Chat Application</TabsTrigger>
            <TabsTrigger value="workflow">Workflow Application</TabsTrigger>
          </TabsList>
          
          <TabsContent value="chat" className="mt-6">
            <DifyChat 
              apiKey={apiKey} 
              appId={chatAppId} 
              title="Dify Chat Demo" 
            />
          </TabsContent>
          
          <TabsContent value="workflow" className="mt-6">
            <DifyWorkflow
              apiKey={apiKey}
              appId={workflowAppId}
              title="Dify Workflow Demo"
              inputFields={workflowInputFields}
            />
          </TabsContent>
        </Tabs>
      )}
    </div>
  );
}