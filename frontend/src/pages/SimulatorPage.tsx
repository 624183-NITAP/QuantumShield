import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js'
import { Bar } from 'react-chartjs-2'
import type { SimulationResponse } from '../types'
import { CircuitDiagramPanel } from '../components/CircuitDiagramPanel'

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend)

const simulatorTypes = [
  { id: 'bitflip', title: 'Bit Flip Code', description: 'Protects against X-type inversion errors.' },
  { id: 'phaseflip', title: 'Phase Flip Code', description: 'Protects against Z-type phase disturbances.' },
  { id: 'shor', title: 'Shor Code', description: 'Combines both strategies for stronger protection.' },
]

function formatCounts(counts: Record<string, number>) {
  return Object.entries(counts).map(([key, value]) => `${key}: ${value}`).join(', ')
}

function getFallbackResponse(active: string): SimulationResponse {
  if (active === 'phaseflip') {
    return {
      counts: { '00': 7, '11': 3 },
      fidelity: 0.86,
      error_rate: 0.14,
      summary: 'Phase-flip noise injected and corrected in the demo workflow.',
      steps: ['Phase noise introduced', 'Parity check performed', 'Correction applied'],
      circuit_image: null,
    }
  }

  if (active === 'shor') {
    return {
      counts: { '000': 6, '111': 4 },
      fidelity: 0.82,
      error_rate: 0.18,
      summary: 'Shor-code recovery circuit applied for the demo workflow.',
      steps: ['Shor encoding prepared', 'Error syndrome measured', 'Recovery circuit applied'],
      circuit_image: null,
    }
  }

  return {
    counts: { '00': 4, '11': 4, '01': 2 },
    fidelity: 0.78,
    error_rate: 0.22,
    summary: 'Bit-flip noise injected and corrected in the demo workflow.',
    steps: ['Bit-flip noise introduced', 'Syndrome measured', 'Correction applied'],
    circuit_image: null,
  }
}

