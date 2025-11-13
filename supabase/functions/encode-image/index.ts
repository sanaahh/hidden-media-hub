import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const formData = await req.formData();
    const image = formData.get('image') as File;
    const message = formData.get('message') as string;

    if (!image || !message) {
      return new Response(
        JSON.stringify({ error: 'Image and message are required' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    console.log('Encoding image:', image.name, 'Message length:', message.length);

    // TODO: Replace with your Python backend URL
    const PYTHON_BACKEND_URL = Deno.env.get('PYTHON_BACKEND_URL') || 'http://localhost:8000';
    
    const backendFormData = new FormData();
    backendFormData.append('image', image);
    backendFormData.append('message', message);

    const response = await fetch(`${PYTHON_BACKEND_URL}/encode/image`, {
      method: 'POST',
      body: backendFormData,
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Python backend error:', errorText);
      return new Response(
        JSON.stringify({ error: 'Failed to encode image', details: errorText }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const encodedImage = await response.blob();
    
    return new Response(encodedImage, {
      headers: {
        ...corsHeaders,
        'Content-Type': 'image/png',
        'Content-Disposition': 'attachment; filename="encoded-image.png"',
      },
    });
  } catch (error) {
    console.error('Error in encode-image function:', error);
    return new Response(
      JSON.stringify({ error: error instanceof Error ? error.message : 'Unknown error' }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
