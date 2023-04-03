export default function LoaderSkeleton() {
  return (
    <div className="grid grid-cols-1 gap-4 py-5">
      {[...Array(100)].map((_, i) => (
        <div
          key={i}
          className="bg-teal-300 opacity-25 h-5 w-full rounded-lg animate-pulse"
        />
      ))}
    </div>
  );
}
