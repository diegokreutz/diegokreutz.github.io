# diegokreutz.github.io

Personal/professional website of **Diego Kreutz** — Associate Professor at the
Federal University of Pampa (UNIPAMPA), Brazil.

Live at: https://diegokreutz.github.io

## What it is

A single-page, zero-dependency static site (plain HTML + CSS + a little vanilla
JavaScript). No build step, no frameworks. GitHub Pages serves the files as-is.

```
index.html         the whole page
css/style.css      styling (clean academic, light theme)
js/main.js         EN/PT language toggle
img/diego.png      photo
.nojekyll          tells GitHub Pages to serve files without Jekyll processing
```

## How to update the content

Everything lives in `index.html`, grouped into sections:

- **Projects** — `<section id="projects">`, one `<article class="card">` each.
- **Publications** — `<section id="publications">`, one `<li class="pub">` each.
- **Awards** — `<section id="awards">`, one `<li class="award">` each.

### Bilingual text

Translatable elements carry two attributes — `data-en` and `data-pt`. The toggle
in the top-right swaps between them and remembers the choice. When you add or edit
text that should appear in both languages, set **both** attributes, e.g.:

```html
<p class="card__desc"
   data-en="Security and advanced management of IoT devices."
   data-pt="Segurança e gestão avançada de dispositivos IoT.">
  Security and advanced management of IoT devices.
</p>
```

Proper nouns (publication titles, award names) are left untranslated.

## Publishing

This repository **is** the site. Push to the default branch and, in
**Settings → Pages**, set the source to that branch (root). GitHub publishes it at
`https://diegokreutz.github.io` within a minute or two.

## Local preview

Open `index.html` directly in a browser, or serve the folder:

```sh
python3 -m http.server 8000
# then open http://localhost:8000
```
