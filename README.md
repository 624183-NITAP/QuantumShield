# QuantumShield

QuantumShield is a futuristic educational platform for learning quantum error correction through interactive lessons, live Qiskit-powered simulations, polished visual analytics, and a premium research-showcase frontend experience.

## What QuantumShield does

- Teaches the foundations of qubits, superposition, noise, and quantum error correction.
- Provides guided simulator experiences for bit-flip, phase-flip, and Shor-code workflows.
- Visualizes the actual Qiskit circuit used in each run as a generated PNG diagram.
- Displays measurement histograms, fidelity, error rate, and step-by-step recovery explanations.
- Preserves a responsive and immersive interface for education and demo use.

## Current project status

This version of QuantumShield includes:

- a React + TypeScript + Vite frontend with glassmorphism visuals and a premium deep-space quantum theme
- a FastAPI backend with simulation endpoints for:
  - `/bitflip`
  - `/phaseflip`
  - `/shor`
- Qiskit circuit rendering integrated into the simulator response payload via `circuit_image`
- live measurement and fidelity dashboards using Chart.js

## Tech stack

- Frontend: React, TypeScript, Vite, Framer Motion, Chart.js
- Backend: FastAPI, Qiskit, Qiskit Aer, Matplotlib
- Styling: Tailwind CSS and custom glassmorphism / aurora-inspired UI styling

## Repository structure

- `frontend/`: interactive user interface and simulator pages
- `backend/`: FastAPI server and QEC simulation logic
- `docs/`: architecture and project documentation
- `backend/tests/`: backend regression tests

## Quick start

### 1. Install frontend dependencies

```bash
cd frontend
npm install
npm run dev
```

### 2. Start the backend

```bash
cd backend
python -m venv .venv
.venv\Scripts\activate
pip install fastapi uvicorn qiskit qiskit-aer matplotlib
uvicorn main:app --reload --port 8000
```

### 3. Open the app

- Frontend: `http://127.0.0.1:5173`
- Backend API: `http://127.0.0.1:8000`

## Simulation endpoints

The current API exposes the following response-generating endpoints:

- `GET /bitflip`
- `GET /phaseflip`
- `GET /shor`

Each endpoint returns:

- `counts`
- `fidelity`
- `error_rate`
- `summary`
- `steps`
- `circuit_image` (Base64 PNG of the Qiskit circuit)

## Learning outcomes

- Understand the role of quantum error correction in noisy device environments.
- Compare bit-flip, phase-flip, and Shor-code strategies.
- Interpret circuit diagrams and measurement statistics for research-style demos.

## Project author

**Tummuri Naga Veera Venkata Sai Ram**

B.Tech, Electronics and Communication Engineering  
National Institute of Technology Andhra Pradesh (NIT AP)

QuantumShield was designed and developed as a full-stack educational platform to make quantum error correction more approachable through interactive learning, live simulation, and polished visual storytelling.

## Acknowledgements

Developed as part of the **WISER Education Challenge 2026**.

## Built with

- Qiskit
- Qiskit Aer
- React
- TypeScript
- FastAPI
- Chart.js
- Vite
- Framer Motion

---
