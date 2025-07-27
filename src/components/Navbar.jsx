import { LuLogOut } from "react-icons/lu";
import { Link, NavLink } from "react-router";
import Container from "./Container";
import useAuth from "../hooks/useAuth";
import useRole from "../hooks/useRole";
import Logo from "./Logo";
import AvailableCoins from "./AvailableCoins";
import ThemeController from "./ThemeController";

const Navbar = () => {
	const { user, logOut } = useAuth();
	const { role, isRoleLoading } = useRole();

	const navLinks = (
		<>
			<li>
				<NavLink
					to='/'
					className={({ isActive }) =>
						isActive
							? "text-gradient"
							: "text-base-content hover:bg-linear-to-br from-blue-500 to-green-500 bg-clip-text hover:text-transparent"
					}
				>
					Home
				</NavLink>
			</li>
			{user && (
				<li>
					<NavLink
						to='/dashboard'
						className={({ isActive }) =>
							isActive
								? "text-gradient"
								: "text-base-content hover:bg-linear-to-br from-blue-500 to-green-500 bg-clip-text hover:text-transparent"
						}
					>
						Dashboard
					</NavLink>
				</li>
			)}
			<li>
				<NavLink
					to='/about'
					className={({ isActive }) =>
						isActive
							? "text-gradient"
							: "text-base-content hover:bg-linear-to-br from-blue-500 to-green-500 bg-clip-text hover:text-transparent"
					}
				>
					About Us
				</NavLink>
			</li>
			<li>
				<NavLink
					to='/contact'
					className={({ isActive }) =>
						isActive
							? "text-gradient"
							: "text-base-content hover:bg-linear-to-br from-blue-500 to-green-500 bg-clip-text hover:text-transparent"
					}
				>
					Contact Us
				</NavLink>
			</li>
		</>
	);

	return (
		<Container>
			<nav className='navbar'>
				<div className='navbar-start flex-1'>
					<div className='dropdown'>
						<div
							tabIndex={0}
							role='button'
							className='btn btn-ghost px-1 mr-1 sm:px-3 lg:hidden'
						>
							<svg
								xmlns='http://www.w3.org/2000/svg'
								className='h-5 w-5'
								fill='none'
								viewBox='0 0 24 24'
								stroke='currentColor'
							>
								{" "}
								<path
									strokeLinecap='round'
									strokeLinejoin='round'
									strokeWidth='2'
									d='M4 6h16M4 12h8m-8 6h16'
								/>{" "}
							</svg>
						</div>
						<ul
							tabIndex={0}
							className='menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow space-y-2'
						>
							{navLinks}
							<li>
								<a
									href='https://github.com/Programming-Hero-Web-Course4/b11a12-client-side-md-zeon'
									target='_blank'
									rel='noreferrer'
									className='btn btn-sm bg-gradient'
								>
									Join As Developer
								</a>
							</li>
						</ul>
					</div>
					<Logo />
				</div>
				<div className='navbar-center hidden lg:flex justify-end'>
					<ul className='menu menu-horizontal px-1'>{navLinks}</ul>
				</div>
				<div className='navbar-end w-max'>
					<div className='flex gap-4 items-center'>
						{user ? (
							<>
								<AvailableCoins />
								{/* Profile */}
								<div className='dropdown dropdown-end'>
									<div
										tabIndex={0}
										role='button'
										className='btn btn-ghost btn-circle avatar'
									>
										<div className='w-10 h-10 rounded-full overflow-hidden'>
											{!user?.photoURL ? (
												<div className='w-full h-full bg-base-300 animate-pulse rounded-full'></div>
											) : (
												<img
													alt={user?.displayName || "User Avatar"}
													src={user?.photoURL}
													referrerPolicy='no-referrer'
													className='w-full h-full object-cover'
												/>
											)}
										</div>
									</div>
									<div
										tabIndex={0}
										className='menu menu-sm dropdown-content min-w-52 w-fit bg-base-100 rounded-box z-1 mt-3 p-2 shadow space-y-2'
									>
										<div>
											{/* Email */}
											<p>{user?.email}</p>
										</div>
										<div className='flex justify-between items-center'>
											{isRoleLoading ? (
												<div className='skeleton badge'></div>
											) : (
												<span className='badge bg-gradient capitalize'>{role}</span>
											)}
											<ThemeController />
										</div>
										<div>
											<button
												onClick={logOut}
												className='flex gap-1 items-center cursor-pointer hover:scale-95'
											>
												<LuLogOut />
												Logout
											</button>
										</div>
									</div>
								</div>
							</>
						) : (
							<>
								<div className='hidden sm:block'>
									<ThemeController />
								</div>
								<div className='space-x-1'>
									<Link
										to='/login'
										className='btn btn-sm sm:btn-md btn-ghost'
									>
										Login
									</Link>
									<Link
										to='/register'
										className='btn btn-sm sm:btn-md btn-ghost bg-gradient'
									>
										Register
									</Link>
								</div>
							</>
						)}
						<a
							href='https://github.com/Programming-Hero-Web-Course4/b11a12-client-side-md-zeon'
							target='_blank'
							rel='noreferrer'
							className='btn btn-outline hidden lg:inline-flex'
						>
							Join As Developer
						</a>
					</div>
				</div>
			</nav>
		</Container>
	);
};

export default Navbar;
