"use client";
import Link from "next/link";
import { Aperture } from "lucide-react";
import { toast } from "sonner";

const XLogo = () => (
  <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
    <path d="M18.9 2H22l-7.2 8.2L23 22h-6.6l-5.2-6.8L5.3 22H2.2l7.7-8.8L1.6 2h6.8l4.7 6.2L18.9 2zm-1.2 18h1.7L7.4 3.9H5.6L17.7 20z" />
  </svg>
);

export default function Footer() {
  return (
    <footer className="bg-base-200 mt-16">
      <div className="max-w-7xl mx-auto px-4 py-12 grid gap-8 md:grid-cols-4">
        <div>
          <p className="flex items-center gap-2 text-2xl font-bold">
            <Aperture className="text-primary" /> StudioSpace
          </p>
          <p className="mt-3 text-sm opacity-80">
            Our mission is to put every creator in the right room, from podcast booths to cinema stages.
          </p>
        </div>
        <div>
          <h6 className="footer-title">Quick Links</h6>
          <div className="flex flex-col gap-1 text-sm">
            <Link href="/">Home</Link>
            <Link href="/studios">Explore Studios</Link>
            <Link href="/add-studio">Host Your Space</Link>
          </div>
        </div>
        <div>
          <h6 className="footer-title">Popular Categories</h6>
          <div className="flex flex-col gap-1 text-sm">
            {["Photo Studio", "Film Stage", "Podcast Lounge", "Music Suite"].map((c) => (
              <Link key={c} href={`/studios?category=${encodeURIComponent(c)}`}>{c}</Link>
            ))}
          </div>
        </div>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            toast.success("Subscribed to the newsletter!");
            e.currentTarget.reset();
          }}
        >
          <h6 className="footer-title">Newsletter</h6>
          <div className="join w-full">
            <input type="email" required placeholder="you@email.com" className="input input-bordered join-item w-full" />
            <button className="btn btn-primary join-item">Join</button>
          </div>
          <a href="https://x.com" target="_blank" rel="noreferrer" className="btn btn-ghost btn-circle mt-4" aria-label="X">
            <XLogo />
          </a>
        </form>
      </div>
      <p className="text-center text-xs py-4 border-t border-base-300">
        © 2026 StudioSpace. All rights reserved. Terms & Privacy apply.
      </p>
    </footer>
  );
}