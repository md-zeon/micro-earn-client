import Container from "../../components/Container";
import BestWorkers from "../../components/Home/BestWorkers";
import Hero from "../../components/Home/Hero";
import HowItWorks from "../../components/Home/HowItWorks";
import TestimonialSlider from "../../components/Home/TestimonialSlider";

const Home = () => {
	return (
		<Container>
			<Hero />
			<HowItWorks />
			<BestWorkers />
			<TestimonialSlider />
		</Container>
	);
};

export default Home;
