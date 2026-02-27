export default function Footer() {
  return (
    <footer className="border-t border-navy-800 py-16 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <span className="text-2xl">🛡</span>
              <span className="text-xl font-bold text-white">ClaudeGuard</span>
            </div>
            <p className="text-navy-400 text-sm max-w-md mb-4">
              Enterprise Security Lifecycle Platform for Agentic AI Development Environments.
              Assess, Configure, Deploy, and Monitor Claude Code securely across your organization.
            </p>
            <p className="text-navy-600 text-xs">
              Created by Allan Smeyatsky
              <br />
              Google Cloud Partner All-Star 2024 | Google UK CTO Council Member
            </p>
          </div>

          {/* Product */}
          <div>
            <h4 className="text-sm font-semibold text-white mb-4">Product</h4>
            <ul className="space-y-2">
              {['ARIA Assessment', 'Security Configurator', 'Sandbox Provisioner', 'Security Dashboard', 'Pricing'].map((item) => (
                <li key={item}>
                  <a href="#modules" className="text-sm text-navy-400 hover:text-white transition-colors">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="text-sm font-semibold text-white mb-4">Resources</h4>
            <ul className="space-y-2">
              {['Documentation', 'API Reference', 'Security Whitepaper', 'Compliance Guides', 'Partner Programme'].map((item) => (
                <li key={item}>
                  <span className="text-sm text-navy-400 hover:text-white transition-colors cursor-pointer">
                    {item}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-navy-800 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-navy-600 text-xs">
            &copy; {new Date().getFullYear()} ClaudeGuard. All rights reserved. CONFIDENTIAL.
          </p>
          <div className="flex items-center gap-6">
            <span className="text-navy-600 text-xs hover:text-navy-400 cursor-pointer">Privacy Policy</span>
            <span className="text-navy-600 text-xs hover:text-navy-400 cursor-pointer">Terms of Service</span>
            <span className="text-navy-600 text-xs hover:text-navy-400 cursor-pointer">Security</span>
          </div>
        </div>
      </div>
    </footer>
  )
}
