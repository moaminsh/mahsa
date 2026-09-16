import React, { useState } from 'react';
import { NoteItem } from '../types';
import { Plus, Trash2, Calendar, FileText, Check, Search } from 'lucide-react';

const INITIAL_NOTES: NoteItem[] = [
  {
    id: 'note-1',
    title: 'Architecting for Resilience in Cloud Environments',
    date: '2026-09-14',
    snippet: 'Exploring decoupled services, graceful degradation when upstream resources drop, and keeping local fallback states available.',
    category: 'Architecture',
  },
  {
    id: 'note-2',
    title: 'Typographic Balance in Web Layouts',
    date: '2026-09-08',
    snippet: 'Why limiting line width to 65-75ch and maintaining clear vertical rhythm between headings and copy enhances reader retention.',
    category: 'Design',
  },
  {
    id: 'note-3',
    title: 'Key Milestones for the Mahsa Project',
    date: '2026-09-01',
    snippet: 'Establish solid development foundations with Vite and TypeScript, configure responsive layouts, and set up continuous previews.',
    category: 'Milestones',
  },
];

export const Notepad: React.FC = () => {
  const [notes, setNotes] = useState<NoteItem[]>(() => {
    const saved = localStorage.getItem('mahsa_notes');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error('Failed to parse notes from storage', e);
      }
    }
    return INITIAL_NOTES;
  });

  const [activeNoteId, setActiveNoteId] = useState<string>(notes[0]?.id || '');
  const [searchTerm, setSearchTerm] = useState('');

  // Editing state for active note
  const activeNote = notes.find((n) => n.id === activeNoteId) || notes[0];

  const handleCreateNote = () => {
    const newNote: NoteItem = {
      id: `note-${Date.now()}`,
      title: 'Untitled Note',
      date: new Date().toISOString().split('T')[0],
      snippet: 'Type your thoughts here...',
      category: 'General',
    };

    const updated = [newNote, ...notes];
    setNotes(updated);
    setActiveNoteId(newNote.id);
    localStorage.setItem('mahsa_notes', JSON.stringify(updated));
  };

  const handleUpdateActiveNote = (field: 'title' | 'snippet' | 'category', value: string) => {
    if (!activeNote) return;

    const updated = notes.map((n) => {
      if (n.id === activeNote.id) {
        return { ...n, [field]: value };
      }
      return n;
    });

    setNotes(updated);
    localStorage.setItem('mahsa_notes', JSON.stringify(updated));
  };

  const handleDeleteNote = (id: string) => {
    const updated = notes.filter((n) => n.id !== id);
    setNotes(updated);
    localStorage.setItem('mahsa_notes', JSON.stringify(updated));
    if (activeNoteId === id && updated.length > 0) {
      setActiveNoteId(updated[0].id);
    }
  };

  const filteredNotes = notes.filter(
    (n) =>
      n.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      n.snippet.toLowerCase().includes(searchTerm.toLowerCase()) ||
      n.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <section className="space-y-6">
      <div className="border-b border-stone-200 pb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-stone-900">Notes & Thoughts</h2>
          <p className="text-sm text-stone-700">A personal scratchpad for insights, technical reflections, and plans.</p>
        </div>
        <button
          id="new-note-btn"
          onClick={handleCreateNote}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-stone-900 hover:bg-stone-800 text-white text-sm font-medium transition-all shadow-sm self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>New Note</span>
        </button>
      </div>

      <div className="grid md:grid-cols-12 gap-6 bg-white border border-stone-200 rounded-2xl p-4 sm:p-6 shadow-xs min-h-[460px]">
        {/* Sidebar list */}
        <div className="md:col-span-4 border-b md:border-b-0 md:border-r border-stone-200 pr-0 md:pr-4 pb-4 md:pb-0 space-y-3">
          <div className="relative">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-stone-600" />
            <input
              type="text"
              placeholder="Filter notes..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-3 py-1.5 rounded-xl border border-stone-200 bg-stone-50 text-xs text-stone-800 placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-stone-400"
            />
          </div>

          <div className="space-y-1.5 max-h-[380px] overflow-y-auto">
            {filteredNotes.map((note) => (
              <button
                key={note.id}
                id={`note-item-${note.id}`}
                onClick={() => setActiveNoteId(note.id)}
                className={`w-full text-left p-3 rounded-xl transition-all ${
                  activeNote?.id === note.id
                    ? 'bg-stone-100 border border-stone-300/80 shadow-xs'
                    : 'hover:bg-stone-50 border border-transparent'
                }`}
              >
                <div className="flex items-center justify-between text-xs text-stone-600 mb-1">
                  <span className="font-medium text-stone-700">{note.category}</span>
                  <span>{note.date}</span>
                </div>
                <h4 className="text-sm font-semibold text-stone-900 truncate">{note.title}</h4>
                <p className="text-xs text-stone-700 line-clamp-2 mt-1 leading-relaxed">
                  {note.snippet}
                </p>
              </button>
            ))}

            {filteredNotes.length === 0 && (
              <p className="text-xs text-stone-600 text-center py-6">No matching notes found.</p>
            )}
          </div>
        </div>

        {/* Note editor / viewer */}
        <div className="md:col-span-8 flex flex-col justify-between">
          {activeNote ? (
            <div className="space-y-4">
              <div className="flex items-center justify-between gap-4 border-b border-stone-100 pb-3">
                <input
                  type="text"
                  value={activeNote.category}
                  onChange={(e) => handleUpdateActiveNote('category', e.target.value)}
                  className="text-xs font-semibold uppercase tracking-wider text-stone-700 bg-stone-100 px-2.5 py-1 rounded-md border border-stone-200 focus:outline-none focus:ring-1 focus:ring-stone-400"
                />
                <div className="flex items-center gap-2">
                  <span className="text-xs text-stone-600 flex items-center gap-1 font-mono">
                    <Calendar className="w-3.5 h-3.5" />
                    {activeNote.date}
                  </span>
                  <button
                    id="delete-note-btn"
                    onClick={() => handleDeleteNote(activeNote.id)}
                    className="p-1.5 rounded-lg text-stone-600 hover:text-rose-600 hover:bg-rose-50 transition-colors"
                    title="Delete Note"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <input
                type="text"
                id="active-note-title"
                value={activeNote.title}
                onChange={(e) => handleUpdateActiveNote('title', e.target.value)}
                className="w-full text-xl font-bold text-stone-900 border-none focus:outline-none focus:ring-0 px-0 placeholder-stone-400"
                placeholder="Note Title"
              />

              <textarea
                id="active-note-content"
                rows={10}
                value={activeNote.snippet}
                onChange={(e) => handleUpdateActiveNote('snippet', e.target.value)}
                className="w-full text-sm text-stone-800 leading-relaxed border-none focus:outline-none focus:ring-0 px-0 resize-none placeholder-stone-400 bg-transparent"
                placeholder="Write your note here..."
              />
            </div>
          ) : (
            <div className="h-full flex items-center justify-center text-stone-600 text-sm">
              Select or create a note to get started.
            </div>
          )}

          <div className="text-right text-xs text-stone-600 pt-2 border-t border-stone-100">
            Changes saved locally to browser
          </div>
        </div>
      </div>
    </section>
  );
};
