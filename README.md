# The Winchester Garden

A simple site for growers in Winchester, Kentucky and the surrounding area
to submit what they grow, so neighbors can browse the list and reach out
directly. Built with React + Vite + react-bootstrap, with a Google Sheet as
the "database" (no server hosting needed).

- **Home** — intro to the site
- **Directory** (`/directory`) — public list of approved growers
- **Add Your Farm** (`/submit`) — submission form for growers

New submissions land as **Pending** and don't show up publicly until you
approve them by editing the Google Sheet directly. See
`apps-script/README.md` for the full backend setup — **you need to do that
before the site will actually work.**

## 1. Set up the backend (do this first)

Follow **`apps-script/README.md`** to create the Google Sheet + Apps Script
that stores submissions, and paste the resulting Web App URL into
`src/config.js` as `APPS_SCRIPT_URL`.

## 2. Run it locally

```bash
npm install
npm run dev
```

Then open the URL it prints (usually http://localhost:5173).

## 3. Customize

- `src/config.js` — site name, tagline, and the Apps Script URL
- `src/components/NavBar.jsx` — nav bar text/color
- `src/pages/Home.jsx` — homepage copy
- Colors/spacing — this uses standard [Bootstrap 5](https://getbootstrap.com/docs/5.3/getting-started/introduction/)
  utility classes and [react-bootstrap](https://react-bootstrap.github.io/)
  components throughout, so anything in their docs works here.

## 4. Deploy to GitHub Pages

1. Create a new, empty repo on GitHub (e.g. `local-growers-directory`).
2. Push this project to it:

   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/<your-username>/<repo-name>.git
   git push -u origin main
   ```

3. Deploy the built site to the `gh-pages` branch:

   ```bash
   npm run deploy
   ```

   This runs `vite build` and pushes the `dist/` folder to a `gh-pages`
   branch using the `gh-pages` package (already set up in `package.json`).

4. On GitHub, go to **Settings → Pages** for the repo, and under "Build and
   deployment", set **Source** to **Deploy from a branch**, branch
   **gh-pages**, folder **/ (root)**. Save.

5. After a minute or two, your site will be live at:
   `https://<your-username>.github.io/<repo-name>/`

Whenever you make changes, just run `npm run deploy` again to republish.

> The app uses a hash-based router (`/#/directory`, `/#/submit`) so that
> page refreshes and direct links work correctly on GitHub Pages, which
> can't do the server-side URL rewriting a router normally relies on.

## How moderation works

Every submission from the "Add Your Farm" form is appended to your Google
Sheet with `Status = Pending`. It will **not** appear in the public
Directory until you open the Sheet and change that row's Status to
`Approved`. There's no admin login required for this — you're just editing
the spreadsheet directly. Full details in `apps-script/README.md`.

## Project structure

```
src/
  api/growers.js       — talks to the Apps Script backend (fetch/submit)
  components/          — NavBar, Footer, GrowerCard
  pages/                — Home, Directory, Submit
  config.js             — site text + Apps Script URL
apps-script/
  Code.gs               — Google Apps Script backend (paste into your Sheet)
  README.md             — step-by-step backend setup
```
