import React, { useState } from 'react';
import { useForm, ValidationError } from '@formspree/react';

const contacts = [
  {
    label: 'Email',
    value: 'nasiksami@gmail.com',
    href: 'mailto:nasiksami@gmail.com',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M4 4h16v16H4V4zm0 0l8 8 8-8" /></svg>
    )
  },
  {
    label: 'Phone',
    value: '+1 (306) 502-5153',
    href: 'tel:+13065025153',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H5a2 2 0 01-2-2V5zm13 10a9 9 0 01-9-9m0 0a9 9 0 009 9m0 0v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2h-2a2 2 0 00-2 2z" /></svg>
    )
  },
  {
    label: 'LinkedIn',
    value: 'LinkedIn',
    href: 'https://www.linkedin.com/in/nasiksami',
    icon: (
      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.76 0-5 2.24-5 5v14c0 2.76 2.24 5 5 5h14c2.76 0 5-2.24 5-5v-14c0-2.76-2.24-5-5-5zm-11 19h-3v-9h3v9zm-1.5-10.28c-.97 0-1.75-.79-1.75-1.75s.78-1.75 1.75-1.75 1.75.79 1.75 1.75-.78 1.75-1.75 1.75zm13.5 10.28h-3v-4.5c0-1.08-.02-2.47-1.5-2.47-1.5 0-1.73 1.17-1.73 2.39v4.58h-3v-9h2.89v1.23h.04c.4-.75 1.38-1.54 2.84-1.54 3.04 0 3.6 2 3.6 4.59v4.72z"/></svg>
    )
  },
  {
    label: 'GitHub',
    value: 'GitHub',
    href: 'https://github.com/nasiksami',
    icon: (
      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12c0 4.42 2.87 8.17 6.84 9.5.5.09.66-.22.66-.48 0-.24-.01-.87-.01-1.7-2.78.6-3.37-1.34-3.37-1.34-.45-1.15-1.11-1.46-1.11-1.46-.91-.62.07-.6.07-.6 1.01.07 1.54 1.04 1.54 1.04.89 1.53 2.34 1.09 2.91.83.09-.65.35-1.09.63-1.34-2.22-.25-4.56-1.11-4.56-4.95 0-1.09.39-1.98 1.03-2.68-.1-.25-.45-1.27.1-2.65 0 0 .84-.27 2.75 1.02A9.56 9.56 0 0112 6.8c.85.004 1.71.115 2.51.337 1.91-1.29 2.75-1.02 2.75-1.02.55 1.38.2 2.4.1 2.65.64.7 1.03 1.59 1.03 2.68 0 3.85-2.34 4.7-4.57 4.95.36.31.68.92.68 1.85 0 1.34-.01 2.42-.01 2.75 0 .27.16.58.67.48A10.01 10.01 0 0022 12c0-5.52-4.48-10-10-10z"/></svg>
    )
  },
  {
    label: 'Google Scholar',
    value: 'Google Scholar',
    href: 'https://scholar.google.com/citations?hl=en&user=NCdDTeEAAAAJ',
    icon: (
      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C8.13 2 5 5.13 5 9c0 3.87 3.13 7 7 7s7-3.13 7-7c0-3.87-3.13-7-7-7zm0 12c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm-7 7v-2c0-2.21 3.58-4 8-4s8 1.79 8 4v2H5z"/></svg>
    )
  },
  {
    label: 'X (Twitter)',
    value: 'X (Twitter)',
    href: 'https://x.com/NasikSami',
    icon: (
      <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M4 4L20 20M20 4L4 20" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/></svg>
    )
  },
];

