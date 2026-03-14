export function PhotoCard({ photo, isFavourite, onToggleFavourite }) {
  return (
    <div
      className="group relative bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 border border-black/5"
    >
      <div className="aspect-[4/3] overflow-hidden">
        <img
          src={photo.download_url}
          alt={`Photo by ${photo.author}`}
          className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
          referrerPolicy="no-referrer"
          loading="lazy"
        />
      </div>
      
      <div className="p-4 flex items-center justify-between bg-white/90 backdrop-blur-sm absolute bottom-0 left-0 right-0 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
        <div className="flex flex-col">
          <span className="text-xs font-mono text-zinc-500 uppercase tracking-wider">Author</span>
          <span className="text-sm font-medium text-zinc-900 truncate max-w-[150px]">
            {photo.author}
          </span>
        </div>
        
        <button
          onClick={() => onToggleFavourite(photo.id)}
          className={`p-2 rounded-full transition-all duration-200 ${
            isFavourite 
              ? 'bg-red-50 text-red-500' 
              : 'bg-zinc-100 text-zinc-400 hover:bg-zinc-200 hover:text-zinc-600'
          }`}
          aria-label={isFavourite ? "Remove from favourites" : "Add to favourites"}
        >
          <span className={`text-xl ${isFavourite ? 'opacity-100' : 'opacity-40'}`}>
            {isFavourite ? '❤️' : '🤍'}
          </span>
        </button>
      </div>

      <div className="md:hidden p-3 flex items-center justify-between bg-white border-t border-black/5">
         <span className="text-sm font-medium text-zinc-900 truncate">{photo.author}</span>
         <button
          onClick={() => onToggleFavourite(photo.id)}
          className={`p-1.5 rounded-full ${isFavourite ? 'text-red-500' : 'text-zinc-400'}`}
        >
          <span>{isFavourite ? '❤️' : '🤍'}</span>
        </button>
      </div>
    </div>
  );
}
