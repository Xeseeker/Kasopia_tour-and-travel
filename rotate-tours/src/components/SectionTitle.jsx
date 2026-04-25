import clsx from 'clsx';

export default function SectionTitle({ eyebrow, title, description, align = 'center' }) {
  return (
    <div
      className={clsx('space-y-3  max-w-2xl', {
        'text-center mx-auto': align === 'center',
      })}
    >
      {eyebrow && <p className="text-sm font-semibold uppercase tracking-widest text-blue-600">{eyebrow}</p>}
      <h2 className="text-3xl sm:text-4xl font-display text-dusk leading-tight">{title}</h2>
      {description && <p className="text-base text-slate-600">{description}</p>}
    </div>
  );
}
