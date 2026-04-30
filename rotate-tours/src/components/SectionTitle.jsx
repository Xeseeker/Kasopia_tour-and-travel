import clsx from 'clsx';

export default function SectionTitle({
  eyebrow,
  title,
  description,
  align = 'center',
  titleAs: TitleTag = 'h2',
}) {
  return (
    <div
      className={clsx('space-y-3  max-w-2xl', {
        'text-center mx-auto': align === 'center',
      })}
    >
      {eyebrow && <p className="text-md font-semibold uppercase tracking-widest text-blue-300">{eyebrow}</p>}
      <TitleTag className="text-3xl sm:text-4xl font-display text-dusk leading-tight">
        {title}
      </TitleTag>
      {description && <p className="text-base text-slate-900">{description}</p>}
    </div>
  );
}
