import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

export default function PartnerDashboard() {
  const { user } = useAuth();

  return (
    <section className="py-12">
      <div className="max-w-4xl mx-auto px-4">
        <h1 className="text-3xl font-bold mb-4">Partner Dashboard</h1>

        <p className="text-slate-700 mb-6">
          Welcome back, <span className="font-semibold">{user?.email}</span>
        </p>

        <div className="grid gap-6 md:grid-cols-2">
          <div className="p-6 border rounded-lg shadow-sm">
            <h2 className="text-xl font-semibold mb-2">Your Jobs</h2>
            <p className="text-slate-600 mb-4">
              Manage your upcoming service requests.
            </p>
            <Link
              to="/partner/bookings"
              className="text-sky-600 hover:underline"
            >
              View Booking Requests →
            </Link>
          </div>

          <div className="p-6 border rounded-lg shadow-sm">
            <h2 className="text-xl font-semibold mb-2">Service Listings</h2>
            <p className="text-slate-600 mb-4">
              Add or update the services you offer.
            </p>
            <button className="text-sky-600 font-medium hover:underline">
              Coming Soon →
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
