import { Link } from "react-router";
import forbiddenImg from "../../assets/forbidden.svg";
import PageTitle from "../../components/PageTitle";

const Forbidden = () => {
	return (
		<div className='flex flex-col items-center justify-center min-h-screen bg-base-content text-base-100 px-4 text-center'>
			<PageTitle 
				title="Access Forbidden" 
				description="You don't have permission to access this page. Please contact support if this is an error." 
			/>
			<img
				src={forbiddenImg}
				alt='Forbidden Illustration'
				className='w-72 md:w-96 mb-6'
			/>
			<h1 className='text-4xl font-bold mb-2'>403 - Forbidden</h1>
			<p className='text-gray-600 mb-6'>You don't have permission to access this page.</p>
			<Link
				to='/'
				className='px-6 py-3 bg-gradient-error rounded-xl shadow hover:scale-105 duration-200'
			>
				Back to Home
			</Link>
		</div>
	);
};

export default Forbidden;
