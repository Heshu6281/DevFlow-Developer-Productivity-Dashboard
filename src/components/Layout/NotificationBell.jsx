import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Bell, CheckCircle2, PlusCircle, TrendingUp, AlertCircle, Check } from 'lucide-react';

const notifications = [
  {
    id: 'n1',
    type: 'completed',
    title: 'Task completed',
    message: '“Implement Login API” was marked complete.',
    time: '10m ago',
  },
  {
    id: 'n2',
    type: 'created',
    title: 'New task assigned',
    message: '“Build Profile Page” was created in DevFlow.',
    time: '1h ago',
  },
  {
    id: 'n3',
    type: 'progress',
    title: 'Project progress updated',
    message: 'RentHub progress moved from 65% to 78%.',
    time: '2h ago',
  },
  {
    id: 'n4',
    type: 'blocked',
    title: 'Task blocked',
    message: '“Train Anomaly Detection Model” is blocked.',
    time: '1d ago',
  },
];

const iconMap = {
  completed: { icon: CheckCircle2, cls: 'bg-success/10 text-success' },
  created: { icon: PlusCircle, cls: 'bg-info/10 text-info' },
  progress: { icon: TrendingUp, cls: 'bg-accent-soft text-accent' },
  blocked: { icon: AlertCircle, cls: 'bg-error/10 text-error' },
};

export default function NotificationBell() {
  const [open, setOpen] = useState(false);
  const [unreadIds, setUnreadIds] = useState(() => notifications.map((notification) => notification.id));
  const ref = useRef(null);
  const navigate = useNavigate();
  const unreadCount = unreadIds.length;

  useEffect(() => {
    const onClick = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener('mousedown', onClick);
    return () => document.removeEventListener('mousedown', onClick);
  }, []);

  return (
    <div className="relative" ref={ref}>
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-label={`${unreadCount} unread notifications`}
        aria-expanded={open}
        className="relative rounded-lg p-2 text-text-secondary transition-colors hover:bg-surface-2 hover:text-text-primary"
      >
        <Bell className="h-5 w-5" />
        {unreadCount > 0 && (
          <span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-accent ring-2 ring-surface" />
        )}
      </button>

      {open && (
        <div className="absolute right-0 top-12 z-50 w-80 overflow-hidden rounded-xl border border-border bg-surface shadow-card-hover animate-fade-in">
          <div className="flex items-center justify-between border-b border-border px-4 py-3">
            <h3 className="text-sm font-semibold text-text-primary">Notifications</h3>
            <button
              type="button"
              onClick={() => setUnreadIds([])}
              disabled={unreadCount === 0}
              className="text-xs font-medium text-accent hover:underline disabled:cursor-default disabled:no-underline disabled:opacity-50"
            >
              {unreadCount > 0 ? 'Mark all read' : 'All caught up'}
            </button>
          </div>
          <ul className="max-h-80 overflow-y-auto">
            {notifications.map((n) => {
              const cfg = iconMap[n.type];
              const Icon = cfg.icon;
              return (
                <li
                  key={n.id}
                  className={`flex gap-3 border-b border-border px-4 py-3 last:border-0 hover:bg-surface-2 ${
                    unreadIds.includes(n.id) ? 'bg-accent/[0.03]' : ''
                  }`}
                >
                  <div className={`mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full ${cfg.cls}`}>
                    <Icon className="h-4 w-4" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-medium text-text-primary">{n.title}</p>
                    <p className="text-xs text-text-secondary">{n.message}</p>
                    <p className="mt-0.5 text-xs text-text-tertiary">{n.time}</p>
                  </div>
                </li>
              );
            })}
          </ul>
          <div className="border-t border-border px-4 py-2.5 text-center">
            <button
              type="button"
              onClick={() => {
                setOpen(false);
                navigate('/activity');
              }}
              className="inline-flex items-center gap-1 text-xs font-medium text-accent hover:underline"
            >
              <Check className="h-3.5 w-3.5" /> View all activity
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
