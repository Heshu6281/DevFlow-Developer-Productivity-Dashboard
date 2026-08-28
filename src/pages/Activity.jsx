import { useEffect, useState } from 'react';
import ActivityTimeline from '@/components/Dashboard/ActivityTimeline';
import ErrorState from '@/components/common/ErrorState';
import { SkeletonBlock } from '@/components/common/LoadingSkeleton';
import { activity } from '@/data/activity';

export default function Activity() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const load = () => {
    setLoading(true);
    setError(false);
    setTimeout(() => {
      if (Math.random() > 0.05) setLoading(false);
      else { setError(true); setLoading(false); }
    }, 800);
  };
  useEffect(() => { load(); }, []);

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-text-primary">Recent Activity</h1>
        <p className="mt-1 text-sm text-text-secondary">A timeline of your latest development actions.</p>
      </div>

      {loading ? (
        <div className="rounded-2xl border border-border bg-surface p-5 shadow-soft">
          <div className="space-y-5">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="flex gap-3">
                <SkeletonBlock className="h-8 w-8 rounded-full" />
                <div className="flex-1 space-y-2 pt-1">
                  <SkeletonBlock className="h-4 w-2/3" />
                  <SkeletonBlock className="h-3 w-1/3" />
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : error ? (
        <ErrorState message="We couldn't load your activity feed." onRetry={load} />
      ) : (
        <div className="rounded-2xl border border-border bg-surface p-5 shadow-soft">
          <ActivityTimeline items={activity} />
        </div>
      )}
    </div>
  );
}
