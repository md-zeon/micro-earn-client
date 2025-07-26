import Container from "../../components/Container";
import BestWorkers from "../../components/Home/BestWorkers";
import FAQ from "../../components/Home/FAQ";
import Hero from "../../components/Home/Hero";
import HowItWorks from "../../components/Home/HowItWorks";
import TestimonialSlider from "../../components/Home/TestimonialSlider";
import WhyChooseUs from "../../components/Home/WhyChooseUs";

const Home = () => {
	return (
		<Container>
			<div className='overflow-hidden'>
				<Hero />
				<HowItWorks />
				<BestWorkers />
				<TestimonialSlider />
				<WhyChooseUs />
				<FAQ />
			</div>
		</Container>
	);
};

export default Home;
