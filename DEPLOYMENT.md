# Deploying to Render.com

## Prerequisites
- A Render.com account
- A GitHub repository with your code

## Steps to Deploy

### 1. Push Your Code to GitHub
Make sure your code is pushed to a GitHub repository.

### 2. Create a New Web Service on Render
1. Log in to your Render dashboard: https://dashboard.render.com/
2. Click "New +" and select "Web Service"
3. Connect your GitHub repository
4. Find and select your repository
5. Configure the following settings:
   - **Name**: user-management-api (or your preferred name)
   - **Root Directory**: backend (if your repo has both frontend and backend)
   - **Environment**: Node
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`

### 3. Set Environment Variables
Add the following environment variables in the Render dashboard:
- `PORT`: 10000 (Render will use its own PORT internally)
- `NODE_ENV`: production
- `MONGO_URI`: [Your MongoDB connection string]
- `JWT_SECRET`: [Your JWT secret]
- `JWT_EXPIRE`: 30d
- `FRONTEND_URL`: [Your Vercel frontend URL]

### 4. Deploy
Click "Create Web Service" and wait for the deployment to complete.

### 5. Update Your Frontend
Update your frontend API URL to point to your new Render backend URL.

## Troubleshooting
- If you encounter CORS issues, double-check the CORS configuration in your server.js file.
- Check Render logs for any errors during deployment.
- If images aren't saving, make sure the uploads directory permissions are set correctly. 