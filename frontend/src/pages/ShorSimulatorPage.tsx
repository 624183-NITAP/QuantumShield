import { useMemo, useState } from 'react'
import axios from 'axios'
import { Bar } from 'react-chartjs-2'
import { BarElement, CategoryScale, Chart as ChartJS, Legend, LinearScale, Title, Tooltip } from 'chart.js'
import { CircuitDiagramPanel } from '../components/CircuitDiagramPanel'

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend)

interface SimulationResponse {
  counts: Record<string, number>
  fidelity: number
  error_rate: number
  summary: string
  steps: string[]
  circuit_image?: string | null
}

const BACKEND_URL = 'http://127.0.0.1:8000/shor'

export function ShorSimulatorPage() {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [result, setResult] = useState<SimulationResponse | null>(null)

  const chartData = useMemo(() => {
    if (!result) {
      return {
        labels: [],
        datasets: [],
      }
    }

    const labels = Object.keys(result.counts)
    return {
      labels,
      datasets: [
        {
          label: 'Measurement counts',
          data: labels.map((label) => result.counts[label]),
          backgroundColor: 'rgba(251, 191, 36, 0.8)',
          borderColor: 'rgba(251, 191, 36, 1)',
          borderWidth: 1,
        },
      ],
    }
  }, [result])

  const runSimulation = async () => {
    setLoading(true)
    setError(null)

    try {
      const response = await axios.get<SimulationResponse>(BACKEND_URL, {
        params: {
          error_probability: 0.1,
          shots: 1024,
          seed: 42,
        },
      })
      setResult(response.data)
    } catch (err) {
      console.error(err)
      setError('The backend simulator could not be reached. Please start the FastAPI server and try again.')
      setResult(null)
    } finally {
      setLoading(false)
    }
  }

  const reset = () => {
    setResult(null)
    setError(null)
  }

  return (
    <div className="space-y-8">
      <div className="rounded-[28px] border border-white/10 bg-slate-900/70 p-8 shadow-2xl shadow-amber-950/20 backdrop-blur">
        <h1 className="text-3xl font-semibold text-white sm:text-4xl">Shor Simulator</h1>
        <p className="mt-4 max-w-3xl text-lg leading-8 text-slate-300">
          Run the live Qiskit Shor-code simulation and inspect the measured outcomes, fidelity, and recovery steps.
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-[1.05fr_0.95fr]">
        <div className="rounded-[24px] border border-white/10 bg-slate-900/70 p-6 backdrop-blur">
          <h2 className="text-xl font-semibold text-white">Explanation</h2>
          <p className="mt-4 text-sm leading-8 text-slate-300">
            The Shor code builds a fault-tolerant logical qubit by combining repetition with phase-rotation and syndrome extraction, providing protection against both X and Z errors.
          </p>

          <div className="mt-6 rounded-[20px] border border-dashed border-amber-400/30 bg-amber-500/10 p-6 text-center">
            <h3 className="text-lg font-semibold text-white">Live quantum simulation</h3>
            <p className="mt-3 text-sm leading-7 text-slate-300">
              Start the backend and run the simulation to see the real error-correction workflow from Qiskit.
            </p>
          </div>

          <div className="mt-6 flex flex-wrap gap-3">
            <button
              onClick={runSimulation}
              disabled={loading}
              className="rounded-full bg-amber-400 px-4 py-2 font-medium text-slate-950 transition hover:bg-amber-300 disabled:cursor-not-allowed disabled:opacity-70"
            >
              {loading ? 'Running…' : 'Run Simulation'}
            </button>
            <button onClick={reset} className="rounded-full border border-white/15 px-4 py-2 font-medium text-white transition hover:bg-white/10">
              Reset
            </button>
          </div>

          {loading && (
            <div className="mt-6 flex items-center gap-3 text-sm text-amber-200">
              <div className="h-5 w-5 animate-spin rounded-full border-2 border-amber-400 border-t-transparent" />
              <span>Waiting for the backend simulation…</span>
            </div>
          )}

          {error && (
            <div className="mt-6 rounded-[16px] border border-rose-400/30 bg-rose-500/10 p-4 text-sm text-rose-200">
              {error}
            </div>
          )}
        </div>

        <div className="space-y-6">
          <div className="rounded-[24px] border border-white/10 bg-slate-900/70 p-6 backdrop-blur">
            <h2 className="text-xl font-semibold text-white">Measurement histogram</h2>
            <div className="mt-4 rounded-[20px] border border-white/10 bg-slate-950/70 p-5 text-sm leading-7 text-slate-300">
              {result ? (
                <Bar
                  data={chartData}
                  options={{
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                      legend: { labels: { color: '#cbd5e1' } },
                    },
                    scales: {
                      x: { ticks: { color: '#cbd5e1' }, grid: { color: 'rgba(255,255,255,0.08)' } },
                      y: { ticks: { color: '#cbd5e1' }, grid: { color: 'rgba(255,255,255,0.08)' } },
                    },
                  }}
                />
              ) : (
                <p className="text-slate-400">Run the simulation to see the measurement histogram.</p>
              )}
            </div>
          </div>

          <CircuitDiagramPanel circuitImage={result?.circuit_image} loading={loading} title="Quantum circuit" />

          <div className="rounded-[24px] border border-white/10 bg-slate-900/70 p-6 backdrop-blur">
            <h2 className="text-xl font-semibold text-white">Simulation summary</h2>
            <div className="mt-4 space-y-2 text-sm leading-7 text-slate-300">
              <p>Fidelity: {result ? `${(result.fidelity * 100).toFixed(1)}%` : '—'}</p>
              <p>Error rate: {result ? `${(result.error_rate * 100).toFixed(1)}%` : '—'}</p>
              <p>Summary: {result ? result.summary : 'Awaiting simulation data.'}</p>
            </div>
          </div>

          <div className="rounded-[24px] border border-white/10 bg-slate-900/70 p-6 backdrop-blur">
            <h2 className="text-xl font-semibold text-white">Recovery steps</h2>
            <div className="mt-4 space-y-4">
              {result ? (
                result.steps.map((step, index) => (
                  <div key={step} className="flex gap-3">
                    <div className="flex flex-col items-center">
                      <div className="mt-1 h-3 w-3 rounded-full border border-amber-400 bg-amber-500" />
                      {index < result.steps.length - 1 ? <div className="mt-1 h-full w-px bg-white/10" /> : null}
                    </div>
                    <div className="rounded-[16px] border border-white/10 bg-slate-950/70 p-3 text-sm leading-7 text-slate-300">
                      <p className="font-medium text-white">Step {index + 1}</p>
                      <p>{step}</p>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-sm leading-7 text-slate-400">Run the simulation to view the recovery timeline.</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
