import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";

const serviceCategories = [
  "Cleaning",
  "Plumbing",
  "Electrical",
  "Gardening",
  "Handyman",
  "Painting",
  "Carpentry",
  "Removalist",
];

export default function SignUp() {
  const [role, setRole] = useState("client");

  // Shared fields
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [phone, setPhone] = useState("");

  // Client fields
  const [fullName, setFullName] = useState("");
  const [clientSuburb, setClientSuburb] = useState("");

  // Partner fields
  const [businessName, setBusinessName] = useState("");
  const [serviceCategory, setServiceCategory] = useState("");
  const [serviceDescription, setServiceDescription] = useState("");
  const [partnerSuburb, setPartnerSuburb] = useState("");

  const [isSubmitting, setIsSubmitting] = useState(false);

  const { signup } = useAuth();
  const navigate = useNavigate();

  // Validation functions
  const validateEmail = (email) => /\S+@\S+\.\S+/.test(email);

  const validatePhone = (phone) =>
    /^(\+61|0)[0-9]{8,9}$/.test(phone.replace(/\s+/g, ""));

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("FORM SUBMITTED");
    console.log("ROLE:", role);
    console.log("EMAIL:", email);

    // Validation
    if (!validateEmail(email)) {
      toast.error("Please enter a valid email address.");
      return;
    }

    if (!validatePhone(phone)) {
      toast.error("Please enter a valid Australian phone number.");
      return;
    }

    if (password.length < 6) {
      toast.error("Password must be at least 6 characters.");
      return;
    }

    if (password !== confirmPassword) {
      toast.error("Passwords do not match.");
      return;
    }

    //  PAYLOAD CONSTRUCTION
    const payload =
      role === "client"
        ? {
            role,
            email,
            password,
            phone,
            fullName,
            suburb: clientSuburb,
          }
        : {
            role,
            email,
            password,
            phone,
            businessName,
            serviceCategory,
            serviceDescription,
            suburb: partnerSuburb,
          };

    try {
      setIsSubmitting(true);
      console.log("PAYLOAD BEING SENT:", payload);
      await signup(payload);

      toast.success("Account created!");

      navigate(role === "partner" ? "/partners" : "/clients");
    } catch (err) {
      toast.error(err.message || "Failed to sign up");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="py-12">
      <div className="max-w-md mx-auto px-4">
        <h2 className="text-2xl font-bold mb-6">Create your account</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Role selection */}
          <select
            className="w-full px-4 py-2 border rounded-md"
            value={role}
            onChange={(e) => setRole(e.target.value)}
          >
            <option value="client">Client</option>
            <option value="partner">Partner</option>
          </select>

          {/* Shared fields */}
          <input
            type="email"
            placeholder="Email"
            className="w-full px-4 py-2 border rounded-md"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <input
            type="password"
            placeholder="Password (min 6 chars)"
            className="w-full px-4 py-2 border rounded-md"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <input
            type="password"
            placeholder="Confirm password"
            className="w-full px-4 py-2 border rounded-md"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />

          <input
            type="text"
            placeholder="Phone (e.g. 0412 345 678)"
            className="w-full px-4 py-2 border rounded-md"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            required
          />

          {/* Client fields */}
          {role === "client" && (
            <>
              <input
                type="text"
                placeholder="Full name"
                className="w-full px-4 py-2 border rounded-md"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                required
              />

              <input
                type="text"
                placeholder="Suburb"
                className="w-full px-4 py-2 border rounded-md"
                value={clientSuburb}
                onChange={(e) => setClientSuburb(e.target.value)}
                required
              />
            </>
          )}

          {/* Partner fields */}
          {role === "partner" && (
            <>
              <input
                type="text"
                placeholder="Business name"
                className="w-full px-4 py-2 border rounded-md"
                value={businessName}
                onChange={(e) => setBusinessName(e.target.value)}
                required
              />

              <select
                className="w-full px-4 py-2 border rounded-md"
                value={serviceCategory}
                onChange={(e) => setServiceCategory(e.target.value)}
                required
              >
                <option value="">Select service category</option>
                {serviceCategories.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>

              <textarea
                placeholder="Describe your service"
                className="w-full px-4 py-2 border rounded-md"
                rows="3"
                value={serviceDescription}
                onChange={(e) => setServiceDescription(e.target.value)}
                required
              />

              <input
                type="text"
                placeholder="Service suburb"
                className="w-full px-4 py-2 border rounded-md"
                value={partnerSuburb}
                onChange={(e) => setPartnerSuburb(e.target.value)}
                required
              />
            </>
          )}

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-sky-600 text-white py-2 rounded-md hover:bg-sky-700 disabled:opacity-60"
          >
            {isSubmitting ? "Creating account..." : "Create account"}
          </button>
        </form>

        <p className="mt-4 text-sm text-slate-600">
          Already have an account?{" "}
          <Link to="/signin" className="text-sky-600 hover:underline">
            Sign in
          </Link>
        </p>
      </div>
    </section>
  );
}
