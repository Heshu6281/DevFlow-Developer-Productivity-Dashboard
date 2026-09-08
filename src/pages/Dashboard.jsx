import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { FolderKanban, ListChecks, Loader2, Clock, Gauge, ArrowRight, SearchX } from 'lucide-react';
import StatCard from '@/components/Dashboard/StatCard';
import ProductivityChart from '@/components/Dashboard/ProductivityChart';
import ProjectCard from '@/components/Dashboard/ProjectCard';
import TaskCard from '@/components/Dashboard/TaskCard';
import ActivityTimeline from '@/components/Dashboard/ActivityTimeline';
import SearchBar from '@/components/common/SearchBar';
import EmptyState from '@/components/common/EmptyState';
import ErrorState from '@/components/common/ErrorState';
import { DashboardSkeleton } from '@/components/common/LoadingSkeleton';
import { projects as allProjects } from '@/data/projects';
import { tasks as allTasks } from '@/data/tasks';
import { useDebounce } from '@/hooks/useDebounce';
import { getGreeting } from '@/utils/helpers';

export default function Dashboard() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [search, setSearch] = useState('');
  const debouncedSearch = useDebounce(search, 250);

  const load = () => {
    setLoading(true);
    setError(false);
    setTimeout(() => {
      if (Math.random() > 0.05) setLoading(false);
      else { setError(true); setLoading(false); }
    }, 900);
  };

  useEffect(() => { load(); }, []);

  const filteredProjects = useMemo(() => {
    const q = debouncedSearch.toLowerCase().trim();
    if (!q) return allProjects;
    return allProjects.filter((p) =>
      [p.name, p.description, p.status, ...p.technologies].join(' ').toLowerCase().includes(q)
    );
  }, [debouncedSearch]);

  const filteredTasks = useMemo(() => {
    const q = debouncedSearch.toLowerCase().trim();
    if (!q) return allTasks;
    return allTasks.filter((t) =>
      [t.title, t.project, t.priority, t.status].join(' ').toLowerCase().includes(q)
    );
  }, [debouncedSearch]);

  if (loading) return <DashboardSkeleton />;
  if (error) return <ErrorState message="We couldn't load your dashboard data." onRetry={load} />;

  const hasQuery = debouncedSearch.trim().length > 0;

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-text-primary">
          {getGreeting()}, Heshwanthini <span className="inline-block animate-fade-in">👋</span>
        </h1>
        <p className="mt-1 text-sm text-text-secondary">
          Here's what's happening with your development work today.
        </p>
      </div>

      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <SearchBar
          value={search}
          onChange={setSearch}
          placeholder="Search projects, tasks..."
          className="sm:max-w-sm"
        />
        {hasQuery && (
          <p className="text-xs text-text-tertiary">
            {filteredProjects.length + filteredTasks.length} results for “{debouncedSearch}”
          </p>
        )}
      </div>

      {!hasQuery && (
        <>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
            <StatCard icon={FolderKanban} title="Total Projects" value="8" supportingInfo="+12% this month" trend="+12%" accentClass="bg-accent-soft text-accent" />
            <StatCard icon={ListChecks} title="Tasks Completed" value="42" supportingInfo="+18% this week" trend="+18%" accentClass="bg-success/10 text-success" />
            <StatCard icon={Clock} title="In Progress" value="12" supportingInfo="4 high priority" trendDirection="up" accentClass="bg-info/10 text-info" />
            <StatCard icon={Gauge} title="Productivity" value="87%" supportingInfo="+7% from last week" trend="+7%" accentClass="bg-warning/10 text-warning" />
          </div>

          <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
            <div className="lg:col-span-2">
              <ProductivityChart />
            </div>
            <div className="rounded-2xl border border-border bg-surface p-5 shadow-soft">
              <div className="mb-4 flex items-center justify-between">
                <h3 className="text-base font-semibold text-text-primary">Recent Activity</h3>
                <Link to="/activity" className="flex items-center gap-1 text-xs font-medium text-accent hover:underline">
                  View all <ArrowRight className="h-3 w-3" />
                </Link>
              </div>
              <ActivityTimeline limit={4} />
            </div>
          </div>
        </>
      )}

      <section>
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-lg font-semibold text-text-primary">
            Projects {hasQuery && <span className="text-sm font-normal text-text-tertiary">({filteredProjects.length})</span>}
          </h2>
          <Link to="/projects" className="flex items-center gap-1 text-sm font-medium text-accent hover:underline">
            View all <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>
        {filteredProjects.length === 0 ? (
          <EmptyState icon={SearchX} title="No projects found" message="No projects match your search. Try a different keyword." />
        ) : (
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            {(hasQuery ? filteredProjects : filteredProjects.slice(0, 4)).map((p) => (
              <ProjectCard key={p.id} project={p} />
            ))}
          </div>
        )}
      </section>

      <section>
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-lg font-semibold text-text-primary">
            Recent Tasks {hasQuery && <span className="text-sm font-normal text-text-tertiary">({filteredTasks.length})</span>}
          </h2>
          <Link to="/tasks" className="flex items-center gap-1 text-sm font-medium text-accent hover:underline">
            View all <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>
        {filteredTasks.length === 0 ? (
          <EmptyState icon={SearchX} title="No tasks found" message="No tasks match your search. Try a different keyword." />
        ) : (
          <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
            {(hasQuery ? filteredTasks : filteredTasks.slice(0, 4)).map((t) => (
              <TaskCard key={t.id} task={t} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
