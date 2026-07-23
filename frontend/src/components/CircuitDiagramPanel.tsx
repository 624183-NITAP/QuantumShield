import { useEffect, useState } from 'react'

interface CircuitDiagramPanelProps {
  circuitImage?: string | null
  loading?: boolean
  title?: string
}

export function CircuitDiagramPanel({ circuitImage, loading = false, title = 'Quantum circuit' }: CircuitDiagramPanelProps) {
  const [imageError, setImageError] = useState(false)

  useEffect(() => {
    setImageError(false)
  }, [circuitImage])

  if (loading) {
    return (
      <div className="rounded-[20px] border border-white/10 bg-slate-950/70 p-4">
        <div className="mb-3 flex items-center justify-between">
          <h3 className="text-lg font-semibold text-white">{title}</h3>
        </div>
        <div className="animate-pulse rounded-2xl border border-white/10 bg-slate-900/70 p-4">
          <div className="h-64 w-full rounded-xl bg-slate-800" />
        </div>
      </div>
    )
  }

  const hasImage = Boolean(circuitImage) && !imageError

  return (
    <div className="rounded-[20px] border border-white/10 bg-slate-950/70 p-4">
      <div className="mb-3 flex items-center justify-between">
        <h3 className="text-lg font-semibold text-white">{title}</h3>
      </div>

      {hasImage ? (
        <div className="overflow-hidden rounded-2xl border border-white/10 bg-white">
          <img
            src={`data:image/png;base64,${circuitImage}`}
            alt="Quantum Circuit"
            className="mx-auto w-full max-w-2xl rounded-lg object-contain transition duration-300 hover:scale-110"
            onError={() => setImageError(true)}
          />
        </div>
      ) : (
        <div className="rounded-2xl border border-dashed border-cyan-400/30 bg-cyan-500/10 p-5 text-sm leading-7 text-slate-300">
          {imageError
            ? 'The circuit image could not be loaded. Please run the simulation again.'
            : 'Run the simulation to display the real Qiskit-generated circuit diagram.'}
        </div>
      )}
    </div>
  )
}
