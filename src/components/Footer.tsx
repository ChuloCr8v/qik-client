import { Calendar, Github, Twitter, Mail } from 'lucide-react';

interface FooterProps {
  variant?: 'full' | 'minimal';
}

export default function Footer({ variant = 'full' }: FooterProps) {
  const currentYear = new Date().getFullYear();

  if (variant === 'minimal') {
    return (
      <footer className="fixed bottom-0 py-2 text-center w-[80%] bg-white text-sm font-medium text-muted border-t border-border mt-auto">
        <div className="mx-auto w-full px-4">
          &copy; {currentYear} QikAgenda AI. All rights reserved.
        </div>
      </footer>
    );
  }

  return (
    <footer className="mt-auto border-t border-border bg-slate-50 py-12 pb-4">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 flex flex-col justify-center items-center">
        <div className="grid gap-8 sm:flex w-full">
          <div className="space-y-4 -mt-1.5 basis-1/2">
            <div className="flex items-center gap-2">
              <Calendar className="h-5 w-5 text-primary" />
              <span className="text-lg font-semibold tracking-tight text-secondary">QikAgenda</span>
            </div>
            <p className="leading-relaxed text-muted">
              Streamline your workflow with AI-powered meeting management. Built for teams that move fast.
            </p>
            <div className="flex items-center gap-4 mt-4">
              <Twitter className="h-4 w-4 cursor-pointer text-muted hover:text-primary transition-colors" />
              <Github className="h-4 w-4 cursor-pointer text-muted hover:text-primary transition-colors" />
              <Mail className="h-4 w-4 cursor-pointer text-muted hover:text-primary transition-colors" />
            </div>
          </div>

          <div className="basis-1/2">
            <h4 className="mb-4 text-sm font-semibold uppercase tracking-widest text-secondary">Product</h4>
            <ul className="space-y-2 text-muted">
              <li><a href="#" className="hover:text-primary transition-colors">Features</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Pricing</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">AI Roadmap</a></li>
            </ul>
          </div>

          <div className="basis-1/2">
            <h4 className="mb-4 font-semibold uppercase tracking-widest text-secondary">Resources</h4>
            <ul className="space-y-2 text-muted">
              <li><a href="#" className="hover:text-primary transition-colors">Documentation</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Help Center</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Privacy</a></li>
            </ul>
          </div>
        </div>

        <div className="mt-12 border-t border-border pt-2 text-center text-muted">
          &copy; {currentYear} QikAgenda. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
