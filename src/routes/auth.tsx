import React from "react";
import { RouteObject, Navigate } from "react-router-dom";

const SignInPage = React.lazy(() => import("@/pages/SignIn"));
const SignUpPage = React.lazy(() => import("@/pages/SignUp"));
const ForgotPasswordPage = React.lazy(() => import("@/pages/ForgotPassword"));
const ResetPasswordPage = React.lazy(() => import("@/pages/ResetPassword"));
const EmailActivationPage = React.lazy(() => import("@/pages/EmailActivation"));

export const authRoutes: RouteObject[] = [
  {
    path: "/auth/signin",
    element: <SignInPage />,
  },
  {
    path: "/auth/signup",
    element: <SignUpPage />,
  },
  {
    path: "/auth/forgot-password",
    element: <ForgotPasswordPage />,
  },
  {
    path: "/auth/reset-password/",
    element: <ResetPasswordPage />,
  },
  {
    path: "/auth/email-activation/",
    element: <EmailActivationPage />,
  },
  {
    path: "/*",
    element: <Navigate to="/auth/signin" />,
  },
];
