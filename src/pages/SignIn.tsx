import { Link } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Button, Form } from "@/components";
import { authApi } from "@/api";
import { useStore } from "@/store";
import { authSchema } from "@/schemas";
import { SignInForm } from "@/types";
import { extractErrorMessage } from "@/utils";
import { AuthLayout } from "@/layout";

const SignInPage = () => {
  const rememberMe = useStore((state) => state.rememberMe);
  const setRememberMe = useStore((state) => state.setRememberMe);
  const setUser = useStore((state) => state.setUser);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignInForm>({
    resolver: zodResolver(authSchema.signinForm),
  });

  const { mutate, isLoading, error } = useMutation(authApi.signin, {
    onSuccess: (data) => {
      const { id, name, username, email } = data;
      setUser({
        id,
        name,
        username,
        email,
        storage: rememberMe ? "localStorage" : "sessionStorage",
      });
    },
  });

  const errorMessage = extractErrorMessage(error);

  const onSubmit: SubmitHandler<SignInForm> = (data) => mutate(data);

  return (
    <AuthLayout title="Sign in to your account">
      <Form onSubmit={handleSubmit(onSubmit)} className="grid gap-5">
        <Form.Item
          label="Your email"
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

        <div className="flex items-center justify-between">
          <label className="flex items-center gap-2 text-gray-500">
            <input
              type="checkbox"
              className="font h-4 w-4 rounded border border-gray-300 bg-gray-50"
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
            />
            Remember me
          </label>

          <Link className="link" to="/auth/forgot-password">
            Forgot password?
          </Link>
        </div>

        {errorMessage && <p className="error-message">{errorMessage}</p>}

        <Button
          color="blue"
          className="w-full text-sm font-medium"
          loading={isLoading}
          disabled={isLoading}
        >
          Sign in
        </Button>

        <p className="text-gray-500">
          Don&apos;t have an account yet?{" "}
          <Link className="link" to="/auth/signup">
            Sign up
          </Link>
        </p>
      </Form>
    </AuthLayout>
  );
};

export default SignInPage;
