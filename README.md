# arch-cordero.github.io

Sito portfolio di **Fernando Cristobal Cordero**, architetto e designer — [arch-cordero.github.io](https://arch-cordero.github.io).

Single-page minimale ispirato a [rpbw.com](https://www.rpbw.com/): hero a schermo intero con foto dei progetti in dissolvenza, breve bio, contatti e un mosaico di progetti che si espandono sul posto.

## Stack

- [Jekyll 4](https://jekyllrb.com/) — build statico, deploy su GitHub Pages via Actions (`.github/workflows/jekyll.yml`)
- [jekyll_picture_tag](https://rbuchberger.github.io/jekyll_picture_tag/) + [libvips](https://www.libvips.org/) — genera al build le versioni ridimensionate/WebP delle immagini (preset in `_data/picture.yml`, output in `_site/generated`, cache in CI)
- CSS/JS scritti a mano (`_sass/`, `assets/js/main.js`), font [Inter](https://rsms.me/inter/) self-hosted — nessuna dipendenza esterna a runtime
- `_plugins/project_gallery.rb` — filtri Liquid che estraggono dai post la descrizione e la galleria immagini

## Sviluppo locale

Con Docker (consigliato — nessuna dipendenza sull'host):

```sh
docker compose up          # serve su http://localhost:4000 con livereload
```

Oppure nativamente:

```sh
sudo apt install ruby-full build-essential libvips-dev
bundle config set --local path vendor/bundle
bundle install
bundle exec jekyll serve
```

Il primo build genera migliaia di derivate immagine (qualche minuto); i successivi sono rapidi perché `_site/generated` viene conservato (`keep_files`).

## Aggiungere un progetto

1. Crea `_posts/AAAA-MM-GG-nome-progetto.md` (la data determina l'anno mostrato e l'ordinamento):

   ```yaml
   ---
   title: "Titolo del progetto"
   layout: post
   post-image: "/assets/images/projects/nome-progetto/copertina.jpg"
   description: "Breve descrizione (usata anche per SEO)."
   tags:
     - milano
   ---

   Testo di presentazione del progetto...

   ---

   ### GALLERIA IMMAGINI

   ![Immagine 1](/assets/images/projects/nome-progetto/01.jpg)
   ```

2. Metti le foto in `assets/images/projects/nome-progetto/`.
   **I nomi dei file non devono contenere spazi** (usa trattini).

## Hero della home

Le immagini di sfondo della home sono curate a mano in [`_data/hero.yml`](_data/hero.yml): una lista di `image:` + `alt:`. Usa foto orizzontali ad alta risoluzione (6–8 voci).

## Note

- Le immagini originali restano nel repository (~300 MB) e vengono servite solo nelle gallerie; hero e mosaico usano le derivate generate.
- La cache CI delle derivate è legata all'hash di `assets/images/**` e `_data/picture.yml`: cambiando le immagini il primo build sarà più lento.
