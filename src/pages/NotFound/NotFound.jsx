import { Link } from "react-router";
import notfoundImg from "../../assets/notfound.svg";
import PageTitle from "../../components/PageTitle";
import { House } from "lucide-react";

const NotFound = () => {
	return (
		<div className='flex flex-col items-center justify-center min-h-screen bg-background px-4 text-center text-foreground'>
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
			<p className='text-muted-foreground mb-6 max-w-md'>The page you're looking for doesn't exist or has been moved.</p>
			<Link
				to='/'
				className='px-6 py-3 bg-gradient rounded-2xl flex items-center gap-2 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring'
			>
				<House className='w-5 h-5' /> Back to Home
			</Link>
		</div>
	);
};

export default NotFound;
