import useAvailableCoins from "../hooks/useAvailableCoins";
import { LuCoins } from "react-icons/lu";

const AvailableCoins = () => {
	const { microCoins, isMicroCoinsLoading } = useAvailableCoins();

	return (
		<div className='flex gap-2 items-center'>
			<LuCoins className='text-blue-400' />
			{isMicroCoinsLoading ? (
				<div className='h-6 w-24 bg-base-300 rounded-xl animate-pulse'></div>
			) : (
				<span className='badge bg-gradient hover:opacity-80'>
					{microCoins ?? 0} <span className='hidden sm:inline md:text-xs'>Micro Coins</span>
				</span>
			)}
		</div>
	);
};

export default AvailableCoins;
