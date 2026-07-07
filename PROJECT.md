# Portfolio Desktop Project

## Visual Theme

The website uses a macOS desktop metaphor with a dark, tactile palette inspired by the supplied Evergreen Velvet reference.

### Color Palette

| Token | Hex | Use |
| --- | --- | --- |
| Evergreen Velvet | `#1E5B4C` | Primary deep green, wallpaper shadows, glass tint |
| Slate Sage | `#8AA39B` | Secondary muted green, soft highlights |
| Pewter Mist | `#B7C1BA` | Pale neutral, menu bar and readable light surfaces |
| Copper Ember | `#C8603A` | Warm accent, skin/wallpaper warmth and highlights |
| Port Wine | `#5E1F2A` | Deep accent, low shadows and contrast |

### Direction

Keep the interface feeling like a real Mac desktop rather than a conventional landing page. The palette should stay dark green and tactile, with copper accents used sparingly for warmth.

## Deployment Notes

### Source Control

- GitHub repository: `https://github.com/trnguyenngdn-maker/nguyen-portfolio.git`
- Main branch: `main`
- Local project path: `/Users/mac/Developer/portfolio`

Useful commands:

```bash
git status
git add .
git commit -m "Describe the change"
git push
```

### Hosting

- Hosting provider: Vercel
- Framework: Next.js
- Install command: `npm install`
- Build command: `npm run build`
- Vercel deploys automatically from the GitHub `main` branch after each push.

### Production Domain

- Primary domain: `nguyen-portfolio.com`
- Recommended `www` domain: `www.nguyen-portfolio.com`

The domain should be added inside the Vercel project under:

```txt
Settings -> Domains
```

### DNS Setup

Configure DNS where `nguyen-portfolio.com` was purchased. Vercel should show the exact required records in the project domain settings.

Typical Vercel DNS records:

```txt
Type: A
Name: @
Value: 76.76.21.21
```

```txt
Type: CNAME
Name: www
Value: cname.vercel-dns.com
```

After DNS verification, Vercel automatically provisions HTTPS for the domain.

### Deployment Checklist

- Push changes to `main`.
- Confirm Vercel deployment succeeds.
- Confirm `nguyen-portfolio.com` resolves to the latest production deployment.
- Confirm `www.nguyen-portfolio.com` redirects or resolves correctly.
- Confirm HTTPS is active.
