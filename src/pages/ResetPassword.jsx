import { useState } from "react";
import toast from "react-hot-toast";

export default function ResetPassword() {
  const [email, setEmail] = useState("");

  const handleReset = (e) => {
    e.preventDefault();

    const users = JSON.parse(localStorage.getItem("taskmate_users")) || [];
    const user = users.find((u) => u.email === email);

    if (!user) {
      toast.error("No account found with that email");
      return;
    }

    toast.success("Password reset link sent (simulated)");
  };

  return (
    <section className="py-12">
      <div className="max-w-md mx-auto px-4">
        <h2 className="text-2xl font-bold mb-6">Reset Password</h2>

        <form onSubmit={handleReset} className="space-y-4">
          <input
            type="email"
            placeholder="Enter your email"
            className="w-full px-4 py-2 border rounded-md"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <button className="w-full bg-sky-600 text-white py-2 rounded-md">
            Send Reset Link
          </button>
        </form>
      </div>
    </section>
  );
}
