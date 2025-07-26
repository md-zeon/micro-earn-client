import { Helmet } from "react-helmet-async";

const PageTitle = ({ title, description }) => {
	const defaultTitle = "MicroEarn";
	const defaultDescription = "A platform for micro-tasks and earnings.";
	const pageTitle = title ? `${title} | MicroEarn` : defaultTitle;

	return (
		<Helmet>
			<title>{pageTitle}</title>
			<meta
				name='description'
				content={description || defaultDescription}
			/>
		</Helmet>
	);
};

export default PageTitle;
