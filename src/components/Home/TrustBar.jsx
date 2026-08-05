import {
  LuBadgeCheck,
  LuClock3,
  LuLock,
  LuShieldCheck,
  LuWallet,
  LuZap,
} from "react-icons/lu";

const items = [
  { icon: <LuZap className="size-4" />, label: "Tasks posted daily" },
  { icon: <LuBadgeCheck className="size-4" />, label: "Verified buyers & workers" },
  { icon: <LuWallet className="size-4" />, label: "Fast payouts" },
  { icon: <LuLock className="size-4" />, label: "Secure Stripe payments" },
  { icon: <LuClock3 className="size-4" />, label: "Earn on your schedule" },
  { icon: <LuShieldCheck className="size-4" />, label: "Reviewed submissions" },
];

const TrustBar = () => {
  const loop = [...items, ...items];

  return (
    <section className="relative border-y border-border/60 bg-muted/30 py-5">
      <div className="relative overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
        <div className="marquee-track flex w-max items-center gap-10">
          {loop.map((item, i) => (
            <div
              key={i}
              className="flex items-center gap-2.5 whitespace-nowrap text-sm font-medium text-muted-foreground"
            >
              <span className="text-emerald-500">{item.icon}</span>
              {item.label}
              <span className="ml-6 text-emerald-500/40">•</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TrustBar;
