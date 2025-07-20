import React, { useEffect, useState } from "react";

const ThemeController = () => {
	// theme state
	const [theme, setTheme] = useState("light");

	// apply theme on initial load
	useEffect(() => {
		const storedTheme = localStorage.getItem("theme") || "light";
		setTheme(storedTheme);
		document.documentElement.setAttribute("data-theme", storedTheme);
	}, []);

	// toggle function
	const handleThemeToggle = () => {
		const newTheme = theme === "light" ? "dark" : "light";
		setTheme(newTheme);
		document.documentElement.setAttribute("data-theme", newTheme);
		localStorage.setItem("theme", newTheme);
	};
	return (
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
};

export default ThemeController;
