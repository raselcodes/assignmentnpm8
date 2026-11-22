"use client";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { authClient } from "@/lib/auth-client";

export default function Login() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    setLoading(true);
    const { error } = await authClient.signIn.email({
      email: String(f.get("email")),
      password: String(f.get("password")),
    });
    setLoading(false);
    if (error) return toast.error(error.message || "Invalid email or password");
    toast.success("Welcome back!");
    router.push("/");
  };

  const google = () => authClient.signIn.social({ provider: "google", callbackURL: "/" });

  return (
    <div className="max-w-md mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold text-center mb-6">Login to StudioSpace</h1>
      <form onSubmit={onSubmit} className="card bg-base-100 shadow p-6 space-y-3">
        <input name="email" type="email" required placeholder="Email" className="input input-bordered w-full" />
        <input name="password" type="password" required placeholder="Password" className="input input-bordered w-full" />
        <button type="button" onClick={() => toast.info("Password reset is coming soon")} className="text-sm link text-left">
          Forgot Password?
        </button>
        <button disabled={loading} className="btn btn-primary w-full">
          {loading ? "Logging in..." : "Login"}
        </button>
        <div className="divider">OR</div>
        <button type="button" onClick={google} className="btn btn-outline w-full">Continue with Google</button>
        <p className="text-sm text-center">
          New here? <Link href="/register" className="link text-primary">Register</Link>
        </p>
      </form>
    </div>
  );
}