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
    const video = formData.get('video') as File;

    if (!video) {
      return new Response(
        JSON.stringify({ error: 'Video is required' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    console.log('Decoding video:', video.name);

    // TODO: Replace with your Python backend URL
    const PYTHON_BACKEND_URL = Deno.env.get('PYTHON_BACKEND_URL') || 'http://localhost:8000';
    
    const backendFormData = new FormData();
    backendFormData.append('video', video);

    const response = await fetch(`${PYTHON_BACKEND_URL}/decode/video`, {
      method: 'POST',
      body: backendFormData,
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Python backend error:', errorText);
      return new Response(
        JSON.stringify({ error: 'Failed to decode video', details: errorText }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const result = await response.json();
    
    return new Response(
      JSON.stringify({ data: result.data || result.text || 'No data found' }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error('Error in decode-video function:', error);
    return new Response(
      JSON.stringify({ error: error instanceof Error ? error.message : 'Unknown error' }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
