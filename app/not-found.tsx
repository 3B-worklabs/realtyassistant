import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4 py-20 text-text">
      <div className="max-w-xl rounded-[28px] border border-border bg-white p-10 shadow-card">
        <h1 className="text-4xl font-semibold">Page not found</h1>
        <p className="mt-3 text-base text-muted">The section you are looking for is still under construction.</p>
        <Link href="/" className="mt-8 inline-flex rounded-full bg-accent px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#b58b31]">
          Return home
        </Link>
      </div>
    </div>
  );
}
