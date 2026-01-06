import { useNavigate } from "react-router-dom";
import HeroIllustration from "../home/HeroIllustration ";

const Hero = () => {
  const navigate = useNavigate();
  return (
    <section
      id="hero"
      className="bg-gradient-to-br from-sky-50 via-white to-emerald-50 py-16"
    >
      <div className="max-w-6xl mx-auto px-4 grid gap-10 md:grid-cols-2 items-center">
        <div className="text-center md:text-left">
          <h1 className=" text-3xl md:text-5xl font-bold text-slate-900 mb-4">
            Find Trusted Experts for Every Job
          </h1>
          <p className="text-slate-600 mb-6">
            From cleaning and repairs to smart home installations, book verified
            professionals in minutes.
          </p>
          <div className="flex flex-wrap gap-3 justify-center md:justify-start">
            <button
              className="px-5 py-3 bg-sky-600 text-white rounded-md hover:bg-sky-700 hover:-translate-y-1 transition-all duration-300"
              onClick={() => navigate("/forClients")}
            >
              Get Started
            </button>
            <button
              className="px-5 py-3 border border-sky-600 text-sky-700 rounded-md hover:bg-sky-50 hover:-translate-y-1 transition-all duration-300"
              onClick={() => navigate("/forPartners")}
            >
              Become a Partner
            </button>
          </div>
        </div>
        <div className="hidden md:block">
          <HeroIllustration />
        </div>
      </div>
    </section>
  );
};

export default Hero;
