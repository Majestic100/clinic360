# Clinic 360 – ny hjemmeside

Statisk, hurtig hjemmeside til [clinic360.dk](https://clinic360.dk). Den erstatter WordPress-siden og bruger klinikkens egne billeder og farver.

**Færdig side:** mappen `dist/` kan uploades direkte til et webhotel (Netlify, Cloudflare Pages, Simply, One.com osv.). Den kræver ingen database og ingen PHP.

## Design

- **Farver** (uændrede fra den nuværende profil): mokka `#967969`, sand `#DED6CF`, sort `#222222`, salvie `#A5AEA8`, tekst `#6B6668`. Mørkere mokka `#7A5D4E` bruges til små tekster af hensyn til læsbarheden (kontrast).
- **Skrifter:** *Instrument Serif* til overskrifter og *Hanken Grotesk* til brødtekst. Begge er hostet på egen server (ikke Google Fonts), så siden ikke sender besøgendes IP-adresse til Google (GDPR).
- **Sidehoveder** bruger klinikkens egne brede bannerbilleder som baggrund med teksten ovenpå.
- Mobil først: fast "Ring / Priser / Book tid"-bjælke i bunden på telefon, store trykflader, ingen vandret scroll.

## Sider

| Side | Sti |
| --- | --- |
| Forside | `/` |
| Behandlinger (oversigt) | `/behandlinger/` |
| 10 behandlingssider | `/botox/`, `/kosmetisk-filler/`, `/skinbooster/`, `/profhilo/`, `/pfr-hud/`, `/pfr-har/`, `/kemisk-peeling/`, `/skinpen/`, `/hydrafacial/`, `/fedtfrysning/` |
| Priser | `/priser/` |
| Før & efter | `/foer-efter/` (ny) |
| Om os | `/om-os/` |
| Kontakt | `/kontakt/` |
| Cookie- og privatlivspolitik | `/cookie-og-privatlivspolitik/` |

URL'erne er de samme som på den gamle side, så links fra Google og sociale medier virker fortsat.

## Sådan ændrer du indhold

Alt indhold ligger i **`src/data.mjs`**: priser, åbningstider, Trustpilot-tal, anmeldelser, team og tekster til behandlinger.

```bash
npm install            # første gang (henter ikonerne)
node build.mjs          # bygger siden til ./dist (kræver Node 18+)
npx serve dist          # se den lokalt på http://localhost:3000
```

Ligger siden i en undermappe, bygges den med `BASE_PATH=/undermappe/ node build.mjs`.

### Billeder

Optimerede billeder (WebP) ligger i `assets/img/`. De er lavet ud fra originalerne på den nuværende side med `tools/process_images.py`, der også deler før/efter-collagerne op i separate før- og efter-billeder til slideren. Billedernes størrelse står i `assets/img/manifest.json`, som scriptet opdaterer.

## Struktur

```
src/data.mjs         indhold (rediger her)
src/components.mjs   genbrugelige blokke (header, prisliste, før/efter-slider, anmeldelser …)
src/pages.mjs        de enkelte sider
assets/css/style.css design
assets/js/main.js    menu, slider, filtre, prisnavigation, formular
build.mjs            bygger dist/
```

## Før siden går live

- **Kontaktformular:** Siden har ingen server. Indsæt et endpoint (fx Formspree) i `site.formEndpoint` i `src/data.mjs`. Indtil da åbner formularen brugerens mailprogram.
- **Trustpilot-tal:** `rating` i `src/data.mjs` opdateres manuelt (4,5 / 17 anmeldelser pr. oktober 2026).
- **Redirects:** Opsæt 301-redirects fra eventuelle gamle WordPress-adresser (fx `/vipps_checkout/`, `/feed/`).
