import { useEffect, useMemo, useState } from 'react';
import { Plus, SearchX, ListChecks } from 'lucide-react';
import TaskCard from '@/components/Dashboard/TaskCard';
import SearchBar from '@/components/common/SearchBar';
import FilterDropdown from '@/components/common/FilterDropdown';
import EmptyState from '@/components/common/EmptyState';
import ErrorState from '@/components/common/ErrorState';
import Modal from '@/components/common/Modal';
import { TaskSkeleton } from '@/components/common/LoadingSkeleton';
import { tasks as seedTasks, projects } from '@/data/tasks';
import { useDebounce } from '@/hooks/useDebounce';

const statusOptions = [
  { value: 'All', label: 'All Statuses' },
  { value: 'To Do', label: 'To Do' },
  { value: 'In Progress', label: 'In Progress' },
  { value: 'Completed', label: 'Completed' },
  { value: 'Blocked', label: 'Blocked' },
];

const priorityOptions = [
  { value: 'All', label: 'All Priorities' },
  { value: 'High', label: 'High' },
  { value: 'Medium', label: 'Medium' },
  { value: 'Low', label: 'Low' },
];

const emptyForm = { title: '', project: 'DevFlow', priority: 'Medium', status: 'To Do', dueDate: '' };

export default function Tasks() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [search, setSearch] = useState('');
  const [status, setStatus] = useState('All');
  const [priority, setPriority] = useState('All');
  const [tasks, setTasks] = useState(seedTasks);
  const [modalOpen, setModalOpen] = useState(false);
  const [form, setForm] = useState(emptyForm);
  const debouncedSearch = useDebounce(search, 250);

  const load = () => {
    setLoading(true);
    setError(false);
    setTimeout(() => {
      if (Math.random() > 0.05) setLoading(false);
      else { setError(true); setLoading(false); }
    }, 800);
  };
  useEffect(() => { load(); }, []);

  const filtered = useMemo(() => {
    const q = debouncedSearch.toLowerCase().trim();
    return tasks.filter((t) => {
      const matchesQ = !q || [t.title, t.project, t.priority, t.status].join(' ').toLowerCase().includes(q);
      const matchesStatus = status === 'All' || t.status === status;
      const matchesPriority = priority === 'All' || t.priority === priority;
      return matchesQ && matchesStatus && matchesPriority;
    });
  }, [tasks, debouncedSearch, status, priority]);

  const hasFilters = debouncedSearch.trim() || status !== 'All' || priority !== 'All';
  const clearFilters = () => { setSearch(''); setStatus('All'); setPriority('All'); };

  const submit = (e) => {
    e.preventDefault();
    setTasks((prev) => [
      {
        id: `t${Date.now()}`,
        title: form.title,
        project: form.project,
        priority: form.priority,
        status: form.status,
        progress: 0,
        dueDate: form.dueDate || undefined,
      },
      ...prev,
    ]);
    setForm(emptyForm);
    setModalOpen(false);
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-text-primary">Tasks</h1>
          <p className="mt-1 text-sm text-text-secondary">Manage and filter your development tasks.</p>
        </div>
        <button type="button" onClick={() => setModalOpen(true)} className="inline-flex items-center justify-center gap-2 rounded-lg bg-accent px-4 py-2 text-sm font-medium text-white transition-colors hover:opacity-90">
          <Plus className="h-4 w-4" /> Add Task
        </button>
      </div>

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:flex-wrap">
        <SearchBar value={search} onChange={setSearch} placeholder="Search tasks..." className="sm:max-w-xs" />
        <div className="flex flex-wrap items-center gap-2">
          <FilterDropdown label="Status" ariaLabel="Filter by status" value={status} onChange={setStatus} options={statusOptions} />
          <FilterDropdown label="Priority" ariaLabel="Filter by priority" value={priority} onChange={setPriority} options={priorityOptions} />
          {hasFilters && (
            <button type="button" onClick={clearFilters} className="text-sm font-medium text-accent hover:underline">Clear Filters</button>
          )}
        </div>
      </div>

      {loading ? (
        <TaskSkeleton />
      ) : error ? (
        <ErrorState message="We couldn't load your tasks." onRetry={load} />
      ) : filtered.length === 0 ? (
        <EmptyState
          icon={hasFilters ? SearchX : ListChecks}
          title={hasFilters ? 'No tasks found' : 'No tasks yet'}
          message={hasFilters ? 'There are no tasks matching your current filters.' : 'Add your first task to get started.'}
          action={hasFilters ? <button onClick={clearFilters} className="rounded-lg bg-accent px-4 py-2 text-sm font-medium text-white hover:opacity-90">Clear Filters</button> : <button onClick={() => setModalOpen(true)} className="rounded-lg bg-accent px-4 py-2 text-sm font-medium text-white hover:opacity-90">+ Add Task</button>}
        />
      ) : (
        <>
          <p className="text-sm text-text-tertiary">{filtered.length} task{filtered.length === 1 ? '' : 's'}</p>
          <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
            {filtered.map((t) => (
              <TaskCard key={t.id} task={t} />
            ))}
          </div>
        </>
      )}

      <Modal open={modalOpen} onClose={() => setModalOpen(false)} title="Add Task"
        footer={<>
          <button type="button" onClick={() => setModalOpen(false)} className="rounded-lg px-4 py-2 text-sm font-medium text-text-secondary hover:bg-surface-2">Cancel</button>
          <button type="submit" form="new-task-form" className="rounded-lg bg-accent px-4 py-2 text-sm font-medium text-white hover:opacity-90">Add Task</button>
        </>}>
        <form id="new-task-form" onSubmit={submit} className="space-y-4">
          <div>
            <label className="mb-1.5 block text-sm font-medium text-text-secondary">Task Title</label>
            <input required value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} className="w-full rounded-lg border border-border bg-surface px-3 py-2 text-sm text-text-primary focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent" placeholder="e.g. Implement JWT Authentication" />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="mb-1.5 block text-sm font-medium text-text-secondary">Project</label>
              <select value={form.project} onChange={(e) => setForm({ ...form, project: e.target.value })} className="w-full rounded-lg border border-border bg-surface px-3 py-2 text-sm text-text-primary focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent">
                {projects.map((p) => <option key={p}>{p}</option>)}
              </select>
            </div>
            <div>
              <label className="mb-1.5 block text-sm font-medium text-text-secondary">Priority</label>
              <select value={form.priority} onChange={(e) => setForm({ ...form, priority: e.target.value })} className="w-full rounded-lg border border-border bg-surface px-3 py-2 text-sm text-text-primary focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent">
                <option>High</option><option>Medium</option><option>Low</option>
              </select>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="mb-1.5 block text-sm font-medium text-text-secondary">Status</label>
              <select value={form.status} onChange={(e) => setForm({ ...form, status: e.target.value })} className="w-full rounded-lg border border-border bg-surface px-3 py-2 text-sm text-text-primary focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent">
                <option>To Do</option><option>In Progress</option><option>Completed</option><option>Blocked</option>
              </select>
            </div>
            <div>
              <label className="mb-1.5 block text-sm font-medium text-text-secondary">Due Date</label>
              <input type="date" value={form.dueDate} onChange={(e) => setForm({ ...form, dueDate: e.target.value })} className="w-full rounded-lg border border-border bg-surface px-3 py-2 text-sm text-text-primary focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent" />
            </div>
          </div>
        </form>
      </Modal>
    </div>
  );
}
