import React, { useState } from 'react';
import { ProjectItem } from '../types';
import { ExternalLink, Tag, Plus, Search, Filter } from 'lucide-react';

interface ProjectsProps {
  accentColor: string;
}

const DEFAULT_PROJECTS: ProjectItem[] = [
  {
    id: 'proj-1',
    title: 'Mahsa Web Studio',
    category: 'Development',
    description: 'Personal responsive portal featuring clean typography, modular components, and real-time state management.',
    tags: ['React', 'TypeScript', 'Tailwind CSS', 'Vite'],
    status: 'Completed',
  },
  {
    id: 'proj-2',
    title: 'Interactive Network Visualizer',
    category: 'Research',
    description: 'Analytical tool to visualize distributed network topologies, node latencies, and connectivity telemetry in real time.',
    tags: ['Algorithms', 'Data Structures', 'Networks'],
    status: 'In Progress',
  },
  {
    id: 'proj-3',
    title: 'Minimalist Journal & Thought Stream',
    category: 'UI/UX',
    description: 'A focused, distraction-free markdown note-taking environment with client-side persistence and tags.',
    tags: ['Design Systems', 'Typography', 'Local Storage'],
    status: 'Completed',
  },
  {
    id: 'proj-4',
    title: 'Distributed System Sandbox',
    category: 'Development',
    description: 'Experimentation workspace testing microservice consensus protocols and resilient failure recovery.',
    tags: ['Go', 'TypeScript', 'Distributed Systems'],
    status: 'Concept',
  },
];

