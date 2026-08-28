import { useEffect, useMemo, useState } from 'react';
import { Plus, SearchX, FolderKanban } from 'lucide-react';
import ProjectCard from '@/components/Dashboard/ProjectCard';
import SearchBar from '@/components/common/SearchBar';
import FilterDropdown from '@/components/common/FilterDropdown';
import EmptyState from '@/components/common/EmptyState';
import ErrorState from '@/components/common/ErrorState';
import Modal from '@/components/common/Modal';
import { ProjectSkeleton } from '@/components/common/LoadingSkeleton';
import { projects as seedProjects } from '@/data/projects';
import { useDebounce } from '@/hooks/useDebounce';

const statusOptions = [
  { value: 'All', label: 'All Statuses' },
  { value: 'In Progress', label: 'In Progress' },
  { value: 'Completed', label: 'Completed' },
];

const sortOptions = [
  { value: 'recent', label: 'Recently Updated' },
  { value: 'progress', label: 'Progress' },
  { value: 'name', label: 'Name' },
];

export default function Projects() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [search, setSearch] = useState('');
  const [status, setStatus] = useState('All');
  const [sort, setSort] = useState('recent');
  const [projects, setProjects] = useState(seedProjects);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingProject, setEditingProject] = useState(null);
  const [form, setForm] = useState({ name: '', description: '', technologies: '', status: 'In Progress' });
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
    let list = projects.filter((p) => {
      const matchesQ = !q || [p.name, p.description, p.status, ...p.technologies].join(' ').toLowerCase().includes(q);
      const matchesStatus = status === 'All' || p.status === status;
      return matchesQ && matchesStatus;
    });
    list = [...list];
    if (sort === 'progress') list.sort((a, b) => b.progress - a.progress);
    else if (sort === 'name') list.sort((a, b) => a.name.localeCompare(b.name));
    else list.sort((a, b) => new Date(b.lastUpdated) - new Date(a.lastUpdated));
    return list;
  }, [projects, debouncedSearch, status, sort]);

  const hasFilters = debouncedSearch.trim() || status !== 'All';
  const clearFilters = () => { setSearch(''); setStatus('All'); };

  const openNewProject = () => {
    setEditingProject(null);
    setForm({ name: '', description: '', technologies: '', status: 'In Progress' });
    setModalOpen(true);
  };

  const openEditProject = (project) => {
    setEditingProject(project);
    setForm({
      name: project.name,
      description: project.description,
      technologies: project.technologies.join(', '),
      status: project.status,
    });
    setModalOpen(true);
  };

  const deleteProject = (project) => {
    if (window.confirm(`Delete "${project.name}"?`)) {
      setProjects((prev) => prev.filter((item) => item.id !== project.id));
    }
  };

  const submit = (e) => {
    e.preventDefault();
    const techs = form.technologies.split(',').map((t) => t.trim()).filter(Boolean);
    if (editingProject) {
      setProjects((prev) => prev.map((project) => project.id === editingProject.id ? {
        ...project,
        name: form.name,
        description: form.description,
        status: form.status,
        technologies: techs.length ? techs : ['New'],
        lastUpdated: new Date().toISOString(),
      } : project));
    } else {
      setProjects((prev) => [{
          id: `p${Date.now()}`,
          name: form.name,
          description: form.description,
          status: form.status,
          progress: 0,
          technologies: techs.length ? techs : ['New'],
          taskCount: 0,
          lastUpdated: new Date().toISOString(),
        }, ...prev]);
    }
    setForm({ name: '', description: '', technologies: '', status: 'In Progress' });
    setModalOpen(false);
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-text-primary">Projects</h1>
          <p className="mt-1 text-sm text-text-secondary">Track progress across your development work.</p>
        </div>
        <button
          type="button"
          onClick={openNewProject}
          className="inline-flex items-center justify-center gap-2 rounded-lg bg-accent px-4 py-2 text-sm font-medium text-white transition-colors hover:opacity-90"
        >
          <Plus className="h-4 w-4" /> New Project
        </button>
      </div>

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <SearchBar value={search} onChange={setSearch} placeholder="Search projects..." className="sm:max-w-xs" />
        <div className="flex flex-wrap items-center gap-2">
          <FilterDropdown label="Status" ariaLabel="Filter by status" value={status} onChange={setStatus} options={statusOptions} />
          <FilterDropdown label="Sort" ariaLabel="Sort projects" value={sort} onChange={setSort} options={sortOptions} />
          {hasFilters && (
            <button type="button" onClick={clearFilters} className="text-sm font-medium text-accent hover:underline">
              Clear Filters
            </button>
          )}
        </div>
      </div>

      {loading ? (
        <ProjectSkeleton />
      ) : error ? (
        <ErrorState message="We couldn't load your projects." onRetry={load} />
      ) : filtered.length === 0 ? (
        <EmptyState
          icon={hasFilters ? SearchX : FolderKanban}
          title={hasFilters ? 'No projects found' : 'No projects yet'}
          message={hasFilters ? 'No projects match your current filters.' : 'Create your first project to get started.'}
          action={hasFilters ? <button onClick={clearFilters} className="rounded-lg bg-accent px-4 py-2 text-sm font-medium text-white hover:opacity-90">Clear Filters</button> : <button onClick={openNewProject} className="rounded-lg bg-accent px-4 py-2 text-sm font-medium text-white hover:opacity-90">+ New Project</button>}
        />
      ) : (
        <>
          <p className="text-sm text-text-tertiary">{filtered.length} project{filtered.length === 1 ? '' : 's'}</p>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            {filtered.map((p) => (
              <ProjectCard key={p.id} project={p} onEdit={openEditProject} onDelete={deleteProject} />
            ))}
          </div>
        </>
      )}

      <Modal open={modalOpen} onClose={() => setModalOpen(false)} title={editingProject ? 'Edit Project' : 'New Project'}
        footer={<>
          <button type="button" onClick={() => setModalOpen(false)} className="rounded-lg px-4 py-2 text-sm font-medium text-text-secondary hover:bg-surface-2">Cancel</button>
          <button type="submit" form="new-project-form" className="rounded-lg bg-accent px-4 py-2 text-sm font-medium text-white hover:opacity-90">{editingProject ? 'Save Changes' : 'Create Project'}</button>
        </>}>
        <form id="new-project-form" onSubmit={submit} className="space-y-4">
          <div>
            <label className="mb-1.5 block text-sm font-medium text-text-secondary">Project Name</label>
            <input required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="w-full rounded-lg border border-border bg-surface px-3 py-2 text-sm text-text-primary focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent" placeholder="e.g. RentHub" />
          </div>
          <div>
            <label className="mb-1.5 block text-sm font-medium text-text-secondary">Description</label>
            <textarea required value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} rows={3} className="w-full rounded-lg border border-border bg-surface px-3 py-2 text-sm text-text-primary focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent" placeholder="Short description..." />
          </div>
          <div>
            <label className="mb-1.5 block text-sm font-medium text-text-secondary">Technologies (comma-separated)</label>
            <input value={form.technologies} onChange={(e) => setForm({ ...form, technologies: e.target.value })} className="w-full rounded-lg border border-border bg-surface px-3 py-2 text-sm text-text-primary focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent" placeholder="React, Node.js" />
          </div>
          <div>
            <label className="mb-1.5 block text-sm font-medium text-text-secondary">Status</label>
            <select value={form.status} onChange={(e) => setForm({ ...form, status: e.target.value })} className="w-full rounded-lg border border-border bg-surface px-3 py-2 text-sm text-text-primary focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent">
              <option>In Progress</option>
              <option>Completed</option>
            </select>
          </div>
        </form>
      </Modal>
    </div>
  );
}
