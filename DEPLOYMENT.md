Deployment Instructions

Frontend (Vercel)

1) Build settings
- Framework: Other (Vite) or let Vercel auto-detect
- Root directory: frontend
- Build Command: npm run build
- Output Directory: frontend/dist

2) Environment variables (set in Vercel dashboard)
- VITE_FIREBASE_API_KEY
- VITE_FIREBASE_AUTH_DOMAIN
- VITE_FIREBASE_PROJECT_ID
- VITE_FIREBASE_STORAGE_BUCKET
- VITE_FIREBASE_MESSAGING_SENDER_ID
- VITE_FIREBASE_APP_ID

3) Recommended vercel.json is included at frontend/vercel.json (serves the SPA)


Backend (Render)

Option A — Render service (recommended for a simple Node server)
1) Create a new Web Service on Render and connect the repository.
2) Set the root directory to the project root and branch to main.
3) Build Command: cd backend && npm install
4) Start Command: cd backend && npm start
5) Set environment variables in Render (Dashboard -> Environment):
   - GOOGLE_APPLICATION_CREDENTIALS_JSON => the entire service account JSON string (set as a secret)
   - PORT => e.g., 10000 (Render sets its own automatically if blank)

Note: Do NOT commit service account JSON to the repo. Use Render's secure environment variables.

Option B — Deploy backend as a Docker/Custom service
- Use render.yaml (backend/render.yaml) included as a starting point. Update envVars to reference Render secrets.

CORS and API URL
- If the frontend and backend are deployed on different origins, update CORS settings in backend/index.js or set a specific allowed origin instead of '*' for production.
- In the frontend, set the production API URL by replacing fetch('/api/...') calls with absolute URLs, or set a VITE_API_URL env var and use it in src code.

Security
- Rotate service account keys if they were ever exposed.
- Use least-privilege IAM roles (Firestore Viewer/Editor for server account; restrict client access with rules).

Quick checklist after deploy
- Frontend loads the app and can read orders from Firestore.
- Backend can write and update orders with the service account credential.
- Re-deploy after environment variables are set in the hosting platform.

Co-authored-by: Copilot <223556219+Copilot@users.noreply.github.com>
