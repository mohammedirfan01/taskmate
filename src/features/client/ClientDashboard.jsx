import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

export default function ClientDashboard() {
  const { user } = useAuth();

  return (
    <section className="py-12">
      <div className="max-w-4xl mx-auto px-4">
        <h1 className="text-3xl font-bold mb-4">Client Dashboard</h1>

        <p className="text-slate-700 mb-6">
          Welcome back, <span className="font-semibold">{user?.fullName}</span>
        </p>

        <div className="grid gap-6 md:grid-cols-2">
          <div className="p-6 border rounded-lg shadow-sm">
            <h2 className="text-xl font-semibold mb-2">Browse Services</h2>
            <p className="text-slate-600 mb-4">
              Find trusted professionals for any job.
            </p>
            <Link
              to="/providers"
              className="text-sky-600 font-medium hover:underline"
            >
              Explore Providers →
            </Link>
          </div>

          <div className="p-6 border rounded-lg shadow-sm">
            <h2 className="text-xl font-semibold mb-2">Your Bookings</h2>
            <p className="text-slate-600 mb-4">
              View and manage your upcoming service bookings.
            </p>
            <Link
              to="/client/bookings"
              className="text-sky-600 hover:underline"
            >
              View My Bookings →
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
