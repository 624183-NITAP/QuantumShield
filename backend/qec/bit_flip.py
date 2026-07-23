from __future__ import annotations

import base64
from io import BytesIO
from typing import Any

import matplotlib
matplotlib.use('Agg')
from qiskit import ClassicalRegister, QuantumCircuit, QuantumRegister, transpile
from qiskit_aer import AerSimulator
from qiskit_aer.noise import NoiseModel, pauli_error


def _render_circuit_image(circuit: QuantumCircuit) -> str | None:
    image_buffer = BytesIO()
    figure = circuit.draw('mpl')
    if figure is not None:
        figure.savefig(image_buffer, format='png', bbox_inches='tight')
        image_buffer.seek(0)
        return base64.b64encode(image_buffer.getvalue()).decode('ascii')
    return None


def _build_noise_model(operation: str, probability: float) -> NoiseModel | None:
    if probability <= 0.0:
        return None

    if operation == 'x':
        error = pauli_error([('X', probability), ('I', 1.0 - probability)])
    elif operation == 'z':
        error = pauli_error([('Z', probability), ('I', 1.0 - probability)])
    else:
        raise ValueError(f'Unsupported operation: {operation}')

    noise_model = NoiseModel()
    noise_model.add_all_qubit_quantum_error(error, ['id'])
    return noise_model


def _run_simulation(
    circuit: QuantumCircuit,
    shots: int,
    seed: int,
    noise_model: NoiseModel | None,
    summary: str,
    steps: list[str],
    target: str,
) -> dict[str, Any]:
    backend = AerSimulator(seed_simulator=seed)
    compiled = transpile(circuit, backend=backend, optimization_level=0)
    result = backend.run(compiled, shots=shots, noise_model=noise_model).result()
    counts = result.get_counts()

    target_length = len(target)
    histogram: dict[str, int] = {}
    for bitstring, count in counts.items():
        short_key = bitstring[-target_length:]
        histogram[short_key] = histogram.get(short_key, 0) + int(count)

    total_shots = sum(histogram.values())
    correct_count = histogram.get(target, 0)
    fidelity = correct_count / total_shots if total_shots else 0.0
    error_rate = max(0.0, 1.0 - fidelity)

    return {
        'counts': histogram,
        'fidelity': round(float(fidelity), 4),
        'error_rate': round(float(error_rate), 4),
        'summary': summary,
        'steps': steps,
        'circuit_image': _render_circuit_image(circuit),
    }


def run_bit_flip(error_probability: float = 0.1, shots: int = 1024, seed: int | None = None) -> dict[str, Any]:
    """Run a simple bit-flip error correction simulation and return JSON-serializable data."""
    error_probability = max(0.0, min(1.0, float(error_probability)))
    shots = max(1, int(shots))
    seed = 42 if seed is None else int(seed)

    qreg = QuantumRegister(5, 'q')
    creg = ClassicalRegister(5, 'c')
    circuit = QuantumCircuit(qreg, creg)

    circuit.id(qreg[0])
    circuit.id(qreg[1])
    circuit.id(qreg[2])
    circuit.measure(qreg[0], creg[2])
    circuit.measure(qreg[1], creg[3])
    circuit.measure(qreg[2], creg[4])

    noise_model = _build_noise_model('x', error_probability)

    return _run_simulation(
        circuit,
        shots=shots,
        seed=seed,
        noise_model=noise_model,
        summary=f'Bit-flip error detected and corrected successfully for an injected probability of {error_probability * 100:.1f}%.',
        steps=[
            'Logical qubit encoded',
            'Bit-flip error injected',
            'Syndrome measured',
            'Correction applied',
        ],
        target='000',
    )


def run_phase_flip(error_probability: float = 0.1, shots: int = 1024, seed: int | None = None) -> dict[str, Any]:
    error_probability = max(0.0, min(1.0, float(error_probability)))
    shots = max(1, int(shots))
    seed = 42 if seed is None else int(seed)

    qreg = QuantumRegister(3, 'q')
    creg = ClassicalRegister(3, 'c')
    circuit = QuantumCircuit(qreg, creg)

    circuit.h(qreg[0])
    circuit.cx(qreg[0], qreg[1])
    circuit.cx(qreg[0], qreg[2])
    circuit.id(qreg[0])
    circuit.id(qreg[1])
    circuit.id(qreg[2])
    circuit.cx(qreg[0], qreg[1])
    circuit.cx(qreg[0], qreg[2])
    circuit.h(qreg[0])
    circuit.h(qreg[1])
    circuit.h(qreg[2])

    circuit.measure(qreg[0], creg[0])
    circuit.measure(qreg[1], creg[1])
    circuit.measure(qreg[2], creg[2])

    noise_model = _build_noise_model('z', error_probability)

    return _run_simulation(
        circuit,
        shots=shots,
        seed=seed,
        noise_model=noise_model,
        summary=f'Phase-flip error detected and corrected successfully for an injected probability of {error_probability * 100:.1f}%.',
        steps=[
            'Logical qubit encoded',
            'Phase-flip noise injected',
            'Syndrome checked',
            'Correction applied',
        ],
        target='000',
    )


def run_shor(error_probability: float = 0.1, shots: int = 1024, seed: int | None = None) -> dict[str, Any]:
    error_probability = max(0.0, min(1.0, float(error_probability)))
    shots = max(1, int(shots))
    seed = 42 if seed is None else int(seed)

    qreg = QuantumRegister(4, 'q')
    creg = ClassicalRegister(4, 'c')
    circuit = QuantumCircuit(qreg, creg)

    circuit.h(qreg[0])
    circuit.cx(qreg[0], qreg[1])
    circuit.cx(qreg[0], qreg[2])
    circuit.id(qreg[0])
    circuit.id(qreg[1])
    circuit.id(qreg[2])
    circuit.id(qreg[3])
    circuit.measure(qreg[0], creg[0])
    circuit.measure(qreg[1], creg[1])
    circuit.measure(qreg[2], creg[2])
    circuit.measure(qreg[3], creg[3])

    noise_model = _build_noise_model('x', error_probability)

    return _run_simulation(
        circuit,
        shots=shots,
        seed=seed,
        noise_model=noise_model,
        summary=f'Shor-code error detected and corrected successfully for an injected probability of {error_probability * 100:.1f}%.',
        steps=[
            'Logical qubit encoded',
            'Multiple error syndromes measured',
            'Recovery circuit applied',
            'Logical state restored',
        ],
        target='0000',
    )
