# DevFlow

**Developer Productivity Dashboard**

> Your development workflow, at a glance.

DevFlow is a developer-focused productivity dashboard where software developers can monitor active projects, tasks, task completion, project progress, productivity, recent activity, task priorities, and overall development workflow. It is built like a modern SaaS product — clean, minimal, responsive, and production-ready.

---

## Overview

DevFlow brings the pieces of a developer's workflow into one view:

- A **Dashboard** with a personalized greeting, productivity statistics, a weekly productivity chart, project cards, recent tasks, and an activity timeline.
- Dedicated **Projects**, **Tasks**, **Activity**, **Analytics**, and **Settings** pages.
- Real, working **search** and **filtering** across projects and tasks.
- Proper **loading**, **empty**, and **error** states throughout.
- **Light and dark themes** that persist across reloads.

---

## Features

- Collapsible sidebar navigation with a mobile hamburger menu
- Personalized dashboard greeting with time-aware salutation
- Four reusable statistic cards with trend indicators
- Weekly productivity area chart (Recharts)
- Reusable project and task cards with progress bars, status & priority badges, and tech tags
- Combined search + status + priority filtering with a "Clear Filters" action
- Result count display
- Recent activity timeline with icons
- Analytics page with pie, bar, and radial bar charts
- Skeleton loaders for dashboard, projects, tasks, and charts
- Empty states with contextual messaging and actions
- Error states with a "Try Again" retry action
- Light / dark mode toggle with `localStorage` persistence
- Profile dropdown menu that closes on outside click
- Add Project and Add Task modals backed by local state
- Fully responsive layout (320px → 1440px+) with no horizontal overflow
- Accessible: semantic HTML, aria labels, keyboard-friendly controls, visible focus states

---

## Tech Stack

- **React.js** — functional components and hooks
- **Vite** — build tool and dev server
- **React Router** — client-side routing
- **Tailwind CSS** — utility-first styling with CSS variables for theming
- **Lucide React** — icons
- **Recharts** — charts

---

## Architecture

The project follows a clean, reusable component architecture:

```
src/
  components/
    Layout/
      Sidebar.jsx        # Desktop navigation
      Navbar.jsx         # Top header with theme toggle, notifications, profile
      ProfileMenu.jsx    # User dropdown (closes on outside click)
      MobileMenu.jsx     # Mobile slide-in navigation
    Dashboard/
      StatCard.jsx       # Reusable statistic card
      ProductivityChart.jsx
      ProjectCard.jsx     # Reusable project card
      TaskCard.jsx        # Reusable task card
      ActivityTimeline.jsx
    Common/
      SearchBar.jsx
      FilterDropdown.jsx
      ProgressBar.jsx
      StatusBadge.jsx
      PriorityBadge.jsx
      LoadingSkeleton.jsx  # Skeleton loaders (stats, project, task, chart, dashboard)
      EmptyState.jsx
      ErrorState.jsx
      Modal.jsx
  pages/
    Dashboard.jsx
    Projects.jsx
    Tasks.jsx
    Activity.jsx
    Analytics.jsx
    Settings.jsx
  data/
    projects.js
    tasks.js
    activity.js
  hooks/
    useTheme.js
    useDebounce.js
  utils/
    helpers.js
  App.tsx
  main.tsx
  index.css
```

Data is kept in separate files as arrays of objects and rendered dynamically with `.map()` — no hard-coded repeated card markup.

---

## State Handling

Each page manages four UI states using React hooks (`useState`, `useEffect`, `useMemo`):

- **Loading** — animated skeleton placeholders are shown while data "loads" (simulated with a short timeout).
- **Success** — real data renders with charts, cards, and timelines.
- **Empty** — a contextual `EmptyState` component shows when no results match filters (or when there's no data), with a clear call to action.
- **Error** — an `ErrorState` component with a "Try Again" button that resets the loading/error cycle.

Filtering and sorting are memoized with `useMemo` to avoid unnecessary re-computation, and search input is debounced with a custom `useDebounce` hook.

---

## Responsive Design

- **Desktop (1024px+)** — fixed sidebar visible, 4 stat cards per row, 2-column project/task grids.
- **Tablet (768px–1024px)** — sidebar collapses to a mobile menu, 2 stat cards per row, responsive charts.
- **Mobile (<768px)** — hamburger menu, 1 card per row, full-width search, collapsible filters.

Tested across 320px, 375px, 425px, 768px, 1024px, and 1440px with no horizontal scrolling.

---

## Installation

```bash
# install dependencies
npm install

# start the dev server
npm run dev

# build for production
npm run build
```

---

## Screenshots

_Add screenshots here once deployed._

| Dashboard | Projects | Analytics |
|-----------|----------|-----------|
| _placeholder_ | _placeholder_ | _placeholder_ |

---

## Future Improvements

- Backend integration (replace local state with a real API / database)
- Authentication and user accounts
- Real-time notifications
- GitHub API integration (commits, pull requests, issues)
- Jira integration for task sync
- Team collaboration (shared projects, assignments, comments)
