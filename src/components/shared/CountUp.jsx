import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const CountUp = ({ value, suffix = "", prefix = "", decimals = 0 }) => {
  const ref = useRef(null);

  useEffect(() => {
    const obj = { val: 0 };
    const tween = gsap.to(obj, {
      val: value,
      duration: 2.2,
      ease: "power2.out",
      scrollTrigger: {
        trigger: ref.current,
        start: "top 90%",
        once: true,
      },
      onUpdate: () => {
        if (ref.current) {
          ref.current.textContent = `${prefix}${obj.val.toFixed(
            decimals,
          )}${suffix}`;
        }
      },
    });

    return () => tween.scrollTrigger?.kill();
  }, [value, suffix, prefix, decimals]);

  return (
    <span ref={ref} className="tabular-nums">
      {prefix}0{suffix}
    </span>
  );
};

export default CountUp;
