const StatsCard = ({ label, value, color = "text-gray-400", suffix = "", Icon }) => {
	return (
		<div className='card border-2 border-base-200 rounded-lg p-6 hover:bg-base-200'>
			<div className='flex gap-1 items-center mb-3'>
				{Icon && <Icon className={`text-xl ${color}`} />}
				<p className='text-gray-400'>{label}</p>
			</div>
			<p className={`text-2xl font-semibold ${color}`}>
				{value} <span className='text-gradient text-base'>{suffix}</span>
			</p>
		</div>
	);
};

export default StatsCard;
