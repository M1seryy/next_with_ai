export default function Loading() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Завантаження постів...</h1>
      <ul className="space-y-2">
        {Array.from({ length: 5 }).map((_, i) => (
          <li key={i} className="h-16 bg-gray-200 animate-pulse rounded"></li>
        ))}
      </ul>
    </div>
  );
}
