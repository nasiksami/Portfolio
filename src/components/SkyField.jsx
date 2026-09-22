/**
 * Fixed atmosphere behind everything: a sparse field of stars whose opacity
 * is driven by the sky position, so it only appears once the sky is dark.
 * The page background itself is the sky colour; this layer adds nothing at
 * noon and costs no network request.
 */
export default function SkyField() {
  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      <div className="sky-stars absolute inset-0" />
    </div>
  );
}
