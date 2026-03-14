import { PhotoCard } from './PhotoCard';

export function Gallery({ photos, favouriteIds, onToggleFavourite }) {
  if (photos.length === 0) {
    return (
      <div className="text-center py-20">
        <p className="text-zinc-500 font-medium">No photos found matching your search.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 px-4 pb-20">
      {photos.map((photo) => (
        <PhotoCard
          key={photo.id}
          photo={photo}
          isFavourite={favouriteIds.includes(photo.id)}
          onToggleFavourite={onToggleFavourite}
        />
      ))}
    </div>
  );
}
