# innovyria.ai

Source of the Innovyria website, served by GitHub Pages at **https://innovyria.ai/**.

The site is static HTML and CSS in [`site/`](site) with no build step and no third-party
requests (no web fonts, analytics or CDNs); a Content-Security-Policy restricts every resource to
the site itself. [`pages.yml`](.github/workflows/pages.yml) deploys `site/` on every push to
`main`.

Preview locally:

```sh
python3 -m http.server --directory site 8000
```

## Languages

English is the default at `/`; German mirrors it under `/de/` (`/legal/` ↔ `/de/legal/`). Each page
names its counterpart with `<link rel="alternate" hreflang>`, and
[`site/assets/lang.js`](site/assets/lang.js), loaded in `<head>`, picks the language:

- A choice made with the header switch (`EN`/`DE`) is stored in `localStorage` and wins on every visit.
- Otherwise the English pages send browsers whose preferred language (`navigator.languages`) is German
  to the German page. German pages never redirect on detection alone, so a shared `/de/` link stays
  German.
- Without JavaScript nothing redirects and the switch works as a plain link.

A change to a page has to be made in both languages. The German legal notice is authoritative; the
English one says so. The privacy section discloses the `localStorage` entry.

## Domain

`innovyria.ai` is the custom domain of this repository's Pages site. Because this is the
organization site (`innovyria.github.io`), the project sites of the organization's other
repositories are served below it too: the Flatpak repository at `https://innovyria.github.io/flatpak/`
is also reachable as `https://innovyria.ai/flatpak/`, and GitHub redirects the former to the latter.

DNS at the registrar:

| Name | Type | Value |
| --- | --- | --- |
| `@` | `A` | `185.199.108.153`, `185.199.109.153`, `185.199.110.153`, `185.199.111.153` |
| `@` | `AAAA` | `2606:50c0:8000::153`, `2606:50c0:8001::153`, `2606:50c0:8002::153`, `2606:50c0:8003::153` |
| `www` | `CNAME` | `innovyria.github.io` |
| `_github-pages-challenge-innovyria` | `TXT` | the value shown under *Organization settings → Pages → Verified domains* |

## Adding an app

Add a card to the *Software* section of [`site/index.html`](site/index.html) with its screenshots
in `site/assets/img/` (WebP, 1280 px wide), and list it in the organization profile and in
[innovyria/flatpak](https://github.com/innovyria/flatpak)'s `apps.json`.
