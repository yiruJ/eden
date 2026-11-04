import { GlassIcons } from '../ui/GlassIcons';

const steps = [
  {
    title: 'Meet the teacher',
    body: 'Your child\'s teacher starts by getting to know them, at a pace that suits them.',
  },
  {
    title: 'Try the instrument',
    body: 'Your child tries the instrument and some simple activities. No experience needed, and we have instruments at the studio.',
  },
  {
    title: 'Talk about next steps',
    body: 'At the end, the teacher talks with you about how it went and what could come next. There is no commitment to continue.',
  },
];

export function FirstLessonSection() {
  return (
    <section className="py-16 px-6 bg-white">
      <div className="max-w-3xl mx-auto">
        <h2 className="mb-8 md:mb-10 text-3xl sm:text-4xl font-display font-bold text-charcoal leading-tight">
          What happens at your first lesson
        </h2>

        <ol>
          {steps.map(({ title, body }, i) => (
            <li key={title} className="flex gap-6 sm:gap-8 pb-6 last:pb-0">
              <div className="relative flex items-center shrink-0">
                {/* Two segments, so the line still joins up with the number centred on cards of any height.
                    The 40px offset is half the 64px icon plus an 8px gap. */}
                {i > 0 && (
                  <span
                    className="absolute left-1/2 -translate-x-1/2 top-0 bottom-[calc(50%+40px)] w-px bg-primary/30"
                    aria-hidden="true"
                  />
                )}
                {i < steps.length - 1 && (
                  <span
                    className="absolute left-1/2 -translate-x-1/2 top-[calc(50%+40px)] -bottom-6 w-px bg-primary/30"
                    aria-hidden="true"
                  />
                )}
                <GlassIcons
                  items={[
                    {
                      icon: <span className="relative -top-1.5 font-display font-bold italic text-3xl leading-none">{i + 1}</span>,
                      color: 'linear-gradient(135deg, #4aaf81, #2f7d5b)',
                      className: '!cursor-default',
                    },
                  ]}
                  size={64}
                  gap={0}
                  columns={1}
                  theme="light"
                  plate="tilt"
                  tilt={12}
                  refraction={0.25}
                  tintOpacity={0.08}
                  hover="lift"
                  labels="none"
                />
              </div>
              <div className="flex-1 min-w-0 rounded-2xl border border-primary/10 bg-background p-5 sm:p-6">
                <h3 className="text-lg font-display font-bold text-charcoal">{title}</h3>
                <p className="mt-2 text-charcoal/70 leading-relaxed">{body}</p>
              </div>
            </li>
          ))}
        </ol>

        <div className="mt-6 rounded-2xl bg-surface p-6">
          <p className="text-charcoal/70 leading-relaxed">
            Parents can stay in the room and watch or wait in the student lounge.
          </p>
        </div>
      </div>
    </section>
  );
}
