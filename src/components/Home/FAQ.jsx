import { motion } from "motion/react";
import { Link } from "react-router";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { LuMessageCircle, LuRocket } from "react-icons/lu";
import SectionHeading from "./SectionHeading";

const faqs = [
  {
    question: "What is MicroEarn and how does it work?",
    answer:
      "MicroEarn is a platform where Buyers can post small digital tasks and Workers complete them in exchange for coins. Coins can later be withdrawn as real money.",
  },
  {
    question: "How do I become a Worker on MicroEarn?",
    answer:
      "To become a Worker, sign up and select 'Worker' as your role. After logging in, you can browse available tasks, complete them, and earn coins.",
  },
  {
    question: "How do I post a task as a Buyer?",
    answer:
      "Sign up as a Buyer, then go to your dashboard and use the 'Post a Task' option. Fill in task details, required workers, and coin rewards per task.",
  },
  {
    question: "How do coin payments and withdrawals work?",
    answer:
      "Buyers purchase coins using Stripe. Workers earn coins by completing tasks. Once a Worker reaches 200 coins, they can request a withdrawal (20 coins = $1).",
  },
  {
    question: "What happens if a Buyer rejects a submission?",
    answer:
      "If a task submission is rejected, the worker does not earn coins and the task is reopened for other workers. Feedback may be provided for improvement.",
  },
  {
    question: "Can I switch roles from Worker to Buyer?",
    answer:
      "Each account is assigned a single role. To use the platform as both a Buyer and a Worker, you'll need to create a separate account for the other role.",
  },
];

const FAQ = () => {
  return (
    <section className="relative overflow-hidden py-20 md:py-28">
      <div className="absolute top-1/4 -left-24 size-72 rounded-full bg-emerald-500/5 blur-3xl" />

      <div className="relative mx-auto max-w-4xl px-4">
        <SectionHeading
          eyebrow="Got questions?"
          title="Frequently asked questions"
          description="Quick answers to the things people ask most about MicroEarn."
        />

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="mt-12 rounded-3xl border border-border/70 bg-card/50 p-4 backdrop-blur-sm md:p-6"
        >
          <Accordion type="single" collapsible defaultValue="item-0">
            {faqs.map(({ question, answer }, index) => (
              <AccordionItem
                key={index}
                value={`item-${index}`}
                className="border-b-border/60 px-2 py-1 last:border-b-0"
              >
                <AccordionTrigger className="py-4 text-base font-semibold hover:no-underline">
                  {question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  {answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-10 flex flex-col items-center justify-center gap-4 text-center sm:flex-row"
        >
          <p className="text-sm text-muted-foreground">
            Still have questions? We're happy to help.
          </p>
          <Button
            variant="outline"
            size="sm"
            className="gap-2 rounded-full"
            render={<Link to="/contact" />}
          >
            <LuMessageCircle className="size-4" />
            Contact support
          </Button>
          <Button size="sm" className="gap-2 rounded-full" render={<Link to="/register" />}>
            <LuRocket className="size-4" />
            Get started
          </Button>
        </motion.div>
      </div>
    </section>
  );
};

export default FAQ;
