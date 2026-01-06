import { providers } from "../../data/providers";

const Providers = () => {
  return (
    <section className="py-12">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-2xl font-bold text-slate-900 mb-4">
          Available Providers
        </h2>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 cursor-pointer">
          {providers.map((p) => (
            <div
              key={p.id}
              className="bg-white border border-slate-100 rounded-xl p-4 shadow-sm hover:shadow-md transition-shadow"
            >
              <h3 className="text-lg font-semibold text-sky-700 mb-1">
                {p.name}
              </h3>
              <p className="text-sm text-slate-500 mb-2">
                {p.category} · {p.city}
              </p>
              <p className="text-sm text-slate-600 mb-2">{p.description}</p>
              <div className="text-sm text-slate-400">⭐ {p.rating} / 5</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Providers;
