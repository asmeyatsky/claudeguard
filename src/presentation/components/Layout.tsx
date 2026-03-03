import { type ReactNode, useRef, useEffect } from 'react'
import { Link, useRouter } from './shared/Router'

export default function Layout({ children }: { children: ReactNode }) {
  const { path } = useRouter()
  const isHome = path === '/'
  const mainRef = useRef<HTMLElement>(null)
  const prevPathRef = useRef(path)

  // Move focus to main content on route change so screen readers announce the new page
  useEffect(() => {
    if (prevPathRef.current !== path) {
      prevPathRef.current = path
      mainRef.current?.focus({ preventScroll: true })
    }
  }, [path])

  return (
    <div className="min-h-screen bg-navy-950">
      {/* Skip to main content link for keyboard/screen reader users */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:z-[100] focus:top-2 focus:left-2 focus:px-4 focus:py-2 focus:bg-electric focus:text-white focus:rounded-lg focus:text-sm focus:font-semibold"
        onClick={(e) => {
          e.preventDefault()
          mainRef.current?.focus({ preventScroll: true })
        }}
      >
        Skip to main content
      </a>

      {/* Header */}
      {!isHome && (
        <header className="fixed top-0 left-0 right-0 z-50 glass">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-14">
              <div className="flex items-center gap-4">
                <Link to="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
                  <span className="text-xl" aria-hidden="true">🛡</span>
                  <span className="text-lg font-bold text-white">ClaudeGuard</span>
                </Link>
                <span className="text-navy-700" aria-hidden="true">|</span>
                <nav aria-label="Main navigation" className="flex items-center gap-1">
                  <Link
                    to="/assessment"
                    className={`px-3 py-1.5 rounded-md text-sm transition-all ${
                      path === '/assessment'
                        ? 'bg-electric/10 text-electric font-medium'
                        : 'text-navy-400 hover:text-white'
                    }`}
                    {...(path === '/assessment' ? { 'aria-current': 'page' } : {})}
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
                    {...(path === '/configurator' ? { 'aria-current': 'page' } : {})}
                  >
                    Configurator
                  </Link>
                  <Link
                    to="/provisioner"
                    className={`px-3 py-1.5 rounded-md text-sm transition-all ${
                      path === '/provisioner'
                        ? 'bg-electric/10 text-electric font-medium'
                        : 'text-navy-400 hover:text-white'
                    }`}
                    {...(path === '/provisioner' ? { 'aria-current': 'page' } : {})}
                  >
                    Provisioner
                  </Link>
                  <Link
                    to="/dashboard"
                    className={`px-3 py-1.5 rounded-md text-sm transition-all ${
                      path === '/dashboard'
                        ? 'bg-electric/10 text-electric font-medium'
                        : 'text-navy-400 hover:text-white'
                    }`}
                    {...(path === '/dashboard' ? { 'aria-current': 'page' } : {})}
                  >
                    Dashboard
                  </Link>
                </nav>
              </div>
              <span className="text-xs text-navy-600 hidden sm:inline">Enterprise Security Lifecycle for Agentic AI</span>
            </div>
          </div>
        </header>
      )}

      {/* Main content */}
      <main
        ref={mainRef}
        id="main-content"
        tabIndex={-1}
        className={`${isHome ? '' : 'pt-14'} outline-none`}
        role="main"
        aria-label="Page content"
      >
        {children}
      </main>
    </div>
  )
}
