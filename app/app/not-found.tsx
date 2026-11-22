import Link from "next/link";
import { Aperture } from "lucide-react";

export default function NotFound() {
  return (
    <div className="text-center py-24 px-4">
      <Aperture size={96} className="mx-auto text-primary animate-spin" style={{ animationDuration: "6s" }} />
      <h1 className="text-5xl font-bold mt-6">404</h1>
      <p className="mt-2 mb-6">This scene didn&apos;t make the final cut.</p>
      <Link href="/" className="btn btn-primary">Return to Home</Link>
    </div>
  );
}