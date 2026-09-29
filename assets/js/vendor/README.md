# Vendored JavaScript

Third-party UMD builds, committed as-is (no build step on this site).
Embla powers the project-panel gallery in `assets/js/main.js`; lite-youtube-embed
provides the `<lite-youtube>` players in the "Video" section (its stylesheet is
vendored as `_sass/vendor/_lite-yt-embed.scss`).

| File | Package | Version | Licence |
| --- | --- | --- | --- |
| `embla-carousel.umd.js` | [embla-carousel](https://www.npmjs.com/package/embla-carousel) | 8.6.0 | MIT |
| `embla-carousel-auto-scroll.umd.js` | [embla-carousel-auto-scroll](https://www.npmjs.com/package/embla-carousel-auto-scroll) | 8.6.0 | MIT |
| `embla-carousel-wheel-gestures.umd.js` | [embla-carousel-wheel-gestures](https://www.npmjs.com/package/embla-carousel-wheel-gestures) | 8.1.0 | MIT |
| `lite-yt-embed.js` | [lite-youtube-embed](https://www.npmjs.com/package/lite-youtube-embed) | 0.3.4 | Apache-2.0 |

To upgrade, re-download the same paths and bump the versions above:

```sh
curl -sSL -o embla-carousel.umd.js \
  https://cdn.jsdelivr.net/npm/embla-carousel@8/embla-carousel.umd.js
curl -sSL -o embla-carousel-auto-scroll.umd.js \
  https://cdn.jsdelivr.net/npm/embla-carousel-auto-scroll@8/embla-carousel-auto-scroll.umd.js
curl -sSL -o embla-carousel-wheel-gestures.umd.js \
  https://cdn.jsdelivr.net/npm/embla-carousel-wheel-gestures@8/dist/embla-carousel-wheel-gestures.umd.js
curl -sSL -o lite-yt-embed.js \
  https://cdn.jsdelivr.net/npm/lite-youtube-embed@0/src/lite-yt-embed.js
curl -sSL -o ../../../_sass/vendor/_lite-yt-embed.scss \
  https://cdn.jsdelivr.net/npm/lite-youtube-embed@0/src/lite-yt-embed.css
```
