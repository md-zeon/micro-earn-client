import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { BellRing, Mail, Send, ShieldCheck } from "lucide-react";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import FormField from "@/components/Form/FormField";
import FadeContent from "@/components/effects/FadeContent";

const newsletterSchema = z.object({
  email: z
    .string()
    .trim()
    .min(1, "Enter your email address")
    .email("Enter a valid email address"),
});

const Newsletter = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({ resolver: zodResolver(newsletterSchema), mode: "onTouched" });

  const onSubmit = () => {
    toast.success("Thank you for subscribing to our newsletter!");
    reset();
  };

  return (
    <section className="relative overflow-hidden pb-24">
      <div className="mx-auto max-w-4xl px-4">
        <FadeContent className="relative overflow-hidden rounded-3xl border border-border/70 bg-card/50 p-8 backdrop-blur-sm md:p-12">
          <div className="absolute -top-16 -right-16 size-48 rounded-full bg-emerald-500/10 blur-3xl" />

          <div className="relative flex flex-col items-center text-center">
            <span className="inline-flex items-center gap-2 rounded-full border border-emerald-500/20 bg-emerald-500/10 px-3 py-1 text-xs font-semibold tracking-wide text-emerald-600 uppercase dark:text-emerald-400">
              <BellRing className="size-3.5" />
              Never miss an update
            </span>

            <h2 className="mt-5 text-2xl font-bold tracking-tight text-balance md:text-3xl">
              Get new high-paying tasks in your inbox
            </h2>
            <p className="mt-3 max-w-xl text-muted-foreground">
              Subscribe to our newsletter for fresh tasks, platform updates, and
              earning tips — once a week, no spam.
            </p>

            <form
              onSubmit={handleSubmit(onSubmit)}
              noValidate
              className="mt-8 flex w-full max-w-xl flex-col items-start gap-3 sm:flex-row"
            >
              <FormField
                label="Email address"
                id="newsletter-email"
                error={errors.email?.message}
                className="w-full flex-1"
                labelClassName="sr-only"
                trailing={
                  <Mail
                    className="pointer-events-none absolute top-1/2 left-4 -translate-y-1/2 size-4 text-muted-foreground"
                    aria-hidden="true"
                  />
                }
              >
                <Input
                  type="email"
                  placeholder="Enter your email address"
                  className="h-12 rounded-full pl-11"
                  {...register("email")}
                />
              </FormField>
              <Button
                type="submit"
                className="h-12 gap-2 rounded-full px-7 shadow-lg shadow-emerald-500/25"
              >
                <Send className="size-4" />
                Subscribe
              </Button>
            </form>

            <p className="mt-4 flex items-center gap-1.5 text-xs text-muted-foreground">
              <ShieldCheck className="size-3.5 text-emerald-500" />
              We respect your privacy. Unsubscribe anytime.
            </p>
          </div>
        </FadeContent>
      </div>
    </section>
  );
};

export default Newsletter;