export const Projects: React.FC<ProjectsProps> = ({ accentColor }) => {
  const [projects, setProjects] = useState<ProjectItem[]>(() => {
    const saved = localStorage.getItem('mahsa_projects');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error('Failed parsing saved projects', e);
      }
    }
    return DEFAULT_PROJECTS;
  });

  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [showAddModal, setShowAddModal] = useState<boolean>(false);

  // Form state
  const [newTitle, setNewTitle] = useState('');
  const [newCategory, setNewCategory] = useState('Development');
  const [newDesc, setNewDesc] = useState('');
  const [newTags, setNewTags] = useState('');
  const [newStatus, setNewStatus] = useState<'Completed' | 'In Progress' | 'Concept'>('In Progress');

  const categories = ['All', 'Development', 'Research', 'UI/UX'];

  const filteredProjects = projects.filter((p) => {
    const matchesCategory = selectedCategory === 'All' || p.category === selectedCategory;
    const matchesSearch =
      p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  const handleAddProject = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) return;

    const newItem: ProjectItem = {
      id: `proj-${Date.now()}`,
      title: newTitle.trim(),
      category: newCategory,
      description: newDesc.trim() || 'A project by Mahsa.',
      tags: newTags
        .split(',')
        .map((t) => t.trim())
        .filter(Boolean),
      status: newStatus,
    };

    const updated = [newItem, ...projects];
    setProjects(updated);
    localStorage.setItem('mahsa_projects', JSON.stringify(updated));

    // Reset
    setNewTitle('');
    setNewDesc('');
    setNewTags('');
    setShowAddModal(false);
  };

  const getStatusBadge = (status: ProjectItem['status']) => {
    switch (status) {
      case 'Completed':
        return 'bg-emerald-50 text-emerald-700 border-emerald-200';
      case 'In Progress':
        return 'bg-amber-50 text-amber-700 border-amber-200';
      case 'Concept':
        return 'bg-stone-100 text-stone-600 border-stone-200';
    }
  };

  return (
    <section className="space-y-6">
      {/* Section Header & Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-stone-200 pb-4">
        <div>
          <h2 className="text-2xl font-bold text-stone-900">Featured Projects</h2>
          <p className="text-sm text-stone-700">Explorations in software engineering, architecture, and design.</p>
        </div>
        <button
          id="add-project-btn"
          onClick={() => setShowAddModal(true)}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-stone-900 hover:bg-stone-800 text-white text-sm font-medium transition-all shadow-sm self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>Add Project</span>
        </button>
      </div>

      {/* Filters & Search */}
      <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center justify-between">
        <div className="flex items-center gap-1 bg-stone-100 p-1 rounded-xl border border-stone-200 overflow-x-auto">
          {categories.map((cat) => (
            <button
              key={cat}
              id={`filter-${cat.toLowerCase()}`}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-all ${
                selectedCategory === cat
                  ? 'bg-white text-stone-900 shadow-sm'
                  : 'text-stone-700 hover:text-stone-900'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="relative">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-stone-600" />
          <input
            type="text"
            id="search-projects"
            placeholder="Search projects or tags..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full sm:w-64 pl-9 pr-3 py-1.5 rounded-xl border border-stone-200 bg-white text-sm text-stone-800 placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-stone-400"
          />
        </div>
      </div>

      {/* Project Cards Grid */}
      <div className="grid sm:grid-cols-2 gap-4">
        {filteredProjects.map((project) => (
          <div
            key={project.id}
            id={`project-card-${project.id}`}
            className="p-5 rounded-2xl bg-white border border-stone-200 shadow-xs hover:shadow-md hover:border-stone-300 transition-all flex flex-col justify-between"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between gap-2">
                <span className="text-xs font-medium text-stone-700 uppercase tracking-wider">
                  {project.category}
                </span>
                <span
                  className={`text-xs px-2.5 py-0.5 rounded-full font-medium border ${getStatusBadge(
                    project.status
                  )}`}
                >
                  {project.status}
                </span>
              </div>
              <h3 className="text-lg font-semibold text-stone-900 leading-snug">{project.title}</h3>
              <p className="text-sm text-stone-700 leading-relaxed">{project.description}</p>
            </div>

            <div className="pt-4 mt-4 border-t border-stone-100 flex flex-wrap items-center gap-1.5">
              {project.tags.map((tag) => (
                <span
                  key={tag}
                  className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-md bg-stone-100 text-stone-700 text-xs font-mono"
                >
                  <Tag className="w-3 h-3 text-stone-600" />
                  {tag}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>

      {filteredProjects.length === 0 && (
        <div className="p-8 text-center rounded-2xl bg-stone-100/60 border border-dashed border-stone-200">
          <p className="text-stone-500 text-sm">No projects matching your search criteria.</p>
        </div>
      )}

      {/* Add Project Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-stone-900/40 backdrop-blur-xs p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-xl border border-stone-200 space-y-4">
            <h3 className="text-lg font-semibold text-stone-900">Add New Project</h3>
            <form onSubmit={handleAddProject} className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-stone-700 mb-1">Project Title</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Distributed Consensus Engine"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-stone-200 text-sm focus:ring-2 focus:ring-stone-400 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-stone-700 mb-1">Category</label>
                <select
                  value={newCategory}
                  onChange={(e) => setNewCategory(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-stone-200 text-sm focus:ring-2 focus:ring-stone-400 focus:outline-none bg-white"
                >
                  <option value="Development">Development</option>
                  <option value="Research">Research</option>
                  <option value="UI/UX">UI/UX</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-medium text-stone-700 mb-1">Description</label>
                <textarea
                  rows={3}
                  placeholder="Brief description of the work and architectural approach..."
                  value={newDesc}
                  onChange={(e) => setNewDesc(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-stone-200 text-sm focus:ring-2 focus:ring-stone-400 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-stone-700 mb-1">Tags (comma-separated)</label>
                <input
                  type="text"
                  placeholder="React, TypeScript, Algorithms"
                  value={newTags}
                  onChange={(e) => setNewTags(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-stone-200 text-sm focus:ring-2 focus:ring-stone-400 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-stone-700 mb-1">Status</label>
                <select
                  value={newStatus}
                  onChange={(e) => setNewStatus(e.target.value as any)}
                  className="w-full px-3 py-2 rounded-xl border border-stone-200 text-sm focus:ring-2 focus:ring-stone-400 focus:outline-none bg-white"
                >
                  <option value="Completed">Completed</option>
                  <option value="In Progress">In Progress</option>
                  <option value="Concept">Concept</option>
                </select>
              </div>

              <div className="flex items-center justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 rounded-xl border border-stone-200 text-stone-600 text-sm hover:bg-stone-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl bg-stone-900 hover:bg-stone-800 text-white text-sm font-medium shadow-sm"
                >
                  Save Project
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </section>
  );
};
