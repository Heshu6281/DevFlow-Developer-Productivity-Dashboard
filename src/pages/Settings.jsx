import { useState } from 'react';
import {
  Sun, Moon, Bell, User, Shield, Palette, Check, Globe, Clock, Monitor,
} from 'lucide-react';

function Toggle({ checked, onChange, label, description }) {
  return (
    <div className="flex items-center justify-between py-3">
      <div className="pr-4">
        <p className="text-sm font-medium text-text-primary">{label}</p>
        {description && <p className="text-xs text-text-tertiary">{description}</p>}
      </div>
      <button
        type="button"
        role="switch"
        aria-checked={checked}
        aria-label={label}
        onClick={() => onChange(!checked)}
        className={`relative inline-flex h-6 w-11 shrink-0 items-center rounded-full transition-colors ${checked ? 'bg-accent' : 'bg-surface-2'}`}
      >
        <span className={`inline-block h-4 w-4 transform rounded-full bg-white shadow transition-transform ${checked ? 'translate-x-6' : 'translate-x-1'}`} />
      </button>
    </div>
  );
}

function Section({ icon: Icon, title, description, children }) {
  return (
    <section className="rounded-2xl border border-border bg-surface p-5 shadow-soft sm:p-6">
      <div className="mb-4 flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-accent-soft text-accent">
          <Icon className="h-5 w-5" />
        </div>
        <div>
          <h2 className="text-base font-semibold text-text-primary">{title}</h2>
          {description && <p className="text-xs text-text-tertiary">{description}</p>}
        </div>
      </div>
      <div className="divide-y divide-border">{children}</div>
    </section>
  );
}

const themeOptions = [
  { id: 'light', label: 'Light', icon: Sun },
  { id: 'dark', label: 'Dark', icon: Moon },
  { id: 'system', label: 'System', icon: Monitor },
];

