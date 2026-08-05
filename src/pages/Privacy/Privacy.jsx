import { motion } from "motion/react";
import { Link } from "react-router";
import { Mail, ShieldCheck } from "lucide-react";

import PageTitle from "../../components/PageTitle";
import Container from "../../components/Container";
import FadeContent from "@/components/effects/FadeContent";
import { Badge } from "@/components/ui/badge";

const sections = [
  {
    id: "overview",
    title: "1. Overview",
    body: [
      "This Privacy Policy explains what information MicroEarn collects, how we use it, and the choices you have. By using the platform, you consent to the practices described here.",
      "We may update this policy periodically. Material changes will be reflected on this page with a revised \"Last updated\" date.",
    ],
  },
  {
    id: "information",
    title: "2. Information We Collect",
    body: [
      "Account information: your name, email address, password, and the role you register with (Worker or Buyer).",
      "Profile information: your display name, photo, and details you choose to add to your public profile.",
      "Activity data: the tasks you post, submit, review, and your earnings, coin balances, and withdrawal history.",
      "Technical data: your IP address, browser type, device information, and usage patterns collected to keep the platform secure and functioning.",
      "Payment information: processed securely by Stripe. We do not store full card numbers on our servers.",
    ],
  },
  {
    id: "usage",
    title: "3. How We Use Your Information",
    body: [
      "We use your information to create and manage your account, display tasks relevant to your role, and process coins, payments, and withdrawals.",
      "We use activity data to enforce our policies, prevent fraud, and ensure the marketplace operates fairly for workers and buyers.",
      "We may use aggregated, anonymized data to improve the platform and report platform-wide metrics.",
    ],
  },
  {
    id: "sharing",
    title: "4. When We Share Information",
    body: [
      "With other users as necessary to operate the marketplace: buyers see worker submissions and worker profiles, and workers see task details and buyer information.",
      "With service providers that help us run the platform, such as Stripe for payments, Firebase for authentication and hosting, and analytics providers. These providers are bound by confidentiality obligations.",
      "With authorities when required by law, or when we believe disclosure is necessary to protect the rights, safety, or property of MicroEarn, its users, or the public.",
      "We never sell your personal information to third parties.",
    ],
  },
  {
    id: "security",
    title: "5. Data Security",
    body: [
      "We use industry-standard safeguards, including encrypted transmission (HTTPS), secure authentication, and role-based access controls.",
      "While we work hard to protect your data, no method of transmission over the internet is 100% secure. We cannot guarantee absolute security.",
      "You are responsible for keeping your password confidential and for promptly reporting any suspected unauthorized use of your account.",
    ],
  },
  {
    id: "retention",
    title: "6. Data Retention",
    body: [
      "We retain your account information and activity history for as long as your account remains active, so you can view your task history and earnings.",
      "If you delete your account, we delete or anonymize your personal information, except where we are legally required to retain records (for example, for tax or fraud-prevention purposes).",
    ],
  },
  {
    id: "cookies",
    title: "7. Cookies & Local Storage",
    body: [
      "We use cookies and local storage to keep you signed in, remember your preferences (such as the \"Remember me\" option on login), and understand how the platform is used.",
      "You can control cookies through your browser settings. Disabling them may limit some functionality, such as persistent login.",
    ],
  },
  {
    id: "children",
    title: "8. Children's Privacy",
    body: [
      "MicroEarn is not directed at individuals under 18 years of age. We do not knowingly collect personal information from children. If you believe a child has provided us with personal information, contact us and we will delete it.",
    ],
  },
  {
    id: "rights",
    title: "9. Your Rights & Choices",
    body: [
      "You can access, update, or delete your account information from the Profile page or by contacting support.",
      "You may request a copy of the personal data we hold about you, or ask us to correct inaccurate information.",
      "Depending on your jurisdiction, you may have the right to object to certain processing or request data portability. Contact us to exercise these rights.",
    ],
  },
  {
    id: "contact",
    title: "10. Contact Us",
    body: [
      "If you have any questions about this Privacy Policy or how your data is handled, email us at support@microearn.com.",
    ],
  },
];

const Privacy = () => {
  return (
    <div>
      <PageTitle
        title="Privacy Policy"
        description="Learn how MicroEarn collects, uses, and protects your personal information."
      />

      {/* Hero */}
      <section className="relative overflow-hidden py-16 md:py-20">
        <div className="absolute -top-24 left-1/2 size-96 -translate-x-1/2 rounded-full bg-emerald-500/10 blur-3xl" />
        <div className="relative mx-auto max-w-3xl px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          >
            <Badge className="gap-1.5 rounded-full bg-emerald-500/10 px-3 py-1.5 font-semibold text-emerald-600 ring-1 ring-emerald-500/20 dark:text-emerald-400">
              <ShieldCheck className="size-3.5" />
              Privacy Policy
            </Badge>
            <h1 className="mt-5 text-4xl font-bold tracking-tight text-balance md:text-5xl">
              Your data stays yours
            </h1>
            <p className="mt-5 text-base leading-relaxed text-muted-foreground md:text-lg">
              We collect only what we need to run the marketplace, and we never
              sell your personal information.
            </p>
            <p className="mt-4 text-sm text-muted-foreground">
              Last updated: 5 August 2026
            </p>
          </motion.div>
        </div>
      </section>

      {/* Content */}
      <section className="relative pb-16 md:pb-24">
        <Container>
          <FadeContent className="mx-auto max-w-3xl space-y-6">
            {sections.map((section) => (
              <div
                key={section.id}
                id={section.id}
                className="scroll-mt-24 rounded-2xl border border-border/70 bg-card p-6 transition-colors duration-300 hover:border-emerald-500/30 sm:p-7"
              >
                <h2 className="text-lg font-semibold tracking-tight">
                  {section.title}
                </h2>
                {section.body.map((paragraph) => (
                  <p
                    key={paragraph}
                    className="mt-3 text-sm leading-relaxed text-muted-foreground"
                  >
                    {paragraph}
                  </p>
                ))}
              </div>
            ))}

            <div className="flex flex-col items-center justify-between gap-4 rounded-2xl border border-emerald-500/20 bg-emerald-500/5 p-6 text-center sm:flex-row sm:text-left">
              <div>
                <p className="font-semibold">Questions about your privacy?</p>
                <p className="mt-1 text-sm text-muted-foreground">
                  We're here to explain how your data is handled.
                </p>
              </div>
              <Link
                to="/contact"
                className="inline-flex shrink-0 items-center gap-2 rounded-full bg-gradient px-5 py-2.5 text-sm font-medium text-white"
              >
                <Mail className="size-4" />
                Contact support
              </Link>
            </div>

            <p className="text-center text-sm text-muted-foreground">
              Please also read our{" "}
              <Link
                to="/terms"
                className="font-semibold text-emerald-600 underline-offset-4 hover:underline dark:text-emerald-400"
              >
                Terms of Service
              </Link>
              .
            </p>
          </FadeContent>
        </Container>
      </section>
    </div>
  );
};

export default Privacy;
