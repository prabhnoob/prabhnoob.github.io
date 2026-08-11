# Prabhnoor Singh - Software Developer

A responsive, streaming-inspired developer portfolio built with React, TypeScript, Vite/vinext, and original CSS artwork. The experience is content-driven, accessible, and designed for quick recruiter scanning with deeper project case studies.

## Prerequisites

- Node.js 22.13.0 or newer
- npm (included with Node.js)

## Local setup

Install the locked dependencies and start the development server:

```bash
npm ci
npm run dev
```

Open the local URL printed in the terminal. The page updates through hot module replacement while files under `app/` are edited.

## Updating portfolio content

- Edit profile, project, experience, skill, and social-link data in `app/data/portfolio.ts`.
- Edit reusable site sections and interactions in `app/components/PortfolioExperience.tsx`.
- Edit design tokens, layout, project artwork, motion, and responsive rules in `app/globals.css`.
- Edit page metadata and structured data in `app/layout.tsx` and `app/page.tsx`.
- Replace the public resume at `public/resume/prabhnoor-singh-resume.pdf`; the source generator is `scripts/generate_resume.py`.
- Keep installable-app and crawler metadata in `public/site.webmanifest`, `public/robots.txt`, and `public/sitemap.xml`.

Only add verified public links and public-safe material. Do not commit private course repositories, secrets, personal identifiers, confidential employer content, or unverified social profiles.

## Validation

Run all repository checks before publishing:

```bash
npm run lint
npm run build
node --test tests/rendered-html.test.mjs
```

The automated tests verify the rendered identity, hero actions, required sections, project count, safe external links, JSON-LD, accessible interaction hooks, and reduced-motion rules.

## Deploying with OpenAI Sites

The project is configured for Sites through `.openai/hosting.json`. Ask Codex to publish or redeploy it. Sites builds the vinext/Cloudflare Worker output, saves a version, and returns the deployed URL. Runtime values belong in Sites and must not be committed.

## Deploying with GitHub Pages

The repository includes `.github/workflows/deploy.yml` for the specification's `prabhnoob.github.io` target. It runs on every push to `main`, creates a static single-page artifact in `dist-pages/`, and deploys it with GitHub's official Pages actions.

Before the first GitHub deployment:

1. Use the repository name `prabhnoob.github.io` under the `prabhnoob` account.
2. In **Settings > Pages**, select **GitHub Actions** as the source.
3. Push the validated source to `main`.

To generate the same static artifact locally:

```bash
npm run build:pages
```

The site uses hash navigation and root-relative assets, which is appropriate for the username-site URL `https://prabhnoob.github.io/`. If the repository is renamed to a project site, update its base/canonical paths before deployment.

## Known content limitation

The requirements call for a LinkedIn link, but no verified LinkedIn URL was supplied or found. Add it to `socialLinks` in `app/data/portfolio.ts` after the owner confirms the exact profile URL.

## License

This project is available under the [MIT License](LICENSE).
