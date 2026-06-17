# Floor VIZUALIZER

A customer-friendly AI guided acrylic flake and metallic epoxy floor visualizer.

## What The App Does

1. Customer uploads a photo of their floor or room.
2. The app asks OpenAI vision to identify the visible floor area.
3. The customer chooses or saves a favorite acrylic flake or metallic epoxy finish.
4. The app previews that finish inside the detected floor area.
5. The customer can click **Do it all for me** to detect the floor and generate the final OpenAI image edit.
6. The OpenAI image edit changes only the masked floor area while preserving walls, furniture, baseboards, lighting, shadows, and perspective.

## Routes

- `/visualizer` or `/`: customer visualizer app
- `/api/detect-floor`: OpenAI vision floor polygon detection
- `/api/render-floor`: OpenAI image-edit floor replacement

## Environment Variables

```bash
OPENAI_API_KEY=
OPENAI_VISION_MODEL=gpt-5.5
OPENAI_IMAGE_MODEL=gpt-image-1.5
MAX_IMAGE_BYTES=12000000
LEAD_WEBHOOK_URL=
```

## Deploy

Deploy this repo to Vercel, add the environment variables, then open `/visualizer`.

## Production Notes

- The local browser preview is a sales visualization, not an installation guarantee.
- AI output should be labeled as a visualization.
- Confirm real product names, color blends, and finish availability before customer launch.
- Add CRM or quote-webhook handoff after privacy, consent, and storage rules are approved.
- Review AI-generated renders before issuing final quotes.

Canonical Drive workspace:
https://drive.google.com/drive/folders/1HOOenEyC7oSTdWHvjKvaMcazqNxtoyyb
