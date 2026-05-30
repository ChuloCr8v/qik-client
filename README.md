<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>

# Run and deploy your AI Studio app

This contains everything you need to run your app locally.

View your app in AI Studio: https://ai.studio/apps/cac7c4b1-d84a-4410-b30d-59a15eff4325

## Run Locally

**Prerequisites:**  Node.js


1. Install dependencies:
   `pnpm install`
2. Set public client values in `.env`:
   `VITE_API_URL` and `VITE_GOOGLE_CLIENT_ID`
3. Put server secrets such as `GROQ_API_KEY` in the server `.env`, never in the client.
4. Run the app:
   `pnpm dev`
