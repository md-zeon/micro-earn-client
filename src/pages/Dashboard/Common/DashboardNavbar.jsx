import { useState } from "react";
import useAuth from "../../../hooks/useAuth";
import Logo from "../../../components/Logo";
import AvailableCoins from "../../../components/AvailableCoins";
import ThemeController from "../../../components/ThemeController";
import { LuBell, LuMenu, LuX } from "react-icons/lu";
import { Link } from "react-router";

const DashboardNavbar = ({ role, isSidebarOpen, setIsSidebarOpen }) => {
	const { user } = useAuth();
	const [isNotificationOpen, setIsNotificationOpen] = useState(false);
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
				<span className='hidden md:block'>
					<AvailableCoins />
				</span>
				<ThemeController />

				{/* User info */}
				<div className='flex items-center sm:space-x-2'>
					<Link to='/dashboard/profile'>
						<img
							src={
								user?.photoURL ||
								"https://t4.ftcdn.net/jpg/05/89/93/27/360_F_589932782_vQAEAZhHnq1QCGu5ikwrYaQD0Mmurm0N.jpg"
							}
							alt={user?.displayName}
							className='sm:w-10 sm:h-10 w-8 h-8 rounded-full object-cover'
						/>
					</Link>
					<div className='hidden sm:flex flex-col leading-tight'>
						<span className='font-semibold'>{user?.displayName || "User Name"}</span>
						<span className='text-xs text-muted'>{role?.charAt(0).toUpperCase() + role?.slice(1) || "No Role"}</span>
					</div>
				</div>

				{/* Notification Icon */}
				<button
					onClick={() => setIsNotificationOpen((prev) => !prev)}
					className='relative p-2 rounded hover:bg-base-300'
					aria-label='Notifications'
				>
					<LuBell />

					{/* Notification dropdown */}
					{isNotificationOpen && (
						<div className='absolute right-0 mt-2 w-64 bg-white border rounded shadow-lg p-4 z-50'>
							<p className='text-sm font-semibold mb-2'>Notifications</p>
							<ul className='max-h-48 overflow-auto'>
								<li className='text-xs text-gray-600'>No new notifications.</li>
							</ul>
						</div>
					)}
				</button>
			</div>
		</>
	);
};

export default DashboardNavbar;
