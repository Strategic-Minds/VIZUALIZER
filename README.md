# Vizual-X

Vizual-X is a Next.js floor visualizer built for Vercel. The AI assistant is named Vizzy.

## Why Next.js

Next.js is the best choice for this launch because Vercel deploys it directly, the frontend can feel like a polished app, and API routes keep OpenAI keys secure on the server.

## Vizzy Workflow

Example command:

> Hey Vizzy, outline my floor, search for white swirl epoxy floors, show me three options, and use option one.

Vizzy then accepts voice or text, searches for style ideas, shows three rectangular options, detects the floor in the uploaded photo, renders the chosen style onto the masked floor, plays a completion chime, and lets the user download the preview.

## Routes

- `/`: Vizual-X app
- `/api/style-search`: Vizzy style discovery with OpenAI web search when configured
- `/api/detect-floor`: AI floor outline detection
- `/api/render-floor`: OpenAI image edit floor replacement

## Environment Variables

```bash
OPENAI_API_KEY=
OPENAI_VISION_MODEL=gpt-5.5
OPENAI_SEARCH_MODEL=gpt-5.5
OPENAI_IMAGE_MODEL=gpt-image-1.5
MAX_IMAGE_BYTES=12000000
```

## Launch On Vercel

1. Import `Strategic-Minds/VIZUALIZER` into Vercel.
2. Add the environment variables above.
3. Deploy from `main`.
4. Open the production URL.

Voice input uses the browser Speech Recognition API. If a browser does not support voice input, text commands still work. AI output is a visualization, not an installation guarantee.
