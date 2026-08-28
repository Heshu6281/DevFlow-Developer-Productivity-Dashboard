import { useState } from 'react';
import { Code2, Sun, Moon, LogIn, Mail, Lock } from 'lucide-react';

export default function LoginScreen({ theme, onToggleTheme, onLogin }) {
  const [email, setEmail] = useState('heshwanthini@devflow.io');
  const [password, setPassword] = useState('demo1234');

  const submit = (e) => {
    e.preventDefault();
    onLogin();
  };

  return (
    <div className="relative flex min-h-screen items-center justify-center bg-background px-4">
      <button
        type="button"
        onClick={onToggleTheme}
        aria-label="Toggle theme"
        className="absolute right-4 top-4 rounded-lg p-2 text-text-secondary transition-colors hover:bg-surface-2 hover:text-text-primary"
      >
        {theme === 'dark' ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
      </button>

      <div className="w-full max-w-sm">
        <div className="mb-8 flex flex-col items-center text-center">
          <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-xl bg-accent text-white">
            <Code2 className="h-6 w-6" />
          </div>
          <h1 className="text-2xl font-bold tracking-tight text-text-primary">Welcome to DevFlow</h1>
          <p className="mt-1 text-sm text-text-secondary">Sign in to your developer workspace</p>
        </div>

        <form onSubmit={submit} className="space-y-4 rounded-2xl border border-border bg-surface p-6 shadow-card">
          <div>
            <label htmlFor="email" className="mb-1.5 block text-sm font-medium text-text-secondary">Email</label>
            <div className="relative">
              <Mail className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-text-tertiary" aria-hidden="true" />
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full rounded-lg border border-border bg-surface py-2 pl-9 pr-3 text-sm text-text-primary placeholder:text-text-tertiary focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent"
                placeholder="you@example.com"
              />
            </div>
          </div>
          <div>
            <label htmlFor="password" className="mb-1.5 block text-sm font-medium text-text-secondary">Password</label>
            <div className="relative">
              <Lock className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-text-tertiary" aria-hidden="true" />
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full rounded-lg border border-border bg-surface py-2 pl-9 pr-3 text-sm text-text-primary placeholder:text-text-tertiary focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent"
                placeholder="••••••••"
              />
            </div>
          </div>
          <button
            type="submit"
            className="flex w-full items-center justify-center gap-2 rounded-lg bg-accent px-4 py-2.5 text-sm font-medium text-white transition-colors hover:opacity-90"
          >
            <LogIn className="h-4 w-4" /> Sign In
          </button>
          <p className="text-center text-xs text-text-tertiary">
            Demo credentials are pre-filled. Just press Sign In.
          </p>
        </form>
      </div>
    </div>
  );
}
