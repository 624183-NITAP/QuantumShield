from fastapi import FastAPI, Query
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

from qec.bit_flip import run_bit_flip, run_phase_flip, run_shor

app = FastAPI(title='QuantumShield API', version='1.0.0')

app.add_middleware(
    CORSMiddleware,
    allow_origins=['*'],
    allow_credentials=True,
    allow_methods=['*'],
    allow_headers=['*'],
)


class SimulationResponse(BaseModel):
    counts: dict[str, int]
    fidelity: float
    error_rate: float
    summary: str
    steps: list[str]
    circuit_image: str | None = None


@app.get('/bitflip', response_model=SimulationResponse)
def bitflip(
    error_probability: float = Query(0.1, ge=0.0, le=1.0),
    shots: int = Query(1024, ge=256, le=2048),
    seed: int | None = Query(None),
) -> SimulationResponse:
    result = run_bit_flip(error_probability=error_probability, shots=shots, seed=seed)
    return SimulationResponse(**result)


@app.get('/phaseflip', response_model=SimulationResponse)
def phaseflip(
    error_probability: float = Query(0.1, ge=0.0, le=1.0),
    shots: int = Query(1024, ge=256, le=2048),
    seed: int | None = Query(None),
) -> SimulationResponse:
    result = run_phase_flip(error_probability=error_probability, shots=shots, seed=seed)
    return SimulationResponse(**result)


@app.get('/shor', response_model=SimulationResponse)
def shor(
    error_probability: float = Query(0.1, ge=0.0, le=1.0),
    shots: int = Query(1024, ge=256, le=2048),
    seed: int | None = Query(None),
) -> SimulationResponse:
    result = run_shor(error_probability=error_probability, shots=shots, seed=seed)
    return SimulationResponse(**result)


@app.get('/')
def health() -> dict[str, str]:
    return {'status': 'ok'}
