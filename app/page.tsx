"use client";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import StudioGrid from "@/components/StudioGrid";

const slides = [
  { img: "https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?w=1600", h: "Shoot in a space built for your story", p: "Photo cycs, cinema stages and more, by the hour." },
  { img: "https://images.unsplash.com/photo-1590602847861-f357a9332bbc?w=1600", h: "Record your next episode tonight", p: "Soundproofed podcast lounges with pro mics included." },
  { img: "https://images.unsplash.com/photo-1519892300165-cb5542fb47c7?w=1600", h: "Own a studio? Let it earn", p: "List your space and meet creators who need it." },
];
const categories = ["Photo Studio", "Film Stage", "Podcast Lounge", "Music Suite", "Workshop"];
const steps = ["Discover Spaces", "Select Shoot Hours", "Book Instantly", "Create & Produce"];
const guarantees = [
  ["Liability Protection", "Every booking is covered against accidental damage."],
  ["Verified Profiles", "Hosts and creators are identity checked."],
  ["Equipment Safety", "Gear is inspected before each listing goes live."],
  ["24/7 Host Support", "A real person is always a message away."],
];

export default function Home() {
  return (
    <>
      <Swiper modules={[Autoplay, Pagination]} autoplay={{ delay: 4000 }} pagination={{ clickable: true }} loop>
        {slides.map((s) => (
          <SwiperSlide key={s.h}>
            <div className="h-[70vh] bg-cover bg-center relative" style={{ backgroundImage: `url(${s.img})` }}>
              <div className="absolute inset-0 bg-black/60 flex flex-col items-center justify-center text-center text-white px-4">
                <h1 className="text-4xl md:text-5xl font-bold max-w-3xl">{s.h}</h1>
                <p className="mt-3 max-w-xl">{s.p}</p>
                <div className="mt-6 flex gap-3">
                  <Link href="/studios" className="btn btn-primary">Explore Studios</Link>
                  <Link href="/studios" className="btn btn-outline text-white">Host Your Space</Link>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      <section className="max-w-7xl mx-auto px-4 pt-16">
        <h2 className="text-3xl font-bold mb-6">Featured Studios</h2>
        <StudioGrid query="limit=6" />
      </section>

      <section className="max-w-7xl mx-auto px-4 pt-16">
        <h2 className="text-3xl font-bold mb-6">Browse by Category</h2>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          {categories.map((c) => (
            <Link
              key={c}
              href={`/studios?category=${encodeURIComponent(c)}`}
              className="card bg-base-200 hover:bg-primary hover:text-primary-content transition p-6 text-center font-semibold"
            >
              {c}
            </Link>
          ))}
        </div>
      </section>

      <section id="how-it-works" className="max-w-7xl mx-auto px-4 pt-16">
        <h2 className="text-3xl font-bold mb-6">How Booking Works</h2>
        <div className="grid gap-4 md:grid-cols-4">
          {steps.map((s, i) => (
            <div key={s} className="card bg-base-200 p-6 h-full">
              <span className="text-4xl font-bold text-primary">{i + 1}</span>
              <p className="mt-2 font-semibold">{s}</p>
            </div>
          ))}
        </div>
      </section>

      <section id="about" className="max-w-7xl mx-auto px-4 pt-16">
        <h2 className="text-3xl font-bold mb-6">Host Guarantee & Creator Support</h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {guarantees.map(([t, d]) => (
            <div key={t} className="card bg-base-200 p-6 h-full">
              <h3 className="font-semibold text-lg">{t}</h3>
              <p className="text-sm opacity-80 mt-1">{d}</p>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}