import { useEffect, useState } from "react";
import { api } from "../../api/client";
import { useAuth } from "../../context/AuthContext";
import toast from "react-hot-toast";

export default function PartnerServices() {
  const { user } = useAuth();
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);

  const [title, setTitle] = useState("");
  const [priceFrom, setPriceFrom] = useState("");
  const [description, setDescription] = useState("");

  const isPartner = user?.role === "partner";

  useEffect(() => {
    if (!isPartner) {
      setLoading(false);
      return;
    }

    api
      .get("/partner/services")
      .then((data) => {
        setServices(data.services || []);
      })
      .catch((err) => {
        toast.error(err.message || "Failed to load services");
      })
      .finally(() => setLoading(false));
  }, [isPartner]);

  const handleAddService = async (e) => {
    e.preventDefault();

    try {
      const newService = await api.post("/partner/services", {
        title,
        priceFrom: Number(priceFrom),
        description,
      });

      setServices((prev) => [...prev, newService]);
      setTitle("");
      setPriceFrom("");
      setDescription("");
      toast.success("Service added");
    } catch (err) {
      toast.error(err.message || "Failed to add service");
    }
  };

  const handleDelete = async (id) => {
    try {
      await api.del(`/partner/services/${id}`);
      setServices((prev) => prev.filter((s) => s.id !== id));
      toast.success("Service removed");
    } catch (err) {
      toast.error(err.message || "Failed to remove service");
    }
  };

  if (!isPartner) {
    return (
      <section className="py-12">
        <div className="max-w-md mx-auto px-4">
          <p>Only partners can manage services.</p>
        </div>
      </section>
    );
  }

  return (
    <section className="py-12">
      <div className="max-w-4xl mx-auto px-4 space-y-8">
        <h1 className="text-3xl font-bold">Your Services</h1>

        {/* Add service form */}
        <form
          onSubmit={handleAddService}
          className="space-y-3 p-4 border rounded-lg"
        >
          <h2 className="text-lg font-semibold">Add a new service</h2>

          <input
            type="text"
            placeholder="Service title (e.g. End of lease cleaning)"
            className="w-full px-4 py-2 border rounded-md"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />

          <input
            type="number"
            placeholder="Price from ($)"
            className="w-full px-4 py-2 border rounded-md"
            value={priceFrom}
            onChange={(e) => setPriceFrom(e.target.value)}
            required
          />

          <textarea
            placeholder="Describe this service"
            className="w-full px-4 py-2 border rounded-md"
            rows="3"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />

          <button className="bg-sky-600 text-white px-4 py-2 rounded-md">
            Add Service
          </button>
        </form>

        {/* Services list */}
        {loading ? (
          <p>Loading services...</p>
        ) : services.length === 0 ? (
          <p className="text-slate-600">You haven’t added any services yet.</p>
        ) : (
          <div className="space-y-4">
            {services.map((service) => (
              <div
                key={service.id}
                className="p-4 border rounded-lg flex justify-between gap-4"
              >
                <div>
                  <h3 className="font-semibold">{service.title}</h3>
                  <p className="text-sm text-slate-600">
                    From ${service.priceFrom}
                  </p>
                  <p className="text-sm mt-1 text-slate-700">
                    {service.description}
                  </p>
                </div>
                <button
                  onClick={() => handleDelete(service.id)}
                  className="text-sm text-red-600 hover:underline"
                >
                  Delete
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
