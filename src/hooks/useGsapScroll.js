import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const useGsapScroll = (selector, animation = {}) => {
  const ref = useRef(null);

  useEffect(() => {
    const elements = ref.current?.querySelectorAll
      ? ref.current.querySelectorAll(selector)
      : ref.current;

    if (!elements) return;

    const defaults = {
      opacity: 0,
      y: 50,
      duration: 0.8,
      stagger: 0.15,
      ease: "power3.out",
    };

    const config = { ...defaults, ...animation };

    const ctx = gsap.context(() => {
      gsap.from(elements, {
        ...config,
        scrollTrigger: {
          trigger: elements,
          start: "top 85%",
          toggleActions: "play none none reverse",
        },
      });
    }, ref);

    return () => ctx.revert();
  }, [selector, animation]);

  return ref;
};

export default useGsapScroll;
