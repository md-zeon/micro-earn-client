import { useEffect, useState } from "react";
import { LuBell } from "react-icons/lu";
import useAuth from "../../../hooks/useAuth";
import { Link } from "react-router";
import moment from "moment";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import GlassCard from "../../../components/ui/GlassCard";

const NotificationPopup = () => {
	const { user } = useAuth();
	const [notifications, setNotifications] = useState([]);
	const axiosSecure = useAxiosSecure();

	useEffect(() => {
		const fetchNotifications = async () => {
			if (!user?.email) return;
			try {
				const { data } = await axiosSecure.get("/notifications");
				// console.log(data);
				setNotifications(data);
			} catch (err) {
				console.error("Failed to load notifications:", err);
			}
		};
		fetchNotifications();
	}, [user]);

	return (
		<div className='dropdown dropdown-end'>
			{/* Button */}
			<div
				tabIndex={0}
				role='button'
				className='btn btn-ghost btn-circle'
			>
				<div className='indicator'>
					<LuBell className='text-xl' />
					<span className='badge badge-sm indicator-item bg-accent w-2 h-4'>{notifications?.length}</span>
				</div>
			</div>
			{/* Dropdown Content */}
			<div
				tabIndex={0}
				className='card card-compact dropdown-content bg-base-200 z-10 text-base-content mt-3 w-80 shadow'
			>
				<GlassCard className="p-1">
					<div className='card-body'>
						<div className='p-3 font-semibold border-b'>Notifications</div>
						{notifications.length === 0 ? (
							<div className='p-3'>No notifications</div>
						) : (
							<ul className='divide-y divide-gray-200'>
								{notifications.map((notification) => (
									<li key={notification._id}>
										<Link
											to={notification.actionRoute || "/"}
											className='block px-4 py-2 link-hover hover:bg-base-gradient'
										>
											<div className='text-sm'>{notification?.message}</div>
											<div className='text-xs text-gray-400'>{moment(notification.time).fromNow()}</div>
										</Link>
									</li>
								))}
							</ul>
						)}
					</div>
				</GlassCard>
			</div>
		</div>
	);
};

export default NotificationPopup;
