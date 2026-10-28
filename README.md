# Our Little World — Ankita's Birthday Surprise

Plain HTML/CSS/JS. No build step, no backend.

## 1. Test locally
Double-click `index.html`, or run `python3 -m http.server` in this folder and open http://localhost:8000.

## 2. Photos
Put 15 images at `assets/photos/photo-01.jpg` … `photo-15.jpg` (same order as the captions). They are never cropped (`object-fit: contain`). If a photo is sideways, rotate a copy in any photo editor and save it under the same name.

## 3. Song
Replace `assets/audio/our-song.mp3` (keep the name), or edit the path in `script.js` (`new Audio(...)`). Music starts only after a tap (Unfold Love / ♪ button). If the file is missing, everything else still works.

## 4. Captions
Edit the `CAPTIONS` array in `script.js`. Gallery, slideshow and final photo all use it.

## 5. Letter
Edit the `FULL` text in `script.js`. `${CONFIG.proposalDate}` inserts the configured date.

## 6. Proposal date and password (one place)
Top of `script.js`:
```js
const CONFIG = { proposalDate: "29 December 2023", password: "29122023" };
```
For 2024 use `"29 December 2024"` and `"29122024"`. The password is only a playful gate; anyone can read the source and photos.

## 7. GitHub repository
1. github.com → New repository (e.g. `our-little-world`), Public.
2. "uploading an existing file" → drag in `index.html`, `style.css`, `script.js`, `README.md` and the whole `assets` folder → Commit.

## 8. Enable GitHub Pages
Settings → Pages → Deploy from a branch → `main` → `/(root)` → Save.

## 9. Public URL
After a minute or two, Settings → Pages shows `https://<username>.github.io/<repo>/`. Open it on your phone and run through all six screens before sharing. All paths are relative, so the repo subpath works.
