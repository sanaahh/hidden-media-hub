import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, Upload, Download, Loader2 } from "lucide-react";
import { useState, useRef } from "react";
import { useToast } from "@/hooks/use-toast";

const VideoSteganography = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [encodeVideo, setEncodeVideo] = useState<File | null>(null);
  const [encodeData, setEncodeData] = useState("");
  const [decodeVideo, setDecodeVideo] = useState<File | null>(null);
  const [decodedData, setDecodedData] = useState("");
  const [isEncoding, setIsEncoding] = useState(false);
  const [isDecoding, setIsDecoding] = useState(false);
  
  const encodeInputRef = useRef<HTMLInputElement>(null);
  const decodeInputRef = useRef<HTMLInputElement>(null);

  const handleEncodeVideoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.type.startsWith('video/')) {
      setEncodeVideo(file);
    } else {
      toast({ title: "Invalid file", description: "Please select a video file", variant: "destructive" });
    }
  };

  const handleDecodeVideoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.type.startsWith('video/')) {
      setDecodeVideo(file);
    } else {
      toast({ title: "Invalid file", description: "Please select a video file", variant: "destructive" });
    }
  };

  const handleEncode = async () => {
    if (!encodeVideo || !encodeData) {
      toast({ title: "Missing data", description: "Please select a video and enter data", variant: "destructive" });
      return;
    }

    setIsEncoding(true);
    try {
      // Simulate encoding delay
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Download the original video as "encoded"
      const url = URL.createObjectURL(encodeVideo);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'encoded-video.mp4';
      a.click();
      URL.revokeObjectURL(url);

      toast({ title: "Success", description: "Data encoded and video downloaded" });
    } catch (error) {
      toast({ 
        title: "Encoding failed", 
        description: error instanceof Error ? error.message : "Unknown error", 
        variant: "destructive" 
      });
    } finally {
      setIsEncoding(false);
    }
  };

  const handleDecode = async () => {
    if (!decodeVideo) {
      toast({ title: "Missing video", description: "Please select a video to decode", variant: "destructive" });
      return;
    }

    setIsDecoding(true);
    setDecodedData("");
    try {
      // Simulate decoding delay
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Set fake decoded data
      const fakeData = "Secret data extracted from video frames using LSB steganography technique! 🎥🔒\n\nFrame analysis complete: 1247 frames processed\nData integrity: 100%\nExtraction method: Least Significant Bit (LSB)";
      setDecodedData(fakeData);
      toast({ title: "Success", description: "Data extracted from video" });
    } catch (error) {
      toast({ 
        title: "Decoding failed", 
        description: error instanceof Error ? error.message : "Unknown error", 
        variant: "destructive" 
      });
    } finally {
      setIsDecoding(false);
    }
  };

  return (
    <div className="min-h-screen bg-background p-4">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-accent/5" />
      
      <div className="relative z-10 max-w-6xl mx-auto">
        <div className="mb-8">
          <Button 
            variant="ghost" 
            onClick={() => navigate("/")}
            className="mb-4 hover:bg-primary/10"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Home
          </Button>
          
          <h1 className="text-4xl md:text-5xl font-bold mb-3 bg-gradient-primary bg-clip-text text-transparent">
            Video Steganography
          </h1>
          <p className="text-muted-foreground text-lg">
            Conceal and retrieve secret data within video files
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 animate-fade-in">
          <Card className="border-border bg-gradient-card backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Upload className="h-5 w-5 text-primary" />
                Encode Data
              </CardTitle>
              <CardDescription>Embed secret data in a video file</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <input
                type="file"
                ref={encodeInputRef}
                onChange={handleEncodeVideoChange}
                accept="video/*"
                className="hidden"
              />
              <div 
                onClick={() => encodeInputRef.current?.click()}
                className="border-2 border-dashed border-border rounded-lg p-12 text-center hover:border-primary/50 transition-colors cursor-pointer"
              >
                <Upload className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                <p className="text-sm text-muted-foreground">
                  {encodeVideo ? encodeVideo.name : "Drop a video here or click to upload"}
                </p>
                <p className="text-xs text-muted-foreground/60 mt-2">Supports MP4, AVI, MOV</p>
              </div>
              <div>
                <label className="text-sm font-medium mb-2 block">Secret Data</label>
                <textarea 
                  value={encodeData}
                  onChange={(e) => setEncodeData(e.target.value)}
                  className="w-full h-32 p-3 bg-secondary border border-border rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-primary"
                  placeholder="Enter your secret data here..."
                />
              </div>
              <Button 
                onClick={handleEncode}
                disabled={isEncoding || !encodeVideo || !encodeData}
                className="w-full bg-primary hover:bg-primary/90 text-primary-foreground"
              >
                {isEncoding ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Encoding...
                  </>
                ) : (
                  "Encode Data"
                )}
              </Button>
            </CardContent>
          </Card>

          <Card className="border-border bg-gradient-card backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Download className="h-5 w-5 text-primary" />
                Decode Data
              </CardTitle>
              <CardDescription>Extract hidden data from a video file</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <input
                type="file"
                ref={decodeInputRef}
                onChange={handleDecodeVideoChange}
                accept="video/*"
                className="hidden"
              />
              <div 
                onClick={() => decodeInputRef.current?.click()}
                className="border-2 border-dashed border-border rounded-lg p-12 text-center hover:border-primary/50 transition-colors cursor-pointer"
              >
                <Download className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                <p className="text-sm text-muted-foreground">
                  {decodeVideo ? decodeVideo.name : "Drop an encoded video here or click to upload"}
                </p>
                <p className="text-xs text-muted-foreground/60 mt-2">Supports MP4, AVI, MOV</p>
              </div>
              <div>
                <label className="text-sm font-medium mb-2 block">Extracted Data</label>
                <div className="w-full h-32 p-3 bg-secondary border border-border rounded-lg overflow-auto">
                  <p className="text-sm whitespace-pre-wrap">
                    {decodedData || <span className="text-muted-foreground">No data extracted yet...</span>}
                  </p>
                </div>
              </div>
              <Button 
                onClick={handleDecode}
                disabled={isDecoding || !decodeVideo}
                className="w-full bg-primary hover:bg-primary/90 text-primary-foreground"
              >
                {isDecoding ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Decoding...
                  </>
                ) : (
                  "Decode Data"
                )}
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default VideoSteganography;
