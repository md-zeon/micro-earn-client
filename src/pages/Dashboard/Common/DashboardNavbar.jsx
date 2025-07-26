import useAuth from "../../../hooks/useAuth";
import Logo from "../../../components/Logo";
import AvailableCoins from "../../../components/AvailableCoins";
import ThemeController from "../../../components/ThemeController";
import { LuMenu, LuX } from "react-icons/lu";
import { Link } from "react-router";
import NotificationPopup from "./NotificationPopup";

const DashboardNavbar = ({ role, isSidebarOpen, setIsSidebarOpen }) => {
	const { user, loading } = useAuth();
	return (
		<>
			<div className='flex items-center'>
				<button
					onClick={() => setIsSidebarOpen(!isSidebarOpen)}
					className='lg:hidden btn btn-sm btn-ghost px-1 sm:px-3 hover:bg-transparent border-0 outline-0'
					aria-label='Toggle Sidebar'
				>
					{isSidebarOpen ? <LuX className='w-5 h-5' /> : <LuMenu className='w-5 h-5' />}
				</button>
				<Logo />
			</div>

			<div className='flex items-center space-x-2 sm:space-x-4'>
				{/* Available Coins */}
				<span className='hidden md:block'>
					{loading ? <div className='skeleton h-6 w-24 rounded'></div> : <AvailableCoins />}
				</span>

				<ThemeController />

				{/* User info */}
				{loading ? (
					<div className='flex items-center gap-2'>
						<div className='skeleton w-10 h-10 rounded-full'></div>
						<div className='hidden sm:flex flex-col gap-1'>
							<div className='skeleton h-4 w-24 rounded'></div>
							<div className='skeleton h-3 w-16 rounded'></div>
						</div>
					</div>
				) : (
					<div className='flex items-center sm:space-x-2'>
						<Link to='/dashboard/profile'>
							<img
								src={
									user?.photoURL ||
									"https://t4.ftcdn.net/jpg/05/89/93/27/360_F_589932782_vQAEAZhHnq1QCGu5ikwrYaQD0Mmurm0N.jpg"
								}
								alt={user?.displayName}
								referrerPolicy='no-referrer'
								className='sm:w-10 sm:h-10 w-8 h-8 rounded-full object-cover'
							/>
						</Link>
						<div className='hidden sm:flex flex-col leading-tight'>
							<span className='font-semibold'>{user?.displayName || "User Name"}</span>
							<span className='text-xs text-muted'>
								{role ? role.charAt(0).toUpperCase() + role.slice(1) : "No Role"}
							</span>
						</div>
					</div>
				)}

				{/* Notification Icon */}
				{loading ? <div className='skeleton w-8 h-8 rounded-full'></div> : <NotificationPopup />}
			</div>
		</>
	);
};

export default DashboardNavbar;
