# jaydenyu0210.github.io

Jayden Yu — product designer. Static portfolio, no build step, deployed straight from
`main` to GitHub Pages.

## Pages

| URL | File |
| --- | --- |
| `/` | `index.html` — hero, work grid, statement, capabilities |
| `/about/` | `about/index.html` |
| `/resume/` | `resume/index.html` |
| `/work/inurra/` | `work/inurra/index.html` — case study |
| `/work/wellbeingabc/` | `work/wellbeingabc/index.html` — case study |

Shared chrome (nav, footer), all styling and all behaviour live in two files:

- `assets/site.css`
- `assets/site.js`

## Work

- **[iNurra](https://apps.apple.com/us/app/inurra/id6758828697)** — post-discharge care
  iOS app. Photograph a discharge sheet, a pill bottle, a monitor or a rash and get back a
  home care plan. Designed, built and shipped solo.
  ([case study](https://jaydenyu0210.github.io/work/inurra/) ·
  [repo](https://github.com/jaydenyu0210/iNurra))
- **[wellbeingABC.com](https://wellbeingabc.com)** — bilingual (EN / 中文) two-sided
  coaching marketplace with assessments, booking, payments and payouts.
  ([case study](https://jaydenyu0210.github.io/work/wellbeingabc/) ·
  [repo](https://github.com/jaydenyu0210/happygoose))
- **[ArchSpace](https://github.com/jaydenyu0210/archspace)** — open-source node-based
  workflow desktop app. Listed on the resume page; no case study.

## Running it locally

No dependencies and no build.

```bash
python3 -m http.server 8000
```

Then open <http://localhost:8000>. Note the pages use root-absolute asset paths
(`/assets/…`), which is correct for a GitHub Pages **user** site served at the domain
root. Serving the folder from a subpath will break the asset links.

## Notes

- One typeface throughout (Instrument Sans, via Google Fonts). Italic is the only
  emphasis mechanism — no bold runs and no coloured words inside copy.
- `--accent` (`#fb8787`) is decorative only; `--accent-text` (`#b34a4a`) is the
  AA-passing cut used for any coloured text.
- Every page is fully readable with JavaScript disabled — the scroll-reveal start state
  is scoped to a `.js` class set in `<head>`.
- Images ship as `<picture>` with WebP and JPEG at 512 / 768 / 1024.

**Contact:** jiaweiyu2009@gmail.com ·
[LinkedIn](https://www.linkedin.com/in/jaydenyu0210) ·
[GitHub](https://github.com/jaydenyu0210)
