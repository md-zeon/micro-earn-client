import { useEffect, useRef } from "react";
import { Link } from "react-router";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowRight, Coins, Play, Sparkles } from "lucide-react";
import usePrefersReducedMotion from "@/hooks/usePrefersReducedMotion";
import SplitText from "@/components/effects/SplitText";
import { Avatar, AvatarFallback, AvatarImage, AvatarGroup } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";

gsap.registerPlugin(ScrollTrigger);

const stats = [
  { value: 10000, suffix: "+", label: "Active earners" },
  { value: 50000, prefix: "$", suffix: "K+", label: "Paid out" },
  { value: 99, suffix: "%", label: "Payout success" },
];

const trustAvatars = [
  "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=80&q=70",
  "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&q=70",
  "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=80&q=70",
  "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=80&q=70",
];

const Hero = () => {
  const sectionRef = useRef(null);
  const prefersReducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      // Intro timeline
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
      tl.from(".hero-badge", { opacity: 0, y: 24, duration: 0.6 })
        .from(".hero-sub", { opacity: 0, y: 28, duration: 0.7 }, "-=0.3")
        .from(".hero-cta", { opacity: 0, y: 24, duration: 0.6, stagger: 0.15 }, "-=0.5")
        .from(".hero-trust", { opacity: 0, y: 20, duration: 0.6 }, "-=0.35")
        .from(".hero-stat", {
          opacity: 0,
          y: 26,
          duration: 0.6,
          stagger: 0.12,
        }, "-=0.4");

      // Floating coins parallax + fade on scroll
      gsap.utils.toArray(".hero-coin").forEach((coin, i) => {
        gsap.to(coin, {
          y: () => (i % 2 === 0 ? -80 : 80),
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top top",
            end: "bottom top",
            scrub: true,
          },
        });
      });

      gsap.to(".hero-content", {
        opacity: 0,
        y: -60,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "85% top",
          scrub: true,
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [prefersReducedMotion]);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-[100svh] overflow-hidden flex items-center justify-center"
    >
      {/* Background */}
      <div className="aurora">
        <div className="blob" />
      </div>
      <div className="grid-pattern absolute inset-0" />
      <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-background to-transparent" />

      {/* Floating coins */}
      <Coins className="hero-coin absolute top-[18%] left-[8%] hidden lg:block h-10 w-10 text-emerald-500/25 rotate-12" />
      <Coins className="hero-coin absolute top-[64%] left-[5%] hidden lg:block h-7 w-7 text-teal-500/25 -rotate-12" />
      <Coins className="hero-coin absolute top-[22%] right-[9%] hidden lg:block h-8 w-8 text-emerald-500/25" />
      <Coins className="hero-coin absolute top-[70%] right-[6%] hidden lg:block h-12 w-12 text-teal-500/20 rotate-45" />
      <Coins className="hero-coin absolute top-[40%] left-[45%] hidden lg:block h-6 w-6 text-emerald-500/15" />

      <div className="hero-content relative z-10 mx-auto w-full max-w-5xl px-4 py-24 text-center">
        {/* Badge */}
        <div className="hero-badge">
          <span className="inline-flex items-center gap-2 rounded-full border border-emerald-500/25 bg-emerald-500/10 px-4 py-1.5 text-sm font-medium text-emerald-600 backdrop-blur-sm dark:text-emerald-400">
            <span className="relative flex h-2 w-2">
              <span className="animate-pulse-ring absolute inline-flex h-full w-full rounded-full bg-emerald-500" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
            </span>
            Trusted by 10,000+ verified earners
          </span>
        </div>

        {/* Headline */}
        <h1 className="mt-8 text-5xl font-extrabold leading-[1.05] tracking-tight text-balance md:text-7xl lg:text-8xl">
          <SplitText
            segments={[
              { text: "Small" },
              { text: "tasks.", className: "text-gradient" },
              { text: "Real" },
              { text: "earnings.", className: "text-gradient" },
            ]}
          />
        </h1>

        <p className="hero-sub mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-muted-foreground text-pretty md:text-xl">
          MicroEarn connects you with verified micro-tasks from trusted buyers.
          Complete simple work, earn real money, withdraw anytime.
        </p>

        {/* CTAs */}
        <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Link to="/register" className="hero-cta">
            <Button
              size="lg"
              className="h-13 w-full gap-2 rounded-full px-8 text-base shadow-lg shadow-emerald-500/25 transition-transform duration-300 hover:-translate-y-0.5 sm:w-auto"
            >
              Start earning now
              <ArrowRight className="size-4 transition-transform group-hover/button:translate-x-0.5" />
            </Button>
          </Link>
          <Link to="/all-tasks" className="hero-cta">
            <Button
              size="lg"
              variant="outline"
              className="h-13 w-full gap-2 rounded-full px-8 text-base sm:w-auto"
            >
              <Play className="size-4" />
              Browse tasks
            </Button>
          </Link>
        </div>

        {/* Trust row */}
        <div className="hero-trust mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <AvatarGroup>
            {trustAvatars.map((src, i) => (
              <Avatar key={i} size="lg">
                <AvatarImage src={src} alt="Earner" />
                <AvatarFallback className="bg-emerald-500/15 text-emerald-600 dark:text-emerald-400">
                  E
                </AvatarFallback>
              </Avatar>
            ))}
          </AvatarGroup>
          <div className="flex flex-col items-center sm:items-start">
            <div className="flex items-center gap-2">
              <div className="flex text-amber-400">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Sparkles key={i} className="size-4 fill-current" />
                ))}
              </div>
              <span className="text-sm font-semibold">4.9/5</span>
            </div>
            <p className="text-sm text-muted-foreground">
              from thousands of happy workers & buyers
            </p>
          </div>
        </div>

        {/* Stats strip */}
        <div className="mx-auto mt-16 grid max-w-2xl grid-cols-3 gap-4">
          {stats.map((stat, i) => (
            <div
              key={i}
              className="hero-stat rounded-2xl border border-border/60 bg-card/60 px-4 py-5 backdrop-blur-sm"
            >
              <div className="text-2xl font-bold tracking-tight md:text-3xl">
                <span className="text-gradient">
                  {stat.prefix}
                  {stat.value.toLocaleString()}
                  {stat.suffix}
                </span>
              </div>
              <p className="mt-1 text-xs text-muted-foreground md:text-sm">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Hero;
