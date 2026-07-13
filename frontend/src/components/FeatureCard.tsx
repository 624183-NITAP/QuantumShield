import { motion } from 'framer-motion'

interface FeatureCardProps {
  title: string
  description: string
  icon: string
  delay?: number
}

export function FeatureCard({ title, description, icon, delay = 0 }: FeatureCardProps) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.35, delay }}
      className="rounded-[24px] border border-white/10 bg-slate-900/70 p-6 shadow-lg shadow-cyan-950/20 backdrop-blur"
    >
      <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-cyan-500/15 text-2xl text-cyan-300">
        {icon}
      </div>
      <h3 className="text-xl font-semibold text-white">{title}</h3>
      <p className="mt-3 text-sm leading-6 text-slate-300">{description}</p>
    </motion.article>
  )
}
