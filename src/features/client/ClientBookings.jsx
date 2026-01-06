import { useEffect, useState } from "react";
import { api } from "../../api/client";
import { useAuth } from "../../context/AuthContext";

export default function ClientBookings() {
  const { user } = useAuth();
  const [bookings, setBookings] = useState([]);
  const [partners, setPartners] = useState([]);

  useEffect(() => {
    if (!user) return;

    // Load bookings for this client
    api.get(`/client/bookings/${user.id}`).then((res) => {
      setBookings(res.bookings || []);
    });

    // Load all users to map partner names
    const allUsers = JSON.parse(localStorage.getItem("taskmate_users")) || [];
    setPartners(allUsers);
  }, [user]);

  const getPartner = (partnerId) =>
    partners.find((p) => String(p.id) === String(partnerId));

  return (
    <section className="py-12">
      <div className="max-w-4xl mx-auto px-4 space-y-8">
        <h1 className="text-3xl font-bold">My Bookings</h1>

        {bookings.length === 0 && (
          <p className="text-slate-600">You have no bookings yet.</p>
        )}

        <div className="space-y-6">
          {bookings.map((booking) => {
            const partner = getPartner(booking.partnerId);

            return (
              <div
                key={booking.id}
                className="border rounded-lg p-6 shadow-sm bg-white"
              >
                <div className="flex justify-between items-start">
                  <div>
                    <h2 className="text-xl font-semibold">
                      {partner?.businessName || "Service Provider"}
                    </h2>
                    <p className="text-slate-600">
                      {booking.date} at {booking.time}
                    </p>
                    <p className="text-slate-600 mt-1">
                      Address: {booking.address}
                    </p>
                    {booking.notes && (
                      <p className="text-slate-500 mt-1">
                        Notes: {booking.notes}
                      </p>
                    )}
                  </div>

                  <span
                    className={`px-3 py-1 rounded-md text-sm font-medium ${
                      booking.status === "pending"
                        ? "bg-yellow-100 text-yellow-700"
                        : booking.status === "accepted"
                        ? "bg-green-100 text-green-700"
                        : booking.status === "declined"
                        ? "bg-red-100 text-red-700"
                        : "bg-slate-200 text-slate-700"
                    }`}
                  >
                    {booking.status}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
