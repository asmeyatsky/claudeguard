import { type JSX, useState, useEffect, useMemo, createContext, useContext, useCallback, type ReactNode } from 'react'

interface RouterContextValue {
  path: string
  navigate: (to: string) => void
}

const RouterContext = createContext<RouterContextValue>({
  path: '/',
  navigate: () => {},
})

export function useRouter() {
  return useContext(RouterContext)
}

export function Router({ children }: { children: ReactNode }) {
  const [path, setPath] = useState(window.location.hash.slice(1) || '/')

  useEffect(() => {
    const onHashChange = () => {
      setPath(window.location.hash.slice(1) || '/')
    }
    window.addEventListener('hashchange', onHashChange)
    return () => window.removeEventListener('hashchange', onHashChange)
  }, [])

  const navigate = useCallback((to: string) => {
    window.location.hash = to
  }, [])

  const value = useMemo(() => ({ path, navigate }), [path, navigate])

  return (
    <RouterContext.Provider value={value}>
      {children}
    </RouterContext.Provider>
  )
}

export function Route({ path, component: Component }: { path: string; component: () => JSX.Element }) {
  const { path: currentPath } = useRouter()
  if (currentPath !== path) return null
  return <Component />
}

export function Link({ to, children, className }: { to: string; children: ReactNode; className?: string }) {
  const { navigate } = useRouter()
  return (
    <a
      href={`#${to}`}
      onClick={(e) => {
        e.preventDefault()
        navigate(to)
        window.scrollTo(0, 0)
      }}
      className={className}
    >
      {children}
    </a>
  )
}
