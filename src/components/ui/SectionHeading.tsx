interface SectionHeadingProps {
  tag?: string;
  title: string;
  subtitle?: string;
  align?: 'left' | 'center';
  className?: string;
}

export function SectionHeading({
  tag,
  title,
  subtitle,
  align = 'center',
  className = '',
}: SectionHeadingProps) {
  const alignClass = align === 'center' ? 'items-center text-center' : 'items-start text-left';

  return (
    <div className={`flex flex-col gap-4 ${alignClass} ${className}`}>
      {tag && (
        <span className="inline-block px-4 py-1 rounded-full bg-primary/10 text-primary font-semibold text-xs uppercase tracking-widest">
          {tag}
        </span>
      )}
      <h2 className="text-4xl lg:text-5xl font-display font-bold text-charcoal leading-tight">
        {title}
      </h2>
      {subtitle && (
        <p className="text-lg text-charcoal/65 max-w-2xl leading-relaxed font-light">
          {subtitle}
        </p>
      )}
      <div className="w-16 h-1 bg-accent/40 rounded-full" />
    </div>
  );
}
