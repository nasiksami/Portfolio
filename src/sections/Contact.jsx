import { useState } from 'react';
import { useForm, ValidationError } from '@formspree/react';
import { FiArrowUpRight, FiCheck, FiSend } from 'react-icons/fi';
import { profile, socials } from '../data/profile';
import { ARC } from '../sky';
import Aurora from '../components/Aurora';
import Section from '../components/ui/Section';
import Reveal from '../components/ui/Reveal';
import Button from '../components/ui/Button';

const FORMSPREE_ID = 'xyzjrdao';

const FIELD_CLASS =
  'w-full rounded-[0.35rem] border bg-surface-base/40 px-4 py-3.5 text-base text-content-primary placeholder:text-content-muted transition-colors focus:border-content-primary';

/** Direct channels, listed in the sky. */
function Channels() {
  return (
    <div className="mt-16 grid gap-8 md:mt-24 lg:grid-cols-12 lg:gap-8">
      <Reveal className="lg:col-span-4">
        <p className="eyebrow">Reach me directly</p>
        <p className="mt-5 max-w-xs text-base leading-relaxed text-content-secondary">
          Based in {profile.location}. Happy to talk about research, engineering, or anything in
          between.
        </p>
      </Reveal>

      <Reveal delay={0.08} className="lg:col-span-8">
        <ul className="border-b border-edge">
          {socials.map((social) => {
            const isExternal = social.href.startsWith('http');
            return (
              <li key={social.label} className="border-t border-edge">
                <a
                  href={social.href}
                  {...(isExternal ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                  className="group grid gap-1 py-4 transition-colors hover:text-accent sm:grid-cols-[9rem_minmax(0,1fr)_auto] sm:items-center sm:gap-4"
                >
                  <span className="meta-sm text-content-muted transition-colors group-hover:text-accent">
                    {social.label}
                  </span>
                  <span className="min-w-0 truncate text-sm text-content-primary transition-colors group-hover:text-accent md:text-base">
                    {social.value}
                  </span>
                  <FiArrowUpRight
                    className="hidden h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 sm:block"
                    aria-hidden="true"
                  />
                </a>
              </li>
            );
          })}
        </ul>
      </Reveal>
    </div>
  );
}

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
    setErrors((current) => ({ ...current, [name]: undefined }));
  }

  function onSubmit(event) {
    event.preventDefault();
    const found = validate(values);
    if (Object.keys(found).length) {
      setErrors(found);
      document.getElementById(Object.keys(found)[0])?.focus();
      return;
    }
    handleSubmit(event);
  }

  const field = (name) => [FIELD_CLASS, errors[name] ? 'border-signal' : 'border-edge'].join(' ');

  return (
    <Section
      id="contact"
      index="06"
      label="Contact"
      arc={ARC.contact}
      title="Let’s build something"
      description="Always glad to talk about AI/ML, cloud, telecom, and software engineering. I read every message."
      backdrop={<Aurora />}
      sky={<Channels />}
      ground="solid"
    >
      <div className="grid gap-10 lg:grid-cols-12 lg:gap-8">
        <Reveal className="lg:col-span-4">
          <p className="eyebrow">Send a message</p>
        </Reveal>

        <Reveal delay={0.08} className="lg:col-span-8">
          {state.succeeded ? (
            <div role="status" className="flex min-h-[24rem] flex-col items-start justify-center">
              <span className="mb-7 flex h-14 w-14 items-center justify-center rounded-full border border-signal text-signal">
                <FiCheck className="h-6 w-6" aria-hidden="true" />
              </span>
              <h3 className="display d-2 text-content-primary">Message sent</h3>
              <p className="mt-5 max-w-prose text-sm leading-relaxed text-content-secondary">
                Thanks for reaching out — I’ll get back to you as soon as I can.
              </p>
            </div>
          ) : (
            <form onSubmit={onSubmit} noValidate aria-busy={state.submitting} className="max-w-2xl">
              <div className="space-y-6">
                <div className="grid gap-6 sm:grid-cols-2">
                  <div>
                    <label htmlFor="name" className="meta-sm mb-2.5 block text-content-muted">
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
                      className={field('name')}
                    />
                    {errors.name && (
                      <p id="name-error" role="alert" className="meta-sm mt-2 text-signal">
                        {errors.name}
                      </p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="email" className="meta-sm mb-2.5 block text-content-muted">
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
                      className={field('email')}
                    />
                    {errors.email && (
                      <p id="email-error" role="alert" className="meta-sm mt-2 text-signal">
                        {errors.email}
                      </p>
                    )}
                    <ValidationError prefix="Email" field="email" errors={state.errors} />
                  </div>
                </div>

                <div>
                  <label htmlFor="message" className="meta-sm mb-2.5 block text-content-muted">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={6}
                    placeholder="What would you like to talk about?"
                    value={values.message}
                    onChange={handleChange}
                    aria-invalid={Boolean(errors.message)}
                    aria-describedby={errors.message ? 'message-error' : undefined}
                    className={[field('message'), 'resize-y'].join(' ')}
                  />
                  {errors.message && (
                    <p id="message-error" role="alert" className="meta-sm mt-2 text-signal">
                      {errors.message}
                    </p>
                  )}
                  <ValidationError prefix="Message" field="message" errors={state.errors} />
                </div>

                <Button type="submit" size="lg" className="w-full sm:w-auto" disabled={state.submitting}>
                  <FiSend className="h-4 w-4" aria-hidden="true" />
                  {state.submitting ? 'Sending…' : 'Send message'}
                </Button>

                {state.errors && state.errors.length > 0 && (
                  <p role="alert" className="text-sm text-signal">
                    Something went wrong sending your message. Please try again, or email me
                    directly.
                  </p>
                )}
              </div>
            </form>
          )}
        </Reveal>
      </div>
    </Section>
  );
}
