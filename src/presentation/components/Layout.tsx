import type { ReactNode } from 'react'
import { Link, useRouter } from './shared/Router'

export default function Layout({ children }: { children: ReactNode }) {
  const { path } = useRouter()
  const isHome = path === '/'

  return (
    <div className="min-h-screen bg-navy-950">
      {/* Header */}
      {!isHome && (
        <header className="fixed top-0 left-0 right-0 z-50 glass">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-14">
              <div className="flex items-center gap-4">
                <Link to="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
                  <span className="text-xl">🛡</span>
                  <span className="text-lg font-bold text-white">ClaudeGuard</span>
                </Link>
                <span className="text-navy-700">|</span>
                <nav className="flex items-center gap-1">
                  <Link
                    to="/assessment"
                    className={`px-3 py-1.5 rounded-md text-sm transition-all ${
                      path === '/assessment'
                        ? 'bg-electric/10 text-electric font-medium'
                        : 'text-navy-400 hover:text-white'
                    }`}
                  >
                    Assessment
                  </Link>
                  <Link
                    to="/configurator"
                    className={`px-3 py-1.5 rounded-md text-sm transition-all ${
                      path === '/configurator'
                        ? 'bg-electric/10 text-electric font-medium'
                        : 'text-navy-400 hover:text-white'
                    }`}
                  >
                    Configurator
                  </Link>
                </nav>
              </div>
              <span className="text-xs text-navy-600 hidden sm:inline">Enterprise Security Lifecycle for Agentic AI</span>
            </div>
          </div>
        </header>
      )}

      {/* Main content */}
      <main className={isHome ? '' : 'pt-14'}>
        {children}
      </main>
    </div>
  )
}
