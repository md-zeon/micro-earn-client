const StatsCard = ({ label, value, color = "text-gray-400", suffix = "", Icon, subtitle }) => {
	return (
		<div className='card border border-gray-600 hover:scale-105 shadow-inner p-6 hover:shadow-2xl transition-all duration-300 sm:text-start text-center'>
			<div className='flex items-center sm:justify-between justify-center mb-2'>
				{label && <h3 className='text-sm font-medium'>{label}</h3>}
				{Icon && <Icon className={`text-base ${color ? color : "text-base-content"}`} />}
			</div>
			<h2 className={`text-2xl font-bold ${color ? color : ""}`}>
				{value} {suffix && <span className='text-gradient text-base'>{suffix}</span>}
			</h2>
			{subtitle && <p className="text-xs text-gray-500">{subtitle}</p>}
		</div>
	);
};

export default StatsCard;
