# QuantumShield architecture

The platform is organized into a decoupled frontend and backend so the educational experience can evolve into a richer simulator over time.

## Frontend

- React Router handles page navigation across Home, Learn, Simulator, Quiz, Progress, and About.
- Framer Motion delivers fluid transitions and polished interactions.
- Reusable components keep the lesson and simulator UI consistent.

## Backend

- FastAPI exposes simulation endpoints for bit-flip, phase-flip, and Shor-code experiments.
- The current implementation returns structured JSON mock data so the frontend can be wired immediately.
- The API is structured for future Qiskit-powered execution.
