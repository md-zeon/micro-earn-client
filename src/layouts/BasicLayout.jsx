import { Outlet, Link } from "react-router";

const BasicLayout = () => {
	return (
		<div>
			<nav className='p-4 bg-gray-100 flex justify-between'>
				<Link to='/'>Home</Link>
				<div>
					<Link
						to='/login'
						className='mr-4'
					>
						Login
					</Link>
					<Link to='/register'>Register</Link>
				</div>
			</nav>
			<main>
				<Outlet />
			</main>
		</div>
	);
};

export default BasicLayout;
