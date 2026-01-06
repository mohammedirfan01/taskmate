import { Navigate, useNavigate } from "react-router-dom";
const ForClients = () => {
  const navigate = useNavigate();
  return (
    <section id="forClients" className="max-w-6xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-4">Why Choose ServiceHub?</h1>
      <p className="text-slate-600 mb-8">
        ServiceHub connects Australians with trusted, verified professionals
        across every major city.
      </p>

      <div className="grid gap-6 md:grid-cols-3">
        <div className="bg-white p-6 rounded-xl shadow-sm border">
          <h3 className="font-semibold mb-2">Trusted Professionals</h3>
          <p className="text-sm text-slate-600">
            All providers are vetted, reviewed, and meet Australian service
            standards.
          </p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border">
          <h3 className="font-semibold mb-2">Transparent Pricing</h3>
          <p className="text-sm text-slate-600">
            No hidden fees. Clear quotes in AUD before you book.
          </p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border">
          <h3 className="font-semibold mb-2">Verified Reviews</h3>
          <p className="text-sm text-slate-600">
            Real feedback from customers across Australia.
          </p>
        </div>
      </div>

      <div className="text-center mt-12">
        <button
          className="px-6 py-3 bg-sky-600 text-white rounded-md hover:bg-sky-700"
          onClick={() => navigate("/signin")}
        >
          Book Your Service Now
        </button>
      </div>
    </section>
  );
};

export default ForClients;
