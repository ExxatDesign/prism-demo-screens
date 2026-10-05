# Exxat Demo Screens

Captured STEPS admin screens for Prism demos (Faculty, Compliance, Curriculum, Program, Competency, Curriculum Mapping).

## Local

```bash
npm install
npm run dev
```

Open [http://localhost:4010/prism-demo-screens/](http://localhost:4010/prism-demo-screens/). Unprefixed routes redirect there.

## Live

GitHub Pages: [https://exxatdesign.github.io/prism-demo-screens/](https://exxatdesign.github.io/prism-demo-screens/)

## Realistic demo data

The screens in `src/imports/` are generated from `.h2d` captures and contain test data. After every
regeneration, rewrite it with:

```bash
node scripts/realistic-data/run.mjs
```

Shared fictional world (Central City College, DPT program, Alyson Godbey) lives in
`scripts/realistic-data/universe.mjs`; per-screen rules are in `scripts/realistic-data/screens/`.
The script is idempotent (a second run changes nothing). `--only <name>` runs one screen;
`--from <dir>` reads pristine imports from another folder.
