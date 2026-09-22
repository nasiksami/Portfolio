/** Decorative aurora for the end of the arc. Opacity is driven by the sky. */
export default function Aurora() {
  return (
    <div aria-hidden="true" className="aurora pointer-events-none absolute inset-0 -z-10 overflow-hidden">
      <span className="aurora__band" />
      <span className="aurora__band" />
      <span className="aurora__band" />
    </div>
  );
}
