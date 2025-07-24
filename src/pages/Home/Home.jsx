import { Link } from "react-router";

const Home = () => {
	return (
		<div className='home-container'>
			<h1>Welcome to Micro-Earn</h1>
			<p>Start earning money by completing tasks and challenges.</p>
			<Link
				to='/tasks'
				className='btn btn-primary'
			>
				Get Started
			</Link>
		</div>
	);
};

export default Home;
