import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, EffectFade } from "swiper/modules";
import { motion } from "motion/react";
import { Link } from "react-router";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/effect-fade";

const slides = [
	{
		title: "Turn Time into Income",
		description:
			"MicroEarn connects workers and buyers for simple, paid micro tasks. Freedom to earn, flexibility to choose.",
		image: "https://i.ibb.co/F4ZZyyJp/slide2.png",
	},
	{
		title: "Empower Your Earning",
		description:
			"Complete micro-tasks on your schedule. No commitments, just real earnings every day.",
		image: "https://i.ibb.co/CKJZxzR4/slide4.png",
	},
	{
		title: "Find Talent, Get Work Done",
		description:
			"As a buyer, post tasks, track progress, and get results fast with verified workers.",
		image: "https://i.ibb.co/fdNKBGps/slide1.png",
	},
];

const Hero = () => {
	return (
		<section className="relative h-[80vh]">
			<Swiper
				modules={[Autoplay, Pagination, EffectFade]}
				effect="fade"
				loop
				autoplay={{ delay: 5000 }}
				pagination={{ clickable: true }}
				className="h-full"
			>
				{slides.map((slide, index) => (
					<SwiperSlide key={index}>
						<div
							className="h-full bg-cover bg-center relative"
							style={{ backgroundImage: `url(${slide.image})` }}
						>
							<div className="absolute inset-0 bg-black/50" />

							<div className="relative z-10 flex flex-col items-center justify-center h-full text-white text-center px-4">
								<motion.h1
									initial={{ opacity: 0, y: 40 }}
									animate={{ opacity: 1, y: 0 }}
									transition={{ duration: 0.8 }}
									className="text-4xl md:text-6xl font-bold leading-tight"
								>
									{slide.title}
								</motion.h1>

								<motion.p
									initial={{ opacity: 0, y: 20 }}
									animate={{ opacity: 1, y: 0 }}
									transition={{ delay: 0.3, duration: 0.7 }}
									className="mt-4 text-lg md:text-xl max-w-2xl"
								>
									{slide.description}
								</motion.p>

								<motion.div
									initial={{ opacity: 0, scale: 0.9 }}
									animate={{ opacity: 1, scale: 1 }}
									transition={{ delay: 0.6, duration: 0.5 }}
									className="mt-6"
								>
									<Link
										to="/register"
										className="bg-gradient font-semibold py-3 px-6 rounded-xl transition-all duration-300"
									>
										Get Started
									</Link>
								</motion.div>
							</div>
						</div>
					</SwiperSlide>
				))}
			</Swiper>
		</section>
	);
};

export default Hero;
