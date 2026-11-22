import StudioGrid from "@/components/StudioGrid";

export default async function Studios({
  searchParams,
}: {
  searchParams: Promise<{ category?: string }>;
}) {
  const { category } = await searchParams;
  const query = category ? `category=${encodeURIComponent(category)}` : "";
  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-6">{category || "Explore Studios"}</h1>
      <StudioGrid query={query} />
    </div>
  );
}