// supabase/functions/verify-payment-session/index.ts
import { serve } from 'https://deno.land/std@0.131.0/http/server.ts'
import { corsHeaders } from '../_shared/cors.ts'
import Stripe from 'https://esm.sh/stripe@12.6.0?target=deno'

const stripe = new Stripe(Deno.env.get('STRIPE_SECRET_KEY') || '', {
  apiVersion: '2022-11-15',
  httpClient: Stripe.createFetchHttpClient(),
})

serve(async (req: Request) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    // Parse the request body
    const { sessionId } = await req.json()
    
    if (!sessionId) {
      return new Response(
        JSON.stringify({ error: 'Session ID is required' }),
        { 
          status: 400, 
          headers: { 
            ...corsHeaders,
            'Content-Type': 'application/json',
          } 
        }
      )
    }

    // Retrieve the checkout session from Stripe
    const session = await stripe.checkout.sessions.retrieve(
      sessionId,
      {
        expand: ['line_items', 'payment_intent']
      }
    )

    // If session exists, look up the order in the database (optional)
    // This would require database access, which you can implement
    // using the Supabase client if needed

    // Format the response data
    const responseData = {
      id: session.id,
      status: session.status,
      amount: session.amount_total,
      currency: session.currency,
      customer_email: session.customer_email,
      payment_status: session.payment_status,
      payment_method_types: session.payment_method_types,
      order_id: session.metadata?.order_id || null,
      // Include line items if needed
      items: session.line_items?.data.map((item: Stripe.LineItem) => ({
        name: item.description,
        quantity: item.quantity,
        amount: item.amount_total,
      })),
      // Add any additional data you need from the session
    }

    // Return the formatted data
    return new Response(
      JSON.stringify(responseData),
      { 
        status: 200, 
        headers: { 
          ...corsHeaders,
          'Content-Type': 'application/json',
        } 
      }
    )
    
  } catch (error) {
    // Handle errors
    console.error('Error:', error)
    
    // Type guard to safely access error properties
    const errorMessage = error instanceof Error 
      ? error.message 
      : 'An unknown error occurred';
      
    return new Response(
      JSON.stringify({ error: errorMessage }),
      { 
        status: 400, 
        headers: { 
          ...corsHeaders,
          'Content-Type': 'application/json',
        } 
      }
    )
  }
})