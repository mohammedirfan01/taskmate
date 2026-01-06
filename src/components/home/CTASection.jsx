import { Link } from "react-router-dom";

const CTASection = () => {
  return (
    <section className="py-12">
      <div className="max-w-5xl mx-auto px-4">
        <div className="bg-gradient-to-r from-sky-600 to-emerald-500 rounded-2xl px-6 py-10 text-center text-white">
          <h2 className="text-2xl md:text-3xl font-semibold mb-3">
            Join thousands of happy customers today!
          </h2>
          <p className="mb-6 text-sky-50">
            Book a trusted professional in minutes or grow your business with
            ServiceHub.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              to="forClients"
              className="px-6 py-3 bg-white text-sky-700 rounded-md font-medium hover:bg-sky-50"
            >
              Find a Service
            </Link>
            <Link
              to="/forPartners"
              className="px-6 py-3 border border-white rounded-md font-medium hover:bg-white/10"
            >
              Become a Partner
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
