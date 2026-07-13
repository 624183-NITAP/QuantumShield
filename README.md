# QuantumShield

QuantumShield is a modern educational platform for learning quantum error correction through interactive lessons, visual simulations, quizzes, and a scalable frontend/backend architecture.

## Project overview

- Learn the foundations of qubits, superposition, noise, and error correction.
- Explore interactive simulator views for bit-flip, phase-flip, and Shor-code concepts.
- Track progress through lessons and quizzes in a polished dashboard experience.

## Folder structure

- frontend/: React + TypeScript + Vite application
- backend/: FastAPI API with simulation endpoints
- docs/: Project documentation and notes
- assets/: Brand and supporting media assets

## Learning objectives

- Understand qubits, superposition, and quantum noise.
- Recognize how bit-flip and phase-flip errors occur.
- Appreciate why Shor code and mitigation techniques matter in real quantum systems.

## Installation

### Frontend

```bash
cd frontend
npm install
npm run dev
```

### Backend

```bash
cd backend
python -m venv .venv
.venv\Scripts\activate
pip install fastapi uvicorn
uvicorn main:app --reload --port 8000
```

## Future improvements

- Connect the simulator routes to Qiskit and Qiskit Aer runs.
- Add richer circuit diagrams and animated state vectors.
- Expand the quiz system with adaptive difficulty and persistent progress storage.
