const steps = [
  {
    title: "Browse & select",
    description: "Choose a category and tell us what you need.",
    step: 1,
  },
  {
    title: "Compare & choose",
    description: "View profiles, ratings, and reviews to pick your expert.",
    step: 2,
  },
  {
    title: "Book & schedule",
    description: "Book instantly or pick a time that suits you.",
    step: 3,
  },
  {
    title: "Pay securely",
    description: "Pay online with secure checkout and service guarantee.",
    step: 4,
  },
];

const HowItWorks = () => {
  return (
    <section id="how-it-works" className="py-12 bg-slate-50">
      <div className="max-w-6xl mx-auto px-4 text-center md:text-left">
        <h2 className="text-2xl font-bold text-slate-900 mb-2">How It Works</h2>
        <p className="text-slate-600 mb-6">
          Booking trusted professionals takes just a few simple steps.
        </p>
        <div className="grid gap-4 md:grid-cols-4">
          {steps.map((s) => (
            <div
              key={s.step}
              className="bg-white rounded-xl p-4 shadow-sm border border-slate-100 text-center md:text-left flex md:block flex-col items-center "
            >
              <p className="flex items-center justify-center w-8 h-8 rounded-full bg-sky-100 text-sky-700 font-semibold mb-3">
                {s.step}
              </p>
              <h3 className="font-semibold text-slate-900 mb-1">{s.title}</h3>
              <p className="text-sm text-slate-500">{s.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
