// components/ui/GlassCard.jsx
const GlassCard = ({ children, className = "" }) => {
	return (
		<div
			className={`group relative p-6 rounded-2xl backdrop-blur-xl hover:shadow-gray-500/30 hover:shadow-2xl hover:scale-[1.02] hover:-translate-y-1 active:scale-95 transition-all duration-500 ease-out cursor-pointer hover:border-green-400/60 overflow-hidden ${className}`}
		>
			{/* Moving light sweep on hover */}
			<div className='absolute inset-0 bg-gradient-to-r from-transparent via-gray-500/30 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out'></div>

			{/* Glow background on hover */}
			<div className='absolute inset-0 rounded-2xl bg-gradient-to-r from-gray-500/10 via-gray-500/20 to-gray-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500'></div>

			{/* Actual content */}
			<div className='relative z-10'>{children}</div>
		</div>
	);
};

export default GlassCard;
