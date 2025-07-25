import { LuHandCoins } from "react-icons/lu";
import { Link } from "react-router";

const Logo = () => {
	return (
		<Link
			to='/'
			className='text-xl flex items-center gap-1 sm:gap-2 hover:opacity-80 transition-opacity'
		>
			{" "}
			<span className='bg-gradient w-8 h-8 rounded-lg flex items-center justify-center'>
				<LuHandCoins />
			</span>{" "}
			<span className='text-lg sm:text-2xl font-bold text-gradient'>MicroEarn</span>
		</Link>
	);
};

export default Logo;
