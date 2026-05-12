import { Calendar, Github, Twitter, Mail } from 'lucide-react';

interface FooterProps {
  variant?: 'full' | 'minimal';
}

export default function Footer({ variant = 'full' }: FooterProps) {
  const currentYear = new Date().getFullYear();

  if (variant === 'minimal') {
    return (
      <footer className="py-8 text-center text-[10px] font-medium text-muted border-t border-border bg-white mt-auto">
        <div className="mx-auto max-w-6xl px-4">
          &copy; {currentYear} QikAgenda AI. All rights reserved.
        </div>
      </footer>
    );
  }

  return (
    <footer className="mt-auto border-t border-border bg-slate-50 py-12">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Calendar className="h-5 w-5 text-primary" />
              <span className="text-lg font-semibold tracking-tight text-secondary">QikAgenda</span>
            </div>
            <p className="text-xs leading-relaxed text-muted">
              Streamline your workflow with AI-powered meeting management. Built for teams that move fast.
            </p>
            <div className="flex items-center gap-4">
              <Twitter className="h-4 w-4 cursor-pointer text-muted hover:text-primary transition-colors" />
              <Github className="h-4 w-4 cursor-pointer text-muted hover:text-primary transition-colors" />
              <Mail className="h-4 w-4 cursor-pointer text-muted hover:text-primary transition-colors" />
            </div>
          </div>

          <div>
            <h4 className="mb-4 text-xs font-semibold uppercase tracking-widest text-secondary">Product</h4>
            <ul className="space-y-2 text-xs text-muted">
              <li><a href="#" className="hover:text-primary transition-colors">Features</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Pricing</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">AI Roadmap</a></li>
            </ul>
          </div>

          <div>
            <h4 className="mb-4 text-xs font-semibold uppercase tracking-widest text-secondary">Resources</h4>
            <ul className="space-y-2 text-xs text-muted">
              <li><a href="#" className="hover:text-primary transition-colors">Documentation</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Help Center</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Privacy</a></li>
            </ul>
          </div>
        </div>

        <div className="mt-12 border-t border-border pt-8 text-center text-[10px] font-medium text-muted">
          &copy; {currentYear} QikAgenda AI. All rights reserved. 
        </div>
      </div>
    </footer>
  );
}
