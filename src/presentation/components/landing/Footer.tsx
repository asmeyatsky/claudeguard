export default function Footer() {
  return (
    <footer className="border-t border-navy-800 py-12 px-4 mt-12">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <span className="text-lg">🛡</span>
          <span className="text-sm font-bold text-white">ClaudeGuard</span>
          <span className="text-xs text-navy-600 ml-2">Enterprise Security Lifecycle for Agentic AI</span>
        </div>
        <p className="text-navy-600 text-xs">
          &copy; {new Date().getFullYear()} Smeyatsky Labs
        </p>
      </div>
    </footer>
  )
}
