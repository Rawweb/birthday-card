# 💞 Birthday Surprise

A fully interactive, mobile-first birthday experience built as a personal gift. Designed to feel like a premium app, not a webpage. Every screen was crafted with intentional animations, emotional pacing, and a consistent dark love theme.

> Built for Augusta's 26th birthday. August 7, 2026.

---

## 🔗 Live Demo

[View Live](https://your-vercel-link.vercel.app)

---

## 📸 Preview

| Lock Screen | Loading | Birthday |
|-------------|---------|----------|
| Pin-based lock with passkey hint | Animated panda with progress bar | Counting numbers + happy birthday |

| Memories | Reasons | Message |
|----------|---------|---------|
| Coverflow photo carousel | Swipeable reason cards | Typewriter love letter |

---

## ✨ Features

- **Lock Screen** with a 6-digit passkey, shake animation on wrong input, and a photo hint modal
- **Loading Screen** with a bouncing panda, animated Hmm text, and a filling progress bar
- **Welcome Screen** with staggered fade-up animations, sleeping panda, and glowing ring
- **Birthday Screen** with animated number counters and a shaking panda
- **Memories Carousel** using Swiper.js coverflow effect with her photos
- **Reasons Screen** with swipeable cards, each revealing a personal reason
- **Promise Screen** with promises sliding in one by one from the left
- **Letter Screen** with a glowing envelope tap-to-open animation
- **Message Screen** with a full typewriter effect and a confetti celebration burst
- **Persistent navigation** using localStorage so refresh never loses her place
- **Fully mobile-first** with tap glow, press depth, and no hover dependency
- **Hidden scrollbar** across all browsers
- **Custom 💞 SVG favicon** matching the theme

---

## 🛠 Tech Stack

| Tool | Purpose |
|------|---------|
| React 18 | Component architecture and state management |
| Vite | Fast development and optimised production build |
| Tailwind CSS v4 | Utility styling with custom design tokens via @theme |
| Framer Motion | All screen transitions, staggered animations, and micro-interactions |
| Swiper.js | Coverflow photo carousel and card stack effect |
| canvas-confetti | Petal burst on the celebrate button |

---

## 📁 Project Structure

```
birthday-surprise/
├── public/
│   ├── images/
│   │   ├── her-photo.png        # Lock screen profile photo
│   │   ├── memory-1.jpg         # Carousel photos
│   │   ├── memory-2.jpg
│   │   └── memory-3.jpg
│   └── favicon.svg              # Custom revolving hearts favicon
├── src/
│   ├── constants/
│   │   └── config.js            # All personal content lives here
│   ├── screens/
│   │   ├── LockScreen.jsx
│   │   ├── LoadingScreen.jsx
│   │   ├── WelcomeScreen.jsx
│   │   ├── BirthdayScreen.jsx
│   │   ├── MemoriesScreen.jsx
│   │   ├── ReasonsScreen.jsx
│   │   ├── PromiseScreen.jsx
│   │   ├── LetterScreen.jsx
│   │   └── MessageScreen.jsx
│   ├── index.css                # Design tokens, keyframes, component classes
│   ├── App.jsx                  # Screen state controller
│   └── main.jsx
├── index.html
└── vite.config.js
```

---

## 🚀 Getting Started

```bash
# Clone the repo
git clone https://github.com/rawweb/birthday-surprise.git

# Move into the project
cd birthday-surprise

# Install dependencies
npm install

# Start the development server
npm run dev
```

---

## ⚙️ Configuration

Everything personal is controlled from one file. You never have to touch individual screen components to personalise this for someone else.

```js
// src/constants/config.js

export const CONFIG = {
  name: "Augusta",
  age: 26,
  birthday: "2026-08-07",
  passkey: "805020",
  lockPhoto: "/images/her-photo.png",
  memories: [
    "/images/memory-1.jpg",
    "/images/memory-2.jpg",
    "/images/memory-3.jpg",
  ],
  reasons: [
    "Your reason here...",
  ],
  promises: [
    "Your promise here...",
  ],
  message: `Your full message here...`,
};
```

---

## 📦 Deployment

This project is deployed on Vercel. To deploy your own version:

```bash
# Build for production
npm run build

# Push to GitHub then connect repo on vercel.com
# Vercel auto-detects Vite, no configuration needed
```

---

## 💡 What I Built and Learned

- Designed and implemented a full multi-screen experience using only React state, no router needed
- Built a custom design system in Tailwind v4 using `@theme` tokens for colors, fonts, shadows, and keyframe animations
- Implemented a typewriter hook, animated counters, and a progress bar all from scratch using `useEffect` and `setInterval`
- Used Framer Motion for orchestrated staggered animations, spring physics, and exit transitions
- Handled mobile-specific UX details like tap glow on active state, hidden scrollbar, and apple-touch-icon
- Managed persistent screen state across browser refreshes using localStorage
- Wrote emotionally intentional copy and designed screen flow for maximum emotional impact

---

## 🤍 Author

Built with love by [Rawfile](https://github.com/rawweb)

---

> This project is personal. The code is open but the feelings behind it are not replicable.