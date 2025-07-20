import { Skeleton } from "@radix-ui/themes/dist/cjs/index.js";
import useAvailableCoins from "../hooks/useAvailableCoins";
import { LuCoins } from "react-icons/lu";

const AvailableCoins = () => {
	const { microCoins, isMicroCoinsLoading } = useAvailableCoins();

	return (
		<>
			{/* Available Coins */}
			<div className='flex gap-2 items-center'>
				<LuCoins className='text-blue-400' />
				<Skeleton loading={isMicroCoinsLoading}>
					<span className='badge bg-gradient hover:opacity-80'>
						{microCoins ?? 0} <span className='hidden sm:inline md:text-xs'>Micro Coins</span>
					</span>
				</Skeleton>
			</div>
		</>
	);
};

export default AvailableCoins;
