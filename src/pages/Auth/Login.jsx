import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import useAuth from "../../hooks/useAuth";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Eye, EyeOff, Loader2, User } from "lucide-react";
import FormField from "../../components/Form/FormField";
import GoogleSignIn from "./GoogleSignIn";
import PageTitle from "../../components/PageTitle";

const loginSchema = z.object({
  email: z.string().trim().min(1, "Email is required").email("Enter a valid email address"),
  password: z
    .string()
    .min(6, "Password must be at least 6 characters"),
});

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const { signInUser } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const from = ["/login", "/register", "/"].includes(
    location?.state?.from?.pathname,
  )
    ? "/dashboard"
    : location?.state?.from?.pathname || "/dashboard";

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: zodResolver(loginSchema), mode: "onTouched" });

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      await signInUser(data.email, data.password);
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

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-12 bg-gradient-to-br from-background to-muted/20">
      <PageTitle
        title="Login"
        description="Sign in to your MicroEarn account."
      />
      <Card className="w-full max-w-md shadow-xl">
        <CardHeader className="text-center space-y-1">
          <div className="flex justify-center mb-2">
            <div className="p-3 bg-gradient rounded-full">
              <User className="h-6 w-6 text-white" />
            </div>
          </div>
          <CardTitle className="text-2xl font-bold">Welcome Back</CardTitle>
          <CardDescription>Sign in to your MicroEarn account</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" noValidate>
            <FormField
              label="Email"
              id="email"
              error={errors.email?.message}
              required
            >
              <Input
                type="email"
                placeholder="your@email.com"
                autoComplete="email"
                {...register("email")}
              />
            </FormField>

            <FormField
              label="Password"
              id="password"
              error={errors.password?.message}
              required
              trailing={
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="absolute right-0 top-0 h-full px-3"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </Button>
              }
            >
              <Input
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                autoComplete="current-password"
                className="pr-10"
                {...register("password")}
              />
            </FormField>

            <Button
              type="submit"
              className="w-full bg-gradient text-white"
              disabled={loading}
            >
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Signing In...
                </>
              ) : (
                "Sign In"
              )}
            </Button>
          </form>

          {/* Demo Account Buttons */}
          <div className="mt-6 space-y-3">
            <p className="text-center text-sm text-muted-foreground">
              Try a demo account:
            </p>
            <div className="grid grid-cols-2 gap-3">
              <Button
                type="button"
                variant="outline"
                size="sm"
                disabled={loading}
                onClick={() => handleDemoLogin("demo@worker.com", "demo123")}
              >
                Demo Worker
              </Button>
              <Button
                type="button"
                variant="outline"
                size="sm"
                disabled={loading}
                onClick={() => handleDemoLogin("demo@buyer.com", "demo123")}
              >
                Demo Buyer
              </Button>
            </div>
          </div>

          <div className="mt-4">
            <GoogleSignIn
              loading={loading}
              setLoading={setLoading}
              from={from}
            />
          </div>
          <p className="text-center text-sm text-muted-foreground mt-4">
            Don't have an account?{" "}
            <Link
              to="/register"
              className="text-gradient font-medium hover:underline"
            >
              Register
            </Link>
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default Login;
