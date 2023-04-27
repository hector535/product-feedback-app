import React from "react";
import ReactDOM from "react-dom/client";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "@/lib/react-query/client";
import { Loading } from "@/containers";
import App from "./App";

import "./index.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <React.Suspense fallback={<Loading />}>
        <App />
      </React.Suspense>
    </QueryClientProvider>
  </React.StrictMode>
);
