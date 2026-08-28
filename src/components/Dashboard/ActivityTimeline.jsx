import { CheckCircle2, PlusCircle, TrendingUp, Check, AlertCircle } from 'lucide-react';
import { activity } from '@/data/activity';
import { formatTimeAgo } from '@/utils/helpers';

const iconMap = {
  completed: { icon: CheckCircle2, cls: 'bg-success/10 text-success' },
  created: { icon: PlusCircle, cls: 'bg-info/10 text-info' },
  progress: { icon: TrendingUp, cls: 'bg-accent-soft text-accent' },
  blocked: { icon: AlertCircle, cls: 'bg-error/10 text-error' },
  default: { icon: Check, cls: 'bg-surface-2 text-text-secondary' },
};

export default function ActivityTimeline({ items = activity, limit }) {
  const list = limit ? items.slice(0, limit) : items;
  return (
    <div className="flow-root">
      <ul className="-mb-5">
        {list.map((item, i) => {
          const cfg = iconMap[item.type] || iconMap.default;
          const Icon = cfg.icon;
          const isLast = i === list.length - 1;
          return (
            <li key={item.id} className="relative pb-5">
              {!isLast && (
                <span className="absolute left-[15px] top-8 h-full w-px bg-border" aria-hidden="true" />
              )}
              <div className="relative flex gap-3">
                <div className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full ${cfg.cls}`}>
                  <Icon className="h-4 w-4" aria-hidden="true" />
                </div>
                <div className="min-w-0 pt-0.5">
                  <p className="text-sm text-text-primary">
                    <span className="font-medium">{item.actor}</span>{' '}
                    {item.action}{' '}
                    <span className="font-medium">“{item.target}”</span>
                    {item.detail && (
                      <span className="text-text-secondary"> ({item.detail})</span>
                    )}
                  </p>
                  <p className="mt-0.5 text-xs text-text-tertiary">
                    {formatTimeAgo(item.timestamp)} · {item.project}
                  </p>
                </div>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
