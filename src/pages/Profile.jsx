import { Link } from 'react-router-dom';
import {
  Mail, Briefcase, Calendar, Code2, CheckCircle2, Clock,
  ArrowLeft, TrendingUp, Target, Zap, Pencil,
} from 'lucide-react';

const stats = [
  { label: 'Active Projects', value: '8', icon: Code2, accent: 'text-accent', bg: 'bg-accent-soft' },
  { label: 'Completed Tasks', value: '42', icon: CheckCircle2, accent: 'text-success', bg: 'bg-success/10' },
  { label: 'In Progress', value: '12', icon: Clock, accent: 'text-info', bg: 'bg-info/10' },
];

const details = [
  { label: 'Email', value: 'heshwanthini@devflow.io', icon: Mail },
  { label: 'Role', value: 'Full-Stack Developer', icon: Briefcase },
  { label: 'Joined', value: 'January 2025', icon: Calendar },
];

const skills = [
  { name: 'React', level: 92 },
  { name: 'Node.js', level: 85 },
  { name: 'Express', level: 80 },
  { name: 'JavaScript', level: 95 },
  { name: 'TypeScript', level: 78 },
  { name: 'Firebase', level: 70 },
  { name: 'Python', level: 65 },
  { name: 'MySQL', level: 82 },
];

const highlights = [
  { icon: TrendingUp, label: 'Productivity', value: '87%', sub: '+7% this week', color: 'text-success' },
  { icon: Target, label: 'Completion rate', value: '74%', sub: '42 of 57 tasks', color: 'text-accent' },
  { icon: Zap, label: 'Streak', value: '12 days', sub: 'longest this month', color: 'text-warning' },
];

export default function Profile() {
  return (
    <div className="mx-auto max-w-5xl space-y-6 animate-fade-in">
      <div className="flex items-center gap-3">
        <Link
          to="/"
          aria-label="Back to dashboard"
          className="rounded-lg p-2 text-text-secondary transition-colors hover:bg-surface-2 hover:text-text-primary"
        >
          <ArrowLeft className="h-5 w-5" />
        </Link>
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-text-primary">My Profile</h1>
          <p className="mt-1 text-sm text-text-secondary">View your developer profile and workspace details.</p>
        </div>
      </div>

      {/* Hero card */}
      <section className="overflow-hidden rounded-2xl border border-border bg-surface shadow-soft">
        <div className="relative h-32 bg-gradient-to-r from-accent/15 via-accent/5 to-transparent">
          <div className="absolute inset-0 opacity-30" style={{ backgroundImage: 'radial-gradient(circle at 20% 50%, rgb(var(--accent) / 0.3), transparent 60%)' }} />
        </div>
        <div className="px-5 pb-6 sm:px-8">
          <div className="-mt-14 flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
            <div className="flex items-end gap-4">
              <div className="relative">
                <img
                  src="https://api.dicebear.com/7.x/initials/svg?seed=HP&backgroundColor=4f46e5"
                  alt="Heshwanthini Pasunuthi avatar"
                  className="h-24 w-24 rounded-2xl border-4 border-surface shadow-card"
                />
                <span className="absolute bottom-1.5 right-1.5 h-4 w-4 rounded-full border-2 border-surface bg-success" title="Online" />
              </div>
              <div className="pb-1.5">
                <h2 className="text-xl font-bold text-text-primary">Heshwanthini Pasunuthi</h2>
                <p className="text-sm text-text-secondary">Software Developer</p>
                <div className="mt-1.5 flex items-center gap-1.5">
                  <span className="inline-flex items-center gap-1 rounded-full bg-success/10 px-2 py-0.5 text-xs font-medium text-success">
                    <span className="h-1.5 w-1.5 rounded-full bg-success" /> Active
                  </span>
                  <span className="text-xs text-text-tertiary">· DevFlow since Jan 2025</span>
                </div>
              </div>
            </div>
            <Link
              to="/settings"
              className="inline-flex items-center justify-center gap-2 rounded-lg bg-accent px-4 py-2 text-sm font-medium text-white transition-colors hover:opacity-90"
            >
              <Pencil className="h-3.5 w-3.5" /> Edit Profile
            </Link>
          </div>

          {/* Detail rows */}
          <div className="mt-6 grid grid-cols-1 gap-3 border-t border-border pt-6 sm:grid-cols-3">
            {details.map((d) => {
              const Icon = d.icon;
              return (
                <div key={d.label} className="flex items-center gap-3 rounded-xl border border-border bg-surface-2 px-4 py-3 transition-colors hover:border-text-tertiary">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-surface text-accent">
                    <Icon className="h-4 w-4" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-xs text-text-tertiary">{d.label}</p>
                    <p className="truncate text-sm font-medium text-text-primary">{d.value}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Highlights */}
      <section className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        {highlights.map((h) => {
          const Icon = h.icon;
          return (
            <div key={h.label} className="rounded-2xl border border-border bg-surface p-5 shadow-soft transition-all duration-200 hover:-translate-y-0.5 hover:shadow-card-hover">
              <div className="flex items-center justify-between">
                <div className={`flex h-10 w-10 items-center justify-center rounded-xl bg-surface-2 ${h.color}`}>
                  <Icon className="h-5 w-5" />
                </div>
                <span className="text-2xl font-bold tracking-tight text-text-primary">{h.value}</span>
              </div>
              <p className="mt-3 text-sm font-medium text-text-primary">{h.label}</p>
              <p className="text-xs text-text-tertiary">{h.sub}</p>
            </div>
          );
        })}
      </section>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-5">
        {/* Workspace overview */}
        <section className="rounded-2xl border border-border bg-surface p-5 shadow-soft lg:col-span-2">
          <h2 className="text-base font-semibold text-text-primary">Workspace overview</h2>
          <p className="mt-1 text-sm text-text-secondary">Your current development activity in DevFlow.</p>
          <div className="mt-5 space-y-3">
            {stats.map((stat) => {
              const Icon = stat.icon;
              return (
                <div key={stat.label} className="flex items-center gap-4 rounded-xl border border-border bg-surface-2 p-4 transition-colors hover:border-text-tertiary">
                  <div className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ${stat.bg} ${stat.accent}`}>
                    <Icon className="h-5 w-5" />
                  </div>
                  <div className="flex-1">
                    <p className="text-xs text-text-tertiary">{stat.label}</p>
                    <p className="text-2xl font-bold tracking-tight text-text-primary">{stat.value}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* Skills with progress bars */}
        <section className="rounded-2xl border border-border bg-surface p-5 shadow-soft lg:col-span-3">
          <h2 className="text-base font-semibold text-text-primary">Skills</h2>
          <p className="mt-1 text-sm text-text-secondary">Technologies used across your projects, with proficiency.</p>
          <div className="mt-5 grid grid-cols-1 gap-x-6 gap-y-4 sm:grid-cols-2">
            {skills.map((skill) => (
              <div key={skill.name}>
                <div className="mb-1.5 flex items-center justify-between">
                  <span className="font-mono text-sm font-medium text-text-primary">{skill.name}</span>
                  <span className="text-xs font-medium text-text-tertiary">{skill.level}%</span>
                </div>
                <div className="h-2 w-full overflow-hidden rounded-full bg-surface-2">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-accent to-accent/70 transition-[width] duration-500 ease-out"
                    style={{ width: `${skill.level}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
