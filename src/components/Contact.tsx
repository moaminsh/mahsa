import React, { useState } from 'react';
import { Mail, Send, CheckCircle2, MessageSquare, Clock } from 'lucide-react';
import { ContactMessage } from '../types';

export const Contact: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [sentMessages, setSentMessages] = useState<ContactMessage[]>(() => {
    const saved = localStorage.getItem('mahsa_messages');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error(e);
      }
    }
    return [];
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim() || !message.trim()) return;

    const newMessage: ContactMessage = {
      id: `msg-${Date.now()}`,
      name: name.trim(),
      email: email.trim(),
      message: message.trim(),
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    const updated = [newMessage, ...sentMessages];
    setSentMessages(updated);
    localStorage.setItem('mahsa_messages', JSON.stringify(updated));

    setSubmitted(true);
    setName('');
    setEmail('');
    setMessage('');
    setTimeout(() => setSubmitted(false), 5000);
  };

  return (
    <section className="space-y-6">
      <div className="border-b border-stone-200 pb-4">
        <h2 className="text-2xl font-bold text-stone-900">Get in Touch</h2>
        <p className="text-sm text-stone-700">Send a note, propose a collaboration, or just say hello.</p>
      </div>

      <div className="grid md:grid-cols-12 gap-8">
        {/* Contact Form */}
        <div className="md:col-span-7 bg-white p-6 rounded-2xl border border-stone-200 shadow-xs space-y-4">
          <h3 className="text-lg font-semibold text-stone-900">Send a Direct Message</h3>

          {submitted && (
            <div className="p-3.5 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>Thank you! Your message has been saved and logged successfully.</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-medium text-stone-700 mb-1">Your Name</label>
              <input
                type="text"
                id="contact-name"
                required
                placeholder="Alex Morgan"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-stone-200 text-sm focus:ring-2 focus:ring-stone-400 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-stone-700 mb-1">Email Address</label>
              <input
                type="email"
                id="contact-email"
                required
                placeholder="alex@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-stone-200 text-sm focus:ring-2 focus:ring-stone-400 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-stone-700 mb-1">Message</label>
              <textarea
                id="contact-message"
                rows={4}
                required
                placeholder="Hello Mahsa, I'd love to chat about..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-stone-200 text-sm focus:ring-2 focus:ring-stone-400 focus:outline-none resize-none"
              />
            </div>

            <button
              type="submit"
              id="submit-contact-btn"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-stone-900 hover:bg-stone-800 text-white text-sm font-medium transition-all shadow-sm"
            >
              <Send className="w-4 h-4" />
              <span>Send Message</span>
            </button>
          </form>
        </div>

        {/* Contact Info & Sent Messages Log */}
        <div className="md:col-span-5 space-y-6">
          <div className="bg-white p-6 rounded-2xl border border-stone-200 shadow-xs space-y-4">
            <h4 className="text-sm font-semibold text-stone-900 uppercase tracking-wider">
              Profile Coordinates
            </h4>
            <div className="space-y-3 text-sm text-stone-700">
              <div className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-stone-600" />
                <span className="font-mono text-xs">mahsa.sadeghian1385@gmail.com</span>
              </div>
              <div className="flex items-center gap-3">
                <MessageSquare className="w-4 h-4 text-stone-600" />
                <span>Open for collaborations & discussions</span>
              </div>
            </div>
          </div>

          {sentMessages.length > 0 && (
            <div className="bg-stone-100/70 p-5 rounded-2xl border border-stone-200 space-y-3">
              <h4 className="text-xs font-semibold text-stone-700 uppercase tracking-wider flex items-center justify-between">
                <span>Recent Inquiries Log</span>
                <span className="text-stone-600 font-mono text-[10px]">{sentMessages.length} total</span>
              </h4>
              <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
                {sentMessages.map((msg) => (
                  <div key={msg.id} className="p-3 bg-white rounded-xl border border-stone-200/80 text-xs space-y-1">
                    <div className="flex items-center justify-between font-medium text-stone-800">
                      <span>{msg.name}</span>
                      <span className="text-[10px] text-stone-600 font-mono flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {msg.timestamp}
                      </span>
                    </div>
                    <p className="text-stone-700 line-clamp-2">{msg.message}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
