import { useState } from "react";
import Container from "../../components/Container";
import BestWorkers from "../../components/Home/BestWorkers";
import FAQ from "../../components/Home/FAQ";
import Hero from "../../components/Home/Hero";
import HowItWorks from "../../components/Home/HowItWorks";
import TestimonialSlider from "../../components/Home/TestimonialSlider";
import WhyChooseUs from "../../components/Home/WhyChooseUs";
import Preloader from "../../components/PreLoader";

const Home = () => {
	const [isLoading, setIsLoading] = useState(true);
	return (
		<Container>
			{isLoading ? (
				<Preloader onComplete={() => setIsLoading(false)} />
			) : (
				<div className='overflow-x-hidden'>
					<Hero />
					<HowItWorks />
					<BestWorkers />
					<TestimonialSlider />
					<WhyChooseUs />
					<FAQ />
				</div>
			)}
		</Container>
	);
};

export default Home;
