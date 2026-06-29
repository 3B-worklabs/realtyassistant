export default function OfflinePage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4 py-20 text-text">
      <div className="max-w-xl rounded-[28px] border border-border bg-white p-10 shadow-card">
        <h1 className="text-4xl font-semibold">You're offline</h1>
        <p className="mt-4 text-base text-muted">Realty Assistant can still show cached content while you reconnect. Try the app again once your network is available.</p>
      </div>
    </div>
  );
}
