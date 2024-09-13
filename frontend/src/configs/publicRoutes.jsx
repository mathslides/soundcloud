import React from "react";

export const publicRoutes = [
  {
    key: "login",
    path: "/login",
    component: React.lazy(() =>
      import("../components/LoginFormModal/LoginForm.jsx")
    ),
    loaded: false,
    layout: "public",
  },
  {
    key: "home",
    path: "/",
    component: React.lazy(() => import("../components/Splash/index.jsx")),
    loaded: true,
    layout: "public",
  },
  {
    key: "register",
    path: "/register",
    component: React.lazy(() =>
      import("../components/SignupFormModal/SignupForm.jsx")
    ),
    loaded: false,
    layout: "public",
  },
  {
    key: "verificationpage",
    path: "/verificationpage",
    component: React.lazy(() =>
      import("../components/SignupFormModal/VerificationPage.jsx")
    ),
    layout: "public",
  },
  {
    key: "aboutUs",
    path: "/aboutUs",
    component: React.lazy(() => import("../components/views/AboutUs.jsx")),
    layout: "public",
  },
];
