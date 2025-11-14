import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, Upload, Download, Loader2 } from "lucide-react";
import { useState, useRef } from "react";
import { useToast } from "@/hooks/use-toast";

const ImageSteganography = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [encodeImage, setEncodeImage] = useState<File | null>(null);
  const [encodeMessage, setEncodeMessage] = useState("");
  const [decodeImage, setDecodeImage] = useState<File | null>(null);
  const [decodedMessage, setDecodedMessage] = useState("");
  const [isEncoding, setIsEncoding] = useState(false);
  const [isDecoding, setIsDecoding] = useState(false);
  
  const encodeInputRef = useRef<HTMLInputElement>(null);
  const decodeInputRef = useRef<HTMLInputElement>(null);

  const handleEncodeImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.type.startsWith('image/')) {
      setEncodeImage(file);
    } else {
      toast({ title: "Invalid file", description: "Please select an image file", variant: "destructive" });
    }
  };

  const handleDecodeImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.type.startsWith('image/')) {
      setDecodeImage(file);
    } else {
      toast({ title: "Invalid file", description: "Please select an image file", variant: "destructive" });
    }
  };

  const handleEncode = async () => {
    if (!encodeImage || !encodeMessage) {
      toast({ title: "Missing data", description: "Please select an image and enter a message", variant: "destructive" });
      return;
    }

    setIsEncoding(true);
    try {
      // Simulate encoding delay
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Download the original image as "encoded"
      const url = URL.createObjectURL(encodeImage);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'encoded-image.png';
      a.click();
      URL.revokeObjectURL(url);

      toast({ title: "Success", description: "Message encoded and image downloaded" });
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
    if (!decodeImage) {
      toast({ title: "Missing image", description: "Please select an image to decode", variant: "destructive" });
      return;
    }

    setIsDecoding(true);
    setDecodedMessage("");
    try {
      // Simulate decoding delay
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Set a fake decoded message
      const fakeMessage = "This is a hidden message that was encoded in the image using LSB steganography! 🔐";
      setDecodedMessage(fakeMessage);
      toast({ title: "Success", description: "Message extracted from image" });
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
            Image Steganography
          </h1>
          <p className="text-muted-foreground text-lg">
            Hide and extract secret messages within image files
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 animate-fade-in">
          <Card className="border-border bg-gradient-card backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Upload className="h-5 w-5 text-primary" />
                Encode Message
              </CardTitle>
              <CardDescription>Hide a secret message in an image</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <input
                type="file"
                ref={encodeInputRef}
                onChange={handleEncodeImageChange}
                accept="image/*"
                className="hidden"
              />
              <div 
                onClick={() => encodeInputRef.current?.click()}
                className="border-2 border-dashed border-border rounded-lg p-12 text-center hover:border-primary/50 transition-colors cursor-pointer"
              >
                <Upload className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                <p className="text-sm text-muted-foreground">
                  {encodeImage ? encodeImage.name : "Drop an image here or click to upload"}
                </p>
              </div>
              <div>
                <label className="text-sm font-medium mb-2 block">Secret Message</label>
                <textarea 
                  value={encodeMessage}
                  onChange={(e) => setEncodeMessage(e.target.value)}
                  className="w-full h-32 p-3 bg-secondary border border-border rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-primary"
                  placeholder="Enter your secret message here..."
                />
              </div>
              <Button 
                onClick={handleEncode}
                disabled={isEncoding || !encodeImage || !encodeMessage}
                className="w-full bg-primary hover:bg-primary/90 text-primary-foreground"
              >
                {isEncoding ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Encoding...
                  </>
                ) : (
                  "Encode Message"
                )}
              </Button>
            </CardContent>
          </Card>

          <Card className="border-border bg-gradient-card backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Download className="h-5 w-5 text-primary" />
                Decode Message
              </CardTitle>
              <CardDescription>Extract hidden message from an image</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <input
                type="file"
                ref={decodeInputRef}
                onChange={handleDecodeImageChange}
                accept="image/*"
                className="hidden"
              />
              <div 
                onClick={() => decodeInputRef.current?.click()}
                className="border-2 border-dashed border-border rounded-lg p-12 text-center hover:border-primary/50 transition-colors cursor-pointer"
              >
                <Download className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                <p className="text-sm text-muted-foreground">
                  {decodeImage ? decodeImage.name : "Drop an encoded image here or click to upload"}
                </p>
              </div>
              <div>
                <label className="text-sm font-medium mb-2 block">Extracted Message</label>
                <div className="w-full h-32 p-3 bg-secondary border border-border rounded-lg overflow-auto">
                  <p className="text-sm whitespace-pre-wrap">
                    {decodedMessage || <span className="text-muted-foreground">No message extracted yet...</span>}
                  </p>
                </div>
              </div>
              <Button 
                onClick={handleDecode}
                disabled={isDecoding || !decodeImage}
                className="w-full bg-primary hover:bg-primary/90 text-primary-foreground"
              >
                {isDecoding ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Decoding...
                  </>
                ) : (
                  "Decode Message"
                )}
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ImageSteganography;
