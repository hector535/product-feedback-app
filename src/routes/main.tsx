import React from "react";
import { Navigate, Outlet, RouteObject } from "react-router-dom";
import { QueryErrorResetBoundary } from "@tanstack/react-query";
import { ErrorBoundary } from "react-error-boundary";
import { ErrorView } from "@/components";

const HomePage = React.lazy(() => import("@/pages/Home"));
const EditFeedbackPage = React.lazy(() => import("@/pages/EditFeedback"));
const NewFeedbackPage = React.lazy(() => import("@/pages/NewFeedback"));
const FeedbackDetailsPage = React.lazy(() => import("@/pages/FeedbackDetails"));
const RoadmapPage = React.lazy(() => import("@/pages/Roadmap"));

export const mainRoutes: RouteObject[] = [
  {
    element: (
      <QueryErrorResetBoundary>
        {({ reset }) => (
          <ErrorBoundary onReset={reset} FallbackComponent={ErrorView}>
            <Outlet />
          </ErrorBoundary>
        )}
      </QueryErrorResetBoundary>
    ),
    children: [
      {
        path: "/",
        element: <HomePage />,
      },
      {
        path: "/feedback",
        element: <NewFeedbackPage />,
      },
      {
        path: "/feedback/:id",
        element: <EditFeedbackPage />,
      },
      {
        path: "/feedback/details/:id",
        element: <FeedbackDetailsPage />,
      },
      {
        path: "/feedback/details/:id/comments/:commentId",
        element: <FeedbackDetailsPage />,
      },
      {
        path: "/roadmap",
        element: <RoadmapPage />,
      },
      {
        path: "/*",
        element: <Navigate to="/" />,
      },
    ],
  },
];
