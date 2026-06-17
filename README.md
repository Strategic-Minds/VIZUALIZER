# Floor VIZUALIZER

Customer-friendly acrylic flake and metallic epoxy floor visualizer for Strategic Minds / XPS-style flooring sales workflows.

## Current Build Package

A runnable scaffold has been prepared with:

- Customer photo upload
- Polygon and brush-based floor masking
- Acrylic flake and metallic epoxy finish previews
- PNG preview download
- `/api/render-floor` OpenAI image-edit endpoint contract
- Vercel deployment plan
- QA and claim-control notes

Canonical Drive workspace:

https://drive.google.com/drive/folders/1HOOenEyC7oSTdWHvjKvaMcazqNxtoyyb

## Product Direction

The visualizer is designed to improve on common flooring-visualizer adoption blockers:

- simple upload-first customer workflow
- guided floor masking rather than technical editing
- instant browser preview before AI rendering
- OpenAI image editing only for the masked floor area
- safe customer-facing language that avoids guaranteed-result claims
- clean handoff to quote/CRM workflows

## Required Runtime Environment

- Vercel static site plus serverless function
- `OPENAI_API_KEY`
- `OPENAI_IMAGE_MODEL`, default `gpt-image-1.5`
- optional `LEAD_WEBHOOK_URL` for quote/CRM handoff

## Production Gates

Before live customer use:

- confirm product finish names and inventory
- add photo consent and privacy copy to the final intake flow
- decide whether uploaded photos are stored or returned only in-session
- add rate limits and abuse monitoring around AI rendering
- verify AI outputs are reviewed before quote finalization

## Sync Rule

- Google Drive remains the planning and documentation control plane.
- GitHub remains the implementation mirror.
- Vercel and AI Gateway/OpenAI provisioning must follow the approved Drive/GitHub blueprint.
