import Container from "../../components/Container";
import BestWorkers from "../../components/Home/BestWorkers";
import Hero from "../../components/Home/Hero";
import HowItWorks from "../../components/Home/HowItWorks";

const Home = () => {
	return (
		<Container>
			<Hero />
			<HowItWorks />
			<BestWorkers />
		</Container>
	);
};

export default Home;
