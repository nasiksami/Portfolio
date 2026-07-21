const VARIANTS = {
  primary:
    'bg-accent text-white shadow-lg shadow-accent/25 hover:brightness-110 active:brightness-95',
  secondary:
    'border border-edge bg-surface-raised/60 text-content-primary backdrop-blur hover:border-accent/50 hover:bg-surface-overlay',
  ghost: 'text-content-secondary hover:bg-surface-overlay hover:text-content-primary',
};

const SIZES = {
  sm: 'px-3.5 py-2 text-sm',
  md: 'px-5 py-2.5 text-sm',
  lg: 'px-6 py-3 text-base',
};

/**
 * Renders an <a> when `href` is present, otherwise a <button>, so links stay
 * real links (middle-click, open-in-new-tab, and screen readers all work).
 */
export default function Button({
  children,
  href,
  variant = 'primary',
  size = 'md',
  className = '',
  external = false,
  ...rest
}) {
  const classes = `inline-flex items-center justify-center gap-2 rounded-xl font-medium transition duration-200 ${VARIANTS[variant] ?? VARIANTS.primary} ${SIZES[size] ?? SIZES.md} ${className}`;

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
