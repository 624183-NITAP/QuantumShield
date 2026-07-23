# QuantumShield Frontend

This frontend powers the QuantumShield educational experience with a responsive, futuristic quantum-themed interface.

## Overview

The frontend is built with:

- React
- TypeScript
- Vite
- Framer Motion
- Chart.js

It includes:

- a home and learning experience
- interactive simulator pages
- quiz and progress flows
- premium dark glassmorphism visuals with aurora-inspired background effects

## Main pages

- Home
- Learn
- Simulator
- Quiz
- Progress
- About

## Simulator pages

The simulator experience remains the same from a functionality perspective and now displays:

- measurement histograms
- fidelity and error-rate metrics
- recovery-step timelines
- actual Qiskit-generated circuit PNGs from the backend response

## Development

```bash
cd frontend
npm install
npm run dev
```

## Production build

```bash
cd frontend
npm run build
```

## Notes

- The app is designed to work with the FastAPI backend on `http://127.0.0.1:8000`.
- The simulator visual styling is intentionally polished for educational demos and hackathon/research showcase use.

---
