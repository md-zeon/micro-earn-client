import { motion } from "motion/react";
import { toast } from "sonner";
import { Link } from "react-router";
import {
  LuArrowRight,
  LuCircleCheck,
  LuClock,
  LuHandshake,
  LuLifeBuoy,
  LuMail,
  LuMessageSquare,
  LuSend,
  LuShieldCheck,
  LuSparkles,
  LuZap,
} from "react-icons/lu";
import contactImage from "../../assets/contact.svg";
import CTA from "../../components/Home/CTA";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

const reveal = (delay = 0) => ({
  initial: { opacity: 0, y: 40 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-80px" },
  transition: { duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] },
});

const channels = [
  {
    icon: <LuLifeBuoy className="size-5" />,
    title: "Support",
    description: "Having trouble with a task, payout, or your account?",
    email: "support@microearn.com",
    accent: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400",
  },
  {
    icon: <LuHandshake className="size-5" />,
    title: "Partnerships",
    description: "Want to bring task providers or bulk buyers to MicroEarn?",
    email: "partners@microearn.com",
    accent: "bg-teal-500/10 text-teal-600 dark:text-teal-400",
  },
  {
    icon: <LuMessageSquare className="size-5" />,
    title: "Feedback",
    description: "Ideas for new features, tasks, or ways we can do better.",
    email: "feedback@microearn.com",
    accent: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400",
  },
];

const details = [
  {
    icon: <LuMail className="size-5" />,
    label: "Email us",
    value: "support@microearn.com",
    href: "mailto:support@microearn.com",
  },
  {
    icon: <LuClock className="size-5" />,
    label: "Response time",
    value: "Within 24–48 hours",
  },
  {
    icon: <LuShieldCheck className="size-5" />,
    label: "Your data",
    value: "Protected & never shared",
  },
];

