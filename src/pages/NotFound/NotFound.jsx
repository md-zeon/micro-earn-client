import { Link } from "react-router";
import notfoundImg from "../../assets/notfound.svg";
import PageTitle from "../../components/PageTitle";
import { LuHouse } from "react-icons/lu";

const NotFound = () => {
	return (
		<div className='flex flex-col items-center justify-center min-h-screen bg-base-100 px-4 text-center text-base-content'>
			<PageTitle
				title="Page Not Found"
				description="The page you're looking for doesn't exist. Return to MicroEarn homepage."
			/>
			<img
				src={notfoundImg}
				alt='Page Not Found Illustration'
				className='w-72 md:w-96 mb-6'
			/>
			<h1 className='text-4xl font-bold mb-2 text-gradient'>404 - Page Not Found</h1>
			<p className='text-gray-600 mb-6 max-w-md'>The page you're looking for doesn't exist or has been moved.</p>
			<Link
				to='/'
				className='px-6 py-3 bg-gradient rounded-2xl hover:scale-105 flex items-center gap-2'
			>
				<LuHouse className='w-5 h-5' /> Back to Home
			</Link>
		</div>
	);
};

export default NotFound;
