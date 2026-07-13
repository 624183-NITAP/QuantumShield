import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { FeatureCard } from '../components/FeatureCard'
import { SectionHeading } from '../components/SectionHeading'

const features = [
  {
    title: 'Learn Fundamentals',
    description: 'Explore qubits, superposition, decoherence, and the logic behind protecting quantum states.',
    icon: '⚛️',
  },
  {
    title: 'Interactive Simulators',
    description: 'Run guided experiments for bit-flip, phase-flip, and Shor-code scenarios with instant feedback.',
    icon: '🧪',
  },
  {
    title: 'Visual Quantum Circuits',
    description: 'Follow circuit-based explanations that make abstract quantum operations easier to reason about.',
    icon: '🔄',
  },
  {
    title: 'Progress Tracking',
    description: 'Keep tabs on lessons completed, quiz performance, and your evolving understanding of QEC.',
    icon: '📈',
  },
]

export function HomePage() {
  return (
    <div className="space-y-16">
      <section className="grid gap-8 overflow-hidden rounded-[32px] border border-white/10 bg-slate-900/70 p-8 shadow-2xl shadow-cyan-950/30 backdrop-blur-xl lg:grid-cols-[1.05fr_0.95fr] lg:p-12">
        <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.45 }} className="flex flex-col justify-center">
          <span className="inline-flex w-fit rounded-full border border-cyan-400/30 bg-cyan-400/10 px-3 py-1 text-sm font-medium text-cyan-300">
            Interactive Quantum Error Correction Learning Platform
          </span>
          <h1 className="mt-6 text-4xl font-semibold leading-tight text-white sm:text-5xl lg:text-6xl">
            QuantumShield
          </h1>
          <p className="mt-4 max-w-2xl text-lg leading-8 text-slate-300">
            Learn Quantum Error Correction through Interactive Simulations
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <Link to="/learn" className="rounded-full bg-cyan-500 px-6 py-3 font-medium text-slate-950 transition hover:bg-cyan-400">
              Start Learning
            </Link>
            <Link to="/simulator" className="rounded-full border border-white/15 px-6 py-3 font-medium text-white transition hover:bg-white/10">
              Explore Simulators
            </Link>
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5 }} className="rounded-[24px] border border-cyan-400/20 bg-gradient-to-br from-slate-950 via-slate-900 to-cyan-950/70 p-6">
          <div className="space-y-4">
            <div className="rounded-2xl border border-white/10 bg-cyan-500/10 p-5">
              <h2 className="text-xl font-semibold text-white">Why Quantum Error Correction?</h2>
              <p className="mt-2 text-sm leading-6 text-slate-300">
                Quantum computers are noisy, and tiny disturbances can disrupt computation before meaningful results emerge.
              </p>
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
              <h3 className="font-semibold text-white">Decoherence</h3>
              <p className="mt-2 text-sm leading-6 text-slate-300">
                Decoherence causes quantum information to lose its delicate phase relationships and become unreliable.
              </p>
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
              <h3 className="font-semibold text-white">Protection</h3>
              <p className="mt-2 text-sm leading-6 text-slate-300">
                Error correction protects quantum information by encoding it redundantly and correcting faults before they spread.
              </p>
            </div>
          </div>
        </motion.div>
      </section>

      <section className="space-y-8">
        <SectionHeading
          eyebrow="Platform Highlights"
          title="Build intuition with guided learning tools"
          description="QuantumShield combines clear explanations, interactive experiments, and visual learning to make quantum error correction accessible."
        />
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {features.map((feature, index) => (
            <FeatureCard key={feature.title} {...feature} delay={index * 0.08} />
          ))}
        </div>
      </section>

      <section className="rounded-[28px] border border-white/10 bg-white/10 p-8 shadow-xl shadow-slate-950/30 backdrop-blur lg:p-10">
        <SectionHeading
          eyebrow="Why Quantum Error Correction?"
          title="Reliable quantum computing depends on protecting fragile information"
          description="Quantum computers are noisy, decoherence causes information loss, and error correction is the foundation that makes scalable quantum computation possible."
        />
        <div className="mt-8 grid gap-6 md:grid-cols-3">
          {[
            {
              title: 'Noisy hardware',
              description: 'Real quantum devices are affected by heat, electromagnetic noise, and imperfect control operations.',
            },
            {
              title: 'Loss of coherence',
              description: 'Decoherence disrupts the quantum state and destroys the interference patterns that make quantum algorithms useful.',
            },
            {
              title: 'Protection strategy',
              description: 'Error correction encodes logical qubits into more resilient physical qubits so faults can be detected and repaired.',
            },
          ].map((item, index) => (
            <motion.div key={item.title} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.2 }} transition={{ duration: 0.3, delay: index * 0.08 }} className="rounded-[20px] border border-white/10 bg-slate-950/70 p-6">
              <h3 className="text-lg font-semibold text-white">{item.title}</h3>
              <p className="mt-3 text-sm leading-6 text-slate-300">{item.description}</p>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  )
}
