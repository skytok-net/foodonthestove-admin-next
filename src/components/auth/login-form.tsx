'use client';

import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { toast } from 'sonner';
import { Loader2 } from 'lucide-react';
import { signIn } from 'next-auth/react';

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { AlertCircle } from 'lucide-react';

// Define the form schema with Zod
const loginSchema = z.object({
  identifier: z.string().min(1, 'Handle or email is required'),
  password: z.string().min(1, 'Password is required'),
  stationCode: z.string().optional(),
  service: z.string().default(process.env.NEXT_PUBLIC_BSKY_SERVICE || 'https://bsky.social'),
  customPds: z.boolean().default(false),
});

type LoginFormValues = z.infer<typeof loginSchema>;

export function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  // Check if user was redirected due to session expiration
  const expired = searchParams ? searchParams.get('expired') === 'true' : false;
  const callbackUrl = searchParams?.get('callbackUrl') || '/admin';
  
  // Show toast for session expiration
  useEffect(() => {
    if (expired) {
      toast.error('Your session has expired. Please log in again.');
    }
  }, [expired]);
  
  // Show auth errors
  useEffect(() => {
    if (error) {
      toast.error(error);
    }
  }, [error]);
  
  // Initialize form with default values
  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      identifier: '',
      password: '',
      stationCode: '',
      service: process.env.NEXT_PUBLIC_BSKY_SERVICE || 'https://bsky.social',
      customPds: false,
    },
  });
  
  const isSubmitting = form.formState.isSubmitting;
  
  const onSubmit = async (values: LoginFormValues) => {
    try {
      setIsLoading(true);
      setError(null);
      
      // Determine which service to use
      const serviceUrl = values.customPds ? values.service : (process.env.NEXT_PUBLIC_BSKY_SERVICE || 'https://bsky.social');
      
      // Validate inputs before attempting login
      if (!values.identifier || !values.password) {
        setError('Please provide both identifier and password');
        return;
      }
      
      // If station code is provided, we'll pass it as custom data
      const stationCode = values.stationCode?.trim() || '';
      if (!stationCode) {
        toast.warning('Station code is highly recommended - without it, only admin users can log in');
      }
      
      // Show loading toast
      const loadingToast = toast.loading('Logging in...');
      
      // Use NextAuth signIn with our custom provider
      const result = await signIn('atprotocol', {
        identifier: values.identifier,
        password: values.password,
        service: serviceUrl,
        stationCode: stationCode,
        redirect: false,
        callbackUrl
      });
      
      // Dismiss loading toast
      toast.dismiss(loadingToast);
      
      if (!result?.ok) {
        // Handle authentication errors
        if (result?.error === 'CredentialsSignin') {
          setError('Invalid credentials. Please check your username and password.');
        } else if (result?.error?.includes('Invalid station code')) {
          setError('The station code you provided is invalid. Please check and try again.');
        } else if (result?.error?.includes('not an admin')) {
          setError('You need admin privileges or a valid station code to log in.');
        } else {
          setError(result?.error || 'Login failed. Please try again.');
        }
        return;
      }
      
      // Success!
      toast.success('Login successful!');
      
      // Redirect to the callback URL or dashboard
      router.push(result.url || '/admin/dashboard');
      router.refresh();
      
    } catch (err) {
      console.error('Login form error:', err);
      setError('An unexpected error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };
  
  return (
    <div className="space-y-6">
      <div className="space-y-2 text-center">
        <h1 className="text-3xl font-bold">Login</h1>
        <p className="text-muted-foreground text-sm">
          Enter your credentials to access your account
        </p>
      </div>
      
      {expired && (
        <Alert variant="destructive" className="mb-4">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Session Expired</AlertTitle>
          <AlertDescription>
            Your session has expired. Please log in again to continue.
          </AlertDescription>
        </Alert>
      )}
      
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="identifier"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Handle or Email</FormLabel>
                <FormControl>
                  <Input placeholder="e.g. alice.bsky.social" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input type="password" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="stationCode"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Station Code</FormLabel>
                <FormControl>
                  <Input placeholder="Required for firefighters only" {...field} />
                </FormControl>
                <p className="text-sm text-muted-foreground mt-1">Only required if you are a firefighter</p>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="customPds"
            render={({ field }) => (
              <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md">
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
                <div className="space-y-1 leading-none">
                  <FormLabel>Use custom PDS server</FormLabel>
                </div>
              </FormItem>
            )}
          />
          
          {form.watch('customPds') && (
            <FormField
              control={form.control}
              name="service"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Service URL</FormLabel>
                  <FormControl>
                    <Input placeholder="https://bsky.social" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          )}
          
          <Button
            type="submit"
            disabled={isLoading}
            className="w-full"
          >
            {isLoading || isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Logging in...
              </>
            ) : (
              'Login'
            )}
          </Button>
        </form>
      </Form>
    </div>
  );
}
