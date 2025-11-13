import { useNavigate } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Image, Video } from "lucide-react";

const Index = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-accent/5" />
      
      <div className="relative z-10 w-full max-w-4xl animate-fade-in">
        <div className="text-center mb-12">
          <h1 className="text-5xl md:text-6xl font-bold mb-4 bg-gradient-primary bg-clip-text text-transparent">
            Steganography Interface
          </h1>
          <p className="text-muted-foreground text-lg md:text-xl">
            Hide and reveal secret data within images and videos
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <Card 
            className="group cursor-pointer transition-all duration-300 hover:scale-105 hover:shadow-[0_0_30px_rgba(6,182,212,0.3)] border-border bg-gradient-card backdrop-blur-sm"
            onClick={() => navigate("/image-steganography")}
          >
            <CardContent className="p-8 flex flex-col items-center text-center space-y-6">
              <div className="w-20 h-20 rounded-2xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                <Image className="w-10 h-10 text-primary" />
              </div>
              <div>
                <h2 className="text-2xl font-bold mb-2 text-foreground">Image Steganography</h2>
                <p className="text-muted-foreground">
                  Embed secret messages within image files using advanced encoding techniques
                </p>
              </div>
            </CardContent>
          </Card>

          <Card 
            className="group cursor-pointer transition-all duration-300 hover:scale-105 hover:shadow-[0_0_30px_rgba(6,182,212,0.3)] border-border bg-gradient-card backdrop-blur-sm"
            onClick={() => navigate("/video-steganography")}
          >
            <CardContent className="p-8 flex flex-col items-center text-center space-y-6">
              <div className="w-20 h-20 rounded-2xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                <Video className="w-10 h-10 text-primary" />
              </div>
              <div>
                <h2 className="text-2xl font-bold mb-2 text-foreground">Video Steganography</h2>
                <p className="text-muted-foreground">
                  Conceal data within video files while maintaining visual quality
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="mt-12 text-center text-sm text-muted-foreground">
          <p>Secure • Private • Advanced Encryption</p>
        </div>
      </div>
    </div>
  );
};

export default Index;
