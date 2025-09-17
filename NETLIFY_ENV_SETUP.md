# Setting Up Environment Variables in Netlify

## URGENT: Set up Pexels API Key in Netlify

**Before pushing the security fixes, you need to configure the API key in Netlify:**

### Step 1: Access Netlify Dashboard
1. Go to [netlify.com](https://netlify.com)
2. Log into your account
3. Select your **stockton-fencing-co** site

### Step 2: Configure Environment Variables
1. Click on **"Site settings"** 
2. In the sidebar, click **"Environment variables"**
3. Click **"Add a variable"** button

### Step 3: Add the Pexels API Key
- **Key**: `PEXELS_API_KEY`
- **Value**: `JuTfCn5YnJ9d0FcNpOmDvsQzjxSsttmdOyhrvbmbkVwCnlVxnHNHY18J`
- **Scopes**: Select "All deployments" and "All contexts"

### Step 4: Save and Deploy
1. Click **"Create variable"**
2. The variable will be available for the next deployment
3. You can then safely push the security fixes

## Why This Is Important

- ✅ **Security**: API key no longer exposed in public GitHub repository
- ✅ **GitGuardian Fixed**: Resolves the security alert
- ✅ **Best Practice**: Environment variables are the secure way to handle API keys
- ✅ **Functionality**: Pexels image search will continue working

## After Setup

Once you've added the environment variable in Netlify:
1. The API endpoint will automatically use the secure environment variable
2. The Pexels integration will continue working normally
3. Your repository will be secure from API key exposure

## Verification

After deployment, you can test the Pexels integration at:
- `/admin/images` - Image search interface
- `/test-pexels` - Simple API test page