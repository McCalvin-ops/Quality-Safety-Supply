# Quality-Safety-Supply

Premium 5-page static website for **Quality Safety Supply and Training (Pty)**.

## GitHub Pages deployment

This repository includes:

- `.github/workflows/deploy-pages.yml` - deploys the static site to GitHub Pages
- `CNAME` - custom domain mapping to `qualitysafetysupply.co.za`

### One-time GitHub setup required

The workflow cannot create a Pages site unless the repository has GitHub Pages enabled by a maintainer.

1. Open **Settings -> Pages** in this repository.
2. Under **Build and deployment**, choose **Source: GitHub Actions**.
3. Save.

After this, every push to `main` will deploy automatically.

### Custom domain DNS

To serve on `qualitysafetysupply.co.za`, point DNS as follows:

- `A` record (root `@`) -> `185.199.108.153`
- `A` record (root `@`) -> `185.199.109.153`
- `A` record (root `@`) -> `185.199.110.153`
- `A` record (root `@`) -> `185.199.111.153`
- `CNAME` record `www` -> `<your-github-username>.github.io`

Keep email records intact:

- keep existing `MX` record(s)
- keep existing `mail` host record
- keep SPF/DKIM/DMARC records