# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Description

This is a plain PHP MVC personal website/portfolio (venabar.com) for Barrington Venables — about, CV, projects, academic sections, plus an "Infini Quiz" feature that generates quiz questions from course transcripts via the OpenAI API. There is no framework, no package manager (no composer.json / package.json), and no test suite or linter — it's raw PHP + jQuery/Bootstrap, run through XAMPP/Apache.

## Running the app

- Requires XAMPP (Apache + PHP) on Windows. Project lives at `C:\xampp\htdocs\venabar.com-MVC` (or similar under `htdocs`).
- Start Apache from the XAMPP Control Panel, then browse to `http://localhost/venabar.com-MVC`.
- No build step, no install step, no test/lint commands exist for this project.

### Environment

- `app/.env` (gitignored) holds runtime secrets/config, loaded manually by `loadEnv()` in `app/functions.php` (there is no `vlucas/phpdotenv` — it's a hand-rolled parser using `putenv()`).
- Known keys: `OPENAI_API_KEY` (used by `app/connections/chatGPT.php` to call the OpenAI chat completions API) and `APP_MODE` (when set to `test`, `app/model/get-quiz.php` returns the canned `app/data/quiz/exampleRes.json` instead of calling the real API — use this to develop the quiz feature without burning API calls).

## Architecture

### Routing: single front controller, query-string based

There is no router or `.htaccess` rewriting. Every request goes through `index.php`, which picks model/view files by the `page` query parameter:

- `?page=X` → requires `app/model/X.php` (if it exists) then renders `app/view/X.phtml` wrapped by `app/view/components/layout.phtml`. Missing view falls back to `app/view/components/404.phtml`.
- `?page=X&mode=api` → requires only `app/model/X.php` and exits immediately (no view render, no layout). This is how the app implements JSON API endpoints (e.g. `?page=get-quiz&mode=api`) from inside the same `page`-keyed model/view convention.
- Default page is `home`.
- All internal paths are built with hardcoded forward slashes (`APP.'/model'`, etc.), not `DIRECTORY_SEPARATOR` — this is deliberate (see `app/config.php`, git history) because the app targets web paths, not OS paths. Follow that convention in any new path-building code.

### Model/View split

- Models (`app/model/*.php`) are plain PHP scripts, `require`d directly (not classes/functions) — they just populate variables in scope for the corresponding view. E.g. `app/model/projects.php` decodes `data/projects.json` into `$projects`; `app/view/projects.phtml` iterates `$projects`.
- Views (`app/view/*.phtml`) are plain PHP templates. Shared chrome lives in `app/view/components/layout.phtml` (head/nav/footer wrapper) and `app/view/components/navbar.phtml`. The navbar is skipped for pages listed in `$noNavbar` inside `layout.phtml` (currently `home`, `test`).
- Site content (CV, projects list) is stored as JSON in `data/` (`data/cv.json`, `data/projects.json`) — no database.

### Quiz feature (`page=quiz`, `page=quizDetail`, `page=get-quiz&mode=api`)

- Course source material lives under `app/data/quiz/courses/<course-folder>/<n>.txt`, one file per sub-lesson, alongside a `<course>.json` manifest (name, folder, description, sections → subSections) that `app/model/quiz.php` scans with `glob()` to build the course picker UI.
- `app/view/quiz.phtml` renders the course/section picker client-side from the JSON manifest (jQuery DOM building, no framework), then opens `quizDetail.php?course=...&section=...&detail=...` in a new tab.
- `app/model/get-quiz.php` (hit as `?page=get-quiz&mode=api`, POST only) is the actual LLM call: it reads the relevant lesson `.txt`, prepends `app/data/quiz/quizPrompt.txt` as the system prompt plus `<course>/<section>/<detail>/<transcript>` tags, sends prior question history from the POST body to avoid repeats, and requests structured output constrained by `app/data/quiz/responseSchema.json` via OpenAI's `json_schema` response format. Model is hardcoded to `gpt-4o-mini`.
- `callAPI()` in `app/connections/chatGPT.php` is the single OpenAI wrapper (`resFormat` = `'message'` returns just the assistant text, `'raw'` returns the full decoded response).

### `examples/` directory

Standalone, unrelated demo/learning projects (card game, pictionary, metronome, calendar, text analyzer, etc.), each self-contained with its own `index.html`/`app.js`. Not wired into the MVC app or its routing — treat each as independent when working inside it.

### Known rough edges

- `app/model/quizDetail.php` is currently entirely commented out (dead code, superseded by `get-quiz.php`'s API-mode flow).
- `app/model/cv.php` is empty; the CV page currently has no model.
- `todo.md` lists planned features (stats tracking, user tracking/login, richer quiz prompting, follow-up questions, document upload, course generation) — check it before assuming a feature is unimplemented.
