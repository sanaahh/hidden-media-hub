import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, Upload, Download } from "lucide-react";

const VideoSteganography = () => {
  const navigate = useNavigate();

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
              <div className="border-2 border-dashed border-border rounded-lg p-12 text-center hover:border-primary/50 transition-colors cursor-pointer">
                <Upload className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                <p className="text-sm text-muted-foreground">Drop a video here or click to upload</p>
                <p className="text-xs text-muted-foreground/60 mt-2">Supports MP4, AVI, MOV</p>
              </div>
              <div>
                <label className="text-sm font-medium mb-2 block">Secret Data</label>
                <textarea 
                  className="w-full h-32 p-3 bg-secondary border border-border rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-primary"
                  placeholder="Enter your secret data here..."
                />
              </div>
              <Button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground">
                Encode Data
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
              <div className="border-2 border-dashed border-border rounded-lg p-12 text-center hover:border-primary/50 transition-colors cursor-pointer">
                <Download className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                <p className="text-sm text-muted-foreground">Drop an encoded video here or click to upload</p>
                <p className="text-xs text-muted-foreground/60 mt-2">Supports MP4, AVI, MOV</p>
              </div>
              <div>
                <label className="text-sm font-medium mb-2 block">Extracted Data</label>
                <div className="w-full h-32 p-3 bg-secondary border border-border rounded-lg">
                  <p className="text-sm text-muted-foreground">No data extracted yet...</p>
                </div>
              </div>
              <Button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground">
                Decode Data
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default VideoSteganography;
