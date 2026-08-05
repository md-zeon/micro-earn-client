import { useState } from "react";
import { LuBellRing, LuMail, LuSend, LuShieldCheck } from "react-icons/lu";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { motion } from "motion/react";

const Newsletter = () => {
  const [email, setEmail] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email) {
      toast.error("Please enter your email address");
      return;
    }

    toast.success("Thank you for subscribing to our newsletter!");
    setEmail("");
  };

  return (
    <section className="relative overflow-hidden pb-24">
      <div className="mx-auto max-w-4xl px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="relative overflow-hidden rounded-3xl border border-border/70 bg-card/50 p-8 backdrop-blur-sm md:p-12"
        >
          <div className="absolute -top-16 -right-16 size-48 rounded-full bg-emerald-500/10 blur-3xl" />

          <div className="relative flex flex-col items-center text-center">
            <span className="inline-flex items-center gap-2 rounded-full border border-emerald-500/20 bg-emerald-500/10 px-3 py-1 text-xs font-semibold tracking-wide text-emerald-600 uppercase dark:text-emerald-400">
              <LuBellRing className="size-3.5" />
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
              onSubmit={handleSubmit}
              className="mt-8 flex w-full max-w-xl flex-col gap-3 sm:flex-row"
            >
              <div className="relative flex-1">
                <LuMail className="absolute top-1/2 left-4 -translate-y-1/2 size-4 text-muted-foreground" />
                <Input
                  type="email"
                  placeholder="Enter your email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="h-12 rounded-full pl-11"
                />
              </div>
              <Button
                type="submit"
                className="h-12 gap-2 rounded-full px-7 shadow-lg shadow-emerald-500/25"
              >
                <LuSend className="size-4" />
                Subscribe
              </Button>
            </form>

            <p className="mt-4 flex items-center gap-1.5 text-xs text-muted-foreground">
              <LuShieldCheck className="size-3.5 text-emerald-500" />
              We respect your privacy. Unsubscribe anytime.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Newsletter;
