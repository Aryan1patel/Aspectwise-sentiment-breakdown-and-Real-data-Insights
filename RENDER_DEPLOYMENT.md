# Deploying AspectLens to Render

This guide will help you deploy both the backend (FastAPI) and frontend (Next.js) to Render.

## Prerequisites

1. **GitHub Repository**: Your code must be on GitHub
2. **Render Account**: Sign up at https://render.com (free tier available)

---

## Option 1: Deploy with Docker (Recommended)

### Step 1: Deploy Backend

1. Go to https://dashboard.render.com
2. Click **"New +"** → **"Web Service"**
3. Connect your GitHub repository
4. Configure:
   - **Name**: `aspectlens-backend`
   - **Region**: Choose closest to you
   - **Branch**: `main`
   - **Root Directory**: `backend`
   - **Environment**: `Docker`
   - **Dockerfile Path**: `backend/Dockerfile`
   - **Instance Type**: `Free`

5. Click **"Create Web Service"**

6. Your backend will be live at: `https://aspectlens-backend.onrender.com`

### Step 2: Deploy Frontend

1. Click **"New +"** → **"Web Service"**
2. Connect your GitHub repository
3. Configure:
   - **Name**: `aspectlens-frontend`
   - **Region**: Same as backend
   - **Branch**: `main`
   - **Root Directory**: `frontend-nextjs`
   - **Environment**: `Docker`
   - **Dockerfile Path**: `frontend-nextjs/Dockerfile`
   - **Instance Type**: `Free`

4. Add Environment Variable:
   - **Key**: `NEXT_PUBLIC_API_URL`
   - **Value**: `https://aspectlens-backend.onrender.com`

5. Click **"Create Web Service"**

6. Your frontend will be live at: `https://aspectlens-frontend.onrender.com`

---

## Option 2: Deploy without Docker

### Backend Deployment

1. Create `render.yaml` in project root (see below)
2. Or manually configure:
   - **Build Command**: `pip install -r requirements.txt`
   - **Start Command**: `uvicorn api:app --host 0.0.0.0 --port $PORT`
   - **Environment**: `Python 3`

### Frontend Deployment

1. Configure:
   - **Build Command**: `npm install && npm run build`
   - **Start Command**: `npm start`
   - **Environment**: `Node`

---

## Render Blueprint (render.yaml)

Create this file in your project root for automated deployment:

```yaml
services:
  # Backend API
  - type: web
    name: aspectlens-backend
    env: docker
    dockerfilePath: ./backend/Dockerfile
    plan: free
    healthCheckPath: /
    envVars:
      - key: PORT
        value: 8000

  # Frontend
  - type: web
    name: aspectlens-frontend
    env: docker
    dockerfilePath: ./frontend-nextjs/Dockerfile
    plan: free
    envVars:
      - key: NEXT_PUBLIC_API_URL
        fromService:
          type: web
          name: aspectlens-backend
          property: host
      - key: PORT
        value: 3000
```

---

## Important Notes

### Free Tier Limitations
- ⚠️ **Spins down after 15 minutes of inactivity**
- ⚠️ **First request after sleep takes ~30 seconds**
- ⚠️ **750 hours/month free** (enough for 1 service 24/7)

### Solutions:
1. **Use Render Cron Jobs** to ping your service every 14 minutes
2. **Upgrade to paid plan** ($7/month) for always-on
3. **Use multiple free accounts** (not recommended)

### Model File Size
- Your `sentiment_model.joblib` is ~500KB ✅ (well within limits)
- Render free tier supports up to 512MB RAM

---

## Step-by-Step Deployment

### 1. Prepare Your Repository

Make sure these files exist:
- ✅ `backend/Dockerfile`
- ✅ `backend/requirements.txt`
- ✅ `frontend-nextjs/Dockerfile`
- ✅ `frontend-nextjs/next.config.ts` (with `output: 'standalone'`)
- ✅ `docker-compose.yml` (optional, for local testing)

### 2. Push to GitHub

```bash
git add .
git commit -m "Prepare for Render deployment"
git push origin main
```

### 3. Deploy on Render

**Option A: Using Dashboard**
1. Go to https://dashboard.render.com
2. Click "New +" → "Web Service"
3. Connect GitHub repo
4. Follow steps above

**Option B: Using render.yaml**
1. Create `render.yaml` (see above)
2. Go to https://dashboard.render.com
3. Click "New +" → "Blueprint"
4. Connect GitHub repo
5. Render will auto-detect `render.yaml`

### 4. Set Environment Variables

**Backend:**
- No special env vars needed (model is included)

**Frontend:**
- `NEXT_PUBLIC_API_URL`: Your backend URL from Render

### 5. Test Your Deployment

Once deployed:
1. Test backend: `https://your-backend.onrender.com/docs`
2. Test frontend: `https://your-frontend.onrender.com`

---

## Troubleshooting

### Backend won't start
- Check logs in Render dashboard
- Verify `requirements.txt` is complete
- Ensure `sentiment_model.joblib` is in repo (or download from HF)

### Frontend can't connect to backend
- Check `NEXT_PUBLIC_API_URL` is set correctly
- Enable CORS in backend (already done in your `api.py`)

### Service keeps sleeping
- Free tier spins down after 15 minutes
- First request wakes it up (~30 seconds)
- Consider upgrading or using a cron job

### Build fails
- Check Dockerfile syntax
- Verify all dependencies are listed
- Check Render build logs

---

## Custom Domain (Optional)

1. Go to your service settings
2. Click "Custom Domain"
3. Add your domain
4. Update DNS records as instructed

---

## Monitoring

- **Logs**: Available in Render dashboard
- **Metrics**: CPU, Memory, Request count
- **Alerts**: Set up email notifications

---

## Cost Estimate

**Free Tier:**
- Backend: Free (with sleep)
- Frontend: Free (with sleep)
- Total: $0/month

**Paid Tier:**
- Backend: $7/month (always-on)
- Frontend: $7/month (always-on)
- Total: $14/month

---

## Next Steps

1. ✅ Push code to GitHub
2. ✅ Create Render account
3. ✅ Deploy backend
4. ✅ Deploy frontend
5. ✅ Test everything
6. ✅ Share your live URL!

**Your app will be live at:**
- Backend: `https://aspectlens-backend.onrender.com`
- Frontend: `https://aspectlens-frontend.onrender.com`

🎉 **Ready to deploy!**
