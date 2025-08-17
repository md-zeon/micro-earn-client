import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Keyboard, Navigation, Pagination } from "swiper/modules";
import { useRef, useState } from "react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { LuChevronLeft, LuChevronRight, LuHandCoins, LuQuote, LuUsersRound } from "react-icons/lu";

const testimonials = [
	{
		quote: "MicroEarn helped me earn money consistently as a student. The micro-tasks are simple and payout is smooth!",
		name: "Ayesha Rahman",
		title: "Top Worker",
		image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=200&q=80",
	},
	{
		quote:
			"As a startup owner, posting tasks and managing submissions on MicroEarn is super intuitive. Love the system!",
		name: "Rahim Ahmed",
		title: "Frequent Buyer",
		image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=200&q=80",
	},
	{
		quote: "Managing users and withdrawal requests as admin is simple with MicroEarn's dashboard. Very efficient!",
		name: "Tasnim Islam",
		title: "Platform Admin",
		image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=200&q=80",
	},
	{
		quote: "Best platform for earning coins doing productive work. The UI and features are next level!",
		name: "Karim Hossain",
		title: "Top Earner",
		image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=200&q=80",
	},
	{
		quote: "MicroEarn makes online micro job management truly effortless. Love the payment transparency.",
		name: "Sadia Akter",
		title: "Task Creator",
		image: "https://images.unsplash.com/photo-1544037976-1000e0000000?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=200&q=80",
	},
	{
		quote: "Great system, real payouts, helpful support. Highly recommend to friends.",
		name: "Nasir Uddin",
		title: "Verified Worker",
		image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=200&q=80",
	},
];

function TestimonialSlider() {
	const [activeIndex, setActiveIndex] = useState(0);
	const swiperRef = useRef(null);

	return (
		<div className='bg-base-100 py-16 px-4'>
			<div className='max-w-4xl mx-auto text-center pb-16 space-y-3'>
				<div className='grid place-items-center'>
					<span className='text-4xl bg-gradient p-2 rounded-full flex items-center justify-center'>
						<LuUsersRound />
					</span>
				</div>
				<h2 className='text-2xl md:text-3xl font-bold text-gradient'>What users are saying</h2>
				<p className='text-gray-600 max-w-2xl mx-auto'>
					MicroEarn empowers workers and buyers through fast, fair, and flexible task-based income opportunities.
				</p>
			</div>

			<Swiper
				modules={[Autoplay, Keyboard, Navigation, Pagination]}
				onSwiper={(swiper) => (swiperRef.current = swiper)}
				onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
				slidesPerView={1}
				spaceBetween={20}
				pagination={{ clickable: true }}
				loop={true}
				centeredSlides={true}
				keyboard={{ enabled: true }}
				autoplay={{
					delay: 3500,
					reverseDirection: true,
					disableOnInteraction: false,
				}}
				breakpoints={{
					768: { slidesPerView: 2, centeredSlides: true },
					1024: { slidesPerView: 3, centeredSlides: true },
				}}
				className='my-swiper'
			>
				{testimonials.map((item, index) => (
					<SwiperSlide
						key={index}
						className='pt-10'
					>
						<div
							className={`rounded-xl p-6 h-full flex flex-col justify-between transition-all duration-300 ${
								activeIndex === index
									? "bg-base-gradient shadow-xl opacity-100 md:-translate-y-10"
									: "bg-base-100/60 opacity-40"
							}`}
						>
							<div>
								<div className='text-4xl text-accent mb-4'>
									<LuQuote />
								</div>
								<p className='text-base-content text-sm mb-6 leading-relaxed'>{item.quote}</p>
							</div>
							<div className='flex items-center gap-3 border-t pt-4'>
								<div className='w-10 h-10 rounded-full overflow-hidden'>
									<img
										src={item.image}
										alt={item.name}
										className='w-full h-full object-cover'
									/>
								</div>
								<div className='text-base-content'>
									<h4 className='text-base font-semibold'>{item.name}</h4>
									<p className='text-sm'>{item.title}</p>
								</div>
							</div>
						</div>
					</SwiperSlide>
				))}
			</Swiper>

			<div className='w-fit mx-auto flex justify-center items-center gap-4 mt-8'>
				<button
					onClick={() => swiperRef.current?.slidePrev()}
					className='bg-base-100 shadow-md rounded-full w-10 h-10 flex items-center justify-center hover:bg-base-300 cursor-pointer transition'
				>
					<LuChevronLeft className='w-5 h-5 text-accent' />
				</button>

				<button
					onClick={() => swiperRef.current?.slideNext()}
					className='bg-base-100 shadow-md rounded-full w-10 h-10 flex items-center justify-center hover:bg-base-300 cursor-pointer transition'
				>
					<LuChevronRight className='w-5 h-5 text-accent' />
				</button>
			</div>
		</div>
	);
}

export default TestimonialSlider;
