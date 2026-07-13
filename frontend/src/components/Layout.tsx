import { motion, AnimatePresence } from 'framer-motion'
import { useState, type ReactNode } from 'react'
import { Link, NavLink } from 'react-router-dom'

interface LayoutProps {
  children: ReactNode
}

const navItems = [
  { to: '/', label: 'Home' },
  { to: '/learn', label: 'Learn' },
  { to: '/simulator', label: 'Simulator' },
  { to: '/quiz', label: 'Quiz' },
  { to: '/progress', label: 'Progress' },
  { to: '/about', label: 'About' },
]

export function Layout({ children }: LayoutProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top,_rgba(106,90,255,0.22),_transparent_35%),linear-gradient(135deg,_#04070f,_#0f172a)] text-slate-100">
      <header className="sticky top-0 z-20 border-b border-white/10 bg-slate-950/80 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 lg:px-8">
          <Link to="/" className="text-xl font-semibold tracking-wide text-cyan-300">
            QuantumShield
          </Link>

          <nav className="hidden gap-2 md:flex">
            {navItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                className={({ isActive }) =>
                  `rounded-full px-4 py-2 text-sm font-medium transition duration-200 ${isActive ? 'bg-cyan-500/20 text-cyan-300' : 'text-slate-300 hover:bg-white/10 hover:text-white'}`
                }
              >
                {item.label}
              </NavLink>
            ))}
          </nav>

          <button
            type="button"
            aria-label="Toggle navigation menu"
            aria-expanded={mobileMenuOpen}
            onClick={() => setMobileMenuOpen((open) => !open)}
            className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/5 text-slate-100 transition hover:bg-white/10 md:hidden"
          >
            <span className="text-xl">☰</span>
          </button>
        </div>

        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2 }}
              className="overflow-hidden border-t border-white/10 bg-slate-950/90 md:hidden"
            >
              <nav className="mx-auto flex max-w-7xl flex-col gap-2 px-6 py-4 lg:px-8">
                {navItems.map((item) => (
                  <NavLink
                    key={item.to}
                    to={item.to}
                    onClick={() => setMobileMenuOpen(false)}
                    className={({ isActive }) =>
                      `rounded-2xl px-4 py-3 text-sm font-medium transition duration-200 ${isActive ? 'bg-cyan-500/20 text-cyan-300' : 'text-slate-300 hover:bg-white/10 hover:text-white'}`
                    }
                  >
                    {item.label}
                  </NavLink>
                ))}
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      <main className="mx-auto max-w-7xl px-6 py-10 lg:px-8">{children}</main>
    </div>
  )
}
