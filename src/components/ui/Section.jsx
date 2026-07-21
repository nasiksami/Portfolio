import Reveal from './Reveal';

/**
 * Standard section shell: consistent vertical rhythm, max width, and an
 * accessible heading wired to the section via aria-labelledby.
 */
export default function Section({
  id,
  eyebrow,
  title,
  description,
  children,
  className = '',
  headingAlign = 'center',
}) {
  const headingId = `${id}-heading`;
  const alignment = headingAlign === 'left' ? 'text-left' : 'text-center mx-auto';

  return (
    <section
      id={id}
      aria-labelledby={headingId}
      className={`relative mx-auto w-full max-w-content px-5 py-20 sm:px-8 md:py-28 ${className}`}
    >
      <Reveal className={`mb-12 max-w-2xl md:mb-16 ${alignment}`}>
        {eyebrow && (
          <p className="mb-3 font-mono text-sm uppercase tracking-[0.2em] text-accent md:text-base">
            {eyebrow}
          </p>
        )}
        <h2
          id={headingId}
          className="text-3xl font-bold text-content-primary sm:text-4xl md:text-5xl"
        >
          {title}
        </h2>
        {description && (
          <p className="mt-4 text-base leading-relaxed text-content-secondary md:text-lg">
            {description}
          </p>
        )}
      </Reveal>
      {children}
    </section>
  );
}
