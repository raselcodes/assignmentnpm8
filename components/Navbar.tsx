"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Aperture, Moon, Sun } from "lucide-react";
import { toast } from "sonner";
import { authClient } from "@/lib/auth-client";
import { api } from "@/lib/api";

const links = [
  { href: "/", label: "Home" },
  { href: "/studios", label: "Explore Studios" },
  { href: "/#how-it-works", label: "How It Works" },
  { href: "/#about", label: "About Us" },
];

export default function Navbar() {
  const path = usePathname();
  const router = useRouter();
  const { data } = authClient.useSession();
  const [theme, setTheme] = useState("light");

  useEffect(() => {
    setTheme(localStorage.getItem("theme") || "light");
  }, []);

  const toggleTheme = () => {
    const next = theme === "dark" ? "light" : "dark";
    setTheme(next);
    document.documentElement.setAttribute("data-theme", next);
    localStorage.setItem("theme", next);
  };

  const logout = async () => {
    await authClient.signOut();
    await api("/api/logout", { method: "POST" }).catch(() => {});
    toast.success("Logged out");
    router.push("/");
  };

  return (
    <header className="sticky top-0 z-50 bg-base-100/90 backdrop-blur border-b border-base-300">
      <div className="navbar max-w-7xl mx-auto px-4">
        <div className="navbar-start">
          <Link href="/" className="flex items-center gap-2 text-2xl font-bold">
            <Aperture className="text-primary" /> StudioSpace
          </Link>
        </div>
        <ul className="navbar-center hidden lg:flex gap-1">
          {links.map((l) => (
            <li key={l.href}>
              <Link
                href={l.href}
                className={`btn btn-ghost btn-sm ${
                  path === l.href ? "text-primary border-b-2 border-primary rounded-none" : ""
                }`}
              >
                {l.label}
              </Link>
            </li>
          ))}
        </ul>
        <div className="navbar-end gap-2">
          <button onClick={toggleTheme} className="btn btn-ghost btn-circle" aria-label="Toggle theme">
            {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
          </button>
          {data?.user ? (
            <div className="dropdown dropdown-end">
              <div tabIndex={0} role="button" className="avatar cursor-pointer">
                <div className="w-10 rounded-full ring ring-primary ring-offset-2">
                  <img
                    src={data.user.image || "https://i.ibb.co/2kR0v0G/avatar.png"}
                    alt={data.user.name}
                  />
                </div>
              </div>
              <ul
                tabIndex={0}
                className="dropdown-content menu bg-base-100 rounded-box w-56 p-2 shadow z-10 mt-3"
              >
                <li className="menu-title">{data.user.name}</li>
                <li><Link href="/my-listings">Dashboard</Link></li>
                <li><Link href="/add-studio">Add New Studio</Link></li>
                <li><Link href="/my-listings">My Studio Listings</Link></li>
                <li><Link href="/my-bookings">My Bookings</Link></li>
                <li><button onClick={logout}>Logout</button></li>
              </ul>
            </div>
          ) : (
            <>
              <Link href="/login" className="btn btn-outline btn-primary btn-sm">Login</Link>
              <Link href="/register" className="btn btn-primary btn-sm">Register</Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
}