export default function Settings({ theme, onToggleTheme }) {
  const [notifications, setNotifications] = useState({
    reminders: true,
    updates: true,
    report: false,
    mentions: true,
  });
  const [account, setAccount] = useState({
    name: 'Heshwanthini Pasunuthi',
    email: 'heshwanthini@devflow.io',
    role: 'Software Developer',
    timezone: 'Asia/Kolkata (IST)',
  });
  const [saved, setSaved] = useState(false);
  const [activeTheme, setActiveTheme] = useState(theme);

  const selectTheme = (id) => {
    setActiveTheme(id);
    if (id === 'system') {
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      if ((prefersDark && theme === 'light') || (!prefersDark && theme === 'dark')) onToggleTheme();
    } else if (id !== theme) {
      onToggleTheme();
    }
  };

  const save = (e) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 2200);
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-text-primary">Settings</h1>
        <p className="mt-1 text-sm text-text-secondary">Manage your preferences, notifications, and account.</p>
      </div>

      <div className="mx-auto max-w-2xl space-y-6">
        <Section icon={Palette} title="Appearance" description="Choose how DevFlow looks for you.">
          <div className="py-4">
            <p className="mb-3 text-sm font-medium text-text-primary">Theme</p>
            <div className="grid grid-cols-3 gap-3">
              {themeOptions.map((opt) => {
                const Icon = opt.icon;
                const selected = activeTheme === opt.id;
                return (
                  <button
                    key={opt.id}
                    type="button"
                    onClick={() => selectTheme(opt.id)}
                    aria-pressed={selected}
                    className={`flex flex-col items-center gap-2 rounded-xl border p-4 transition-all ${
                      selected
                        ? 'border-accent bg-accent-soft text-accent ring-1 ring-accent'
                        : 'border-border bg-surface-2 text-text-secondary hover:border-text-tertiary'
                    }`}
                  >
                    <Icon className="h-5 w-5" />
                    <span className="text-sm font-medium">{opt.label}</span>
                    {selected && <Check className="h-3.5 w-3.5" />}
                  </button>
                );
              })}
            </div>
          </div>
        </Section>

        <Section icon={Bell} title="Notifications" description="Decide what DevFlow should alert you about.">
          <Toggle label="Task reminders" description="Get notified about upcoming due dates" checked={notifications.reminders} onChange={(v) => setNotifications({ ...notifications, reminders: v })} />
          <Toggle label="Project updates" description="Notifications when projects change status" checked={notifications.updates} onChange={(v) => setNotifications({ ...notifications, updates: v })} />
          <Toggle label="Weekly productivity report" description="A summary of your week, every Monday" checked={notifications.report} onChange={(v) => setNotifications({ ...notifications, report: v })} />
          <Toggle label="Mentions & comments" description="When someone mentions you on a task" checked={notifications.mentions} onChange={(v) => setNotifications({ ...notifications, mentions: v })} />
        </Section>

        <Section icon={Globe} title="Preferences" description="Localization and workspace defaults.">
          <div className="py-4">
            <label htmlFor="timezone" className="mb-1.5 block text-sm font-medium text-text-secondary">Timezone</label>
            <select
              id="timezone"
              value={account.timezone}
              onChange={(e) => setAccount({ ...account, timezone: e.target.value })}
              className="w-full rounded-lg border border-border bg-surface px-3 py-2 text-sm text-text-primary focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent"
            >
              <option>Asia/Kolkata (IST)</option>
              <option>America/New_York (EST)</option>
              <option>Europe/London (GMT)</option>
              <option>Asia/Tokyo (JST)</option>
            </select>
          </div>
          <div className="flex items-center gap-3 py-4">
            <Clock className="h-4 w-4 text-text-tertiary" />
            <p className="text-sm text-text-secondary">Times across DevFlow will display in this timezone.</p>
          </div>
        </Section>

        <Section icon={User} title="Account" description="Update your personal information.">
          <form onSubmit={save} className="space-y-4 py-4">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <label htmlFor="name" className="mb-1.5 block text-sm font-medium text-text-secondary">Name</label>
                <input
                  id="name"
                  value={account.name}
                  onChange={(e) => setAccount({ ...account, name: e.target.value })}
                  className="w-full rounded-lg border border-border bg-surface px-3 py-2 text-sm text-text-primary focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent"
                />
              </div>
              <div>
                <label htmlFor="email" className="mb-1.5 block text-sm font-medium text-text-secondary">Email</label>
                <input
                  id="email"
                  type="email"
                  value={account.email}
                  onChange={(e) => setAccount({ ...account, email: e.target.value })}
                  className="w-full rounded-lg border border-border bg-surface px-3 py-2 text-sm text-text-primary focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent"
                />
              </div>
              <div>
                <label htmlFor="role" className="mb-1.5 block text-sm font-medium text-text-secondary">Role</label>
                <input
                  id="role"
                  value={account.role}
                  onChange={(e) => setAccount({ ...account, role: e.target.value })}
                  className="w-full rounded-lg border border-border bg-surface px-3 py-2 text-sm text-text-primary focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent"
                />
              </div>
            </div>
            <div className="flex items-center gap-3 pt-1">
              <button type="submit" className="inline-flex items-center gap-2 rounded-lg bg-accent px-4 py-2 text-sm font-medium text-white transition-colors hover:opacity-90">
                Save Changes
              </button>
              {saved && (
                <span className="flex items-center gap-1.5 text-sm font-medium text-success animate-fade-in">
                  <Check className="h-4 w-4" /> Saved
                </span>
              )}
            </div>
          </form>
        </Section>

        <Section icon={Shield} title="Security" description="Manage your sign-in and session.">
          <div className="flex flex-col gap-3 py-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-sm font-medium text-text-primary">Password</p>
              <p className="text-xs text-text-tertiary">Last changed 3 months ago</p>
            </div>
            <button type="button" className="inline-flex items-center justify-center rounded-lg border border-border bg-surface-2 px-4 py-2 text-sm font-medium text-text-primary transition-colors hover:border-text-tertiary">
              Change password
            </button>
          </div>
          <div className="flex flex-col gap-3 py-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-sm font-medium text-text-primary">Two-factor authentication</p>
              <p className="text-xs text-text-tertiary">Add an extra layer of security</p>
            </div>
            <button type="button" className="inline-flex items-center justify-center rounded-lg border border-border bg-surface-2 px-4 py-2 text-sm font-medium text-text-primary transition-colors hover:border-text-tertiary">
              Enable 2FA
            </button>
          </div>
        </Section>
      </div>
    </div>
  );
}
