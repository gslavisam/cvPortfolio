/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { 
  Send, 
  MessageSquare, 
  User, 
  Mail, 
  CheckCircle,
  Clock
} from 'lucide-react';
import { ContactMessage } from '../../types';

interface FeedbackSectionProps {
  language: 'sr' | 'en';
}

export default function FeedbackSection({ language }: FeedbackSectionProps) {
  const [sender, setSender] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  // Initial pre-seeded messages for context
  const defaultMessages: ContactMessage[] = [
    {
      id: 'seed-1',
      sender: 'Marko Nikolić',
      email: 'marko.n@orbitmi.com',
      message: language === 'sr' 
        ? 'Sjajan simulator plovidbe! Prikazuje upravo ono što radimo na optimizaciji brodskih sistema svakog dana. Bravo Slaviša!'
        : 'Awesome maritime vessel simulator! This perfectly explains what we build for vessel routing and fuel optimization daily. Great job Slavisa!',
      timestamp: 'Juče, 18:45'
    },
    {
      id: 'seed-2',
      sender: 'Ana Jovanović',
      email: 'anaj@gmail.com',
      message: language === 'sr' 
        ? 'Moja ćerka Dunja (9 god) je oduševljena DigiKlinci časovima! Robot igrica ovde na sajtu je super način da se dočara taj vizuelni koncept Scratch-a.'
        : 'My daughter Dunja (9yo) is absolutely loving the DigiKlinci coding classes! The robot mini-game here is a clever way to showcase the visual Scratch logic.',
      timestamp: 'Pre 3 dana, 14:12'
    }
  ];

  useEffect(() => {
    const saved = localStorage.getItem('slavisa_portfolio_msgs');
    if (saved) {
      try {
        setMessages(JSON.parse(saved));
      } catch (e) {
        setMessages(defaultMessages);
      }
    } else {
      setMessages(defaultMessages);
      localStorage.setItem('slavisa_portfolio_msgs', JSON.stringify(defaultMessages));
    }
  }, [language]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!sender.trim() || !email.trim() || !message.trim()) {
      setError(language === 'sr' ? 'Sva polja su obavezna!' : 'All fields are required!');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError(language === 'sr' ? 'Molimo unesite validnu e-mail adresu!' : 'Please enter a valid email address!');
      return;
    }

    const newMsg: ContactMessage = {
      id: Math.random().toString(36).substring(7),
      sender,
      email,
      message,
      timestamp: language === 'sr' ? 'Sada' : 'Just now'
    };

    const updated = [newMsg, ...messages];
    setMessages(updated);
    localStorage.setItem('slavisa_portfolio_msgs', JSON.stringify(updated));

    // Clear form
    setSender('');
    setEmail('');
    setMessage('');
    setSubmitted(true);

    setTimeout(() => setSubmitted(false), 4000);
  };

  return (
    <div className="space-y-8 max-w-4xl mx-auto font-sans">
      {/* Grid container */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 bg-[#080808]/50 p-5 rounded-2xl border border-white/5 shadow-lg">
        
        {/* Left Side: Message Form */}
        <div className="md:col-span-5 space-y-4">
          <div className="space-y-2">
            <h2 className="text-xl font-bold text-white tracking-tight font-sans">
              {language === 'sr' ? 'Pošalji poruku Slaviši' : 'Leave a Message'}
            </h2>
            <p className="text-xs text-gray-400 font-sans leading-relaxed">
              {language === 'sr' 
                ? 'Ostavi komentar, postavi pitanje o DigiKlinci školi ili se poveži u vezi OrbitMI maritimnih rešenja.'
                : 'Leave your feedback, ask about DigiKlinci courses, or reach out regarding OrbitMI maritime business.'}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Input Name */}
            <div className="space-y-1">
              <label className="text-[10px] font-mono uppercase tracking-wider text-indigo-400 font-bold">
                {language === 'sr' ? 'Ime' : 'Your Name'}
              </label>
              <div className="relative">
                <input
                  type="text"
                  value={sender}
                  onChange={(e) => setSender(e.target.value)}
                  placeholder={language === 'sr' ? 'Npr. Milan' : 'e.g. John Doe'}
                  id="input-sender-name"
                  className="w-full bg-[#030303] border border-white/5 focus:border-indigo-500 rounded-xl px-4 py-2.5 text-xs text-white placeholder-gray-600 focus:outline-none transition-all pl-10 font-sans"
                />
                <User className="w-4 h-4 text-gray-600 absolute left-3.5 top-1/2 -translate-y-1/2" />
              </div>
            </div>

            {/* Input Email */}
            <div className="space-y-1">
              <label className="text-[10px] font-mono uppercase tracking-wider text-indigo-400 font-bold">
                {language === 'sr' ? 'E-mail adresa' : 'Email Address'}
              </label>
              <div className="relative">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="npr. ime@domen.com"
                  id="input-sender-email"
                  className="w-full bg-[#030303] border border-white/5 focus:border-indigo-500 rounded-xl px-4 py-2.5 text-xs text-white placeholder-gray-600 focus:outline-none transition-all pl-10 font-sans"
                />
                <Mail className="w-4 h-4 text-gray-600 absolute left-3.5 top-1/2 -translate-y-1/2" />
              </div>
            </div>

            {/* Input Message */}
            <div className="space-y-1">
              <label className="text-[10px] font-mono uppercase tracking-wider text-indigo-400 font-bold">
                {language === 'sr' ? 'Poruka' : 'Your Message'}
              </label>
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder={language === 'sr' ? 'Napiši nešto lepo...' : 'Type your message here...'}
                rows={4}
                id="input-sender-message"
                className="w-full bg-[#030303] border border-white/5 focus:border-indigo-500 rounded-xl px-4 py-2.5 text-xs text-white placeholder-gray-600 focus:outline-none transition-all font-sans leading-relaxed resize-none"
              />
            </div>

            {/* Alerts */}
            {error && (
              <div className="p-2.5 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 text-xs font-sans font-medium text-center">
                {error}
              </div>
            )}

            {submitted && (
              <div className="p-2.5 rounded-lg bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-sans font-bold flex items-center justify-center gap-1.5 animate-pulse">
                <CheckCircle className="w-4 h-4 text-indigo-400" />
                <span>
                  {language === 'sr' ? 'Poruka uspešno zabeležena!' : 'Message recorded successfully!'}
                </span>
              </div>
            )}

            <button
              type="submit"
              id="btn-submit-message"
              className="w-full py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-black font-sans text-xs font-bold flex items-center justify-center gap-2 shadow-[0_0_15px_rgba(34,211,238,0.4)] active:scale-[0.98] transition-all cursor-pointer"
            >
              <Send className="w-3.5 h-3.5 text-black" />
              <span>{language === 'sr' ? 'Pošalji' : 'Send Message'}</span>
            </button>
          </form>
        </div>

        {/* Right Side: Messages List log */}
        <div className="md:col-span-7 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-bold font-mono tracking-wider text-indigo-400 uppercase flex items-center gap-2">
              <MessageSquare className="w-4 h-4 text-indigo-400" />
              <span>
                {language === 'sr' ? 'ZABELEŽENE PORUKE' : 'MESSAGE LOG'}
              </span>
            </h2>
            <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-white/5 text-gray-500 border border-white/5 font-semibold">
              {messages.length} total
            </span>
          </div>

          <div className="space-y-3 max-h-[380px] overflow-y-auto pr-1">
            {messages.map((msg) => (
              <div 
                key={msg.id}
                className="p-4 rounded-xl bg-[#080808]/50 border border-white/5 space-y-2 transition-all hover:bg-white/5 hover:border-white/10"
              >
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 rounded-full bg-gradient-to-tr from-indigo-500/20 to-cyan-500/20 border border-white/10 flex items-center justify-center font-sans">
                      <span className="text-[10px] font-bold text-gray-200">
                        {msg.sender.substring(0, 2).toUpperCase()}
                      </span>
                    </div>
                    <div>
                      <span className="text-xs font-bold text-white block font-sans">
                        {msg.sender}
                      </span>
                      <span className="text-[9px] text-gray-500 font-mono">
                        {msg.email}
                      </span>
                    </div>
                  </div>

                  <span className="text-[9px] font-mono text-gray-500 flex items-center gap-1">
                    <Clock className="w-3 h-3 text-gray-600" />
                    {msg.timestamp}
                  </span>
                </div>

                <p className="text-xs text-gray-300 font-sans leading-relaxed pl-9">
                  {msg.message}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
