import Link from "next/link";
import { MapPin, Star } from "lucide-react";
import { Studio } from "@/types";

export default function StudioCard({ s }: { s: Studio }) {
  return (
    <div className="card bg-base-100 shadow h-full">
      <figure className="h-48">
        <img src={s.image} alt={s.title} className="w-full h-full object-cover" />
      </figure>
      <div className="card-body">
        <div className="flex justify-between items-center">
          <span className="badge badge-primary">{s.category}</span>
          <span className="badge badge-outline gap-1"><Star size={12} /> {s.rating ?? 0}</span>
        </div>
        <h2 className="card-title line-clamp-1">{s.title}</h2>
        <p className="flex items-center gap-1 text-sm opacity-70 line-clamp-1">
          <MapPin size={14} /> {s.location}
        </p>
        <p className="font-semibold text-primary">${s.hourlyRate} / hr</p>
        <Link href={`/studios/${s._id}`} className="btn btn-primary btn-sm mt-auto">View Details</Link>
      </div>
    </div>
  );
}