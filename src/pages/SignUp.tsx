import { Link } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Button, Form, Message } from "@/components";
import { authApi } from "@/api";
import { authSchema } from "@/schemas";
import { SignUpForm } from "@/types/auth";
import { extractErrorMessage } from "@/utils";
import { AuthLayout } from "@/layout";

const SignUpPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignUpForm>({
    resolver: zodResolver(authSchema.signupForm),
  });

  const { isSuccess, isLoading, error, mutate } = useMutation(authApi.signup);

  const errorMessage = extractErrorMessage(error);

  const onSubmit: SubmitHandler<SignUpForm> = (data) => mutate(data);

  return (
    <>
      {isSuccess ? (
        <Message type="success">
          <p className="text-center">
            Please check your email and click on the account verification button
            to activate your account. If you don&apos;t see an email in your
            inbox, check your <strong>Junk Mail folder</strong>.
          </p>
        </Message>
      ) : (
        <AuthLayout title="Create a new account">
          <Form onSubmit={handleSubmit(onSubmit)} className="grid gap-5">
            <Form.Item
              label="Name"
              name="name"
              errorMessage={errors.name?.message}
            >
              <input
                type="text"
                placeholder="Your name"
                className="auth-input"
                {...register("name")}
              />
            </Form.Item>

            <Form.Item
              label="Username"
              name="username"
              errorMessage={errors.username?.message}
            >
              <input
                type="text"
                placeholder="Your username"
                className="auth-input"
                {...register("username")}
              />
            </Form.Item>

            <Form.Item
              label="Your email"
              name="email"
              errorMessage={errors.email?.message}
            >
              <input
                type="email"
                placeholder="name@company.com"
                className="auth-input"
                {...register("email")}
              />
            </Form.Item>

            <Form.Item
              label="Password"
              name="password"
              errorMessage={errors.password?.message}
            >
              <input
                type="password"
                className="auth-input"
                placeholder="Your password"
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
                className="auth-input"
                placeholder="Repeat your password"
                {...register("confirmPassword")}
              />
            </Form.Item>

            {errorMessage && <p className="error-message">{errorMessage}</p>}

            <Button
              color="blue"
              className="w-full text-sm font-medium"
              loading={isLoading}
              disabled={isLoading}
            >
              Sign up
            </Button>

            <p className="text-gray-500">
              Already with an account?{" "}
              <Link className="link" to={"/auth/signin"}>
                Sign in
              </Link>
            </p>
          </Form>
        </AuthLayout>
      )}
    </>
  );
};

export default SignUpPage;
