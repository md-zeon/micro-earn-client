import { motion } from "motion/react";
import HowItWorksIllustration from "../../assets/how-it-works.svg";
import { LuClipboardList, LuCoins, LuUsers } from "react-icons/lu";

const steps = [
  {
    icon: <LuClipboardList className="text-3xl text-primary shrink-0" />,
    title: "Post a Task",
    description:
      "Buyers create task listings with clear instructions and coin rewards.",
  },
  {
    icon: <LuUsers className="text-3xl text-primary shrink-0" />,
    title: "Complete the Work",
    description:
      "Workers browse available tasks, do the work, and submit proof as required.",
  },
  {
    icon: <LuCoins className="text-3xl text-primary shrink-0" />,
    title: "Earn Coins",
    description:
      "Once approved, workers earn coins that can be withdrawn or reinvested.",
  },
];

const HowItWorks = () => {
  return (
    <section className="py-20 px-4 md:px-10 bg-background">
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-10 items-center">
        {/* Left: Steps */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gradient">
            How MicroEarn Works
          </h2>
          <p className="text-muted-foreground mb-10 max-w-lg">
            MicroEarn is simple and flexible. Here's how you can start earning
            or hiring today.
          </p>

          <div className="space-y-8">
            {steps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
                className="flex items-start gap-4"
              >
                <div className="p-3 bg-muted rounded-xl">{step.icon}</div>
                <div>
                  <h3 className="text-lg font-semibold mb-1">{step.title}</h3>
                  <p className="text-sm text-muted-foreground">
                    {step.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Right: Illustration */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <img
            src={HowItWorksIllustration}
            alt="How it works illustration"
            className="w-full max-w-md mx-auto"
          />
        </motion.div>
      </div>
    </section>
  );
};

export default HowItWorks;
