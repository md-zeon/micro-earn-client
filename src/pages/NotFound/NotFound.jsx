import { Link } from "react-router";
import notfoundImg from "../../assets/notfound.svg";

const NotFound = () => {
	return (
		<div className='flex flex-col items-center justify-center min-h-screen bg-base-content px-4 text-center text-base-100'>
			<img
				src={notfoundImg}
				alt='Page Not Found Illustration'
				className='w-72 md:w-96 mb-6'
			/>
			<h1 className='text-4xl font-bold mb-2'>404 - Page Not Found</h1>
			<p className='text-gray-600 mb-6'>The page you're looking for doesn't exist or has been moved.</p>
			<Link
				to='/'
				className='px-6 py-3 bg-gradient-warning rounded-2xl hover:scale-105'
			>
				Back to Home
			</Link>
		</div>
	);
};

export default NotFound;
