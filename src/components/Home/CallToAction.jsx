import { Link } from "react-router";
import { motion } from "motion/react";
import { LuRocket, LuUserCheck } from "react-icons/lu";

const CallToAction = () => {
	return (
		<motion.section
			initial={{ opacity: 0, y: 50 }}
			whileInView={{ opacity: 1, y: 0 }}
			viewport={{ once: true }}
			transition={{ duration: 0.6 }}
			className="relative z-10 my-20 overflow-hidden rounded-2xl bg-gradient-to-r from-blue-600 via-green-600 to-blue-500 p-10 text-white shadow-lg"
		>
			<div className="mx-auto max-w-4xl text-center">
				<h2 className="text-3xl font-bold md:text-4xl mb-4">
					Ready to Get Started?
				</h2>
				<p className="mb-8 text-lg md:text-xl">
					Whether you want to earn coins or get tasks done — MicroEarn has you covered.
				</p>
				<div className="flex justify-center flex-wrap gap-4">
					<Link
						to="/tasks"
						className="inline-flex items-center gap-2 rounded-xl bg-white px-6 py-3 text-indigo-600 font-semibold hover:bg-gray-100 transition"
					>
						<LuUserCheck className="text-xl" />
						Start Earning
					</Link>
					<Link
						to="/dashboard/add-task"
						className="inline-flex items-center gap-2 rounded-xl bg-black px-6 py-3 text-white font-semibold hover:bg-gray-800 transition"
					>
						<LuRocket className="text-xl" />
						Post a Task
					</Link>
				</div>
			</div>
		</motion.section>
	);
};

export default CallToAction;
