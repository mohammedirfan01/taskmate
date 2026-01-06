import { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";

export default function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [remember, setRemember] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { user, login } = useAuth();
  const navigate = useNavigate();

  const MAX_ATTEMPTS = 5;
  const LOCKOUT_TIME = 60 * 1000;

  useEffect(() => {
    if (user) {
      navigate(user.role === "partner" ? "/partners" : "/clients");
    }

    const savedEmail = localStorage.getItem("taskmate_remember_email");
    if (savedEmail) {
      setEmail(savedEmail);
      setRemember(true);
    }
  }, [user, navigate]);

  const validateEmail = (email) => /\S+@\S+\.\S+/.test(email);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const lockout = JSON.parse(localStorage.getItem("taskmate_lockout"));
    if (lockout && Date.now() < lockout) {
      const seconds = Math.ceil((lockout - Date.now()) / 1000);
      toast.error(`Too many attempts. Try again in ${seconds}s`);
      return;
    }

    if (!validateEmail(email)) {
      toast.error("Invalid email format");
      return;
    }

    if (!password) {
      toast.error("Password is required");
      return;
    }

    try {
      setIsSubmitting(true);

      // LOGIN STRUCTURE
      const loggedInUser = await login(email, password);

      toast.success("Welcome back!");

      // Reset rate limiting
      localStorage.removeItem("taskmate_attempts");
      localStorage.removeItem("taskmate_lockout");

      // Remember me
      if (remember) {
        localStorage.setItem("taskmate_remember_email", email);
      } else {
        localStorage.removeItem("taskmate_remember_email");
      }

      // Redirect based on role
      navigate(loggedInUser.role === "partner" ? "/partners" : "/clients");
    } catch (err) {
      // Track failed attempts
      const attempts =
        JSON.parse(localStorage.getItem("taskmate_attempts")) || 0;
      const newAttempts = attempts + 1;

      localStorage.setItem("taskmate_attempts", newAttempts);

      if (newAttempts >= MAX_ATTEMPTS) {
        localStorage.setItem(
          "taskmate_lockout",
          JSON.stringify(Date.now() + LOCKOUT_TIME)
        );
        localStorage.removeItem("taskmate_attempts");
        toast.error("Too many attempts. Locked for 1 minute");
      } else {
        toast.error(
          `${
            err.message || "Invalid email or password"
          } (${newAttempts}/${MAX_ATTEMPTS})`
        );
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleGoogleLogin = () => {
    toast("Google login coming soon!");
  };

  return (
    <section className="py-12">
      <div className="max-w-md mx-auto px-4">
        <h2 className="text-2xl font-bold text-slate-900 mb-6">Sign in</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="email"
            placeholder="Email"
            className="w-full px-4 py-2 border border-slate-300 rounded-md"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              className="w-full px-4 py-2 border border-slate-300 rounded-md"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />

            <button
              type="button"
              className="absolute right-3 top-2 text-sm text-slate-600"
              onClick={() => setShowPassword((prev) => !prev)}
            >
              {showPassword ? "Hide" : "Show"}
            </button>
          </div>

          <div className="flex items-center justify-between text-sm">
            <label className="flex items-center gap-2 text-slate-700">
              <input
                type="checkbox"
                checked={remember}
                onChange={(e) => setRemember(e.target.checked)}
              />
              Remember me
            </label>

            <a href="/reset-password" className="text-sky-600 hover:underline">
              Forgot password?
            </a>
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-sky-600 text-white py-2 rounded-md hover:bg-sky-700 disabled:opacity-60"
          >
            {isSubmitting ? "Signing in..." : "Sign in"}
          </button>

          <button
            type="button"
            onClick={handleGoogleLogin}
            className="w-full border border-slate-300 py-2 rounded-md flex items-center justify-center gap-2 hover:bg-slate-100"
          >
            <img
              src="https://www.svgrepo.com/show/475656/google-color.svg"
              className="w-5 h-5"
              alt="Google logo"
            />
            Sign in with Google
          </button>
        </form>

        <p className="mt-4 text-sm text-slate-600">
          Don’t have an account?{" "}
          <Link to="/signup" className="text-sky-600 hover:underline">
            Sign up
          </Link>
        </p>
      </div>
    </section>
  );
}
