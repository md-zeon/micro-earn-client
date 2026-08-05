import { HandCoins } from "lucide-react";
import { Link } from "react-router";

const Logo = () => {
	return (
		<Link
			to='/'
			className='flex items-center gap-1.5 sm:gap-2 hover:opacity-80 transition-opacity'
		>
			<span className='bg-gradient w-8 h-8 rounded-lg flex items-center justify-center text-white'>
				<HandCoins className="size-5" />
			</span>
			<span className='text-lg sm:text-2xl font-bold text-gradient'>
				MicroEarn
			</span>
		</Link>
	);
};

export default Logo;
