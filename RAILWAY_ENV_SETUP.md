# Railway Environment Variables Setup

## Required Environment Variables for Railway

### 1. Database Connection
Railway will automatically provide these variables when you add MySQL database:
- `MYSQLHOST`
- `MYSQLPORT`
- `MYSQLDATABASE`
- `MYSQLUSER`
- `MYSQLPASSWORD`

You need to combine them into `DATABASE_URL`:
```
DATABASE_URL=mysql://${MYSQLUSER}:${MYSQLPASSWORD}@${MYSQLHOST}:${MYSQLPORT}/${MYSQLDATABASE}
```

Or use the direct format:
```
DATABASE_URL=mysql://root:kAGfAlNdISJRmsseCgMNWOjaYvntcGdS@gondola.proxy.rlwy.net:35363/railway
```

### 2. JWT Secret
Generate a random 32-character secret for session management:

**Option 1: Using Node.js**
```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

**Option 2: Using OpenSSL**
```bash
openssl rand -hex 32
```

Then set in Railway:
```
JWT_SECRET=your-generated-secret-here
```

### 3. Node Environment
```
NODE_ENV=production
```

## Optional Variables (Not Required for Railway)

These Manus-specific variables are NOT needed for Railway deployment:
- `VITE_OAUTH_PORTAL_URL` - Not needed (using custom auth)
- `VITE_APP_ID` - Not needed (using custom auth)
- `VITE_FRONTEND_FORGE_API_KEY` - Not needed (no map features)
- `VITE_FRONTEND_FORGE_API_URL` - Not needed (no map features)
- `BUILT_IN_FORGE_API_KEY` - Not needed
- `BUILT_IN_FORGE_API_URL` - Not needed
- `OAUTH_SERVER_URL` - Not needed
- `OWNER_NAME` - Not needed
- `OWNER_OPEN_ID` - Not needed

## Setting Variables in Railway

1. Go to your Railway project
2. Click on your service (mbright-fantasy)
3. Go to "Variables" tab
4. Click "New Variable"
5. Add each variable one by one

## Verify Setup

After setting all variables, redeploy your service:
1. Go to "Deployments" tab
2. Click "Redeploy" on the latest deployment

## Troubleshooting

### Error: "Failed to construct 'URL': Invalid URL"
This means environment variables are missing or incorrect. Make sure:
- `DATABASE_URL` is properly formatted
- `JWT_SECRET` is set
- `NODE_ENV` is set to "production"

### Database Connection Errors
- Verify MySQL database is running in Railway
- Check DATABASE_URL format is correct
- Ensure database migrations have run (`pnpm db:push`)
