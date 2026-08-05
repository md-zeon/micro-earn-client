import Container from "../../components/Container";
import BestWorkers from "../../components/Home/BestWorkers";
import FAQ from "../../components/Home/FAQ";
import Hero from "../../components/Home/Hero";
import HowItWorks from "../../components/Home/HowItWorks";
import TestimonialSlider from "../../components/Home/TestimonialSlider";
import WhyChooseUs from "../../components/Home/WhyChooseUs";
import PageTitle from "../../components/PageTitle";
import FeaturedTasks from "../../components/Home/FeaturedTasks";
import Newsletter from "../../components/Home/Newsletter";
import StatsSection from "../../components/Home/StatsSection";
import CTA from "../../components/Home/CTA";
import TrustBar from "../../components/Home/TrustBar";
import ScrollProgress from "../../components/Home/ScrollProgress";

const Home = () => {
	return (
		<Container>
			<ScrollProgress />
			<PageTitle
				title='MicroEarn | Earn Money from Small Online Tasks'
				description='Join MicroEarn to make money by completing small online tasks. A platform built for freelancers and task providers.'
			/>
			<div className='overflow-hidden'>
				<Hero />
				<TrustBar />
				<StatsSection />
				<HowItWorks />
				<WhyChooseUs />
				<FeaturedTasks />
				<BestWorkers />
				<TestimonialSlider />
				<FAQ />
				<CTA />
				<Newsletter />
			</div>
		</Container>
	);
};

export default Home;
