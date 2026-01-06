import { lazy } from "react";

export const Home = lazy(() => import("./pages/Home"));
export const SignIn = lazy(() => import("./features/auth/SignIn"));
export const SignUp = lazy(() => import("./features/auth/SignUp"));
export const ClientDashboard = lazy(() =>
  import("./features/client/ClientDashboard")
);
export const PartnerDashboard = lazy(() =>
  import("./features/partner/PartnerDashboard")
);
