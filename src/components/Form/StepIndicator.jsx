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
				<div className='absolute top-1/2 left-0 right-0 h-1 bg-border z-0 transform -translate-y-1/2 rounded-full'></div>

				{steps.slice(0, totalSteps).map((s) => {
					const isActive = step === s.id;
					const isCompleted = step > s.id;

					return (
						<div
							key={s.id}
							className='relative z-10 flex flex-col items-center w-full text-center'
						>
							<div
								className='flex items-center justify-center rounded-full'
								aria-current={isActive ? "step" : undefined}
							>
								<div
									className={`w-10 h-10 flex items-center justify-center rounded-full border-2 text-lg transition-all duration-300
										${
											isActive
												? "bg-gradient text-white border-none shadow-md"
												: isCompleted
												? "bg-emerald-500 text-white border-emerald-500"
												: "bg-card text-muted-foreground border-border"
										}`}
								>
									{isCompleted ? <LuCheck /> : s.icon}
								</div>
							</div>

							{/* Label (hidden on mobile) */}
							<span
								className={`mt-2 text-xs font-medium transition-opacity duration-300 sm:block hidden ${
									isActive ? "text-foreground" : isCompleted ? "text-emerald-600 dark:text-emerald-400" : "text-muted-foreground"
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
