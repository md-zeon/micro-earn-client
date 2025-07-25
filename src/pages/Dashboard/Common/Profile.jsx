import { LuMail, LuCalendarDays, LuShield, LuUser, LuCoins, LuPen } from "react-icons/lu";
import useAuth from "../../../hooks/useAuth";
import useRole from "../../../hooks/useRole";
import useAvailableCoins from "../../../hooks/useAvailableCoins";

const Profile = () => {
	const { user } = useAuth();
	const { role, isLoading: roleLoading } = useRole();
	const { microCoins: coins, isMicroCoinsLoading } = useAvailableCoins();

	const createdAt = user?.metadata?.creationTime || "2024-01-01";
	const memberSince = new Date(createdAt).toISOString().split("T")[0];

	if (roleLoading || isMicroCoinsLoading) return <div className='text-center py-10'>Loading...</div>;

	return (
		<div className='max-w-3xl mx-auto sm:p-4 md:p-6'>
			<div className='flex items-center justify-between mb-4'>
				<h2 className='text-2xl font-bold'>My Profile</h2>
				<button className='btn btn-sm btn-outline bg-base-300 text-base-content'><LuPen /> Edit Profile</button>
			</div>

			<div className='card bg-base-100 border shadow-sm'>
				<div className='card-body'>
					<h3 className='text-lg font-semibold mb-4'>Profile Information</h3>

					<div className='flex flex-col md:flex-row gap-6 md:items-center'>
						<img
							src={user?.photoURL || "https://t4.ftcdn.net/jpg/05/89/93/27/360_F_589932782_vQAEAZhHnq1QCGu5ikwrYaQD0Mmurm0N.jpg"}
							alt='User Avatar'
							className='w-24 h-24 rounded-full mx-auto sm:mx-0 border'
						/>
						<div>
							<h2 className='text-2xl font-bold flex items-center justify-center sm:justify-start gap-2'>{user?.displayName || "Unnamed User"}</h2>

							<div className='flex items-center justify-center sm:justify-start gap-2 mt-2'>
								<span className='badge badge-soft capitalize'>{role}</span>
								<span className='flex items-center gap-1 text-sm text-gradient'>
									<LuCoins className="text-blue-500" /> {coins} coins
								</span>
							</div>
						</div>
					</div>

					<hr className='my-6' />

					<div className='grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm text-base-content'>
						<div className='flex items-start gap-3'>
							<LuMail className='text-xl mt-0.5' />
							<div>
								<p>Email</p>
								<p className='font-medium'>{user?.email}</p>
							</div>
						</div>

						<div className='flex items-start gap-3'>
							<LuCalendarDays className='text-xl mt-0.5' />
							<div>
								<p>Member Since</p>
								<p className='font-medium'>{memberSince}</p>
							</div>
						</div>

						<div className='flex items-start gap-3'>
							<LuShield className='text-xl mt-0.5' />
							<div>
								<p>Account Type</p>
								<p className='font-medium capitalize'>{role}</p>
							</div>
						</div>

						<div className='flex items-start gap-3'>
							<LuUser className='text-xl mt-0.5' />
							<div>
								<p>Status</p>
								<p className='font-medium text-green-600'>Active</p>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Profile;
