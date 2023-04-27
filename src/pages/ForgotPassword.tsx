import { Link } from "react-router-dom";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { Button, Form, Message } from "@/components";
import { ForgotPasswordForm } from "@/types";
import { authSchema } from "@/schemas";
import { authApi } from "@/api";
import { AuthLayout } from "@/layout";

const ForgotPasswordPage = () => {
  const { isSuccess, isLoading, isError, mutate } = useMutation(
    authApi.forgotPassword
  );

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ForgotPasswordForm>({
    defaultValues: {
      email: "",
    },
    resolver: zodResolver(authSchema.forgotPasswordForm),
  });

  const onSubmit: SubmitHandler<ForgotPasswordForm> = (data) => {
    mutate(data.email);
  };

  return (
    <>
      {isSuccess ? (
        <Message type="success">
          <p className="text-center">
            Instrucctions for resetting your password have been sent to the
            email address you submitted.
          </p>
        </Message>
      ) : (
        <AuthLayout title="Forgot your password">
          <Form className="grid gap-5" onSubmit={handleSubmit(onSubmit)}>
            <p>
              Pleae enter the email address you&apos;d like your password reset
              information sent to
            </p>

            <Form.Item
              label="Email address"
              name="email"
              errorMessage={errors.email?.message}
            >
              <input
                type="email"
                placeholder="name@email.com"
                className="auth-input"
                {...register("email")}
              />
            </Form.Item>

            {isError && (
              <p className="error-message">
                Something went wrong, please try again later.
              </p>
            )}

            <Button color="dark-blue" loading={isLoading} disabled={isLoading}>
              Request reset link
            </Button>

            <Link className="link text-center" to="/auth/signin">
              Back to login
            </Link>
          </Form>
        </AuthLayout>
      )}
    </>
  );
};

export default ForgotPasswordPage;
