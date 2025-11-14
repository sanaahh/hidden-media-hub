# Neural Steganography Python Backend

This is a FastAPI backend that implements LSB (Least Significant Bit) steganography for hiding messages in images.

## Features

- **Image Encoding**: Hide secret messages within PNG images using LSB steganography
- **Image Decoding**: Extract hidden messages from encoded images
- **CORS Enabled**: Ready to work with your frontend application
- **Fast & Lightweight**: Built with FastAPI and Pillow

## Deployment Instructions

### Option 1: Deploy to Railway (Recommended)

1. **Create a Railway account** at [railway.app](https://railway.app)

2. **Create a new project**:
   - Click "New Project"
   - Select "Deploy from GitHub repo" or "Empty Project"

3. **Deploy the backend**:
   - If using GitHub: Push this `python-backend` folder to a GitHub repo and connect it
   - If using empty project: Use Railway CLI to deploy

4. **Railway will automatically**:
   - Detect it's a Python project
   - Install dependencies from `requirements.txt`
   - Use the start command from `railway.json`
   - Assign a public URL

5. **Copy your deployment URL** (e.g., `https://your-app.up.railway.app`)

### Option 2: Deploy to Render

1. Create account at [render.com](https://render.com)
2. Create new "Web Service"
3. Connect your GitHub repo or upload code
4. Use these settings:
   - **Build Command**: `pip install -r requirements.txt`
   - **Start Command**: `uvicorn main:app --host 0.0.0.0 --port $PORT`
5. Copy your deployment URL

### Option 3: Local Testing

```bash
# Install dependencies
pip install -r requirements.txt

# Run locally
python main.py

# Server runs at http://localhost:8000
```

## API Endpoints

- `GET /` - Health check
- `POST /encode/image` - Encode message into image
  - Form data: `image` (file), `message` (text)
  - Returns: Encoded PNG image
- `POST /decode/image` - Decode message from image
  - Form data: `image` (file)
  - Returns: `{"message": "decoded text"}`
- `POST /encode/video` - Placeholder (not yet implemented)
- `POST /decode/video` - Placeholder (not yet implemented)

## After Deployment

Once deployed, you'll need to configure your frontend to use the backend URL:

1. Go back to Lovable
2. Tell me your deployed backend URL
3. I'll add it as a secret to your edge functions

## Technical Details

### LSB Steganography

This implementation uses the Least Significant Bit technique:
- Hides data in the least significant bit of each pixel's RGB values
- Virtually undetectable to human eye
- Supports any text message that fits in the image
- Adds `<<<END>>>` delimiter to mark message end

### Security Notes

- This is a basic LSB implementation for demonstration
- For production use, consider:
  - Adding authentication
  - Implementing rate limiting
  - Using more sophisticated steganography algorithms
  - Adding encryption before embedding messages
