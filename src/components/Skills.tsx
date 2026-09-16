import React from 'react';
import { Layers, Terminal, Palette, Cpu, Sparkles, CheckCircle2 } from 'lucide-react';

export const Skills: React.FC = () => {
  const skillCategories = [
    {
      title: 'Frontend & UI Engineering',
      icon: Palette,
      items: ['React / Next.js', 'TypeScript', 'Tailwind CSS', 'Responsive Layouts', 'State Management', 'Web Accessibility (a11y)'],
    },
    {
      title: 'Backend & Systems',
      icon: Terminal,
      items: ['Node.js & Express', 'REST APIs', 'PostgreSQL / SQLite', 'Distributed Topologies', 'Authentication & Security', 'Docker Basics'],
    },
    {
      title: 'Workflow & Craft',
      icon: Layers,
      items: ['Git & GitHub Workflows', 'Performance Optimization', 'Clean Code Practices', 'Technical Writing', 'Design Systems', 'Prototyping'],
    },
  ];

  return (
    <section className="py-8 space-y-6">
      <div className="border-b border-stone-200 pb-4">
        <h2 className="text-2xl font-bold text-stone-900">Technical Toolkit</h2>
        <p className="text-sm text-stone-700">Core competencies, tools, and technical areas of interest.</p>
      </div>

      <div className="grid md:grid-cols-3 gap-5">
        {skillCategories.map((category) => {
          const Icon = category.icon;
          return (
            <div
              key={category.title}
              className="p-6 rounded-2xl bg-white border border-stone-200 shadow-xs flex flex-col justify-between"
            >
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-stone-100 flex items-center justify-center text-stone-700">
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="text-base font-semibold text-stone-900 leading-snug">
                    {category.title}
                  </h3>
                </div>

                <ul className="space-y-2 pt-2">
                  {category.items.map((item) => (
                    <li key={item} className="flex items-center gap-2.5 text-sm text-stone-700">
                      <CheckCircle2 className="w-4 h-4 text-stone-600 shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
