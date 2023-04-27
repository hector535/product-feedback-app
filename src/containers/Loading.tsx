import { LoadingSpinner } from "@/components";

export const Loading = () => (
  <div className="grid h-screen place-content-center justify-items-center gap-6 text-center">
    <h1 className="text-4xl font-bold">Loading</h1>
    <LoadingSpinner className="h-11 w-11 border-8" />
  </div>
);
