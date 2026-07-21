const VARIANTS = {
  // Signal fill. `on-accent` flips with the palette so the label stays legible
  // against vermilion in both the paper and ink scopes.
  solid:
    'bg-accent text-on-accent hover:bg-content-primary hover:text-surface-base',
  // Hairline box that fills with ink on hover.
  outline:
    'border border-content-primary text-content-primary hover:bg-content-primary hover:text-surface-base',
  // Bare mono label with a rule that draws left → right.
  bare: 'link-draw text-content-primary hover:text-accent',
};

const SIZES = {
  sm: 'px-4 py-2',
  md: 'px-5 py-3',
  lg: 'px-7 py-4',
};

/**
 * Renders an <a> when `href` is present, otherwise a <button>, so links stay
 * real links (middle-click, open-in-new-tab, and screen readers all work).
 */
export default function Button({
  children,
  href,
  variant = 'solid',
  size = 'md',
  className = '',
  external = false,
  ...rest
}) {
  const padding = variant === 'bare' ? '' : SIZES[size] ?? SIZES.md;
  const classes = `meta inline-flex items-center justify-center gap-2.5 transition-colors duration-200 ${
    VARIANTS[variant] ?? VARIANTS.solid
  } ${padding} ${className}`;

  if (href) {
    return (
      <a
        href={href}
        className={classes}
        {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
        {...rest}
      >
        {children}
      </a>
    );
  }

  return (
    <button type="button" className={classes} {...rest}>
      {children}
    </button>
  );
}