const Contact = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
    e.target.reset();
    toast.success("Message sent! We'll get back to you within 24–48 hours.");
  };

  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden py-16 md:py-24">
        <div className="absolute -top-24 left-1/2 size-96 -translate-x-1/2 rounded-full bg-emerald-500/10 blur-3xl" />
        <div className="absolute right-0 bottom-0 size-72 rounded-full bg-teal-500/5 blur-3xl" />

        <div className="relative mx-auto max-w-6xl px-4">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="mx-auto max-w-2xl text-center"
          >
            <span className="inline-flex items-center gap-2 rounded-full border border-emerald-500/20 bg-emerald-500/10 px-3 py-1 text-xs font-semibold tracking-wide text-emerald-600 uppercase dark:text-emerald-400">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
              Get in touch
            </span>
            <h1 className="mt-5 text-4xl font-bold tracking-tight text-balance md:text-5xl">
              We're here to help.{" "}
              <span className="text-gradient">Say hello.</span>
            </h1>
            <p className="mt-5 text-base leading-relaxed text-muted-foreground md:text-lg">
              Questions about tasks, payouts, or partnering with MicroEarn?
              Reach the right team in one tap and hear back within 24–48 hours.
            </p>
            <div className="mt-6 flex flex-wrap justify-center gap-x-5 gap-y-2 text-sm text-muted-foreground">
              <span className="inline-flex items-center gap-1.5">
                <LuCircleCheck className="size-4 text-emerald-500" />
                Real humans reply
              </span>
              <span className="inline-flex items-center gap-1.5">
                <LuCircleCheck className="size-4 text-emerald-500" />
                24–48 hr response
              </span>
              <span className="inline-flex items-center gap-1.5">
                <LuCircleCheck className="size-4 text-emerald-500" />
                Free to ask anything
              </span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Channels */}
      <section className="relative pb-16 md:pb-20">
        <div className="mx-auto max-w-6xl px-4">
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {channels.map((channel, i) => (
              <motion.div key={channel.title} {...reveal(i * 0.08)}>
                <Card className="group flex h-full flex-col p-7 transition-colors duration-300 hover:border-emerald-500/40">
                  <div
                    className={`flex size-11 items-center justify-center rounded-xl ${channel.accent}`}
                  >
                    {channel.icon}
                  </div>
                  <h3 className="mt-5 text-lg font-semibold tracking-tight">
                    {channel.title}
                  </h3>
                  <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">
                    {channel.description}
                  </p>
                  <a
                    href={`mailto:${channel.email}`}
                    className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-emerald-600 transition-colors hover:text-emerald-500 dark:text-emerald-400"
                  >
                    {channel.email}
                    <LuArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-1" />
                  </a>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Form + info */}
      <section className="relative overflow-hidden py-16 md:py-24">
        <div className="absolute top-1/4 -left-24 size-72 rounded-full bg-emerald-500/5 blur-3xl" />
        <div className="relative mx-auto max-w-6xl px-4">
          <div className="grid items-start gap-12 lg:grid-cols-[1fr_1.15fr]">
            {/* Info column */}
            <motion.div {...reveal()} className="space-y-6">
              <div>
                <span className="inline-flex items-center gap-2 rounded-full border border-emerald-500/20 bg-emerald-500/10 px-3 py-1 text-xs font-semibold tracking-wide text-emerald-600 uppercase dark:text-emerald-400">
                  <LuZap className="size-3.5" />
                  Prefer a direct line?
                </span>
                <h2 className="mt-4 text-3xl font-bold tracking-tight text-balance md:text-4xl">
                  Reach us without the form
                </h2>
                <p className="mt-4 leading-relaxed text-muted-foreground">
                  Every message goes straight to a real person — no bots, no
                  ticket queues. Pick whichever channel works for you.
                </p>
              </div>

              <div className="relative overflow-hidden rounded-[2rem] border border-border/60 bg-card/40 p-6 backdrop-blur md:p-8">
                <img
                  src={contactImage}
                  alt="Contact MicroEarn"
                  className="mx-auto w-full max-w-xs object-contain"
                />
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                {details.map((detail) => {
                  const content = (
                    <div className="flex items-start gap-3.5">
                      <div className="flex size-10 shrink-0 items-center justify-center rounded-xl border border-emerald-500/20 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
                        {detail.icon}
                      </div>
                      <div>
                        <p className="text-xs font-semibold tracking-wide text-muted-foreground uppercase">
                          {detail.label}
                        </p>
                        <p className="mt-1 text-sm font-medium break-all">
                          {detail.value}
                        </p>
                      </div>
                    </div>
                  );
                  return (
                    <Card
                      key={detail.label}
                      className="p-4 transition-colors duration-300 hover:border-emerald-500/40"
                    >
                      {detail.href ? (
                        <a href={detail.href} className="block">
                          {content}
                        </a>
                      ) : (
                        content
                      )}
                    </Card>
                  );
                })}
              </div>

              <div className="flex items-center gap-3 rounded-2xl border border-border/60 bg-card/40 p-4 text-sm text-muted-foreground">
                <LuSparkles className="size-5 shrink-0 text-emerald-500" />
                <p>
                  Looking for quick answers? Check our{" "}
                  <Link
                    to="/faq"
                    className="font-semibold text-emerald-600 underline-offset-2 hover:underline dark:text-emerald-400"
                  >
                    FAQ
                  </Link>{" "}
                  first — most questions are answered there.
                </p>
              </div>
            </motion.div>

            {/* Form column */}
            <motion.div {...reveal(0.1)}>
              <Card className="relative overflow-hidden bg-gradient p-8 text-white shadow-2xl shadow-emerald-500/30 md:p-10">
                <div className="grid-pattern absolute inset-0 opacity-40" />
                <div className="absolute -top-16 -right-16 size-56 rounded-full bg-white/10 blur-3xl" />

                <div className="relative flex items-center gap-3">
                  <div className="flex size-11 items-center justify-center rounded-2xl bg-white/15 backdrop-blur-sm">
                    <LuMessageSquare className="size-5" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold tracking-tight">
                      Send us a message
                    </h3>
                    <p className="text-sm text-white/75">
                      We reply within 24–48 hours
                    </p>
                  </div>
                </div>

                <form
                  onSubmit={handleSubmit}
                  className="relative mt-8 space-y-5"
                >
                  <div className="grid gap-5 sm:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="name" className="text-white/85">
                        Your name
                      </Label>
                      <Input
                        id="name"
                        type="text"
                        required
                        placeholder="John Doe"
                        className="h-12 rounded-xl border-white/20 bg-white/10 text-white placeholder:text-white/50 focus-visible:border-white/40 focus-visible:ring-white/20"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email" className="text-white/85">
                        Your email
                      </Label>
                      <Input
                        id="email"
                        type="email"
                        required
                        placeholder="john@example.com"
                        className="h-12 rounded-xl border-white/20 bg-white/10 text-white placeholder:text-white/50 focus-visible:border-white/40 focus-visible:ring-white/20"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="subject" className="text-white/85">
                      What's this about?
                    </Label>
                    <Select required>
                      <SelectTrigger
                        id="subject"
                        className="h-12 w-full rounded-xl border-white/20 bg-white/10 text-white focus-visible:border-white/40 focus-visible:ring-white/20"
                      >
                        <SelectValue placeholder="Choose a reason" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="support">
                          General support
                        </SelectItem>
                        <SelectItem value="partnership">Partnership</SelectItem>
                        <SelectItem value="feedback">Feedback</SelectItem>
                        <SelectItem value="issue">Report an issue</SelectItem>
                        <SelectItem value="other">Something else</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="message" className="text-white/85">
                      Message
                    </Label>
                    <Textarea
                      id="message"
                      rows={5}
                      required
                      placeholder="Tell us what's on your mind..."
                      className="rounded-xl border-white/20 bg-white/10 text-white placeholder:text-white/50 focus-visible:border-white/40 focus-visible:ring-white/20"
                    />
                  </div>

                  <Button
                    type="submit"
                    size="lg"
                    className="w-full gap-2 rounded-full bg-white text-emerald-700 shadow-lg shadow-black/10 hover:bg-emerald-50"
                  >
                    <LuSend className="size-4" />
                    Send Message
                  </Button>

                  <p className="flex items-center justify-center gap-1.5 text-center text-xs text-white/70">
                    <LuShieldCheck className="size-4" />
                    Your details stay private — we never share your data.
                  </p>
                </form>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      <CTA />
    </div>
  );
};

export default Contact;
