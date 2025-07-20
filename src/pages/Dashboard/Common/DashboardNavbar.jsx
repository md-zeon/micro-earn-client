import { useState } from "react";
import useAuth from "../../../hooks/useAuth";
import Logo from "../../../components/Logo";
import AvailableCoins from "../../../components/AvailableCoins";
import ThemeController from "../../../components/ThemeController";
import { LuMenu, LuX } from "react-icons/lu";

const DashboardNavbar = ({ role, isSidebarOpen, setIsSidebarOpen }) => {
	const { user } = useAuth();
	const [isNotificationOpen, setIsNotificationOpen] = useState(false);
	return (
		<>
			<div className="flex items-center">
				<button
					onClick={() => setIsSidebarOpen(!isSidebarOpen)}
					className='lg:hidden btn btn-sm btn-ghost hover:bg-transparent border-0 outline-0'
					aria-label='Toggle Sidebar'
				>
					{isSidebarOpen ? <LuX className='w-5 h-5' /> : <LuMenu className='w-5 h-5' />}
				</button>
				<Logo />
			</div>
			<div className='flex items-center space-x-4'>
				<span className='hidden md:block'>
					<AvailableCoins />
				</span>
				<ThemeController />

				{/* User info */}
				<div className='flex items-center space-x-2'>
					<img
						src={user?.photoURL}
						alt={user?.displayName || "User Image"}
						className='w-10 h-10 rounded-full object-cover'
					/>
					<div className='flex flex-col leading-tight'>
						<span className='font-semibold'>{user?.displayName || "User Name"}</span>
						<span className='text-xs text-muted'>{role || "No Role"}</span>
					</div>
				</div>

				{/* Notification Icon */}
				<button
					onClick={() => setIsNotificationOpen((prev) => !prev)}
					className='relative p-2 rounded hover:bg-base-300'
					aria-label='Notifications'
				>
					<svg
						xmlns='http://www.w3.org/2000/svg'
						className='h-6 w-6'
						fill='none'
						viewBox='0 0 24 24'
						stroke='currentColor'
						strokeWidth={2}
					>
						<path
							strokeLinecap='round'
							strokeLinejoin='round'
							d='M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9'
						/>
					</svg>

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
