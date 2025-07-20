import { LuCoins, LuHandCoins, LuLogOut } from "react-icons/lu";
import { Link, NavLink } from "react-router";
import Container from "./Container";
import useAuth from "../hooks/useAuth";
import { useEffect, useState } from "react";

const Navbar = () => {
	const { user, logOut } = useAuth();

	// theme state
	const [theme, setTheme] = useState("light");

	// toggle function
	const handleThemeToggle = () => {
		const newTheme = theme === "light" ? "dark" : "light";
		setTheme(newTheme);
		document.documentElement.setAttribute("data-theme", newTheme);
		localStorage.setItem("theme", newTheme);
	};

	// apply theme on initial load
	useEffect(() => {
		const storedTheme = localStorage.getItem("theme") || "light";
		setTheme(storedTheme);
		document.documentElement.setAttribute("data-theme", storedTheme);
	}, []);

	const ThemeController = (
		<>
			<label className='toggle text-base-content'>
				<input
					type='checkbox'
					onChange={handleThemeToggle}
					checked={theme === "dark"}
				/>

				<svg
					aria-label='sun'
					xmlns='http://www.w3.org/2000/svg'
					viewBox='0 0 24 24'
				>
					<g
						strokeLinejoin='round'
						strokeLinecap='round'
						strokeWidth='2'
						fill='none'
						stroke='currentColor'
					>
						<circle
							cx='12'
							cy='12'
							r='4'
						></circle>
						<path d='M12 2v2'></path>
						<path d='M12 20v2'></path>
						<path d='m4.93 4.93 1.41 1.41'></path>
						<path d='m17.66 17.66 1.41 1.41'></path>
						<path d='M2 12h2'></path>
						<path d='M20 12h2'></path>
						<path d='m6.34 17.66-1.41 1.41'></path>
						<path d='m19.07 4.93-1.41 1.41'></path>
					</g>
				</svg>

				<svg
					aria-label='moon'
					xmlns='http://www.w3.org/2000/svg'
					viewBox='0 0 24 24'
				>
					<g
						strokeLinejoin='round'
						strokeLinecap='round'
						strokeWidth='2'
						fill='none'
						stroke='currentColor'
					>
						<path d='M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z'></path>
					</g>
				</svg>
			</label>
		</>
	);

	const navLinks = (
		<>
			<li>
				<NavLink
					to='/'
					className={({ isActive }) => (isActive ? "text-gradient" : "text-base-content")}
				>
					Home
				</NavLink>
			</li>
			{user && (
				<li>
					<NavLink
						to={`/dashboard`}
						className={({ isActive }) => (isActive ? "text-gradient" : "text-base-content")}
					>
						Dashboard
					</NavLink>
				</li>
			)}
		</>
	);

	return (
		<Container>
			<nav className='navbar'>
				<div className='navbar-start'>
					<div className='dropdown'>
						<div
							tabIndex={0}
							role='button'
							className='btn btn-ghost lg:hidden'
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
									href='https://github.com/md-zeon'
									target='_blank'
									rel='noreferrer'
									className='btn btn-sm bg-gradient'
								>
									Join As Developer
								</a>
							</li>
						</ul>
					</div>
					<Link
						to='/'
						className='text-xl flex items-center gap-2 hover:opacity-80 transition-opacity'
					>
						{" "}
						<span className='bg-gradient w-8 h-8 rounded-lg flex items-center justify-center'>
							<LuHandCoins />
						</span>{" "}
						<span className='text-2xl  font-bold text-gradient'>MicroEarn</span>
					</Link>
				</div>
				<div className='navbar-center hidden lg:flex'>
					<ul className='menu menu-horizontal px-1'>{navLinks}</ul>
				</div>
				<div className='navbar-end'>
					<div className='flex gap-4 items-center'>
						{user ? (
							<>
								{/* Avaiable Coins */}
								<div className='flex gap-2 items-center'>
									<LuCoins className='text-blue-400' />
									<span className='badge bg-gradient'>
										1000 <span className='hidden sm:inline md:text-xs'>Micro Coins</span>
									</span>
								</div>
								{/* Profile */}
								<div className='dropdown dropdown-end'>
									<div
										tabIndex={0}
										role='button'
										className='btn btn-ghost btn-circle avatar'
									>
										<div className='w-10 rounded-full'>
											<img
												alt={user?.displayName}
												src={user?.photoURL}
											/>
										</div>
									</div>
									<div
										tabIndex={0}
										className='menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow space-y-2'
									>
										<div>
											{/* Email */}
											<p>{user?.email}</p>
										</div>
										<div className='flex justify-between items-center'>
											<span className='badge bg-gradient'>Worker</span>
											{ThemeController}
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
								{ThemeController}
								<Link
									to='/login'
									className='btn btn-ghost'
								>
									Login
								</Link>
								<Link
									to='/register'
									className='btn btn-ghost bg-gradient'
								>
									Register
								</Link>
							</>
						)}
						<a
							href='https://github.com/md-zeon'
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
