# 🚀 DevFlow – Developer Productivity Dashboard

A modern and responsive **Developer Productivity Dashboard** built with React.js as part of **Task 1 of the Innovation Hacks Full Stack Development Internship**.

DevFlow provides developers with a centralized workspace to monitor projects, manage tasks, track progress, and view productivity insights through a clean and intuitive interface.

---

## 📌 Project Overview

**DevFlow** is designed to simplify everyday development workflow by bringing important project and task information into one dashboard.

The application focuses not only on visual design but also on:

* Reusable React components
* Responsive design
* Interactive search and filtering
* Project and task progress tracking
* Loading states
* Empty states
* Error handling
* User-friendly navigation

---

## ✨ Features

### 📊 Dashboard

* Overview of total projects
* Completed tasks
* Tasks currently in progress
* Productivity percentage
* Weekly productivity visualization
* Recent activity

### 📁 Project Management

* View multiple development projects
* Project progress indicators
* Project status
* Technology stack
* Task count
* Last updated information

### ✅ Task Management

* View development tasks
* Task status and priority
* Task progress
* Project association
* Due dates
* Add new tasks using a modal

### 🔍 Search & Filter

* Search projects and tasks
* Filter tasks by status
* Filter tasks by priority
* Combine search and filters
* Clear filters option

### 📈 Analytics

* Weekly productivity chart
* Task completion statistics
* Project progress
* Task status distribution
* Priority distribution

### 🔄 Application States

The dashboard includes proper UI states for:

* Loading
* Success
* Empty results
* Error
* Retry

### 🌙 Dark Mode

* Light and dark themes
* Theme preference saved using localStorage
* Consistent design across themes

### 📱 Responsive Design

The application is optimized for:

* Desktop
* Laptop
* Tablet
* Mobile

---

## 🛠️ Tech Stack

| Technology       | Purpose                       |
| ---------------- | ----------------------------- |
| **React.js**     | Frontend development          |
| **Vite**         | Development and build tool    |
| **JavaScript**   | Application logic             |
| **CSS3**         | Styling and responsive design |
| **React Router** | Page navigation               |
| **Lucide React** | UI icons                      |
| **Recharts**     | Data visualization            |
| **LocalStorage** | Theme/settings persistence    |

---

## 🧩 Component Architecture

The project follows a reusable and component-based React architecture.

```text
src/
│
├── components/
│   ├── Layout/
│   │   ├── Navbar
│   │   ├── Sidebar
│   │   └── MobileMenu
│   │
│   ├── Dashboard/
│   │   ├── StatCard
│   │   ├── ProjectCard
│   │   ├── TaskCard
│   │   ├── ProductivityChart
│   │   └── ActivityTimeline
│   │
│   └── Common/
│       ├── SearchBar
│       ├── FilterDropdown
│       ├── ProgressBar
│       ├── StatusBadge
│       ├── PriorityBadge
│       ├── LoadingSkeleton
│       ├── EmptyState
│       └── ErrorState
│
├── pages/
│   ├── Dashboard
│   ├── Projects
│   ├── Tasks
│   ├── Activity
│   ├── Analytics
│   └── Settings
│
├── data/
│   ├── projects
│   ├── tasks
│   └── activity
│
├── hooks/
│   └── useTheme
│
├── utils/
│   └── helpers
│
├── App
├── main
└── index.css
```

The application uses reusable components instead of duplicating UI code, making the project easier to maintain and extend.

---

## 📄 Main Pages

### 🏠 Dashboard

The primary landing page providing a quick overview of:

* Projects
* Tasks
* Productivity
* Progress
* Recent activity

### 📁 Projects

Displays development projects with:

* Project information
* Progress
* Status
* Technologies
* Task count

### ✅ Tasks

Provides task tracking with:

* Search
* Status filters
* Priority filters
* Progress
* Task creation

### 🕒 Activity

Displays recent development activity in a timeline format.

### 📊 Analytics

Provides visual insights into:

* Productivity
* Task completion
* Project progress
* Task distribution

### ⚙️ Settings

Provides options for:

* Appearance
* Notifications
* Account settings

---

## 🔄 State Handling

DevFlow is designed to handle different application states instead of displaying blank screens.

### Loading State

Skeleton loaders are displayed while dynamic content is being loaded.

### Empty State

When search or filters return no results, users receive a clear message and an option to clear filters.

### Error State

If content cannot be loaded, an error message and retry option are provided.

This improves usability and demonstrates practical frontend state handling.

---

## 📱 Responsive Design

The interface adapts to different screen sizes.

### Desktop

* Full sidebar navigation
* Multi-column dashboard
* Expanded charts and cards

### Tablet

* Responsive grid layout
* Collapsible navigation
* Optimized spacing

### Mobile

* Mobile navigation
* Single-column cards
* Responsive charts
* Full-width search and filters

---

## 🔍 Search and Filtering

Users can search and filter tasks dynamically.

Supported task filters include:

**Status**

* All
* To Do
* In Progress
* Completed
* Blocked

**Priority**

* All
* High
* Medium
* Low

Search and filters can be combined to quickly find relevant tasks.

---

## 🎯 Internship Task

**Program:** Full Stack Development Internship
**Organization:** Innovation Hacks
**Task:** Task 1 – Developer Productivity Dashboard

### Objective

To build a responsive Developer Productivity Dashboard using React.js that demonstrates real product UI standards, reusable components, responsive design, and proper application state handling.

---

## 👩‍💻 Developer

**Heshwanthini Pasunuthi**

Frontend / Full Stack Developer

This project was developed as part of my internship learning journey to strengthen my skills in:

* React.js
* Frontend development
* Component-based architecture
* State management
* Responsive design
* UI/UX development
* Data visualization

---

## 🚀 Getting Started

### Prerequisites

Make sure you have installed:

* Node.js
* npm
* Git

### Clone the Repository

```bash
git clone YOUR_GITHUB_REPOSITORY_URL
```

### Navigate to the Project

```bash
cd YOUR_PROJECT_FOLDER
```

### Install Dependencies

```bash
npm install
```

### Start the Development Server

```bash
npm run dev
```

The application will be available at:

```text
http://localhost:5173/
```

---

## 📦 Build for Production

To create a production build:

```bash
npm run build
```

To preview the production build:

```bash
npm run preview
```

---

## 🔮 Future Improvements

Some possible future enhancements include:

* Backend API integration
* User authentication
* Real-time task updates
* Database integration
* GitHub API integration
* Team collaboration
* Real-time notifications
* Drag-and-drop task management
* Cloud deployment
* Developer activity tracking

---


## ⭐ Highlights

This project demonstrates my ability to:

* Build responsive React applications
* Design reusable UI components
* Manage application states
* Implement search and filtering
* Create interactive dashboards
* Work with charts and data visualization
* Build responsive layouts
* Follow clean frontend architecture
* Focus on usability and accessibility

---

## 📌 Conclusion

DevFlow was built with a focus on combining **clean UI, reusable React architecture, responsive design, and practical application functionality**.

The project helped me strengthen my frontend development skills while understanding how real-world product interfaces handle dynamic content, user interactions, and different application states.

---

### Built with ❤️ using React.js

**© 2026 Heshwanthini Pasunuthi**
