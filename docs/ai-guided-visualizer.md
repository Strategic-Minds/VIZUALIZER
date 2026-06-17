# AI Guided Floor Visualizer Notes

## User Flow

1. Upload customer room photo.
2. Click **AI find my floor** or **Do it all for me**.
3. `/api/detect-floor` uses OpenAI vision to return a conservative floor polygon.
4. Customer selects or saves a favorite flake or metallic epoxy finish.
5. Browser preview mirrors the finish into the detected floor area.
6. `/api/render-floor` sends the original image, mask, and finish prompt to OpenAI image edits.

## Safety Rules

- Edit only the masked floor area.
- Preserve walls, cabinets, baseboards, furniture, lighting, perspective, and shadows.
- Label output as a visualization.
- Do not promise exact installation color or guaranteed result.

## Next Production Additions

- CRM/quote webhook.
- Uploaded-photo consent log.
- Rate limiting.
- Storage expiration policy.
- Finish catalog from real product inventory.
- Human review before final quote.
