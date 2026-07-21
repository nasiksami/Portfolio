/**
 * Decorative animated background: three large blurred gradient blobs on a
 * subtle grid. Purely presentational, so it is hidden from assistive tech and
 * ignores pointer events.
 *
 * Animation is CSS-only (transform + opacity) to stay on the compositor and
 * hold 60fps; `prefers-reduced-motion` pauses it via the global rule in
 * index.css.
 */
export default function Aurora() {
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
      {/* Grid wash */}
      <div
        className="absolute inset-0 opacity-[0.18]"
        style={{
          backgroundImage:
            'linear-gradient(rgb(var(--edge)) 1px, transparent 1px), linear-gradient(90deg, rgb(var(--edge)) 1px, transparent 1px)',
          backgroundSize: '64px 64px',
          maskImage: 'radial-gradient(ellipse 80% 60% at 50% 0%, #000 40%, transparent 100%)',
          WebkitMaskImage:
            'radial-gradient(ellipse 80% 60% at 50% 0%, #000 40%, transparent 100%)',
        }}
      />

      <div className="absolute -left-32 -top-40 h-[34rem] w-[34rem] rounded-full bg-accent/25 blur-[110px] animate-aurora-drift" />
      <div
        className="absolute -right-24 top-10 h-[30rem] w-[30rem] rounded-full bg-iris/20 blur-[110px] animate-aurora-drift"
        style={{ animationDelay: '-7s' }}
      />
      <div
        className="absolute bottom-0 left-1/3 h-[26rem] w-[26rem] rounded-full bg-ember/15 blur-[120px] animate-aurora-drift"
        style={{ animationDelay: '-14s' }}
      />
    </div>
  );
}
