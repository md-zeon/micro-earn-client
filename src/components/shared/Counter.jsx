"use client";
import { motion, useMotionValue, animate } from "motion/react";
import { useEffect, useState } from "react";

const Counter = ({ value, suffix = "" }) => {
	const count = useMotionValue(0);
	const [display, setDisplay] = useState(0);

	useEffect(() => {
		const controls = animate(count, value, {
			duration: 5,
			ease: "easeOut",
			onUpdate: (latest) => {
				setDisplay(Math.round(latest));
			},
		});
		return () => controls.stop();
	}, [value, count]);

	return (
		<motion.span>
			{display.toLocaleString()}
			{suffix}
		</motion.span>
	);
};

export default Counter;