export function SimulatorPage() {
  const [active, setActive] = useState('bitflip')
  const [result, setResult] = useState<SimulationResponse | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [errorProbability, setErrorProbability] = useState(10)
  const [shots, setShots] = useState(1024)
  const [seed, setSeed] = useState(42)

  const activeSimulator = useMemo(() => simulatorTypes.find((item) => item.id === active) ?? simulatorTypes[0], [active])

  const chartData = useMemo(() => {
    const counts = result?.counts ?? {}
    const labels = Object.keys(counts)
    return {
      labels: labels.length > 0 ? labels : ['00', '01', '10', '11'],
      datasets: [
        {
          label: 'Measurement counts',
          data: labels.length > 0 ? labels.map((label) => counts[label] ?? 0) : [0, 0, 0, 0],
          backgroundColor: ['#22d3ee', '#818cf8', '#f59e0b', '#f472b6'],
        },
      ],
    }
  }, [result])

  const fidelityChartData = useMemo(() => {
    if (!result) {
      return {
        labels: ['Fidelity', 'Error Rate'],
        datasets: [
          {
            label: 'Observed score',
            data: [0, 0],
            backgroundColor: ['#22d3ee', '#f87171'],
            borderColor: ['#67e8f9', '#fca5a5'],
            borderWidth: 1,
          },
        ],
      }
    }

    return {
      labels: ['Fidelity', 'Error Rate'],
      datasets: [
        {
          label: 'Observed score',
          data: [result.fidelity, result.error_rate],
          backgroundColor: ['#22d3ee', '#f87171'],
          borderColor: ['#67e8f9', '#fca5a5'],
          borderWidth: 1,
        },
      ],
    }
  }, [result])

  const runSimulation = async () => {
    setLoading(true)
    setError(null)
    try {
      const endpoint = active === 'bitflip' ? 'bitflip' : active === 'phaseflip' ? 'phaseflip' : 'shor'
      const response = await axios.get<SimulationResponse>(`http://127.0.0.1:8000/${endpoint}`, {
        params: {
          error_probability: errorProbability / 100,
          shots,
          seed: Number(seed),
        },
      })
      setResult(response.data)
    } catch (error) {
      console.error(error)
      setError('The backend simulator could not be reached. Please start the FastAPI server and try again.')
      setResult(getFallbackResponse(active))
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="space-y-6">
      <div className="rounded-[24px] border border-white/10 bg-white/10 p-6 backdrop-blur">
        <h1 className="text-3xl font-semibold">Interactive Simulator</h1>
        <p className="mt-3 max-w-3xl text-slate-300">
          These simulator panels are connected to the FastAPI backend and can evolve into full Qiskit-powered experiments as the project scales.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        {simulatorTypes.map((item) => (
          <button
            key={item.id}
            onClick={() => setActive(item.id)}
            className={`rounded-[20px] border p-5 text-left transition ${active === item.id ? 'border-cyan-400/40 bg-cyan-500/15' : 'border-white/10 bg-slate-950/60 hover:bg-white/10'}`}
          >
            <h2 className="font-semibold text-white">{item.title}</h2>
            <p className="mt-2 text-sm text-slate-300">{item.description}</p>
          </button>
        ))}
      </div>

      <section className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="rounded-[24px] border border-white/10 bg-white/10 p-6 backdrop-blur">
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            <label className="rounded-2xl border border-white/10 bg-slate-950/70 p-4 text-sm text-slate-300">
              <span className="mb-2 block font-medium text-white">Error Probability</span>
              <input
                type="range"
                min="0"
                max="100"
                value={errorProbability}
                onChange={(event) => setErrorProbability(Number(event.target.value))}
                className="w-full accent-cyan-400"
              />
              <span className="mt-2 block text-cyan-300">{errorProbability}%</span>
            </label>

            <label className="rounded-2xl border border-white/10 bg-slate-950/70 p-4 text-sm text-slate-300">
              <span className="mb-2 block font-medium text-white">Number of Shots</span>
              <select
                value={shots}
                onChange={(event) => setShots(Number(event.target.value))}
                className="w-full rounded-lg border border-white/10 bg-slate-900 px-3 py-2 text-white"
              >
                <option value={256}>256</option>
                <option value={512}>512</option>
                <option value={1024}>1024</option>
                <option value={2048}>2048</option>
              </select>
            </label>

            <label className="rounded-2xl border border-white/10 bg-slate-950/70 p-4 text-sm text-slate-300">
              <span className="mb-2 block font-medium text-white">Random Seed</span>
              <input
                type="number"
                value={seed}
                onChange={(event) => setSeed(Number(event.target.value))}
                className="w-full rounded-lg border border-white/10 bg-slate-900 px-3 py-2 text-white"
              />
            </label>

            <div className="flex flex-wrap gap-3 rounded-2xl border border-white/10 bg-slate-950/70 p-4">
              <button onClick={runSimulation} className="rounded-full bg-cyan-500 px-4 py-2 font-medium text-slate-950">
                {loading ? 'Running…' : 'Run Simulation'}
              </button>
              <button onClick={() => setResult(null)} className="rounded-full border border-white/15 px-4 py-2 font-medium text-white">
                Reset
              </button>
              <button onClick={() => setResult(getFallbackResponse(active))} className="rounded-full border border-amber-400/30 px-4 py-2 font-medium text-amber-200">
                Inject Error
              </button>
            </div>
          </div>

          <div className="mt-6 rounded-[20px] border border-white/10 bg-slate-950/70 p-6">
            <h2 className="text-xl font-semibold">{activeSimulator.title}</h2>
            <p className="mt-2 text-sm text-slate-300">Explanation: {activeSimulator.description}</p>
            <div className="mt-6 rounded-2xl border border-dashed border-cyan-400/30 bg-cyan-500/10 p-5 text-sm text-slate-300">
              {error ? error : result ? result.summary : 'Run the simulation to view the live backend response.'}
            </div>
          </div>

          <div className="mt-6">
            <CircuitDiagramPanel circuitImage={result?.circuit_image} loading={loading} title="Quantum circuit" />
          </div>
        </div>

        <div className="space-y-6">
          <div className="rounded-[24px] border border-white/10 bg-white/10 p-6 backdrop-blur">
            <h2 className="text-xl font-semibold">Measurement Histogram</h2>
            <div className="mt-4 rounded-2xl border border-white/10 bg-slate-950/70 p-5 text-sm text-slate-300">
              <Bar data={chartData} options={{ responsive: true, plugins: { legend: { display: false } } }} />
            </div>
          </div>

          <div className="rounded-[24px] border border-white/10 bg-white/10 p-6 backdrop-blur">
            <h2 className="text-xl font-semibold">Fidelity Graph</h2>
            <div className="mt-4 rounded-2xl border border-white/10 bg-slate-950/70 p-5 text-sm text-slate-300">
              <div className="h-56">
                <Bar
                  data={fidelityChartData}
                  options={{
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                      legend: { display: false },
                    },
                    scales: {
                      x: {
                        ticks: { color: '#cbd5e1' },
                        grid: { color: 'rgba(255,255,255,0.08)' },
                      },
                      y: {
                        min: 0,
                        max: 1,
                        ticks: {
                          color: '#cbd5e1',
                          callback: (value) => Number(value).toFixed(2),
                        },
                        grid: { color: 'rgba(255,255,255,0.08)' },
                      },
                    },
                  }}
                />
              </div>
              {result ? (
                <p className="mt-3 text-cyan-200">Observed fidelity: {(result.fidelity * 100).toFixed(1)}%</p>
              ) : (
                <p className="mt-3 text-slate-400">Fidelity will appear after execution.</p>
              )}
            </div>
          </div>

          <div className="rounded-[24px] border border-white/10 bg-white/10 p-6 backdrop-blur">
            <h2 className="text-xl font-semibold">Result Summary</h2>
            <div className="mt-4 space-y-2 text-sm text-slate-300">
              <p>Measurement counts: {result ? formatCounts(result.counts) : 'Awaiting data'}</p>
              <p>Fidelity: {result ? `${(result.fidelity * 100).toFixed(1)}%` : '—'}</p>
              <p>Error rate: {result ? `${(result.error_rate * 100).toFixed(1)}%` : '—'}</p>
              <p>Steps: {result ? result.steps.join(' • ') : '—'}</p>
            </div>
          </div>
        </div>
      </section>

      <div className="flex justify-end">
        <Link to="/quiz" className="rounded-full border border-white/15 px-5 py-3 font-medium text-white transition hover:bg-white/10">
          Continue to Quiz
        </Link>
      </div>
    </div>
  )
}
