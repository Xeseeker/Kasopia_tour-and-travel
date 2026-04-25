import clsx from 'clsx';

const baseStyles = 'inline-flex items-center gap-2 rounded-full text-sm font-semibold transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2';

const variants = {
  primary: 'bg-blue-500 text-white hover:bg-blue-400 focus-visible:ring-blue-500',
  secondary: 'bg-blue-300 text-dusk hover:bg-white shadow-soft focus-visible:ring-brand-500',
  ghost: 'bg-white/10 text-white hover:bg-white/20 focus-visible:ring-white/40',
};

export default function Button({ as: Component = 'button', variant = 'primary', className = '', children, ...rest }) {
  return (
    <Component className={clsx(baseStyles, variants[variant], className)} {...rest}>
      {children}
    </Component>
  );
}
