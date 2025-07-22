const StatsCard = ({ label, value, color = "text-gray-800" }) => (
	<div className='card border-2 border-base-200 rounded-lg p-6 hover:bg-base-200'>
		<p className='text-gray-400'>{label}</p>
		<p className={`text-2xl font-semibold ${color}`}>{value}</p>
	</div>
);
export default StatsCard;
