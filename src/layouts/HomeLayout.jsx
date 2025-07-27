import { Outlet, useNavigation } from "react-router";
import Navbar from "../components/Navbar";
import Loader from "../components/Loader";
import AOS from "aos";
import { useEffect } from "react";
import Footer from "../components/Footer";

const HomeLayout = () => {
	const navigation = useNavigation();
	const state = navigation?.state;

	useEffect(() => {
		AOS?.init({ duration: 700, once: true });
	}, []);

	return (
		<>
			<header className='sticky top-0 z-50 w-full bg-base-200/95 backdrop-blur supports-[backdrop-filter]:bg-base-200/60 border-b border-accent'>
				<Navbar />
			</header>
			<main>{state === "loading" ? <Loader /> : <Outlet />}</main>
			<footer>
				<Footer />
			</footer>
		</>
	);
};

export default HomeLayout;
