import { motion } from "motion/react";
import { Link } from "react-router";
import { FileText, Mail } from "lucide-react";

import PageTitle from "../../components/PageTitle";
import Container from "../../components/Container";
import FadeContent from "@/components/effects/FadeContent";
import { Badge } from "@/components/ui/badge";

const sections = [
  {
    id: "acceptance",
    title: "1. Acceptance of Terms",
    body: [
      "By accessing or using MicroEarn, you agree to be bound by these Terms of Service and our Privacy Policy. If you do not agree with any part of these terms, please do not use the platform.",
      "We may update these terms from time to time. When we do, we will revise the \"Last updated\" date at the top of this page. Continued use of the platform after changes take effect constitutes acceptance of the updated terms.",
    ],
  },
  {
    id: "accounts",
    title: "2. Accounts & Eligibility",
    body: [
      "You must be at least 18 years old (or the legal age of majority in your jurisdiction) to create an account. By registering you confirm that the information you provide is accurate, complete, and current.",
      "You are responsible for safeguarding your account credentials and for all activity that occurs under your account. Notify us immediately if you suspect unauthorized access.",
      "We reserve the right to suspend or terminate accounts that violate these terms, engage in fraudulent activity, or compromise the integrity of the marketplace.",
    ],
  },
  {
    id: "roles",
    title: "3. Roles on MicroEarn",
    body: [
      "MicroEarn connects two types of users: Buyers, who post tasks and hire workers, and Workers, who complete tasks and earn coins.",
      "Buyers agree to post legitimate tasks, provide clear instructions, and pay the agreed amount for approved work.",
      "Workers agree to complete tasks honestly, follow provided instructions, and submit original work that meets the task requirements.",
    ],
  },
  {
    id: "coins",
    title: "4. Coins & Withdrawals",
    body: [
      "Workers earn coins by completing approved tasks. Coins are credited to your account after a buyer approves your submission.",
      "20 coins equal $1 in value. Withdrawals are available once your balance reaches the minimum threshold shown on the Withdrawals page.",
      "Withdrawal requests are reviewed and processed within 24–48 hours. Payment is made through the available payout methods in your region.",
      "Coins have no cash value until a withdrawal is approved, and we may reverse credits found to result from fraudulent or rejected submissions.",
    ],
  },
  {
    id: "task-policy",
    title: "5. Task & Submission Policy",
    body: [
      "Buyers must post tasks that comply with applicable laws and our prohibited-content guidelines. We reserve the right to reject or remove tasks that we deem inappropriate.",
      "Workers may not use automated tools, plagiarize, or misrepresent their work. Submissions that fail review are not eligible for payment.",
      "Buyers are expected to review submissions fairly and in a timely manner. Repeatedly rejecting valid work or abusing the review process may result in account action.",
    ],
  },
  {
    id: "fees",
    title: "6. Fees & Payments",
    body: [
      "Creating an account and browsing tasks is free. Buyers may purchase coins to fund tasks through the Purchase Coins page.",
      "All payments are processed securely through Stripe. You are responsible for any taxes applicable to your earnings or purchases.",
      "We are not liable for fees imposed by banks, payment processors, or government authorities in connection with your transactions.",
    ],
  },
  {
    id: "conduct",
    title: "7. Prohibited Conduct",
    body: [
      "You agree not to engage in fraud, chargebacks with no legitimate basis, spam, harassment, or the posting of unlawful content.",
      "You may not attempt to manipulate reviews, collude to artificially inflate earnings, or use multiple accounts to evade restrictions.",
      "You may not attempt to access, scrape, or disrupt the platform's servers, data, or the accounts of other users.",
    ],
  },
  {
    id: "ip",
    title: "8. Intellectual Property",
    body: [
      "Work submitted for a task is licensed to the buyer once payment for that task is approved, solely for the purpose described in the task.",
      "The MicroEarn name, logo, and platform design are our property. You may not use them without our prior written consent.",
    ],
  },
  {
    id: "liability",
    title: "9. Disclaimers & Limitation of Liability",
    body: [
      "The platform is provided \"as is\" and \"as available\". We do not guarantee that the service will be uninterrupted, error-free, or secure at all times.",
      "To the maximum extent permitted by law, MicroEarn and its operators are not liable for indirect, incidental, or consequential damages arising from your use of the platform.",
      "We are not responsible for disputes between buyers and workers beyond facilitating the platform. We may mediate but are not obligated to.",
    ],
  },
  {
    id: "termination",
    title: "10. Termination",
    body: [
      "You may delete your account at any time. Unpaid, approved balances will be settled in accordance with our withdrawal process.",
      "We may suspend or terminate your access if you breach these terms, with or without notice, in cases of serious or repeated violations.",
    ],
  },
  {
    id: "governing-law",
    title: "11. Governing Law",
    body: [
      "These terms are governed by the laws of Bangladesh. Any disputes shall be resolved in the courts of Dhaka, Bangladesh, unless otherwise required by applicable law.",
    ],
  },
  {
    id: "contact",
    title: "12. Contact Us",
    body: [
      "If you have questions about these terms, please contact us at support@microearn.com.",
    ],
  },
];

const Terms = () => {
  return (
    <div>
      <PageTitle
        title="Terms of Service"
        description="Read the terms and conditions that govern your use of the MicroEarn platform."
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
              <FileText className="size-3.5" />
              Terms of Service
            </Badge>
            <h1 className="mt-5 text-4xl font-bold tracking-tight text-balance md:text-5xl">
              How MicroEarn works for you
            </h1>
            <p className="mt-5 text-base leading-relaxed text-muted-foreground md:text-lg">
              These terms set out the rules for using MicroEarn as a worker or a
              buyer. By using the platform you agree to follow them.
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
                <p className="font-semibold">Have a question about our terms?</p>
                <p className="mt-1 text-sm text-muted-foreground">
                  Our support team is happy to help.
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
                to="/privacy"
                className="font-semibold text-emerald-600 underline-offset-4 hover:underline dark:text-emerald-400"
              >
                Privacy Policy
              </Link>
              .
            </p>
          </FadeContent>
        </Container>
      </section>
    </div>
  );
};

export default Terms;
