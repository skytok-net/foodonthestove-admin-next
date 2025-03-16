// create-checkout-session.ts
import Stripe from "stripe";
import { createClient } from "@supabase/supabase-js";

const stripe = new Stripe(Deno.env.get("STRIPE_SECRET_KEY"));
const supabase = createClient(
  Deno.env.get("SUPABASE_URL"),
  Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")
);

Deno.serve(async (req) => {
  const { amount, userId, successUrl, cancelUrl } = await req.json();
  
  const { data: user } = await supabase
    .from("users")
    .select("stripe_customer_id, email")
    .eq("id", userId)
    .single();

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card", "mobilepay"],
    line_items: [{
      price_data: {
        currency: "usd",
        product_data: { name: "Tribe Health Order" },
        unit_amount: Math.round(amount * 100)
      },
      quantity: 1
    }],
    mode: "payment",
    customer: user.stripe_customer_id,
    success_url: `${successUrl}?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: cancelUrl,
    metadata: { supabase_user_id: userId }
  });

  return new Response(JSON.stringify({
    checkoutUrl: session.url,
    sessionId: session.id
  }));
});
