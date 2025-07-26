import Container from "../../components/Container";
import BestWorkers from "../../components/Home/BestWorkers";
import FAQ from "../../components/Home/FAQ";
import Hero from "../../components/Home/Hero";
import HowItWorks from "../../components/Home/HowItWorks";
import TestimonialSlider from "../../components/Home/TestimonialSlider";
import WhyChooseUs from "../../components/Home/WhyChooseUs";
import PageTitle from "../../components/PageTitle";

const Home = () => {
	return (
		<Container>
			<PageTitle
				title='MicroEarn | Earn Money from Small Online Tasks'
				description='Join MicroEarn to make money by completing small online tasks. A platform built for freelancers and task providers.'
			/>
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
