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
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

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

    // Save to localStorage quietly for persistence
    try {
      const saved = localStorage.getItem('slavisa_portfolio_msgs');
      const existing = saved ? JSON.parse(saved) : [];
      localStorage.setItem('slavisa_portfolio_msgs', JSON.stringify([newMsg, ...existing]));
    } catch (err) {
      // Ignore silent storage errors
    }

    // Clear form
    setSender('');
    setEmail('');
    setMessage('');
    setSubmitted(true);

    setTimeout(() => setSubmitted(false), 4000);
  };

  return (
    <div className="space-y-8 max-w-xl mx-auto font-sans">
      {/* Container Card */}
      <div className="bg-[#080808]/50 p-6 sm:p-8 rounded-2xl border border-white/5 shadow-lg space-y-6">
        
        <div className="space-y-2 text-center">
          <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight font-sans">
            {language === 'sr' ? 'Pošalji poruku Slaviši' : 'Leave a Message'}
          </h2>
          <p className="text-xs sm:text-sm text-gray-400 font-sans leading-relaxed max-w-md mx-auto">
            {language === 'sr' 
              ? 'Ostavi komentar, postavi pitanje ili se poveži u vezi sa integracijom korporativnih sistema.'
              : 'Leave your feedback, ask questions, or reach out regarding enterprise systems integration.'}
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
    </div>
  );
}
