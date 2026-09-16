import React from 'react';
import { Sparkles, Terminal, BookOpen, Send, FileText } from 'lucide-react';

interface HeaderProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  accentColor: string;
  setAccentColor: (color: string) => void;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  setActiveTab,
  accentColor,
  setAccentColor,
}) => {
  const navItems = [
    { id: 'overview', label: 'Overview', icon: Sparkles },
    { id: 'projects', label: 'Projects', icon: Terminal },
    { id: 'notes', label: 'Notes & Thoughts', icon: BookOpen },
    { id: 'contact', label: 'Get in Touch', icon: Send },
  ];

  const accents = [
    { id: 'rose', name: 'Rose', class: 'bg-rose-500' },
    { id: 'amber', name: 'Amber', class: 'bg-amber-500' },
    { id: 'emerald', name: 'Emerald', class: 'bg-emerald-500' },
    { id: 'indigo', name: 'Indigo', class: 'bg-indigo-500' },
  ];

  return (
    <header className="sticky top-0 z-40 backdrop-blur-md bg-stone-50/85 border-b border-stone-200">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        {/* Brand identity */}
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-stone-900 text-stone-100 flex items-center justify-center font-bold text-lg shadow-sm">
            M
          </div>
          <div>
            <h1 className="text-base font-semibold tracking-tight text-stone-900 leading-tight">
              Mahsa
            </h1>
            <p className="text-xs text-stone-700 leading-none font-mono">
              moaminsh/mahsa
            </p>
          </div>
        </div>

        {/* Navigation tabs */}
        <nav className="hidden sm:flex items-center gap-1 bg-stone-100/80 p-1 rounded-xl border border-stone-200/60">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                id={`nav-${item.id}`}
                onClick={() => setActiveTab(item.id)}
                className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-sm font-medium transition-all ${
                  isActive
                    ? 'bg-white text-stone-900 shadow-sm'
                    : 'text-stone-700 hover:text-stone-900 hover:bg-stone-200/50'
                }`}
              >
                <Icon className="w-4 h-4 opacity-70" />
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>

        {/* Accent theme picker */}
        <div className="flex items-center gap-1.5 bg-stone-100/80 p-1 rounded-full border border-stone-200/60">
          {accents.map((acc) => (
            <button
              key={acc.id}
              id={`accent-${acc.id}`}
              title={`Switch accent to ${acc.name}`}
              onClick={() => setAccentColor(acc.id)}
              className={`w-5 h-5 rounded-full ${acc.class} transition-transform ${
                accentColor === acc.id ? 'scale-110 ring-2 ring-stone-900 ring-offset-1 ring-offset-stone-50' : 'opacity-60 hover:opacity-100'
              }`}
            />
          ))}
        </div>
      </div>

      {/* Mobile Nav */}
      <div className="sm:hidden border-t border-stone-200 px-4 py-2 flex items-center justify-around bg-stone-100/50">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`flex flex-col items-center gap-1 py-1 text-xs font-medium ${
                isActive ? 'text-stone-900 font-semibold' : 'text-stone-700'
              }`}
            >
              <Icon className="w-4 h-4" />
              <span>{item.label}</span>
            </button>
          );
        })}
      </div>
    </header>
  );
};
