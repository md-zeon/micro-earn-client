import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";

import useAuth from "../../hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Separator } from "@/components/ui/separator";
import PageTitle from "../../components/PageTitle";
import AuthLayout from "./AuthLayout";
import AuthInput from "./AuthInput";
import { PasswordField } from "./PasswordField";
import PasswordStrength from "./PasswordStrength";
import RoleSelect from "./RoleSelect";
import GoogleSignIn from "./GoogleSignIn";

const registerSchema = z
  .object({
    name: z
      .string()
      .trim()
      .min(2, "Name must be at least 2 characters"),
    email: z
      .string()
      .trim()
      .min(1, "Email is required")
      .email("Enter a valid email address"),
    password: z
      .string()
      .min(6, "Password must be at least 6 characters"),
    confirmPassword: z.string(),
    role: z.enum(["worker", "buyer"], {
      errorMap: () => ({ message: "Please select a role" }),
    }),
    terms: z.literal(true, {
      errorMap: () => ({ message: "You must accept the Terms & Conditions" }),
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "Passwords do not match",
  });

const Register = () => {
  const [loading, setLoading] = useState(false);
  const { createUser, updateUserProfile } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const from = ["/login", "/register", "/"].includes(
    location?.state?.from?.pathname,
  )
    ? "/dashboard"
    : location?.state?.from?.pathname || "/dashboard";

  const {
    register,
    watch,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(registerSchema),
    mode: "onTouched",
    defaultValues: { role: "" },
  });

  const password = watch("password");

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      const result = await createUser(data.email, data.password);
      await updateUserProfile({ displayName: data.name });
      await fetch(`${import.meta.env.VITE_API_URL}/user`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          uid: result.user.uid,
          name: data.name,
          email: data.email,
          role: data.role,
          photoURL: result.user.photoURL || "",
        }),
      });
      toast.success(
        `Welcome, ${data.name.split(" ")[0] || "friend"}! Your ${data.role} account is ready.`,
      );
      navigate(from, { replace: true });
    } catch (err) {
      console.error(err);
      toast.error(
        err?.code === "auth/email-already-in-use"
          ? "This email is already registered. Try signing in instead."
          : "Registration failed. Please check your details and try again.",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <PageTitle
        title="Register"
        description="Create your MicroEarn account and start earning from micro-tasks."
      />
      <AuthLayout>
        <div className="rounded-2xl border border-border bg-card p-6 shadow-sm sm:p-8">
          <div className="mb-6">
            <h1 className="text-xl font-bold tracking-tight">
              Create your account
            </h1>
            <p className="mt-1 text-sm text-muted-foreground">
              Join MicroEarn and start earning.
            </p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5" noValidate>
            <AuthInput
              id="name"
              label="Full Name"
              type="text"
              autoComplete="name"
              placeholder="John Doe"
              required
              error={errors.name?.message}
              {...register("name")}
            />

            <AuthInput
              id="email"
              label="Email"
              type="email"
              autoComplete="email"
              placeholder="you@example.com"
              required
              error={errors.email?.message}
              {...register("email")}
            />

            <div className="space-y-2">
              <PasswordField
                id="password"
                label="Password"
                autoComplete="new-password"
                required
                error={errors.password?.message}
                {...register("password")}
              />
              <PasswordStrength
                password={password}
                show={Boolean(password)}
              />
            </div>

            <PasswordField
              id="confirmPassword"
              label="Confirm Password"
              autoComplete="new-password"
              placeholder="Re-enter your password"
              required
              error={errors.confirmPassword?.message}
              {...register("confirmPassword")}
            />

            <RoleSelect
              value={watch("role")}
              onChange={(value) =>
                setValue("role", value, { shouldValidate: true })
              }
              error={errors.role?.message}
            />

            <div className="space-y-2">
              <label className="flex cursor-pointer select-none items-start gap-2.5 text-sm text-muted-foreground">
                <span className="mt-0.5">
                  <Checkbox
                    aria-invalid={errors.terms ? true : undefined}
                    {...register("terms")}
                  />
                </span>
                <span className="leading-relaxed">
                  I agree to the{" "}
                  <Link
                    to="/terms"
                    className="font-semibold text-emerald-600 underline-offset-4 hover:underline dark:text-emerald-400"
                  >
                    Terms of Service
                  </Link>{" "}
                  and{" "}
                  <Link
                    to="/privacy"
                    className="font-semibold text-emerald-600 underline-offset-4 hover:underline dark:text-emerald-400"
                  >
                    Privacy Policy
                  </Link>
                </span>
              </label>
              {errors.terms && (
                <p
                  role="alert"
                  className="text-sm font-medium text-destructive"
                >
                  {errors.terms.message}
                </p>
              )}
            </div>

            <Button
              type="submit"
              className="h-10 w-full rounded-lg bg-gradient"
              disabled={loading}
            >
              {loading ? (
                <>
                  <Loader2 className="size-4 animate-spin" aria-hidden="true" />
                  Creating account...
                </>
              ) : (
                "Create Account"
              )}
            </Button>
          </form>

          <div className="my-6 flex items-center gap-3">
            <Separator className="flex-1" />
            <span className="text-xs font-medium text-muted-foreground">
              or sign up with
            </span>
            <Separator className="flex-1" />
          </div>

          <GoogleSignIn
            loading={loading}
            setLoading={setLoading}
            from={from}
            label="Continue with Google"
          />
        </div>

        <p className="mt-6 text-center text-sm text-muted-foreground">
          Already have an account?{" "}
          <Link
            to="/login"
            className="font-semibold text-emerald-600 underline-offset-4 transition-colors hover:underline dark:text-emerald-400"
          >
            Sign in
          </Link>
        </p>
      </AuthLayout>
    </>
  );
};

export default Register;
