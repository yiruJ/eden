const prices = [
  { length: '30 min', casual: '$70', fiveWeek: '$55', tenWeek: '$50' },
  { length: '45 min', casual: '$97.50', fiveWeek: '$82.50', tenWeek: '$72.50' },
  { length: '60 min', casual: '$125', fiveWeek: '$110', tenWeek: '$95' },
];

export function PrivateLessonPricing() {
  return (
    <section id="pricing" className="py-16 px-6 bg-white scroll-mt-24">
      <div className="max-w-3xl mx-auto">
        <h2 className="text-3xl sm:text-4xl font-display font-bold text-charcoal leading-tight">
          Private lesson prices
        </h2>
        <p className="mt-3 text-charcoal/65 font-light">Price per lesson.</p>

        <div className="mt-8 overflow-x-auto rounded-2xl border border-primary/10">
          <table className="w-full text-left text-sm sm:text-base">
            <caption className="sr-only">Private lesson prices per lesson, by lesson length and payment option</caption>
            <thead className="bg-surface text-charcoal">
              <tr>
                <th scope="col" className="px-3 sm:px-6 py-4 font-semibold">Lesson</th>
                <th scope="col" className="px-3 sm:px-6 py-4 font-semibold">Casual</th>
                <th scope="col" className="px-3 sm:px-6 py-4 font-semibold">5 weeks</th>
                <th scope="col" className="px-3 sm:px-6 py-4 font-semibold">10 weeks</th>
              </tr>
            </thead>
            <tbody className="text-charcoal/80">
              {prices.map(({ length, casual, fiveWeek, tenWeek }) => (
                <tr key={length} className="border-t border-primary/10">
                  <th scope="row" className="px-3 sm:px-6 py-4 font-semibold text-charcoal whitespace-nowrap">{length}</th>
                  <td className="px-3 sm:px-6 py-4">{casual}</td>
                  <td className="px-3 sm:px-6 py-4">{fiveWeek}</td>
                  <td className="px-3 sm:px-6 py-4">{tenWeek}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <p className="mt-4 text-sm text-charcoal/65 leading-relaxed">
          Casual is for 1 to 4 lessons. 5 and 10 week packages are paid upfront.
        </p>
      </div>
    </section>
  );
}
