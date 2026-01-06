import { useAuth } from "../context/AuthContext";

export default function Profile() {
  const { user } = useAuth();

  if (!user) {
    return (
      <section className="py-12">
        <div className="max-w-md mx-auto px-4">
          <p>You must be logged in to view this page.</p>
        </div>
      </section>
    );
  }

  const isPartner = user.role === "partner";

  return (
    <section className="py-12">
      <div className="max-w-2xl mx-auto px-4 space-y-6">
        <h1 className="text-3xl font-bold mb-4">Your Profile</h1>

        <div className="p-4 border rounded-lg space-y-2">
          <p className="text-sm text-slate-500 uppercase tracking-wide">
            Account
          </p>
          <p>
            <span className="font-semibold">Role:</span> {user.role}
          </p>
          <p>
            <span className="font-semibold">Email:</span> {user.email}
          </p>
          <p>
            <span className="font-semibold">Phone:</span> {user.phone}
          </p>
          <p>
            <span className="font-semibold">Suburb:</span> {user.suburb}
          </p>
        </div>

        {isPartner ? (
          <div className="p-4 border rounded-lg space-y-2">
            <p className="text-sm text-slate-500 uppercase tracking-wide">
              Business
            </p>
            <p>
              <span className="font-semibold">Business Name:</span>{" "}
              {user.businessName}
            </p>
            <p>
              <span className="font-semibold">Category:</span>{" "}
              {user.serviceCategory}
            </p>
            <p>
              <span className="font-semibold">Description:</span>{" "}
              {user.serviceDescription}
            </p>
          </div>
        ) : (
          <div className="p-4 border rounded-lg space-y-2">
            <p className="text-sm text-slate-500 uppercase tracking-wide">
              Client
            </p>
            <p>
              <span className="font-semibold">Name:</span> {user.fullName}
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
