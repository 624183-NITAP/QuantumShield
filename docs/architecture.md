# QuantumShield architecture

QuantumShield is organized as a decoupled frontend and backend so the educational experience can remain highly interactive, extensible, and easy to demo.

## Frontend architecture

- React Router handles navigation across Home, Learn, Simulator, Quiz, Progress, and About.
- The simulator pages present measurement histograms, step-by-step recovery logic, and live Qiskit circuit renderings.
- Framer Motion powers smooth page transitions and panel animation.
- Shared layout and reusable visual components keep the experience consistent across the app.

## Backend architecture

- FastAPI exposes the simulation endpoints:
  - `/bitflip`
  - `/phaseflip`
  - `/shor`
- Each endpoint returns JSON with counts, fidelity, error rate, summary, recovery steps, and a Base64-encoded `circuit_image` field.
- The Qiskit circuit is rendered server-side with Matplotlib and then streamed back to the frontend as a PNG payload.

## Data flow

1. The React frontend calls the relevant simulation endpoint.
2. The FastAPI backend constructs the Qiskit circuit for the selected QEC code.
3. The backend runs the simulation with Qiskit Aer and produces the histogram metrics.
4. The Qiskit circuit is drawn into a Matplotlib figure and converted into a PNG.
5. The frontend decodes the Base64 image and renders the live quantum circuit in the simulator panel.

## Design system

The UI uses a deep-space quantum theme with:

- dark background: `#030712`
- glassmorphism cards with blur and transparent borders
- cyan and purple accent lighting
- responsive layout behavior for desktop and mobile screens

## Why this architecture works

This separation keeps the educational content and simulator experience easy to evolve independently:

- the frontend remains focused on clarity and user experience
- the backend remains focused on reliable simulation and circuit generation
- the app is ready for more advanced Qiskit experiments and course expansion
