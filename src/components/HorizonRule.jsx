/**
 * The horizon: a 1px rule with a glow above it that is strongest at dawn and
 * dusk. Sections render exactly one, between their sky and ground rows, so the
 * rules down the page read as a single line stepping across the landscape.
 */
export default function HorizonRule({ className = '' }) {
  return <div aria-hidden="true" className={['horizon-rule', className].join(' ')} />;
}
