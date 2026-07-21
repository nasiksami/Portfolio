import { useState } from 'react';
import { useForm, ValidationError } from '@formspree/react';
import { FiCheckCircle, FiSend } from 'react-icons/fi';
import { profile, socials } from '../data/profile';
import Section from '../components/ui/Section';
import Reveal from '../components/ui/Reveal';
import Button from '../components/ui/Button';
import SocialLinks from '../components/SocialLinks';

// Formspree form ID carried over from the previous site.
const FORMSPREE_ID = 'xyzjrdao';

const FIELD_CLASS =
  'w-full rounded-xl border bg-surface-overlay/60 px-3.5 py-2.5 text-sm text-content-primary placeholder:text-content-muted transition-colors focus:border-accent';

export default function Contact() {
  const [state, handleSubmit] = useForm(FORMSPREE_ID);
  const [values, setValues] = useState({ name: '', email: '', message: '' });
  const [errors, setErrors] = useState({});

  function validate(data) {
    const next = {};
    if (!data.name.trim()) next.name = 'Please enter your name.';
    if (!data.email.trim()) next.email = 'Please enter your email address.';
    else if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(data.email))
      next.email = 'That does not look like a valid email address.';
    if (!data.message.trim()) next.message = 'Please enter a message.';
    return next;
  }

  function handleChange(event) {
    const { name, value } = event.target;
    setValues((current) => ({ ...current, [name]: value }));
    // Clear the error for this field as soon as the visitor edits it.
    setErrors((current) => ({ ...current, [name]: undefined }));
  }

  function onSubmit(event) {
    event.preventDefault();
    const found = validate(values);
    if (Object.keys(found).length) {
      setErrors(found);
      // Move focus to the first invalid field for keyboard/screen reader users.
      document.getElementById(Object.keys(found)[0])?.focus();
      return;
    }
    handleSubmit(event);
  }

  return (
    <Section
      id="contact"
      eyebrow="Contact"
      title="Let’s build something"
      description="Open to roles and collaborations in AI/ML, cloud, telecom, and software engineering. I read every message."
    >
      <div className="grid gap-8 lg:grid-cols-[1fr_1.1fr]">
        {/* Direct channels */}
        <Reveal>
          <div className="card h-full p-6 sm:p-8">
            <h3 className="font-display text-lg font-semibold text-content-primary">
              Reach me directly
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-content-secondary">
              Based in {profile.location}. Happy to talk about research, engineering, or
              anything in between.
            </p>

            <ul className="mt-6 space-y-2">
              {socials.map((social) => {
                const isExternal = social.href.startsWith('http');
                return (
                  <li key={social.label}>
                    <a
                      href={social.href}
                      {...(isExternal
                        ? { target: '_blank', rel: 'noopener noreferrer' }
                        : {})}
                      className="flex items-center justify-between gap-4 rounded-xl border border-edge bg-surface-overlay/40 px-4 py-3 transition duration-200 hover:border-accent/50 hover:bg-surface-overlay"
                    >
                      <span className="text-xs uppercase tracking-wider text-content-muted">
                        {social.label}
                      </span>
                      <span className="truncate text-sm text-content-primary">
                        {social.value}
                      </span>
                    </a>
                  </li>
                );
              })}
            </ul>

            <div className="mt-6 border-t border-edge pt-6">
              <SocialLinks />
            </div>
          </div>
        </Reveal>

        {/* Form */}
        <Reveal delay={0.1}>
          <div className="card h-full p-6 sm:p-8">
            {state.succeeded ? (
              <div className="flex h-full flex-col items-center justify-center py-12 text-center">
                <FiCheckCircle className="mb-4 h-10 w-10 text-emerald-400" aria-hidden="true" />
                <h3 className="font-display text-lg font-semibold text-content-primary">
                  Message sent
                </h3>
                <p className="mt-2 max-w-xs text-sm text-content-secondary">
                  Thanks for reaching out — I’ll get back to you as soon as I can.
                </p>
              </div>
            ) : (
              <form onSubmit={onSubmit} noValidate className="space-y-4">
                <h3 className="font-display text-lg font-semibold text-content-primary">
                  Send a message
                </h3>

                <div>
                  <label
                    htmlFor="name"
                    className="mb-1.5 block text-sm font-medium text-content-secondary"
                  >
                    Name
                  </label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    autoComplete="name"
                    placeholder="Your name"
                    value={values.name}
                    onChange={handleChange}
                    aria-invalid={Boolean(errors.name)}
                    aria-describedby={errors.name ? 'name-error' : undefined}
                    className={`${FIELD_CLASS} ${errors.name ? 'border-red-400' : 'border-edge'}`}
                  />
                  {errors.name && (
                    <p id="name-error" role="alert" className="mt-1.5 text-xs text-red-400">
                      {errors.name}
                    </p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="email"
                    className="mb-1.5 block text-sm font-medium text-content-secondary"
                  >
                    Email
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    placeholder="you@example.com"
                    value={values.email}
                    onChange={handleChange}
                    aria-invalid={Boolean(errors.email)}
                    aria-describedby={errors.email ? 'email-error' : undefined}
                    className={`${FIELD_CLASS} ${errors.email ? 'border-red-400' : 'border-edge'}`}
                  />
                  {errors.email && (
                    <p id="email-error" role="alert" className="mt-1.5 text-xs text-red-400">
                      {errors.email}
                    </p>
                  )}
                  <ValidationError prefix="Email" field="email" errors={state.errors} />
                </div>

                <div>
                  <label
                    htmlFor="message"
                    className="mb-1.5 block text-sm font-medium text-content-secondary"
                  >
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={5}
                    placeholder="What would you like to talk about?"
                    value={values.message}
                    onChange={handleChange}
                    aria-invalid={Boolean(errors.message)}
                    aria-describedby={errors.message ? 'message-error' : undefined}
                    className={`${FIELD_CLASS} resize-y ${errors.message ? 'border-red-400' : 'border-edge'}`}
                  />
                  {errors.message && (
                    <p id="message-error" role="alert" className="mt-1.5 text-xs text-red-400">
                      {errors.message}
                    </p>
                  )}
                  <ValidationError prefix="Message" field="message" errors={state.errors} />
                </div>

                <Button
                  type="submit"
                  size="lg"
                  className="w-full"
                  disabled={state.submitting}
                >
                  <FiSend className="h-4 w-4" aria-hidden="true" />
                  {state.submitting ? 'Sending…' : 'Send message'}
                </Button>

                {state.errors && state.errors.length > 0 && (
                  <p role="alert" className="text-sm text-red-400">
                    Something went wrong sending your message. Please try again, or email me
                    directly.
                  </p>
                )}
              </form>
            )}
          </div>
        </Reveal>
      </div>
    </Section>
  );
}
