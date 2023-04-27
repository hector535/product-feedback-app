import { useLocation } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Form, Message } from "@/components";
import { ResetPasswordForm } from "@/types";
import { authSchema } from "@/schemas";
import { authApi } from "@/api";
import { AuthLayout } from "@/layout";

const ResetPasswordPage = () => {
  const location = useLocation();
  const token = location.search.slice(3);

  const { mutate, isSuccess, isLoading, isError } = useMutation(
    authApi.resetPassword
  );

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ResetPasswordForm>({
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
    resolver: zodResolver(authSchema.resetPasswordForm),
  });

  const onSubmit: SubmitHandler<ResetPasswordForm> = ({
    password,
    confirmPassword,
  }) => {
    mutate({ token, password, confirmPassword });
  };

  return (
    <>
      {isSuccess ? (
        <Message type="success">
          <p className="text-center">
            Your password has been reset successfully. Please click on the
            button below to be redirected to the login page.
          </p>
        </Message>
      ) : (
        <AuthLayout title="Change your password">
          <Form className="grid gap-5" onSubmit={handleSubmit(onSubmit)}>
            <p>Enter a new password below to change your password.</p>

            <Form.Item
              label="New password"
              name="new_password"
              errorMessage={errors.password?.message}
            >
              <input
                type="password"
                placeholder="New password"
                className="auth-input"
                {...register("password")}
              />
            </Form.Item>

            <Form.Item
              label="Confirm password"
              name="confirm_password"
              errorMessage={errors.confirmPassword?.message}
            >
              <input
                type="password"
                placeholder="Confirm password"
                className="auth-input"
                {...register("confirmPassword")}
              />
            </Form.Item>

            <Button color="blue" loading={isLoading} disabled={isLoading}>
              Change password
            </Button>

            {!!isError && (
              <p className="error-message">
                Something went wrong, please try again later.
              </p>
            )}
          </Form>
        </AuthLayout>
      )}
    </>
  );
};

export default ResetPasswordPage;
