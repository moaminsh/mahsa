import React, { useState } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { Projects } from './components/Projects';
import { Skills } from './components/Skills';
import { Notepad } from './components/Notepad';
import { Contact } from './components/Contact';

export default function App() {
  const [activeTab, setActiveTab] = useState<string>('overview');
  const [accentColor, setAccentColor] = useState<string>('rose');

  return (
    <div className="min-h-screen flex flex-col bg-stone-50 text-stone-900 font-sans selection:bg-stone-200">
      {/* Top Header */}
      <Header
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        accentColor={accentColor}
        setAccentColor={setAccentColor}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-6xl w-full mx-auto px-4 sm:px-6 py-6 space-y-12">
        {activeTab === 'overview' && (
          <div className="space-y-12 animate-in fade-in duration-300">
            <Hero
              onExploreProjects={() => setActiveTab('projects')}
              onContactClick={() => setActiveTab('contact')}
              accentColor={accentColor}
            />
            <Projects accentColor={accentColor} />
            <Skills />
          </div>
        )}

        {activeTab === 'projects' && (
          <div className="animate-in fade-in duration-300">
            <Projects accentColor={accentColor} />
          </div>
        )}

        {activeTab === 'notes' && (
          <div className="animate-in fade-in duration-300">
            <Notepad />
          </div>
        )}

        {activeTab === 'contact' && (
          <div className="animate-in fade-in duration-300">
            <Contact />
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-stone-200 py-8 bg-stone-100/50 mt-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-stone-700">
          <p>© {new Date().getFullYear()} Mahsa. Crafted with React, Vite & Tailwind CSS.</p>
          <div className="flex items-center gap-4">
            <span className="font-mono">moaminsh/mahsa</span>
            <span>•</span>
            <span>Running in Google AI Studio</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
