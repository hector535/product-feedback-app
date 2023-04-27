import { FallbackProps } from "react-error-boundary";
import { Button } from "@/components";

export const ErrorView = ({ resetErrorBoundary }: FallbackProps) => {
  return (
    <main className="grid h-screen content-center font-sans">
      <div className="auth-container container-shadow">
        <div className="grid justify-items-center gap-5">
          <h1 className="text-gray-650 text-3xl font-bold">Error</h1>
          <img
            className="w-20 md:w-[6.5rem]"
            src="/img/icon-error.svg"
            alt=""
          />
          <p className="text-center">
            Something went wrong.{" "}
            <strong>
              {" "}
              Please use the following button to refresh the page.{" "}
            </strong>
            If the error still persists, contact the administrator for further
            assistance.
          </p>
          <Button color="blue" onClick={() => resetErrorBoundary()}>
            Refresh
          </Button>
        </div>
      </div>
    </main>
  );
};
