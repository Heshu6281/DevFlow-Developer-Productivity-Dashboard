import { useEffect, useState } from 'react';
import {
  BarChart, Bar, PieChart, Pie, Cell, RadialBarChart, RadialBar,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend,
} from 'recharts';
import { Activity as ActivityIcon } from 'lucide-react';
import ProductivityChart from '@/components/Dashboard/ProductivityChart';
import ErrorState from '@/components/common/ErrorState';
import { ChartSkeleton, SkeletonBlock } from '@/components/common/LoadingSkeleton';
import {
  taskCompletionData, priorityDistribution, projectProgressData,
} from '@/data/activity';

function ChartCard({ title, subtitle, children, height = 260 }) {
  return (
    <div className="rounded-2xl border border-border bg-surface p-5 shadow-soft">
      <div className="mb-4">
        <h3 className="text-base font-semibold text-text-primary">{title}</h3>
        {subtitle && <p className="text-xs text-text-tertiary">{subtitle}</p>}
      </div>
      <div style={{ width: '100%', height }}>{children}</div>
    </div>
  );
}

const tooltipStyle = {
  borderRadius: 8,
  border: '1px solid rgb(var(--border))',
  background: 'rgb(var(--surface))',
  fontSize: 12,
};

export default function Analytics() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const load = () => {
    setLoading(true);
    setError(false);
    setTimeout(() => {
      if (Math.random() > 0.05) setLoading(false);
      else { setError(true); setLoading(false); }
    }, 900);
  };
  useEffect(() => { load(); }, []);

  if (loading) {
    return (
      <div className="space-y-6 animate-fade-in">
        <div>
          <SkeletonBlock className="h-8 w-40" />
          <SkeletonBlock className="mt-2 h-4 w-64" />
        </div>
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          <ChartSkeleton /><ChartSkeleton /><ChartSkeleton /><ChartSkeleton />
        </div>
      </div>
    );
  }
  if (error) return <ErrorState message="We couldn't load your analytics." onRetry={load} />;

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-text-primary">Analytics</h1>
        <p className="mt-1 text-sm text-text-secondary">Insights into your productivity and project progress.</p>
      </div>

      <ProductivityChart />

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <ChartCard title="Task Completion" subtitle="Distribution of task statuses">
          <ResponsiveContainer>
            <PieChart>
              <Pie data={taskCompletionData} dataKey="value" nameKey="name" cx="50%" cy="50%" innerRadius={55} outerRadius={85} paddingAngle={2}>
                {taskCompletionData.map((entry) => (
                  <Cell key={entry.name} fill={entry.color} stroke="rgb(var(--surface))" strokeWidth={2} />
                ))}
              </Pie>
              <Tooltip contentStyle={tooltipStyle} />
              <Legend iconType="circle" wrapperStyle={{ fontSize: 12 }} />
            </PieChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard title="Priority Distribution" subtitle="Tasks by priority level">
          <ResponsiveContainer>
            <PieChart>
              <Pie data={priorityDistribution} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={85} paddingAngle={2}>
                {priorityDistribution.map((entry) => (
                  <Cell key={entry.name} fill={entry.color} stroke="rgb(var(--surface))" strokeWidth={2} />
                ))}
              </Pie>
              <Tooltip contentStyle={tooltipStyle} />
              <Legend iconType="circle" wrapperStyle={{ fontSize: 12 }} />
            </PieChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard title="Project Progress" subtitle="Completion percentage by project">
          <ResponsiveContainer>
            <BarChart data={projectProgressData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgb(var(--border))" vertical={false} />
              <XAxis dataKey="name" tickLine={false} axisLine={false} tick={{ fontSize: 11, fill: 'rgb(var(--text-tertiary))' }} />
              <YAxis tickLine={false} axisLine={false} tick={{ fontSize: 11, fill: 'rgb(var(--text-tertiary))' }} domain={[0, 100]} />
              <Tooltip contentStyle={tooltipStyle} cursor={{ fill: 'rgb(var(--surface-2))' }} />
              <Bar dataKey="progress" fill="rgb(var(--accent))" radius={[6, 6, 0, 0]} barSize={40} />
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard title="Completed vs Pending" subtitle="Overall task completion rate">
          <ResponsiveContainer>
            <RadialBarChart innerRadius="40%" outerRadius="90%" data={[{ name: 'Completed', value: 74, fill: 'rgb(var(--success))' }]} startAngle={90} endAngle={-270}>
              <RadialBar background={{ fill: 'rgb(var(--surface-2))' }} dataKey="value" cornerRadius={20} />
              <text x="50%" y="50%" textAnchor="middle" dominantBaseline="middle" className="fill-text-primary" style={{ fontSize: 28, fontWeight: 700 }}>
                74%
              </text>
            </RadialBarChart>
          </ResponsiveContainer>
        </ChartCard>
      </div>

      <div className="flex items-center gap-2 rounded-xl border border-border bg-accent-soft p-4 text-sm text-accent">
        <ActivityIcon className="h-4 w-4 shrink-0" />
        You're 7% more productive than last week. Keep it up!
      </div>
    </div>
  );
}
