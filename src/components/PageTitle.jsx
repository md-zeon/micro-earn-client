import { Helmet } from "react-helmet-async";

const PageTitle = ({ title, description }) => {
	const defaultTitle = "MicroEarn";
	const defaultDescription = "MicroEarn micro-task and earning platform";

	return (
		<Helmet>
			<title>{title ? `${title} - ${defaultTitle}` : defaultTitle}</title>
			<meta
				name='description'
				content={description || defaultDescription}
			/>
		</Helmet>
	);
};

export default PageTitle;
