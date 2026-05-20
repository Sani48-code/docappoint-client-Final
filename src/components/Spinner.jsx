export default function Spinner({ fullPage = true }) {
  if (fullPage) {
    return (
      <div className="fixed inset-0 bg-dark/80 backdrop-blur-sm z-50 flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-14 h-14 rounded-full border-4 border-accent/20 border-t-accent animate-spin" />
          <span className="text-white text-sm font-medium tracking-wide">Loading...</span>
        </div>
      </div>
    );
  }
  return (
    <div className="flex items-center justify-center py-16">
      <div className="w-10 h-10 rounded-full border-4 border-accent/20 border-t-accent animate-spin" />
    </div>
  );
}
