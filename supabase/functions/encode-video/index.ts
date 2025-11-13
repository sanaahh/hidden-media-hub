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
    const data = formData.get('data') as string;

    if (!video || !data) {
      return new Response(
        JSON.stringify({ error: 'Video and data are required' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    console.log('Encoding video:', video.name, 'Data length:', data.length);

    // TODO: Replace with your Python backend URL
    const PYTHON_BACKEND_URL = Deno.env.get('PYTHON_BACKEND_URL') || 'http://localhost:8000';
    
    const backendFormData = new FormData();
    backendFormData.append('video', video);
    backendFormData.append('data', data);

    const response = await fetch(`${PYTHON_BACKEND_URL}/encode/video`, {
      method: 'POST',
      body: backendFormData,
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Python backend error:', errorText);
      return new Response(
        JSON.stringify({ error: 'Failed to encode video', details: errorText }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const encodedVideo = await response.blob();
    
    return new Response(encodedVideo, {
      headers: {
        ...corsHeaders,
        'Content-Type': 'video/mp4',
        'Content-Disposition': 'attachment; filename="encoded-video.mp4"',
      },
    });
  } catch (error) {
    console.error('Error in encode-video function:', error);
    return new Response(
      JSON.stringify({ error: error instanceof Error ? error.message : 'Unknown error' }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
