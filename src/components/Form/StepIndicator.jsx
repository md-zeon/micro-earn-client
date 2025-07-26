import { LuUser, LuLock, LuCheck } from "react-icons/lu";

const steps = [
	{ id: 1, label: "Account Info", icon: <LuUser /> },
	{ id: 2, label: "Password & Security", icon: <LuLock /> },
];

const StepIndicator = ({ step, totalSteps }) => {
	return (
		<div className='w-full max-w-md mx-auto mb-6'>
			<div className='flex justify-between items-center relative px-2 sm:px-0'>
				{/* Progress Line */}
				<div className='absolute top-1/2 left-0 right-0 h-1 bg-gray-300 z-0 transform -translate-y-1/2 rounded-full'></div>

				{steps.slice(0, totalSteps).map((s) => {
					const isActive = step === s.id;
					const isCompleted = step > s.id;

					return (
						<div
							key={s.id}
							className='relative z-10 flex flex-col items-center w-full text-center'
						>
							<div
								className="tooltip tooltip-bottom"
								data-tip={s.label}
							>
								<div
									className={`w-10 h-10 flex items-center justify-center rounded-full border-2 text-lg transition-all duration-300
										${
											isActive
												? "bg-gradient text-white border-none shadow-md"
												: isCompleted
												? "bg-green-500 text-white border-green-500"
												: "bg-white text-gray-400 border-gray-300"
										}`}
								>
									{isCompleted ? <LuCheck /> : s.icon}
								</div>
							</div>

							{/* Label (hidden on mobile) */}
							<span
								className={`mt-2 text-xs font-medium transition-opacity duration-300 sm:block hidden ${
									isActive ? "text-base-content" : isCompleted ? "text-green-600" : "text-gray-400"
								}`}
							>
								{s.label}
							</span>
						</div>
					);
				})}
			</div>
		</div>
	);
};

export default StepIndicator;
