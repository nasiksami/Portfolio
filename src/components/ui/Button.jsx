const VARIANTS = {
  solid:
    'bg-signal text-on-signal border border-signal hover:bg-content-primary hover:border-content-primary hover:text-surface-base',
  outline:
    'border border-content-primary/40 text-content-primary hover:border-content-primary hover:bg-content-primary hover:text-surface-base',
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
    'meta tap justify-center gap-2.5 whitespace-nowrap rounded-[0.35rem] transition-colors duration-300',
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
