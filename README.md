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

## Screenshots

<img width="1877" height="867" alt="image-5" src="https://github.com/user-attachments/assets/6043d67d-b96c-4d4c-9a9c-d7e3889ff722" />
<img width="1911" height="868" alt="image-3" src="https://github.com/user-attachments/assets/a64215e7-8710-46c9-be86-fe75c779528f" />
<img width="1900" height="866" alt="image-1" src="https://github.com/user-attachments/assets/70753c75-611d-4627-9fac-47435282f33a" />


## Project Author

**Tummuri Naga Veera Venkata Sai Ram**

B.Tech, Electronics and Communication Engineering  
National Institute of Technology Andhra Pradesh (NIT AP)

**Email:** 624183@student.nitandhra.ac.in

QuantumShield was designed and developed as a full-stack educational platform to make Quantum Error Correction more approachable through interactive learning, live simulation, and polished visual storytelling.

## Team Members

| Name | Role | Email |
|------|------|-------|
| Tummuri Naga Veera Venkata Sai Ram | Sole Developer (Research, UI/UX Design, Frontend Development, Backend Development, Qiskit Integration, Testing, Documentation, GitHub Management) | 624183@student.nitandhra.ac.in |

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
- Tailwind CSS
- Matplotlib

## References

This project was developed using the following official resources:

- Qiskit Documentation: https://qiskit.org/documentation/
- IBM Quantum Learning: https://learning.quantum.ibm.com/
- React Documentation: https://react.dev/
- FastAPI Documentation: https://fastapi.tiangolo.com/
- Chart.js Documentation: https://www.chartjs.org/
- Vite Documentation: https://vitejs.dev/
---
