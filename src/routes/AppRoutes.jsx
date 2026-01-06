import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Suspense, lazy } from "react";
import { AppProvider } from "../context/AppContext";
import ProtectedRoute from "../routes/ProtectedRoute";

import AppLayout from "../components/layout/AppLayout";
import DashboardLayout from "../components/layout/DashboardLayout";

const Home = lazy(() => import("../pages/Home"));
const ForClients = lazy(() => import("../components/home/ForClients"));
const ForPartners = lazy(() => import("../components/home/Forpartners"));
const Contact = lazy(() => import("../pages/Contact"));
const Providers = lazy(() => import("../features/services/Providers"));
const SignIn = lazy(() => import("../features/auth/SignIn"));
const ResetPassword = lazy(() => import("../pages/ResetPassword"));
const SignUp = lazy(() => import("../features/auth/SignUp"));
const ClientDashboard = lazy(() =>
  import("../features/client/ClientDashboard")
);
const PartnerDashboard = lazy(() =>
  import("../features/partner/PartnerDashboard")
);
const Profile = lazy(() => import("../pages/Profile"));
const PartnerServices = lazy(() =>
  import("../features/partner/PartnerServices")
);
const PartnerProfile = lazy(() => import("../features/partner/PartnerProfile"));
const ServiceDiscovery = lazy(() =>
  import("../features/services/ServiceDiscovery")
);
const BookingForm = lazy(() => import("../features/services/BookingForm"));
const PartnerBookings = lazy(() =>
  import("../features/partner/PartnerBookings")
);
const ClientBookings = lazy(() => import("../features/client/ClientBookings"));
function App() {
  return (
    <AppProvider>
      <Router>
        <Suspense
          fallback={
            <div className="flex items-center justify-center min-h-screen">
              Loading...
            </div>
          }
        >
          <Routes>
            <Route element={<AppLayout />}>
              <Route path="/" element={<Home />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/providers" element={<Providers />} />
              <Route path="/services" element={<ServiceDiscovery />} />
              <Route path="/signin" element={<SignIn />} />
              <Route path="/signup" element={<SignUp />} />
              <Route path="/reset-password" element={<ResetPassword />} />
              <Route path="/forClients" element={<ForClients />} />
              <Route path="/forPartners" element={<ForPartners />} />
              <Route path="/partner/:id" element={<PartnerProfile />} />
            </Route>

            <Route
              element={
                <ProtectedRoute>
                  <DashboardLayout />
                </ProtectedRoute>
              }
            >
              <Route path="/profile" element={<Profile />} />
              <Route
                path="/partner/services"
                element={
                  <ProtectedRoute role="partner">
                    <PartnerServices />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/partner/bookings"
                element={
                  <ProtectedRoute role="partner">
                    <PartnerBookings />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/client/bookings"
                element={
                  <ProtectedRoute role="client">
                    <ClientBookings />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/book/:partnerId"
                element={
                  <ProtectedRoute role="client">
                    <BookingForm />
                  </ProtectedRoute>
                }
              />

              <Route path="/clients" element={<ClientDashboard />} />
              <Route path="/partners" element={<PartnerDashboard />} />
            </Route>
          </Routes>
        </Suspense>
      </Router>
    </AppProvider>
  );
}

export default App;
