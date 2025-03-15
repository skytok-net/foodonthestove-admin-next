'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { toast } from 'sonner';
import { Loader2 } from 'lucide-react';
import { AtpAgent } from '@atproto/api';
import { signIn } from 'next-auth/react';

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormDescription,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { CheckCircle2 } from 'lucide-react';

// Define the form schema with Zod
const registerSchema = z.object({
  handle: z.string().min(3, 'Handle must be at least 3 characters'),
  email: z.string().email('Invalid email address'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
  confirmPassword: z.string().min(1, 'Please confirm your password'),
  stationCode: z.string().min(1, 'Station code is required'),
  pdsService: z.string().default('bsky.social'),
  customPds: z.boolean().default(false),
  termsAccepted: z.boolean().refine(val => val === true, {
    message: 'You must accept the terms and conditions',
  }),
}).refine(data => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ['confirmPassword'],
});

type RegisterFormValues = z.infer<typeof registerSchema>;

export function RegisterForm() {
  const router = useRouter();

  const [validatedStation, setValidatedStation] = useState<{ stationId: string, name: string } | null>(null);
  const [isValidatingStation, setIsValidatingStation] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  // Initialize form with default values
  const form = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      handle: '',
      email: '',
      password: '',
      confirmPassword: '',
      stationCode: '',
      pdsService: 'bsky.social',
      customPds: false,
      termsAccepted: false,
    },
  });
  
  // Show auth errors
  useEffect(() => {
    if (error) {
      toast.error(error);
    }
  }, [error]);

  // We don't need to update validated station from stationInfo anymore
  // as we're using the unified auth store
  
  // Function to validate station code
  const validateStationCode = async (code: string) => {
    if (!code) return;
    
    setIsValidatingStation(true);
    try {
      // This is a mock validation - in a real app, you would validate against your backend
      // For demo purposes, we'll just check if the code is at least 4 characters
      if (code.length >= 4) {
        setValidatedStation({
          stationId: `station-${code}`,
          name: `Fire Station ${code}`
        });
        toast.success(`Station validated: Fire Station ${code}`);
      } else {
        setValidatedStation(null);
        toast.error('Invalid station code');
      }
    } catch (error) {
      setValidatedStation(null);
      toast.error(error instanceof Error ? error.message : 'Failed to validate station code');
    } finally {
      setIsValidatingStation(false);
    }
  };
  
  const onSubmit = async (values: RegisterFormValues) => {
    try {
      setIsLoading(true);
      setError(null);
      
      // Ensure station code is validated
      if (!validatedStation) {
        toast.error('Please validate your station code first');
        setIsLoading(false);
        return;
      }
      
      // Determine which PDS service to use
      const service = values.customPds ? values.pdsService : 'https://bsky.social';
      
      // Create an instance of AtpAgent
      const agent = new AtpAgent({ service });
      
      // Show loading toast
      const loadingToast = toast.loading('Creating your account...');
      
      try {
        // Register with AT Protocol
        const result = await agent.createAccount({
          handle: values.handle,
          email: values.email,
          password: values.password,
          // You might want to store additional metadata like station code
          // This would require custom implementation on your server
        });
        
        toast.dismiss(loadingToast);
        
        if (!result.success) {
          toast.error('Registration failed');
          setError('Registration failed. Please try again.');
          return;
        }
        
        // Registration successful!
        toast.success('Registration successful!');
        
        // Store station code in local storage or your preferred state management
        // This is just an example - you might want to handle this differently
        localStorage.setItem('stationCode', values.stationCode);
        
        // Automatically sign in the user with the new credentials
        const signInResult = await signIn('atprotocol', {
          identifier: values.handle,
          password: values.password,
          service: service,
          stationCode: values.stationCode,
          redirect: false,
          callbackUrl: '/admin'
        });
        
        if (signInResult?.ok) {
          // Redirect to the admin dashboard
          router.push(signInResult.url || '/admin');
          router.refresh();
        } else {
          // If auto-login fails, redirect to login page
          toast.info('Please log in with your new credentials');
          router.push('/auth/login');
        }
      } catch (error: unknown) {
        toast.dismiss(loadingToast);
        console.error('Registration error:', error);
        
        // Handle specific AT Protocol errors
        const err = error as { status?: number; message?: string };
        
        if (err.status === 409) {
          setError('This handle is already taken. Please choose another one.');
        } else if (err.message?.includes('invalid email')) {
          setError('Invalid email address.');
        } else if (err.message?.includes('handle')) {
          setError('Invalid handle. Handles must be 3-20 characters and can only contain a-z, 0-9, and hyphens.');
        } else {
          setError(err.message || 'Registration failed. Please try again.');
        }
      }
    } catch (err) {
      console.error(err);
      setError(err instanceof Error ? err.message : 'An unexpected error occurred');
    } finally {
      setIsLoading(false);
    }
  };
  
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="handle"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Handle</FormLabel>
              <FormControl>
                <Input placeholder="e.g. yourname" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input type="email" placeholder="your.email@example.com" {...field} />
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
          name="confirmPassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Confirm Password</FormLabel>
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
              <div className="flex space-x-2">
                <FormControl>
                  <Input 
                    placeholder="Enter your station code" 
                    {...field} 
                    onChange={(e) => {
                      field.onChange(e);
                      setValidatedStation(null); // Reset validation when code changes
                    }}
                  />
                </FormControl>
                <Button 
                  type="button" 
                  variant="outline" 
                  onClick={() => validateStationCode(field.value)}
                  disabled={isValidatingStation || !field.value}
                >
                  {isValidatingStation ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Validating...
                    </>
                  ) : (
                    'Validate'
                  )}
                </Button>
              </div>
              <FormDescription>
                Enter the station code provided by your fire department
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        
        {validatedStation && (
          <Alert className="bg-green-50 border-green-200 dark:bg-green-950 dark:border-green-900">
            <CheckCircle2 className="h-4 w-4 text-green-600 dark:text-green-400" />
            <AlertTitle className="text-green-800 dark:text-green-300">Station Validated</AlertTitle>
            <AlertDescription className="text-green-700 dark:text-green-400">
              {validatedStation.name} (ID: {validatedStation.stationId})
            </AlertDescription>
          </Alert>
        )}
        
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
            name="pdsService"
            render={({ field }) => (
              <FormItem>
                <FormLabel>PDS Service</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        )}
        
        <FormField
          control={form.control}
          name="termsAccepted"
          render={({ field }) => (
            <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md">
              <FormControl>
                <Checkbox
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
              <div className="space-y-1 leading-none">
                <FormLabel>
                  I accept the <Link href="/terms" className="text-primary hover:underline">terms and conditions</Link>
                </FormLabel>
              </div>
            </FormItem>
          )}
        />
        
        <Button
          type="submit"
          disabled={isLoading || !validatedStation}
          className="w-full"
        >
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Creating account...
            </>
          ) : (
            'Create Account'
          )}
        </Button>
        
        <div className="text-center mt-4">
          <p className="text-sm text-muted-foreground">
            Already have an account?{' '}
            <Link href="/login" className="text-primary hover:underline">
              Sign in
            </Link>
          </p>
        </div>
      </form>
    </Form>
  );
}
