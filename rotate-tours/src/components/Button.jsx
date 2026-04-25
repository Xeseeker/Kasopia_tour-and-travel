import clsx from 'clsx';

const baseStyles = 'inline-flex items-center justify-center gap-2 rounded-md px-6 py-3 text-sm font-semibold transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2';

const variants = {
  primary: 'bg-blue-600 text-white hover:bg-blue-700 shadow-md focus-visible:ring-blue-600',
  secondary: 'bg-white text-blue-700 border border-slate-200 hover:bg-slate-50 shadow-sm focus-visible:ring-blue-600',
  ghost: 'bg-white/10 text-white hover:bg-white/20 focus-visible:ring-white/40',
};

export default function Button({ as: Component = 'button', variant = 'primary', className = '', children, ...rest }) {
  return (
    <Component className={clsx(baseStyles, variants[variant], className)} {...rest}>
      {children}
    </Component>
  );
}
