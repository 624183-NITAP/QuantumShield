export function AboutPage() {
  return (
    <div className="space-y-6">
      <div className="rounded-[24px] border border-white/10 bg-white/10 p-8 backdrop-blur">
        <h1 className="text-3xl font-semibold">About QuantumShield</h1>
        <p className="mt-3 max-w-3xl text-slate-300">
          QuantumShield exists to make quantum error correction approachable for students, educators, and curious developers. The platform blends polished storytelling with interactive simulations so the ideas feel concrete rather than abstract.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <article className="rounded-[24px] border border-white/10 bg-white/10 p-6 backdrop-blur">
          <h2 className="text-xl font-semibold">Purpose</h2>
          <p className="mt-3 text-sm leading-6 text-slate-300">
            To explain why quantum computers need error correction and how codes such as bit-flip, phase-flip, and Shor codes protect vulnerable information.
          </p>
        </article>
        <article className="rounded-[24px] border border-white/10 bg-white/10 p-6 backdrop-blur">
          <h2 className="text-xl font-semibold">Technologies</h2>
          <p className="mt-3 text-sm leading-6 text-slate-300">
            Built with React, TypeScript, Vite, Tailwind, Framer Motion, FastAPI, and an architecture ready for future Qiskit and Qiskit Aer integrations.
          </p>
        </article>
      </div>

      <div className="rounded-[24px] border border-white/10 bg-white/10 p-6 backdrop-blur">
        <h2 className="text-xl font-semibold">Developed By</h2>
        <p className="mt-3 text-sm leading-6 text-slate-300">
          <strong>Tummuri Naga Veera Venkata Sai Ram</strong>
        </p>
        <p className="mt-2 text-sm leading-6 text-slate-300">
          B.Tech, Electronics and Communication Engineering<br />
          National Institute of Technology Andhra Pradesh (NIT AP)
        </p>
        <p className="mt-3 text-sm leading-6 text-slate-300">
          Developed QuantumShield as an interactive educational platform to help learners understand Quantum Error Correction and Quantum Error Mitigation through hands-on simulations, visualizations, quizzes, and real Qiskit implementations.
        </p>
      </div>
    </div>
  )
}
