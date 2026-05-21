export default function Footer() {
  return (
    <footer className="border-t border-card-border/50 bg-background">
      <div className="mx-auto max-w-7xl px-6 py-12">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          <div className="md:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <span className="text-lg font-black tracking-tight text-white">
                Fix
              </span>
              <span className="text-lg font-black tracking-tight text-primary-light">
                Flow
              </span>
              <span className="ml-2 text-[9px] tracking-[4px] text-muted/60 uppercase">
                AI
              </span>
            </div>
            <p className="max-w-md text-sm text-muted leading-relaxed">
              Enterprise-grade operational troubleshooting and incident response
              platform. From problem to fix — in seconds.
            </p>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-white mb-4">Platform</h4>
            <ul className="space-y-2">
              {["Features", "Demo", "Workflow", "Pricing"].map((item) => (
                <li key={item}>
                  <a
                    href={`#${item.toLowerCase()}`}
                    className="text-sm text-muted hover:text-white transition-colors"
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-white mb-4">Company</h4>
            <ul className="space-y-2">
              {["About", "Blog", "Contact", "Privacy"].map((item) => (
                <li key={item}>
                  <a
                    href="#"
                    className="text-sm text-muted hover:text-white transition-colors"
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-card-border/30 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-muted/60">
            &copy; {new Date().getFullYear()} FixFlow AI. All rights reserved.
          </p>
          <p className="text-[10px] tracking-[3px] text-muted/40 uppercase">
            From problem to fix — in seconds.
          </p>
        </div>
      </div>
    </footer>
  );
}
