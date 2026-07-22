const VARIANTS = {
  solid:
    'group rounded-full bg-signal text-on-signal shadow-[0_0_0_1px_rgb(var(--signal))] hover:bg-accent hover:text-on-accent hover:shadow-[0_0_0_5px_rgb(var(--accent)/0.14)]',
  outline:
    'rounded-full border border-edge bg-surface-base/30 text-content-primary hover:border-accent hover:bg-accent/10 hover:text-accent',
  bare: 'link-draw text-content-primary hover:text-accent',
};

const SIZES = {
  sm: 'px-4 py-2',
  md: 'px-5 py-3',
  lg: 'px-7 py-4',
};

/**
 * Renders an anchor when href is present so links retain native browser and
 * assistive-technology behaviour.
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
  const classes = [
    'meta tap justify-center gap-2.5 transition-all duration-300',
    VARIANTS[variant] ?? VARIANTS.solid,
    padding,
    className,
  ].join(' ');

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
