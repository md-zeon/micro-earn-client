import { motion } from "motion/react";
import { LuClock, LuListTodo, LuCoins } from "react-icons/lu";
import illustration from "../../assets/why-choose.svg";

const reasons = [
  {
    icon: <LuClock className="text-4xl text-primary" />,
    title: "Freedom to Earn Anytime",
    description:
      "MicroEarn empowers you to work whenever you want. No pressure — just tasks that pay.",
  },
  {
    icon: <LuListTodo className="text-4xl text-primary" />,
    title: "Hire Instantly, Without Hassle",
    description:
      "Buyers post simple tasks and connect with thousands of ready-to-work users instantly.",
  },
  {
    icon: <LuCoins className="text-4xl text-primary" />,
    title: "Fair & Transparent Earnings",
    description:
      "Earn coins for every approved task. Withdraw real cash — no hidden cuts or delays.",
  },
];

const WhyChooseUs = () => {
  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4 flex flex-col-reverse lg:flex-row items-center gap-12">
        {/* Left Content */}
        <motion.div
          className="w-full lg:w-1/2"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-center sm:text-start">
            Why Choose <span className="text-gradient">MicroEarn?</span>
          </h2>
          <p className="text-muted-foreground mb-8 max-w-lg text-center sm:text-start">
            Whether you're here to earn or get things done — MicroEarn gives you
            full control, real value, and instant results.
          </p>

          <div className="space-y-6">
            {reasons.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.3 + index * 0.1 }}
                className="flex items-start gap-4"
              >
                <div className="p-3 bg-muted rounded-xl">{item.icon}</div>
                <div>
                  <h4 className="text-lg font-semibold">{item.title}</h4>
                  <p className="text-sm text-muted-foreground">
                    {item.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Right Illustration */}
        <motion.div
          className="w-full lg:w-1/2"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <img
            src={illustration}
            alt="Why Choose Us Illustration"
            className="w-full max-w-md mx-auto"
          />
        </motion.div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
