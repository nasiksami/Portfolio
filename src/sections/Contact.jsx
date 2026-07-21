import { useState } from 'react';
import { useForm, ValidationError } from '@formspree/react';
import { FiCheck, FiSend } from 'react-icons/fi';
import { profile, socials } from '../data/profile';
import Section from '../components/ui/Section';
import Reveal from '../components/ui/Reveal';
import Button from '../components/ui/Button';

// Formspree form ID carried over from the previous site.
const FORMSPREE_ID = 'xyzjrdao';

// Underline-only fields, no boxes. The visible bottom rule is the affordance;
// :focus-visible in index.css still supplies a full ring for keyboard users,
// which a border-colour change alone would not.
const FIELD_CLASS =
  'w-full border-0 border-b bg-transparent px-0 py-3 text-base text-content-primary placeholder:text-content-muted transition-colors focus:border-accent';

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
      index="06"
      label="Contact"
      title="Let’s build something"
      description="Always glad to talk about AI/ML, cloud, telecom, and software engineering. I read every message."
      invert
    >
      <div className="grid gap-16 lg:grid-cols-2 lg:gap-14">
        {/* ── Direct channels ──────────────────────────────────────────── */}
        <Reveal>
          <div>
            <h3 className="meta border-b-2 border-content-primary pb-3 text-content-muted">
              Reach me directly
            </h3>
            <p className="mt-6 max-w-prose text-sm leading-relaxed text-content-secondary md:text-base">
              Based in {profile.location}. Happy to talk about research, engineering, or
              anything in between.
            </p>

            <ul className="ledger mt-8">
              {socials.map((social) => {
                const isExternal = social.href.startsWith('http');
                return (
                  <li key={social.label}>
                    <a
                      href={social.href}
                      {...(isExternal
                        ? { target: '_blank', rel: 'noopener noreferrer' }
                        : {})}
                      className="group flex items-baseline justify-between gap-4 py-4 transition-colors hover:text-accent"
                    >
                      <span className="meta-sm text-content-muted transition-colors group-hover:text-accent">
                        {social.label}
                      </span>
                      <span className="truncate text-sm text-content-primary transition-colors group-hover:text-accent">
                        {social.value}
                      </span>
                    </a>
                  </li>
                );
              })}
            </ul>
          </div>
        </Reveal>

        {/* ── Form ─────────────────────────────────────────────────────── */}
        <Reveal delay={0.1}>
          <div>
            {state.succeeded ? (
              <div className="flex h-full flex-col items-start justify-center border-l-2 border-accent py-12 pl-6">
                <FiCheck className="mb-5 h-8 w-8 text-accent" aria-hidden="true" />
                <h3 className="display d-2 text-content-primary">Message sent</h3>
                <p className="mt-4 max-w-prose text-sm leading-relaxed text-content-secondary">
                  Thanks for reaching out — I’ll get back to you as soon as I can.
                </p>
              </div>
            ) : (
              <form onSubmit={onSubmit} noValidate>
                <h3 className="meta border-b-2 border-content-primary pb-3 text-content-muted">
                  Send a message
                </h3>

                <div className="mt-8 space-y-8">
                  <div>
                    <label htmlFor="name" className="meta-sm block text-content-muted">
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
                      className={`${FIELD_CLASS} ${
                        errors.name ? 'border-accent' : 'border-edge'
                      }`}
                    />
                    {errors.name && (
                      <p id="name-error" role="alert" className="meta-sm mt-2 text-accent">
                        {errors.name}
                      </p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="email" className="meta-sm block text-content-muted">
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
                      className={`${FIELD_CLASS} ${
                        errors.email ? 'border-accent' : 'border-edge'
                      }`}
                    />
                    {errors.email && (
                      <p id="email-error" role="alert" className="meta-sm mt-2 text-accent">
                        {errors.email}
                      </p>
                    )}
                    <ValidationError prefix="Email" field="email" errors={state.errors} />
                  </div>

                  <div>
                    <label htmlFor="message" className="meta-sm block text-content-muted">
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
                      className={`${FIELD_CLASS} resize-y ${
                        errors.message ? 'border-accent' : 'border-edge'
                      }`}
                    />
                    {errors.message && (
                      <p
                        id="message-error"
                        role="alert"
                        className="meta-sm mt-2 text-accent"
                      >
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
                    <p role="alert" className="text-sm text-accent">
                      Something went wrong sending your message. Please try again, or email
                      me directly.
                    </p>
                  )}
                </div>
              </form>
            )}
          </div>
        </Reveal>
      </div>
    </Section>
  );
}
