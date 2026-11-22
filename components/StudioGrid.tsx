"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { api } from "@/lib/api";
import { Studio } from "@/types";
import StudioCard from "./StudioCard";

export default function StudioGrid({ query = "" }: { query?: string }) {
  const [list, setList] = useState<Studio[] | null>(null);

  useEffect(() => {
    setList(null);
    api<Studio[]>(`/api/studios?${query}`).then(setList).catch(() => setList([]));
  }, [query]);

  if (!list)
    return (
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {[...Array(6)].map((_, i) => <div key={i} className="skeleton h-80" />)}
      </div>
    );

  if (!list.length)
    return (
      <div className="text-center py-16">
        <p className="text-xl font-semibold">No studios found</p>
        <p className="opacity-70 mb-4">Try another category or be the first to host one.</p>
        <Link href="/add-studio" className="btn btn-primary">Host Your Space</Link>
      </div>
    );

  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {list.map((s) => <StudioCard key={s._id} s={s} />)}
    </div>
  );
}