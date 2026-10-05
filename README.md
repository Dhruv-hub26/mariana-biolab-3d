# MARIANA BIO-LAB // SPECIMEN DOSSIER #809

An interactive 3D WebGL showcase web application built with React, Three.js (`@react-three/fiber`, `@react-three/drei`), Tailwind CSS, Framer Motion, and Lenis smooth momentum scroll.

Features the **Mutant Hammerhead Shark Specimen** (`snatcher_-_mutant_hammerhead_shark_creature.glb`) in a pastel oceanic marine bio-lab environment.

---

## 🌊 Key Features

- **3D Creature Viewport & Auto-Framing**: Centered and normalized scaling with `@react-three/drei`'s `<Bounds>` and `<Center>` for seamless 3D rendering.
- **Skeletal Animation Control**: Crossfading transitions for 5 interactive behaviors:
  - `Swim Mode` (Continuous looping swim cycle)
  - `Lunge Bite` (Forward attack jaw extension)
  - `Tail Attack` (Hydro-thrust caudal whip strike)
  - `Intimidate` (Cephalofoil threat display)
  - `Take Damage` (Reaction strike recoil)
- **Pastel Oceanic Art Direction**: Deep oceanic slate & marine indigo background with seafoam, frosted cyan, and soft coral glassmorphic panels.
- **Symmetrical Telemetry Cards**: Symmetrical floating cards displaying specimen classification and live biological metrics (4,200 PSI bite force, 52 knots sprint velocity, 120 kHz sonar frequency).
- **Web Audio API Atmosphere**: Ambient deep-sea binaural sub-bass synthesizer & interactive sonar ping sound effects.
- **Depth Altimeter HUD**: Real-time bathymetric depth tracking (0m to 8,400m) synchronized with page scroll.
- **Anatomical Diagnostics Section**: Animated count-up stat progress bars and structured diagnostic breakdown cards.

---

## 🛠️ Tech Stack

- **Framework**: React 18 + Vite (TypeScript)
- **3D Rendering**: Three.js, `@react-three/fiber`, `@react-three/drei`
- **Styling**: Tailwind CSS + Custom Glassmorphism Utility Classes
- **Animations & Scroll**: `framer-motion`, `lenis`
- **Audio**: Custom Web Audio API Synthesizer
- **Icons**: `lucide-react`

---

## 🚀 Quickstart

### 1. Install Dependencies
```bash
npm install
```

### 2. Start Development Server
```bash
npm run dev
```
Open [`http://localhost:3000/`](http://localhost:3000/) or [`http://localhost:3001/`](http://localhost:3001/) in your browser.

### 3. Production Build
```bash
npm run build
```

---

## 📁 Project Structure

```
fish/
├── public/
│   └── snatcher_-_mutant_hammerhead_shark_creature.glb
├── src/
│   ├── components/
│   │   ├── AnimationDock.tsx       # Bottom action dock buttons
│   │   ├── DepthHUD.tsx            # Floating depth altimeter bar
│   │   ├── DiagnosticsSection.tsx  # Anatomical cards & progress metrics
│   │   ├── Footer.tsx              # Lab credits & classification status
│   │   ├── LeviathanModel.tsx      # 3D GLTF model loader & animation binding
│   │   ├── Navbar.tsx              # Top pill navigation & audio toggle
│   │   ├── SharkCanvas.tsx         # Three.js canvas & studio ocean lighting
│   │   └── TelemetryBadges.tsx     # Symmetrical floating telemetry cards
│   ├── utils/
│   │   └── audio.ts                # Web Audio API ocean drone synthesizer
│   ├── App.tsx                     # Main application layout & Lenis setup
│   ├── index.css                   # Global styles & glassmorphism utilities
│   └── main.tsx                    # React entry point
├── package.json
├── tailwind.config.js
├── vite.config.ts
├── README.md
└── .gitignore
```

---

## 📄 License

MIT License — Mariana Bio-Lab Initiative © 2026
# mariana-biolab-3d
