"use client";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { authClient } from "@/lib/auth-client";

export default function Register() {
  const router = useRouter();
  const [pwError, setPwError] = useState("");

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    const password = String(f.get("password"));
    if (!/[A-Z]/.test(password)) return setPwError("Password must have an uppercase letter");
    if (!/[a-z]/.test(password)) return setPwError("Password must have a lowercase letter");
    if (password.length < 6) return setPwError("Password must be at least 6 characters");
    setPwError("");

    const photo = String(f.get("photo") || "");
    const { error } = await authClient.signUp.email({
      name: String(f.get("name")),
      email: String(f.get("email")),
      password,
      image: photo || undefined,
    });
    if (error) return toast.error(error.message || "Registration failed");
    await authClient.signOut();
    toast.success("Account created! Please login.");
    router.push("/login");
  };

  return (
    <div className="max-w-md mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold text-center mb-6">Create your account</h1>
      <form onSubmit={onSubmit} className="card bg-base-100 shadow p-6 space-y-3">
        <input name="name" required placeholder="Full name" className="input input-bordered w-full" />
        <input name="email" type="email" required placeholder="Email" className="input input-bordered w-full" />
        <input name="photo" type="url" placeholder="Photo URL" className="input input-bordered w-full" />
        <input name="password" type="password" required placeholder="Password" className="input input-bordered w-full" />
        {pwError && <p className="text-error text-sm">{pwError}</p>}
        <button className="btn btn-primary w-full">Register</button>
        <div className="divider">OR</div>
        <button
          type="button"
          onClick={() => authClient.signIn.social({ provider: "google", callbackURL: "/" })}
          className="btn btn-outline w-full"
        >
          Continue with Google
        </button>
        <p className="text-sm text-center">
          Already registered? <Link href="/login" className="link text-primary">Login</Link>
        </p>
      </form>
    </div>
  );
}