import { Link } from "react-router";
import { motion } from "motion/react";
import { Button } from "@/components/ui/button";
import GlassCard from "../ui/GlassCard";

const CTA = () => {
  return (
    <section className="py-16 bg-muted/30">
      <div className="container mx-auto px-4">
        <GlassCard className="rounded-2xl p-12 text-center shadow-2xl">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-3xl md:text-4xl font-bold mb-4"
          >
            Ready to Start{" "}
            <span className="text-gradient">Earning or Hiring?</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-muted-foreground max-w-2xl mx-auto mb-8"
          >
            Join thousands of users who are already earning coins or getting
            work done on MicroEarn. Sign up today and experience the future of
            micro-tasking.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Link to="/register">
              <Button className="bg-gradient font-semibold px-8 py-6 rounded-full shadow-lg hover:shadow-xl transition-shadow">
                Get Started as Worker
              </Button>
            </Link>

            <Link to="/register">
              <Button
                variant="outline"
                className="font-semibold px-8 py-6 rounded-full shadow-lg hover:shadow-xl transition-shadow"
              >
                Post Tasks as Buyer
              </Button>
            </Link>
          </motion.div>
        </GlassCard>
      </div>
    </section>
  );
};

export default CTA;
