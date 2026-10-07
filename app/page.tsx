import { brand } from "@/lib/brand";

export default function HomePage() {
  return (
    <main className="mx-auto flex min-h-dvh max-w-xl flex-col justify-center gap-4 px-6 py-12">
      <h1 className="text-4xl font-bold text-brand">{brand.name}</h1>
      <p className="text-lg">{brand.tagline}</p>
      <p className="text-sm text-ink/70">
        Setup is working. The storefront pages are built in the next phases.
      </p>
      <a
        href="/api/health"
        className="w-fit rounded-full bg-bloom px-5 py-2 font-medium text-white"
      >
        Check app and database
      </a>
    </main>
  );
}
