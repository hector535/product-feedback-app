import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { authApi } from "@/api";
import { LoadingSpinner, Message } from "@/components";
import { AuthLayout } from "@/layout";

const EmailActivationPage = () => {
  const location = useLocation();
  const token = location.search.slice(3);

  const { isSuccess, isLoading, isError, mutate } = useMutation(
    authApi.activateEmail
  );

  useEffect(() => {
    mutate(token);
  }, []);

  return (
    <>
      {isSuccess && (
        <Message type="success">
          <p className="text-center">
            Your account has been successfully activated.
          </p>
        </Message>
      )}

      {isError && (
        <Message type="error">
          <p className="text-center">
            Something went wrong. Please try again later.
          </p>
        </Message>
      )}

      {isLoading && (
        <AuthLayout>
          <div className="grid justify-items-center gap-6 text-center">
            <h1 className="text-4xl font-bold">Loading</h1>
            <LoadingSpinner className="h-11 w-11 border-8" />
          </div>
        </AuthLayout>
      )}
    </>
  );
};

export default EmailActivationPage;
