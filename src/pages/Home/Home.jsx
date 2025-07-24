import Container from "../../components/Container";
import BestWorkers from "../../components/Home/BestWorkers";
import Hero from "../../components/Home/Hero";
import HowItWorks from "../../components/Home/HowItWorks";
import TestimonialSlider from "../../components/Home/TestimonialSlider";
import WhyChooseUs from "../../components/Home/WhyChooseUs";

const Home = () => {
	return (
		<Container>
			<Hero />
			<HowItWorks />
			<BestWorkers />
			<TestimonialSlider />
			<WhyChooseUs />
		</Container>
	);
};

export default Home;
