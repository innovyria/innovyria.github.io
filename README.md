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
