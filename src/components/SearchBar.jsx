
export function SearchBar({ value, onChange }) {
  return (
    <div className="relative w-full max-w-md mx-auto mb-8">
      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
        <span className="text-zinc-400">🔍</span>
      </div>
      <input
        type="text"
        className="block w-full pl-10 pr-3 py-2 border border-zinc-200 rounded-xl leading-5 bg-white placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 sm:text-sm transition-all shadow-sm"
        placeholder="Search by author name..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
}
