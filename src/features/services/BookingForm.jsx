import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { api } from "../../api/client";
import { useAuth } from "../../context/AuthContext";

export default function BookingForm() {
  const { partnerId } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();

  const [partner, setPartner] = useState(null);

  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [address, setAddress] = useState("");
  const [notes, setNotes] = useState("");

  useEffect(() => {
    const users = JSON.parse(localStorage.getItem("taskmate_users")) || [];
    const found = users.find((u) => String(u.id) === String(partnerId));
    setPartner(found || null);
  }, [partnerId]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!date || !time || !address) {
      alert("Please fill all required fields");
      return;
    }

    await api.post("/bookings", {
      clientId: user.id,
      partnerId,
      date,
      time,
      address,
      notes,
    });

    alert("Booking submitted successfully!");
    navigate("/client/bookings");
  };

  if (!partner) {
    return (
      <section className="py-12">
        <div className="max-w-3xl mx-auto px-4">
          <p className="text-slate-600">Loading partner...</p>
        </div>
      </section>
    );
  }
  if (!user) {
    return (
      <div className="p-8 text-center">
        <p className="text-slate-600">
          You must be logged in to book a service.
        </p>
      </div>
    );
  }

  return (
    <section className="py-12">
      <div className="max-w-3xl mx-auto px-4 space-y-8">
        <h1 className="text-3xl font-bold">Book {partner.businessName}</h1>
        <p className="text-slate-600">{partner.serviceCategory}</p>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Date */}
          <div>
            <label className="block font-medium mb-1">Date *</label>
            <input
              type="date"
              className="w-full border px-4 py-2 rounded-md"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              required
            />
          </div>

          {/* Time */}
          <div>
            <label className="block font-medium mb-1">Time *</label>
            <input
              type="time"
              className="w-full border px-4 py-2 rounded-md"
              value={time}
              onChange={(e) => setTime(e.target.value)}
              required
            />
          </div>

          {/* Address */}
          <div>
            <label className="block font-medium mb-1">Address *</label>
            <input
              type="text"
              placeholder="Enter your address"
              className="w-full border px-4 py-2 rounded-md"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              required
            />
          </div>

          {/* Notes */}
          <div>
            <label className="block font-medium mb-1">Notes (optional)</label>
            <textarea
              placeholder="Describe the job or any special instructions"
              className="w-full border px-4 py-2 rounded-md"
              rows="4"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
            />
          </div>

          <button
            type="submit"
            className="bg-sky-600 text-white px-6 py-3 rounded-md hover:bg-sky-700 transition"
          >
            Submit Booking
          </button>
        </form>
      </div>
    </section>
  );
}
