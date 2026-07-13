export interface LessonContent {
  slug: string
  title: string
  objectives: string[]
  explanation: string
  math: string
  analogy: string
  summary: string[]
}

export const lessons: LessonContent[] = [
  {
    slug: 'introduction-to-quantum-computing',
    title: 'Introduction to Quantum Computing',
    objectives: [
      'Understand what makes quantum computing different from classical computing.',
      'Recognize why quantum states are fragile and require protection.',
    ],
    explanation:
      'Quantum computing uses qubits and interference to represent and process information in ways that classical systems cannot efficiently reproduce. The field is powerful because quantum states can encode complex relationships between many possibilities at once.',
    math: '|ψ⟩ = α|0⟩ + β|1⟩, where the probabilities of measurement outcomes are |α|² and |β|².',
    analogy: 'A classical computer is like flipping a coin and reading the result. A quantum computer is more like working with the coin while it is still spinning in the air.',
    summary: [
      'Quantum computing leverages superposition and entanglement.',
      'Quantum information is delicate and sensitive to noise.',
      'Error correction is essential for reliable quantum computation.',
    ],
  },
  {
    slug: 'qubits',
    title: 'Qubits',
    objectives: [
      'Describe what a qubit is.',
      'Explain how qubits differ from classical bits.',
    ],
    explanation:
      'A qubit is the basic unit of quantum information. Unlike a classical bit, which is either 0 or 1, a qubit can exist in a superposition of both states until measured.',
    math: 'A qubit state is represented as |ψ⟩ = α|0⟩ + β|1⟩ with |α|² + |β|² = 1.',
    analogy: 'If a classical bit is a light switch, a qubit is more like a dimmer that can be partially on and partially off.',
    summary: [
      'Qubits are the building blocks of quantum computation.',
      'Their state is described by amplitudes rather than a single definite value.',
      'Measurement collapses the qubit to a classical outcome.',
    ],
  },
  {
    slug: 'superposition',
    title: 'Superposition',
    objectives: [
      'Explain superposition in intuitive terms.',
      'Understand why it matters in quantum algorithms.',
    ],
    explanation:
      'Superposition allows a quantum system to occupy a combination of basis states. This creates a richer state space that quantum algorithms can exploit.',
    math: 'The |+⟩ state is (|0⟩ + |1⟩)/√2, which gives equal measurement probabilities for 0 and 1.',
    analogy: 'Superposition is like a musical chord that contains several notes at once until you listen closely and hear one note.',
    summary: [
      'Superposition enables parallel possibilities.',
      'Measurement selects one outcome according to probability amplitudes.',
      'Interference shapes the final distribution of results.',
    ],
  },
  {
    slug: 'quantum-noise',
    title: 'Quantum Noise',
    objectives: [
      'Define quantum noise.',
      'Explain why noise harms quantum systems.',
    ],
    explanation:
      'Quantum noise arises from interactions with the environment, imperfect gates, and thermal fluctuations. These disturbances can change the quantum state and ruin the delicate interference patterns needed for computation.',
    math: 'Noise is often modeled by operators or channels that map a pure state to a mixed state.',
    analogy: 'A whisper in a noisy room becomes harder to understand as more interference enters the signal.',
    summary: [
      'Noise introduces uncertainty into quantum states.',
      'It can cause information loss and incorrect outcomes.',
      'Protecting against noise is a central challenge in quantum computing.',
    ],
  },
  {
    slug: 'bit-flip-error',
    title: 'Bit Flip Error',
    objectives: [
      'Describe what a bit flip error is.',
      'Understand how repetition codes can help.',
    ],
    explanation:
      'A bit flip error changes |0⟩ into |1⟩ or vice versa. This is the simplest form of an error and can be detected by encoding information redundantly.',
    math: 'A simple repetition code maps |0⟩ → |000⟩ and |1⟩ → |111⟩.',
    analogy: 'It is like sending the same message three times and using the majority vote to recover the intended meaning.',
    summary: [
      'Bit flip errors swap logical basis states.',
      'Redundancy helps detect and correct a single flip.',
      'This motivates the idea of quantum error correction.',
    ],
  },
  {
    slug: 'phase-flip-error',
    title: 'Phase Flip Error',
    objectives: [
      'Explain what a phase flip error is.',
      'Recognize why it differs from a bit flip error.',
    ],
    explanation:
      'A phase flip changes the relative sign between components of a superposition. The qubit may still look similar in the computational basis, but its interference properties are changed.',
    math: 'A phase flip maps |+⟩ = (|0⟩ + |1⟩)/√2 to |−⟩ = (|0⟩ − |1⟩)/√2.',
    analogy: 'It is like changing the timing of one note in a chord so the harmony shifts even though the notes are still present.',
    summary: [
      'Phase flips change the sign structure of a superposition.',
      'They are harder to detect than classical bit flips.',
      'Quantum codes must protect against both bit and phase errors.',
    ],
  },
  {
    slug: 'shor-code',
    title: 'Shor Code',
    objectives: [
      'Introduce the Shor code.',
      'Explain how it protects against both bit flip and phase flip errors.',
    ],
    explanation:
      'The Shor code is one of the earliest and most important quantum error-correcting codes. It combines repetition across multiple qubits to protect against both X and Z-type errors.',
    math: 'The code encodes one logical qubit into nine physical qubits using concatenated repetition structure.',
    analogy: 'It is like building a backup system that preserves both the message and the rhythm of the message.',
    summary: [
      'Shor code protects against both bit-flip and phase-flip errors.',
      'It is a foundational example of fault-tolerant quantum logic.',
      'It illustrates how redundancy can be used carefully in quantum systems.',
    ],
  },
]

export function getLessonBySlug(slug: string) {
  return lessons.find((lesson) => lesson.slug === slug) ?? lessons[0]
}

export function getNextLessonSlug(slug: string) {
  const index = lessons.findIndex((lesson) => lesson.slug === slug)
  return index >= 0 && index < lessons.length - 1 ? lessons[index + 1].slug : lessons[0].slug
}
