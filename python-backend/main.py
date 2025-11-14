from fastapi import FastAPI, File, UploadFile, Form, HTTPException
from fastapi.responses import StreamingResponse
from fastapi.middleware.cors import CORSMiddleware
from PIL import Image
import io
import numpy as np

app = FastAPI()

# Enable CORS for all origins
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

def encode_image_lsb(image: Image.Image, message: str) -> Image.Image:
    """Encode a message into an image using LSB steganography"""
    # Convert image to RGB if it's not already
    if image.mode != 'RGB':
        image = image.convert('RGB')
    
    # Convert image to numpy array
    img_array = np.array(image)
    
    # Add delimiter to message
    message_with_delimiter = message + "<<<END>>>"
    binary_message = ''.join(format(ord(char), '08b') for char in message_with_delimiter)
    
    # Check if message fits in image
    max_bytes = img_array.shape[0] * img_array.shape[1] * 3
    if len(binary_message) > max_bytes:
        raise ValueError("Message too long for this image")
    
    # Flatten image array and encode message
    flat_img = img_array.flatten()
    for i, bit in enumerate(binary_message):
        flat_img[i] = (flat_img[i] & 0xFE) | int(bit)
    
    # Reshape back to original shape
    encoded_array = flat_img.reshape(img_array.shape)
    return Image.fromarray(encoded_array.astype('uint8'), 'RGB')

def decode_image_lsb(image: Image.Image) -> str:
    """Decode a message from an image using LSB steganography"""
    # Convert image to RGB if it's not already
    if image.mode != 'RGB':
        image = image.convert('RGB')
    
    # Convert image to numpy array and flatten
    img_array = np.array(image)
    flat_img = img_array.flatten()
    
    # Extract LSBs
    binary_message = ''.join(str(pixel & 1) for pixel in flat_img)
    
    # Convert binary to characters
    message = ""
    for i in range(0, len(binary_message), 8):
        byte = binary_message[i:i+8]
        if len(byte) == 8:
            char = chr(int(byte, 2))
            message += char
            
            # Check for delimiter
            if message.endswith("<<<END>>>"):
                return message[:-9]  # Remove delimiter
    
    return "No hidden message found"

@app.get("/")
async def root():
    return {"status": "Neural Steganography Backend is running"}

@app.post("/encode/image")
async def encode_image(
    image: UploadFile = File(...),
    message: str = Form(...)
):
    """Encode a message into an image"""
    try:
        # Read and open image
        image_data = await image.read()
        img = Image.open(io.BytesIO(image_data))
        
        # Encode message
        encoded_img = encode_image_lsb(img, message)
        
        # Save to bytes
        img_byte_arr = io.BytesIO()
        encoded_img.save(img_byte_arr, format='PNG')
        img_byte_arr.seek(0)
        
        return StreamingResponse(
            img_byte_arr,
            media_type="image/png",
            headers={"Content-Disposition": "attachment; filename=encoded-image.png"}
        )
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/decode/image")
async def decode_image(image: UploadFile = File(...)):
    """Decode a message from an image"""
    try:
        # Read and open image
        image_data = await image.read()
        img = Image.open(io.BytesIO(image_data))
        
        # Decode message
        message = decode_image_lsb(img)
        
        return {"message": message}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/encode/video")
async def encode_video(
    video: UploadFile = File(...),
    data: str = Form(...)
):
    """Encode data into a video (placeholder for future implementation)"""
    # This is a placeholder - video steganography is more complex
    # You would need opencv-python and more sophisticated algorithms
    raise HTTPException(status_code=501, detail="Video encoding not yet implemented")

@app.post("/decode/video")
async def decode_video(video: UploadFile = File(...)):
    """Decode data from a video (placeholder for future implementation)"""
    # This is a placeholder - video steganography is more complex
    raise HTTPException(status_code=501, detail="Video decoding not yet implemented")

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
