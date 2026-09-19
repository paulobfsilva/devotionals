# Installable mobile experience prototype

Live: https://paulobfsilva.github.io/devotionals/

This is a reviewable, single-day prototype, not the production application. Source lives on `codex/prayer-experience-prototype`; only this directory is deployed to the `gh-pages` branch. No build dependencies.

## Try it on iPhone

Open the live link in Safari, use Share → Add to Home Screen, and enable Open as Web App if offered. Open the installed icon once online. Settings reports when offline caching finishes. Safari and the installed app may have separate saved progress.

Open the devotional, begin with guidance, set the guide aside, and return when ready. The same movement remains selected. “Next invitation” is a separate choice. You can also begin quietly from the reading. Piano starts only on request and stops when leaving the prayer space. Use device volume controls on browsers that ignore the slider.

## Scope

- Complete KJV sample reading, supplied Branham excerpt, original reflection and five prayer movements.
- Mobile layout, install manifest/icons, service worker and cached piano recording.
- Locally saved view, movement, concern and volume; no account or server storage.
- App supports closing without finishing all movements and returning after interruption.
- No publishing calendar, push reminders, licensed worship-song library or approved editorial content yet.

## Verification on 15 September 2026

Hosted browser check: full reading → guidance → quiet → return; reload restored quiet view and movement; a temporary concern survived reload and was removed after checking; rain entered playing state and stopped on leaving prayer; offline cache reported ready. Phone-width rendering checked at 390 × 844. JavaScript syntax passed for app and service worker.

Actual iPhone Home Screen installation, disconnected launch and locked-screen playback still require device verification. App content remains pending Paulo's review. No claim of established routine formation is made.

## Run and publish

For local development, serve this directory with `python3 -m http.server 8765 --bind 127.0.0.1`. Installation and service workers require HTTPS or localhost; the public preview provides HTTPS.

To deploy updates from the prototype branch, commit this directory, run `git subtree split --prefix=prototypes/mobile -b codex/mobile-deploy`, and push that branch to `gh-pages`. When the local deployment branch already exists, use a fresh temporary branch name for the split. Pages is configured to serve the deployment branch root.

Bump the cache name in `sw.js` whenever a deployed runtime asset changes. New service workers wait for existing sessions to close, so updates do not interrupt prayer. Close all app tabs/windows and reopen after an update.

Audio provenance and source notes are in CREDITS.md.

## Audio revision · 16 September 2026

Replaced the storm-like rain with “God Is My Everything” by Harmony-of-Heaven from Pixabay (10:18 solo piano). It plays only on request, loops during prayer, and is cached for offline use. Source and license are linked in settings and CREDITS.md. The service-worker cache is v2; existing installations need all app windows closed and reopened after the update downloads. Listening feedback on an actual phone remains the suitability check.

## Reading flow revision · 19 September 2026

Review question: do explicit next-step labels and subtle transitions make the devotional flow naturally into personal prayer? The reading now unfolds through Scripture, sermon excerpt, reflection and prayer invitation, with a visible location indicator and a next action naming its destination. Back returns to the preceding reading; reload preserves the current section. Prayer controls distinguish praying with the current thought, moving to the next invitation and closing. Transitions are brief and user-triggered; the quiet screen has no repeating motion. Reduced-motion preferences disable transitions. This is a targeted revision of the existing experience, awaiting Paulo’s feedback.
