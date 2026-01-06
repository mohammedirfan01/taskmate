import { useEffect, useState } from "react";
import { api } from "../../api/client";
import { useAuth } from "../../context/AuthContext";

export default function PartnerBookings() {
  const { user } = useAuth();
  const [bookings, setBookings] = useState([]);
  const [clients, setClients] = useState([]);

  useEffect(() => {
    if (!user) return;

    // Load bookings for this partner
    api.get(`/partner/bookings/${user.id}`).then((res) => {
      setBookings(res.bookings || []);
    });

    // Load all users to map client names
    const allUsers = JSON.parse(localStorage.getItem("taskmate_users")) || [];
    setClients(allUsers);
  }, [user]);

  const getClient = (clientId) =>
    clients.find((c) => String(c.id) === String(clientId));

  const updateStatus = async (bookingId, status) => {
    const updated = await api.patch(`/bookings/${bookingId}`, { status });

    setBookings((prev) => prev.map((b) => (b.id === updated.id ? updated : b)));
  };

  return (
    <section className="py-12">
      <div className="max-w-4xl mx-auto px-4 space-y-8">
        <h1 className="text-3xl font-bold">Incoming Bookings</h1>

        {bookings.length === 0 && (
          <p className="text-slate-600">No bookings yet.</p>
        )}

        <div className="space-y-6">
          {bookings.map((booking) => {
            const client = getClient(booking.clientId);

            return (
              <div
                key={booking.id}
                className="border rounded-lg p-6 shadow-sm bg-white"
              >
                <div className="flex justify-between items-start">
                  <div>
                    <h2 className="text-xl font-semibold">
                      {client?.fullName || "Client"}
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

                {booking.status === "pending" && (
                  <div className="flex gap-4 mt-4">
                    <button
                      onClick={() => updateStatus(booking.id, "accepted")}
                      className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700"
                    >
                      Accept
                    </button>

                    <button
                      onClick={() => updateStatus(booking.id, "declined")}
                      className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700"
                    >
                      Decline
                    </button>
                  </div>
                )}
                {booking.status === "accepted" && (
                  <button
                    onClick={() => updateStatus(booking.id, "completed")}
                    className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
                  >
                    Mark as Completed
                  </button>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
