import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronDown, User, Settings as SettingsIcon, Sun, Moon, LogOut } from 'lucide-react';

export default function ProfileMenu({ theme, onToggleTheme, onLogout }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const onClick = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener('mousedown', onClick);
    return () => document.removeEventListener('mousedown', onClick);
  }, []);

  const go = (path) => {
    setOpen(false);
    navigate(path);
  };

  const logout = () => {
    setOpen(false);
    onLogout();
  };

  return (
    <div className="relative" ref={ref}>
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-label="Open profile menu"
        aria-expanded={open}
        className="flex items-center gap-2 rounded-lg p-1 pr-2 transition-colors hover:bg-surface-2"
      >
        <img
          src="https://api.dicebear.com/7.x/initials/svg?seed=HP&backgroundColor=4f46e5"
          alt="Heshwanthini Pasunuthi avatar"
          className="h-8 w-8 rounded-full"
        />
        <span className="hidden text-left sm:block">
          <span className="block text-sm font-medium leading-tight text-text-primary">Heshwanthini</span>
          <span className="block text-xs leading-tight text-text-tertiary">Developer</span>
        </span>
        <ChevronDown className="h-4 w-4 text-text-tertiary" aria-hidden="true" />
      </button>

      {open && (
        <div className="absolute right-0 top-12 z-50 w-60 overflow-hidden rounded-xl border border-border bg-surface shadow-card-hover animate-fade-in">
          <div className="border-b border-border px-4 py-3">
            <p className="text-sm font-semibold text-text-primary">Heshwanthini Pasunuthi</p>
            <p className="text-xs text-text-tertiary">Software Developer</p>
          </div>
          <nav className="py-1" aria-label="Profile menu">
            <button
              type="button"
              onClick={() => go('/profile')}
              className="flex w-full items-center gap-2.5 px-4 py-2 text-sm text-text-secondary hover:bg-surface-2 hover:text-text-primary"
            >
              <User className="h-4 w-4" /> My Profile
            </button>
            <button
              type="button"
              onClick={() => go('/settings')}
              className="flex w-full items-center gap-2.5 px-4 py-2 text-sm text-text-secondary hover:bg-surface-2 hover:text-text-primary"
            >
              <SettingsIcon className="h-4 w-4" /> Settings
            </button>
            <button
              type="button"
              onClick={onToggleTheme}
              className="flex w-full items-center gap-2.5 px-4 py-2 text-sm text-text-secondary hover:bg-surface-2 hover:text-text-primary"
            >
              {theme === 'dark' ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
              {theme === 'dark' ? 'Light Mode' : 'Dark Mode'}
            </button>
            <div className="my-1 border-t border-border" />
            <button
              type="button"
              onClick={logout}
              className="flex w-full items-center gap-2.5 px-4 py-2 text-sm text-error hover:bg-error/10"
            >
              <LogOut className="h-4 w-4" /> Logout
            </button>
          </nav>
        </div>
      )}
    </div>
  );
}
