import { useState, useRef, useCallback } from 'react'

interface CodeBlockProps {
  code: string
  language: string
  filename: string
}

const languageColors: Record<string, string> = {
  json: 'text-amber-accent',
  yaml: 'text-emerald-accent',
  dockerfile: 'text-electric',
  bash: 'text-electric-light',
  markdown: 'text-navy-300',
}

export default function CodeBlock({ code, language, filename }: CodeBlockProps) {
  const [copied, setCopied] = useState(false)
  const timerRef = useRef<ReturnType<typeof setTimeout>>(null)

  const handleCopy = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(code)
      setCopied(true)
      if (timerRef.current) clearTimeout(timerRef.current)
      timerRef.current = setTimeout(() => setCopied(false), 2000)
    } catch {
      // Clipboard API not available in insecure contexts
    }
  }, [code])

  return (
    <div className="rounded-lg border border-navy-800 overflow-hidden">
      {/* File header */}
      <div className="flex items-center justify-between px-4 py-2 bg-navy-900 border-b border-navy-800">
        <div className="flex items-center gap-2">
          <div className="flex gap-1.5">
            <div className="w-3 h-3 rounded-full bg-danger/60" />
            <div className="w-3 h-3 rounded-full bg-amber-accent/60" />
            <div className="w-3 h-3 rounded-full bg-emerald-accent/60" />
          </div>
          <span className="text-xs text-navy-400 font-mono ml-2">{filename}</span>
          <span className={`text-[10px] px-1.5 py-0.5 rounded ${languageColors[language] || 'text-navy-400'} bg-navy-800 font-mono`}>
            {language}
          </span>
        </div>
        <button
          onClick={handleCopy}
          className="text-xs text-navy-500 hover:text-white transition-colors flex items-center gap-1"
        >
          <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
          </svg>
          {copied ? 'Copied!' : 'Copy'}
        </button>
      </div>

      {/* Code content */}
      <div className="overflow-auto max-h-[500px] bg-navy-950">
        <pre className="p-4 text-xs leading-relaxed font-mono">
          <code className="text-navy-300 whitespace-pre">{code}</code>
        </pre>
      </div>
    </div>
  )
}
