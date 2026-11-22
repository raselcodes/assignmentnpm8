const API = process.env.NEXT_PUBLIC_API_URL;

interface Options {
  method?: string;
  body?: unknown;
}

export async function api<T = any>(path: string, options: Options = {}): Promise<T> {
  const res = await fetch(`${API}${path}`, {
    method: options.method || "GET",
    credentials: "include",
    headers: { "Content-Type": "application/json" },
    body: options.body ? JSON.stringify(options.body) : undefined,
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(data.message || "Something went wrong");
  return data as T;
}