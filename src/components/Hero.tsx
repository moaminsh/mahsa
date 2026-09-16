import React from 'react';
import { ArrowRight, Code2, Compass, Heart, Github, Mail, MapPin } from 'lucide-react';

interface HeroProps {
  onExploreProjects: () => void;
  onContactClick: () => void;
  accentColor: string;
}

export const Hero: React.FC<HeroProps> = ({
  onExploreProjects,
  onContactClick,
  accentColor,
}) => {
  const getAccentBtnClass = () => {
    switch (accentColor) {
      case 'rose':
        return 'bg-rose-600 hover:bg-rose-700 text-white';
      case 'amber':
        return 'bg-amber-600 hover:bg-amber-700 text-white';
      case 'emerald':
        return 'bg-emerald-600 hover:bg-emerald-700 text-white';
      case 'indigo':
        return 'bg-indigo-600 hover:bg-indigo-700 text-white';
      default:
        return 'bg-stone-900 hover:bg-stone-800 text-white';
    }
  };

  return (
    <section className="py-12 sm:py-16">
      <div className="max-w-4xl mx-auto text-center sm:text-left">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-stone-200/70 text-stone-700 text-xs font-medium mb-6">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <span>Repository initialized & live in AI Studio</span>
        </div>

        <div className="grid sm:grid-cols-3 gap-8 items-center">
          <div className="sm:col-span-2 space-y-4">
            <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-stone-900 leading-tight">
              Hello, I&apos;m <span className="underline decoration-stone-300 decoration-wavy underline-offset-4">Mahsa</span>.
            </h1>
            <p className="text-lg sm:text-xl text-stone-700 leading-relaxed max-w-xl">
              Welcome to my digital space. Here you&apos;ll find my projects, notes, and ideas as I build and explore modern web technology and design.
            </p>

            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-4 pt-2">
              <button
                id="hero-explore-btn"
                onClick={onExploreProjects}
                className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-medium transition-all shadow-sm ${getAccentBtnClass()}`}
              >
                <span>View Projects</span>
                <ArrowRight className="w-4 h-4" />
              </button>
              <button
                id="hero-contact-btn"
                onClick={onContactClick}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-medium bg-white hover:bg-stone-100 text-stone-800 border border-stone-300 transition-all shadow-sm"
              >
                <span>Connect</span>
                <Mail className="w-4 h-4 text-stone-600" />
              </button>
            </div>
          </div>

          <div className="sm:col-span-1">
            <div className="p-6 rounded-2xl bg-white border border-stone-200 shadow-sm space-y-4 text-left">
              <div className="w-14 h-14 rounded-2xl bg-stone-100 flex items-center justify-center text-stone-700">
                <Code2 className="w-7 h-7" />
              </div>
              <div>
                <h3 className="text-base font-semibold text-stone-900">Mahsa Sadeghian</h3>
                <p className="text-xs text-stone-700 font-mono">github: moaminsh/mahsa</p>
              </div>
              <div className="pt-2 border-t border-stone-100 text-xs text-stone-700 space-y-1.5">
                <div className="flex items-center gap-2">
                  <Compass className="w-3.5 h-3.5 text-stone-700" />
                  <span>Full-Stack & Interactive Design</span>
                </div>
                <div className="flex items-center gap-2">
                  <Heart className="w-3.5 h-3.5 text-stone-700" />
                  <span>Open Source Enthusiast</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
