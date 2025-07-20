import { LuCoins, LuHandCoins } from "react-icons/lu";
import { Link, NavLink } from "react-router";
import Container from "./Container";
import useAuth from "../hooks/useAuth";

const Navbar = () => {
	const { user } = useAuth();
	const navLinks = (
		<>
			<li>
				<NavLink
					to='/'
					className={({ isActive }) => (isActive ? "text-gradient" : "text-black")}
				>
					Home
				</NavLink>
			</li>
			{user && (
				<li>
					<NavLink
						to={`/dashboard`}
						className={({ isActive }) => (isActive ? "text-gradient" : "text-black")}
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
							className='menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow'
						>
							{navLinks}
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
					<div className='flex gap-4'>
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
						<a
							href='https://github.com/md-zeon'
							target='_blank'
							rel='noreferrer'
							className='btn btn-outline'
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