export default function Contact() {
  const [state, handleSubmit] = useForm("xyzjrdao");
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [errors, setErrors] = useState({});

  function validate() {
    const errs = {};
    if (!form.name.trim()) errs.name = 'Name is required.';
    if (!form.email.trim()) errs.email = 'Email is required.';
    else if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(form.email)) errs.email = 'Invalid email.';
    if (!form.message.trim()) errs.message = 'Message is required.';
    return errs;
  }

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: undefined });
  }

  function onSubmit(e) {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) {
      setErrors(errs);
      return;
    }
    handleSubmit(e);
  }

  return (
    <div className="flex justify-center py-16 animate-fade-in">
      <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-10 shadow-2xl border border-blue-400/30 max-w-3xl w-full flex flex-col items-center">
        <h3 className="text-3xl md:text-4xl font-extrabold mb-12 mt-8 text-center bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400">Contact</h3>
        {state.succeeded ? (
          <div className="text-green-400 text-lg font-semibold mb-8">Thank you! Your message has been sent.</div>
        ) : (
          <form className="w-full space-y-4 mb-8" onSubmit={onSubmit} noValidate>
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-blue-200 mb-1">Name</label>
              <input
                id="name"
                name="name"
                type="text"
                autoComplete="name"
                required
                placeholder="Your name"
                className={`w-full rounded-lg border px-3 py-2 bg-gray-900/80 text-white focus:outline-none focus:ring-2 focus:ring-blue-400 ${errors.name ? 'border-red-400' : 'border-blue-400/30'}`}
                value={form.name}
                onChange={handleChange}
                aria-invalid={!!errors.name}
                aria-describedby={errors.name ? 'name-error' : undefined}
              />
              {errors.name && <div id="name-error" className="text-xs text-red-400 mt-1">{errors.name}</div>}
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-blue-200 mb-1">Email</label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                placeholder="your@email.com"
                className={`w-full rounded-lg border px-3 py-2 bg-gray-900/80 text-white focus:outline-none focus:ring-2 focus:ring-blue-400 ${errors.email ? 'border-red-400' : 'border-blue-400/30'}`}
                value={form.email}
                onChange={handleChange}
                aria-invalid={!!errors.email}
                aria-describedby={errors.email ? 'email-error' : undefined}
              />
              <ValidationError prefix="Email" field="email" errors={state.errors} />
              {errors.email && <div id="email-error" className="text-xs text-red-400 mt-1">{errors.email}</div>}
            </div>
            <div>
              <label htmlFor="message" className="block text-sm font-medium text-blue-200 mb-1">Message</label>
              <textarea
                id="message"
                name="message"
                rows={4}
                required
                placeholder="Your message..."
                className={`w-full rounded-lg border px-3 py-2 bg-gray-900/80 text-white focus:outline-none focus:ring-2 focus:ring-blue-400 ${errors.message ? 'border-red-400' : 'border-blue-400/30'}`}
                value={form.message}
                onChange={handleChange}
                aria-invalid={!!errors.message}
                aria-describedby={errors.message ? 'message-error' : undefined}
              />
              <ValidationError prefix="Message" field="message" errors={state.errors} />
              {errors.message && <div id="message-error" className="text-xs text-red-400 mt-1">{errors.message}</div>}
            </div>
            <button
              type="submit"
              className="w-full py-2 px-4 rounded-xl bg-blue-500 text-white font-semibold shadow hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
              disabled={state.submitting}
            >
              {state.submitting ? 'Sending...' : 'Send Message'}
            </button>
            {state.errors && state.errors.length > 0 && (
              <div className="text-red-400 text-sm mt-2">Something went wrong. Please try again later.</div>
            )}
          </form>
        )}
        {/* Remove home address and update contact links styling */}
        <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-3 mt-2">
          {contacts.map((c) => (
            <a
              key={c.label}
              href={c.href}
              target={c.href.startsWith('http') ? '_blank' : undefined}
              rel={c.href.startsWith('http') ? 'noopener noreferrer' : undefined}
              className="flex items-center gap-3 text-blue-100 hover:text-white hover:bg-blue-500/80 transition px-4 py-2 rounded-lg font-semibold text-base bg-blue-400/10 border border-blue-400/20 shadow w-full justify-start"
            >
              <span className="flex items-center justify-center w-8 h-8 rounded-full bg-blue-900/40 text-blue-300 mr-2">{c.icon}</span>
              {c.value}
            </a>
          ))}
        </div>
      </div>
      <style>{`
        .animate-fade-in {
          animation: fadeIn 1.2s cubic-bezier(.4,0,.2,1) both;
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
} 