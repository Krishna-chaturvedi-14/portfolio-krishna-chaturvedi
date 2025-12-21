import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const redisUrl = Deno.env.get('UPSTASH_REDIS_REST_URL');
    const redisToken = Deno.env.get('UPSTASH_REDIS_REST_TOKEN');

    if (!redisUrl || !redisToken) {
      console.error('Missing Upstash Redis credentials');
      return new Response(
        JSON.stringify({ error: 'Redis configuration missing' }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Use Upstash Redis REST API to increment the counter
    const response = await fetch(`${redisUrl}/incr/portfolio:visits`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${redisToken}`,
      },
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Upstash Redis error:', errorText);
      return new Response(
        JSON.stringify({ error: 'Failed to increment counter' }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const data = await response.json();
    const count = data.result;

    console.log('Visitor count incremented to:', count);

    return new Response(
      JSON.stringify({ count }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error('Error in visitor function:', error);
    const message = error instanceof Error ? error.message : 'Unknown error';
    return new Response(
      JSON.stringify({ error: message }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
