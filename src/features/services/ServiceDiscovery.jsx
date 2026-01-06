import { useEffect, useState } from "react";
import { api } from "../../api/client";
import { Link } from "react-router-dom";

export default function ServiceDiscovery() {
  const [partners, setPartners] = useState([]);
  const [filtered, setFiltered] = useState([]);

  const [category, setCategory] = useState("");
  const [suburb, setSuburb] = useState("");

  useEffect(() => {
    // Load all users and filter partners
    api.get("/auth/me").catch(() => {});

    const users = JSON.parse(localStorage.getItem("taskmate_users")) || [];
    const partnerList = users.filter((u) => u.role === "partner");

    setPartners(partnerList);
    setFiltered(partnerList);
  }, []);

  const handleFilter = () => {
    let list = partners;

    if (category) {
      list = list.filter((p) => p.serviceCategory === category);
    }

    if (suburb) {
      list = list.filter((p) =>
        p.suburb.toLowerCase().includes(suburb.toLowerCase())
      );
    }

    setFiltered(list);
  };

  useEffect(() => {
    handleFilter();
  }, [category, suburb]);

  return (
    <section className="py-12">
      <div className="max-w-5xl mx-auto px-4 space-y-8">
        <h1 className="text-3xl font-bold">Find a Service Provider</h1>

        {/* Filters */}
        <div className="flex flex-col md:flex-row gap-4">
          <select
            className="px-4 py-2 border rounded-md"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="">All Categories</option>
            <option value="Cleaning">Cleaning</option>
            <option value="Plumbing">Plumbing</option>
            <option value="Electrical">Electrical</option>
            <option value="Gardening">Gardening</option>
            <option value="Handyman">Handyman</option>
            <option value="Painting">Painting</option>
            <option value="Carpentry">Carpentry</option>
            <option value="Removalist">Removalist</option>
          </select>

          <input
            type="text"
            placeholder="Search by suburb"
            className="px-4 py-2 border rounded-md flex-1"
            value={suburb}
            onChange={(e) => setSuburb(e.target.value)}
          />
        </div>

        {/* Partner List */}
        <div className="grid md:grid-cols-2 gap-6">
          {filtered.length === 0 && (
            <p className="text-slate-600">No providers found.</p>
          )}

          {filtered.map((partner) => (
            <div
              key={partner.id}
              className="border rounded-lg p-4 shadow-sm hover:shadow-md transition"
            >
              <h2 className="text-xl font-semibold">{partner.businessName}</h2>
              <p className="text-slate-600">{partner.serviceCategory}</p>
              <p className="text-sm text-slate-500 mt-1">
                {partner.serviceDescription}
              </p>
              <p className="text-sm text-slate-500 mt-1">
                Suburb: {partner.suburb}
              </p>

              <Link
                to={`/partner/${partner.id}`}
                className="inline-block mt-4 text-sky-600 hover:underline"
              >
                View Profile →
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
