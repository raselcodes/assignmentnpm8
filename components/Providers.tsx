"use client";
import { useEffect } from "react";
import { Toaster } from "sonner";
import { authClient } from "@/lib/auth-client";
import { api } from "@/lib/api";

export default function Providers({ children }: { children: React.ReactNode }) {
  const { data } = authClient.useSession();

  useEffect(() => {
    const t = localStorage.getItem("theme") || "light";
    document.documentElement.setAttribute("data-theme", t);
  }, []);

  useEffect(() => {
    if (data?.user) {
      api("/api/jwt", {
        method: "POST",
        body: { email: data.user.email, name: data.user.name },
      }).catch(() => {});
    }
  }, [data?.user?.email]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <>
      {children}
      <Toaster richColors position="top-center" />
    </>
  );
}