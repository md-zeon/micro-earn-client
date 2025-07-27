import { toast } from "react-hot-toast";
import contactImage from "../../assets/contact.svg";
import PageTitle from "../../components/PageTitle";

const Contact = () => {
	return (
		<section className='max-w-7xl mx-auto px-6 py-16'>
			<PageTitle
				title='Contact Us'
				description='Get in touch with the MicroEarn team for support, partnerships, or feedback.'
			/>
			<div className='text-center mb-10'>
				<h2 className='text-4xl font-bold text-gradient mb-3'>Let's Talk</h2>
				<p className='text-gray-600 max-w-xl mx-auto'>
					Have a question? Reach out to the MicroEarn team—we'd love to hear from you!
				</p>
			</div>

			<div className='grid grid-cols-1 md:grid-cols-2 gap-10'>
				{/* Illustration */}
				<div data-aos='zoom-in'>
					<img
						src={contactImage}
						alt='Contact Illustration'
						className='md:max-w-md'
					/>
				</div>

				<form
					onSubmit={(e) => {
						e.preventDefault();
						e.target.reset();
						toast.success("Thanks for reaching out! We'll get back to you soon.");
					}}
					className='bg-base-100 p-8 rounded-xl shadow-lg space-y-6'
					data-aos='fade-up'
				>
					<div>
						<label className='block text-sm font-medium mb-1'>Your Name</label>
						<input
							type='text'
							placeholder='Enter your name'
							className='input input-bordered w-full'
							required
						/>
					</div>
					<div>
						<label className='block text-sm font-medium mb-1'>Your Email</label>
						<input
							type='email'
							placeholder='Enter your email'
							className='input input-bordered w-full'
							required
						/>
					</div>
					<div>
						<label className='block text-sm font-medium mb-1'>Message</label>
						<textarea
							rows={4}
							placeholder='Type your message...'
							className='textarea textarea-bordered w-full'
							required
						></textarea>
					</div>
					<button
						type='submit'
						className='btn bg-gradient w-full'
					>
						Send Message
					</button>
				</form>
			</div>
		</section>
	);
};

export default Contact;
