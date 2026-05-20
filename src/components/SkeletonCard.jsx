export default function SkeletonCard() {
  return (
    <div className="bg-white rounded-2xl overflow-hidden shadow-md border border-slate-100">
      <div className="h-52 bg-slate-200 animate-pulse" />
      <div className="p-5 space-y-3">
        <div className="h-4 bg-slate-200 rounded-full animate-pulse w-1/3" />
        <div className="h-6 bg-slate-200 rounded-full animate-pulse w-3/4" />
        <div className="h-4 bg-slate-200 rounded-full animate-pulse w-1/2" />
        <div className="flex gap-2">
          <div className="h-8 bg-slate-200 rounded-full animate-pulse w-20" />
          <div className="h-8 bg-slate-200 rounded-full animate-pulse w-20" />
        </div>
        <div className="h-10 bg-slate-200 rounded-xl animate-pulse mt-2" />
      </div>
    </div>
  );
}
