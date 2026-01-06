import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

export default function PartnerProfile() {
  const { id } = useParams();

  const [partner, setPartner] = useState(null);
  const [services, setServices] = useState([]);

  useEffect(() => {
    // Load all users
    const users = JSON.parse(localStorage.getItem("taskmate_users")) || [];
    const found = users.find((u) => String(u.id) === String(id));

    setPartner(found || null);

    // Load services for this partner
    const allServices =
      JSON.parse(localStorage.getItem("taskmate_services")) || [];

    const partnerServices = allServices.filter(
      (s) => String(s.partnerId) === String(id)
    );

    setServices(partnerServices);
  }, [id]);

  if (!partner) {
    return (
      <section className="py-12">
        <div className="max-w-3xl mx-auto px-4">
          <p className="text-slate-600">Partner not found.</p>
        </div>
      </section>
    );
  }

  return (
    <section className="py-12">
      <div className="max-w-3xl mx-auto px-4 space-y-8">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold">{partner.businessName}</h1>
          <p className="text-slate-600">{partner.serviceCategory}</p>
          <p className="text-slate-500 mt-2">{partner.serviceDescription}</p>
          <p className="text-slate-500 mt-1">Suburb: {partner.suburb}</p>
        </div>

        {/* Services */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold">Services Offered</h2>

          {services.length === 0 && (
            <p className="text-slate-600">
              This provider has not added services yet.
            </p>
          )}

          {services.map((service) => (
            <div key={service.id} className="border rounded-lg p-4 shadow-sm">
              <h3 className="text-lg font-semibold">{service.title}</h3>
              <p className="text-slate-600">From ${service.priceFrom}</p>
              <p className="text-sm text-slate-500 mt-1">
                {service.description}
              </p>
            </div>
          ))}
        </div>

        {/* Book Now */}
        <div>
          <Link
            to={`/book/${partner.id}`}
            className="inline-block bg-sky-600 text-white px-6 py-3 rounded-md hover:bg-sky-700 transition"
          >
            Book Now
          </Link>
        </div>
      </div>
    </section>
  );
}
