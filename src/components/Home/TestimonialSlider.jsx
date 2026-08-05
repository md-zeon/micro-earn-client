import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Keyboard, Navigation, Pagination } from "swiper/modules";
import { useRef, useState } from "react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { ChevronLeft, ChevronRight, Quote, Star } from "lucide-react";
import { motion } from "motion/react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import SectionHeading from "./SectionHeading";

const testimonials = [
  {
    quote:
      "MicroEarn helped me earn money consistently as a student. The micro-tasks are simple and payout is smooth!",
    name: "Ayesha Rahman",
    title: "Top Worker",
    image:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=200&q=80",
    rating: 5,
  },
  {
    quote:
      "As a startup owner, posting tasks and managing submissions on MicroEarn is super intuitive. Love the system!",
    name: "Rahim Ahmed",
    title: "Frequent Buyer",
    image:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=200&q=80",
    rating: 5,
  },
  {
    quote:
      "Managing users and withdrawal requests as admin is simple with MicroEarn's dashboard. Very efficient!",
    name: "Tasnim Islam",
    title: "Platform Admin",
    image:
      "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=200&q=80",
    rating: 4,
  },
  {
    quote:
      "Best platform for earning coins doing productive work. The UI and features are next level!",
    name: "Karim Hossain",
    title: "Top Earner",
    image:
      "https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=200&q=80",
    rating: 5,
  },
  {
    quote:
      "MicroEarn makes online micro job management truly effortless. Love the payment transparency.",
    name: "Saad Hossain",
    title: "Task Creator",
    image: "https://img.daisyui.com/images/profile/demo/anakeen@192.webp",
    rating: 4,
  },
  {
    quote:
      "Great system, real payouts, helpful support. Highly recommend to friends.",
    name: "Nasir Uddin",
    title: "Verified Worker",
    image:
      "https://images.unsplash.com/photo-1506744038136-46273834b3fb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=200&q=80",
    rating: 5,
  },
];

function TestimonialSlider() {
  const [activeIndex, setActiveIndex] = useState(0);
  const swiperRef = useRef(null);

  return (
    <section className="relative overflow-hidden py-20 md:py-28">
      <div className="absolute top-1/3 -right-24 size-72 rounded-full bg-emerald-500/5 blur-3xl" />

      <div className="relative mx-auto max-w-6xl px-4">
        <SectionHeading
          eyebrow="Community voices"
          title="Loved by workers & buyers"
          description="MicroEarn empowers people through fast, fair, and flexible task-based income opportunities."
        />

        <Swiper
          modules={[Autoplay, Keyboard, Navigation, Pagination]}
          onSwiper={(swiper) => (swiperRef.current = swiper)}
          onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
          slidesPerView={1}
          spaceBetween={24}
          pagination={{ clickable: true }}
          loop={true}
          centeredSlides={true}
          keyboard={{ enabled: true }}
          autoplay={{
            delay: 4000,
            disableOnInteraction: false,
          }}
          breakpoints={{
            640: { slidesPerView: 1.5, centeredSlides: true },
            768: { slidesPerView: 2, centeredSlides: true },
            1024: { slidesPerView: 2.5, centeredSlides: true },
          }}
          className="my-swiper mt-14"
        >
          {testimonials.map((item, index) => {
            const isActive = activeIndex === index;
            return (
              <SwiperSlide key={index} className="pb-16 pt-4">
                <motion.div
                  initial={{ opacity: 0, scale: 0.92 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5 }}
                >
                  <Card
                    className={`flex h-full flex-col justify-between p-8 transition-all duration-500 ${
                      isActive
                        ? "border-emerald-500/40 bg-emerald-500/5 shadow-xl shadow-emerald-500/10"
                        : "border-border/60 bg-card/50"
                    }`}
                  >
                    <div>
                      <div className="flex items-center justify-between">
                        <div className="flex gap-1 text-amber-400">
                          {Array.from({ length: item.rating }).map((_, i) => (
                            <Star key={i} className="size-4 fill-current" />
                          ))}
                        </div>
                        <Quote
                          className={`size-8 ${
                            isActive
                              ? "text-emerald-500/40"
                              : "text-muted"
                          }`}
                        />
                      </div>

                      <p className="mt-5 text-sm leading-relaxed text-muted-foreground md:text-base">
                        “{item.quote}”
                      </p>
                    </div>

                    <div className="mt-6 flex items-center gap-3 border-t border-border/60 pt-5">
                      <Avatar size="lg">
                        <AvatarImage src={item.image} alt={item.name} />
                        <AvatarFallback className="bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
                          {item.name.charAt(0)}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <h4 className="text-base font-semibold tracking-tight">
                          {item.name}
                        </h4>
                        <p className="text-sm text-muted-foreground">
                          {item.title}
                        </p>
                      </div>
                    </div>
                  </Card>
                </motion.div>
              </SwiperSlide>
            );
          })}
        </Swiper>

        <div className="mt-2 flex items-center justify-center gap-4">
          <Button
            variant="outline"
            size="icon"
            className="rounded-full"
            onClick={() => swiperRef.current?.slidePrev()}
            aria-label="Previous testimonial"
          >
            <ChevronLeft className="size-5" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            className="rounded-full"
            onClick={() => swiperRef.current?.slideNext()}
            aria-label="Next testimonial"
          >
            <ChevronRight className="size-5" />
          </Button>
        </div>
      </div>
    </section>
  );
}

export default TestimonialSlider;
