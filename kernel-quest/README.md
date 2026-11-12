# 🐧 kernel.quest

A Duolingo-style quiz game for **IB Computer Science, Topic 1: Data Representation**
(number systems, text/sound/images, compression and storage), with Linux jokes all over the place.

- 8 lessons in 3 topics + a boss level
- XP, daily streak, hearts, combos, stars, levels and badges
- Progress is saved in your browser (`localStorage`)
- No build step, no dependencies: plain HTML, CSS and JavaScript

## Run it locally

Option 1: double-click `index.html`.

Option 2: serve the folder (recommended):

```bash
python3 -m http.server 8000
# then open http://localhost:8000
```

## Publish on GitHub Pages

1. Create a repository and push these files to the `main` branch.
2. Go to **Settings → Pages**.
3. Under **Build and deployment**, choose **Deploy from a branch**, select `main` and `/ (root)`, then save.
4. After a minute your site is live at `https://<your-user>.github.io/<repo-name>/`.

## Structure

```
index.html      page shell
css/style.css   design tokens, layout and animations
js/app.js       questions (the `T` array), game logic, confetti
.nojekyll       tells GitHub Pages to serve files as they are
```

## Edit the questions

Questions live in the `T` array at the top of `js/app.js`:

```js
['t', 'A ___ is a high-speed area of memory…', 'register', 0, 'Explanation shown after answering']
['m', 'Question…', 'Correct option', ['Wrong 1', 'Wrong 2', 'Wrong 3'], 'Explanation']
```

- `t` = type the answer (`___` marks each blank; `a|b` accepts alternatives)
- `m` = multiple choice (the correct option is shuffled in with the wrong ones)

## Notes

Fonts (Nunito and JetBrains Mono) load from Google Fonts. Offline, the page falls back to system fonts and still works.
