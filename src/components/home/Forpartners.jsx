import { Link } from "react-router-dom";

const ForPartners = () => {
  return (
    <section className="max-w-6xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-4">
        Grow Your Business with ServiceHub
      </h1>
      <p className="text-slate-600 mb-8">
        Join thousands of Australian service providers reaching new customers
        every day.
      </p>

      <div className="grid gap-6 md:grid-cols-3">
        <div className="bg-white p-6 rounded-xl shadow-sm border">
          <h3 className="font-semibold mb-2">Reach More Clients</h3>
          <p className="text-sm text-slate-600">
            Get discovered by customers across Australia looking for your
            expertise.
          </p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border">
          <h3 className="font-semibold mb-2">Secure Payments</h3>
          <p className="text-sm text-slate-600">
            Fast, reliable payouts directly to your Australian bank account.
          </p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border">
          <h3 className="font-semibold mb-2">Easy Scheduling</h3>
          <p className="text-sm text-slate-600">
            Manage bookings, availability, and customer messages in one place.
          </p>
        </div>
      </div>

      <div className="text-center mt-12">
        <Link
          to="/signup"
          className="px-6 py-3 bg-sky-600 text-white rounded-md hover:bg-sky-700"
        >
          Sign Up
        </Link>
      </div>
    </section>
  );
};

export default ForPartners;
