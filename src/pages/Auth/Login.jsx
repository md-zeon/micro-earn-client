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
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import PageTitle from "../../components/PageTitle";
import AuthLayout from "./AuthLayout";
import AuthInput from "./AuthInput";
import { PasswordField } from "./PasswordField";
import GoogleSignIn from "./GoogleSignIn";

const EMAIL_KEY = "microearn-remembered-email";

const loginSchema = z.object({
  email: z
    .string()
    .trim()
    .min(1, "Email is required")
    .email("Enter a valid email address"),
  password: z
    .string()
    .min(1, "Password is required")
    .min(6, "Password must be at least 6 characters"),
});

const demos = [
  { role: "Worker", email: "demo@worker.com", password: "demo123" },
  { role: "Buyer", email: "demo@buyer.com", password: "demo123" },
  { role: "Admin", email: "admin@microearn.com", password: "Admin@1234" },
];

const Login = () => {
  const [loading, setLoading] = useState(false);
  const [forgotEmail, setForgotEmail] = useState("");
  const [sendingReset, setSendingReset] = useState(false);
  const { signInUser, resetPassword } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const from = ["/login", "/register", "/"].includes(
    location?.state?.from?.pathname,
  )
    ? "/dashboard"
    : location?.state?.from?.pathname || "/dashboard";

  const rememberedEmail =
    typeof window !== "undefined"
      ? window.localStorage.getItem(EMAIL_KEY) || ""
      : "";

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(loginSchema),
    mode: "onTouched",
    defaultValues: {
      email: rememberedEmail,
      remember: Boolean(rememberedEmail),
    },
  });

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      await signInUser(data.email, data.password);
      if (data.remember) {
        window.localStorage.setItem(EMAIL_KEY, data.email);
      } else {
        window.localStorage.removeItem(EMAIL_KEY);
      }
      toast.success("Welcome back!");
      navigate(from, { replace: true });
    } catch (err) {
      console.error(err);
      toast.error("Invalid email or password. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleDemoLogin = async (demoEmail, demoPassword) => {
    setLoading(true);
    try {
      await signInUser(demoEmail, demoPassword);
      toast.success("Logged in with demo account!");
      navigate(from, { replace: true });
    } catch (err) {
      console.error(err);
      toast.error("Demo account login failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleResetPassword = async () => {
    if (!forgotEmail.trim()) {
      toast.error("Please enter your email address first.");
      return;
    }
    setSendingReset(true);
    try {
      await resetPassword(forgotEmail.trim());
      toast.success("Password reset link sent! Check your inbox.");
      setForgotEmail("");
    } catch (err) {
      console.error(err);
      toast.error("Could not send reset link. Check the email and try again.");
    } finally {
      setSendingReset(false);
    }
  };

  return (
    <>
      <PageTitle
        title="Login"
        description="Sign in to your MicroEarn account and continue earning."
      />
      <AuthLayout>
        <div className="rounded-2xl border border-border bg-card p-6 shadow-sm sm:p-8">
          <div className="mb-6">
            <h1 className="text-xl font-bold tracking-tight">Welcome back</h1>
            <p className="mt-1 text-sm text-muted-foreground">
              Sign in to continue with MicroEarn.
            </p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5" noValidate>
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
                required
                error={errors.password?.message}
                {...register("password")}
              />
              <div className="flex items-center justify-between pt-0.5">
                <label className="flex cursor-pointer select-none items-center gap-2 text-sm text-muted-foreground">
                  <Checkbox {...register("remember")} />
                  Remember me
                </label>
                <Dialog>
                  <DialogTrigger
                    render={
                      <button
                        type="button"
                        className="text-sm font-semibold text-emerald-600 underline-offset-4 transition-colors hover:underline dark:text-emerald-400"
                      >
                        Forgot password?
                      </button>
                    }
                  />
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle className="text-base">
                        Reset your password
                      </DialogTitle>
                      <DialogDescription>
                        Enter the email associated with your account and
                        we&apos;ll send you a link to reset your password.
                      </DialogDescription>
                    </DialogHeader>
                    <AuthInput
                      id="forgot-email"
                      label="Email"
                      type="email"
                      autoComplete="email"
                      placeholder="you@example.com"
                      value={forgotEmail}
                      onChange={(e) => setForgotEmail(e.target.value)}
                    />
                    <DialogFooter>
                      <DialogClose render={<Button variant="outline" />}>
                        Cancel
                      </DialogClose>
                      <Button
                        type="button"
                        onClick={handleResetPassword}
                        disabled={sendingReset}
                        className="bg-gradient text-white"
                      >
                        {sendingReset && (
                          <Loader2
                            className="size-4 animate-spin"
                            aria-hidden="true"
                          />
                        )}
                        Send reset link
                      </Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </div>
            </div>

            <Button
              type="submit"
              className="h-10 w-full rounded-lg bg-gradient"
              disabled={loading}
            >
              {loading ? (
                <>
                  <Loader2 className="size-4 animate-spin" aria-hidden="true" />
                  Signing in...
                </>
              ) : (
                "Sign In"
              )}
            </Button>
          </form>

          <div className="my-6 flex items-center gap-3">
            <Separator className="flex-1" />
            <span className="text-xs font-medium text-muted-foreground">
              or continue with
            </span>
            <Separator className="flex-1" />
          </div>

          <GoogleSignIn loading={loading} setLoading={setLoading} from={from} />

          <div className="mt-6 rounded-xl border border-dashed border-border p-3">
            <p className="text-center text-xs font-medium text-muted-foreground">
              Try a demo account
            </p>
            <div className="mt-2.5 flex flex-wrap justify-center gap-2">
              {demos.map((demo) => (
                <button
                  key={demo.role}
                  type="button"
                  onClick={() => handleDemoLogin(demo.email, demo.password)}
                  disabled={loading}
                  className="rounded-lg border border-border bg-muted/50 px-3 py-1.5 text-xs font-medium text-foreground transition-colors hover:border-emerald-500/50 hover:bg-emerald-500/10 disabled:opacity-50"
                >
                  {demo.role}
                </button>
              ))}
            </div>
          </div>
        </div>

        <p className="mt-6 text-center text-sm text-muted-foreground">
          New to MicroEarn?{" "}
          <Link
            to="/register"
            className="font-semibold text-emerald-600 underline-offset-4 transition-colors hover:underline dark:text-emerald-400"
          >
            Create a free account
          </Link>
        </p>
      </AuthLayout>
    </>
  );
};

export default Login;
