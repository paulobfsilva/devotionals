# Devotionals — native experience prototype

A React Native / Expo SDK 57 app for iOS and Android. This is a separate, reviewable prototype; the GitHub Pages web prototype remains unchanged. No WebView is used.

## Try it on your phone

1. Install [Expo Go](https://expo.dev/go) for your phone. This project uses SDK 57; Expo Go must support that SDK.
2. Put the phone and this Mac on the same Wi-Fi.
3. In this directory run `npm ci` and `npm start`.
4. Scan the terminal QR code: use Camera on iPhone or Expo Go's scanner on Android. Allow local network access when the phone asks.
5. Keep the development server running while testing. The QR address can change when the Mac changes networks. If local Wi-Fi blocks device-to-device traffic, use `npx expo start --tunnel` (requires Expo's tunnel dependency and internet access).

This runs native views inside Expo Go. It is not an independently installed TestFlight/App Store/Play Store release. The first development load needs the Mac; standalone offline launch is not promised. Standalone distribution is a later build/signing step requiring the appropriate developer accounts.

## Experience to review

- Today opens a single sample devotional, with a consistent bottom Continue action and a preview of what follows.
- Scripture, sermon and reflection are separate reading screens. Native fade/slide transitions and light haptics mark deliberate navigation; system reduced-motion preferences are respected.
- Entering prayer displays a topic and a prompt. Prayer can begin immediately; no extra start button is required.
- More ideas and topic selection use a dismissible native bottom panel.
- Guidance can be hidden without changing the selected topic. No timers, automatic advancement or repeating motion.
- Close at any time, or keep praying. Finishing pauses the piano.
- The current section is stored on the device. Playback never starts automatically. Phone volume controls adjust the sound.

The key review question: can you read, begin praying and return for guidance without having to work out what the interface means?

## Content and audio

English KJV, the existing supplied William Branham excerpt (54-0723, paragraph 10) and existing draft prayer prompts. Editorial approval is still pending. One sample day; this does not implement the weekly calendar or an approved content library.

Piano: Harmony-of-Heaven, “God Is My Everything”, from [Pixabay](https://pixabay.com/music/ambient-piano-ambient-music-no-copyright-god-is-my-everything-589755/), under the [Pixabay Content License](https://pixabay.com/service/license-summary/). Bundled as background music within this devotional experience; not a standalone music distribution. Playback copy and full provenance are described in `../mobile/CREDITS.md`. No recording permissions requested. Background playback is configured, but real-phone lock-screen behavior needs testing, especially within Expo Go.

No account, analytics or server-side prayer storage. The development server serves code/assets over the local network.

## Checks

- `npm run typecheck`
- `npm run export:check` — bundles Android, iOS and web, not signed app binaries.
- `npm run ios` / `npm run android` — launch in a configured simulator/emulator.

19 September 2026: TypeScript and all three export bundles passed. Native iOS simulator (iPhone 16 Pro Max, iOS 18, Expo Go SDK 57) displayed the home screen, all reading sections, prayer and the suggestions panel. Android bundle passed; Android device/emulator interaction and physical phone audio/lock-screen behavior have not yet been verified. Web development rendering was also checked.

Expo Doctor: 21/21 checks passed. The scaffold LICENSE covers Expo template software; third-party music retains its separate Pixabay license.
