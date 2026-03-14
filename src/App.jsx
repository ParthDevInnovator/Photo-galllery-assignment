import React, { useState, useReducer, useMemo, useCallback } from 'react';
import { useFetchPhotos } from './hooks/useFetchPhotos';
import { favouritesReducer, initialState } from './reducers/favouritesReducer';
import { Gallery } from './components/Gallery';
import { SearchBar } from './components/SearchBar';

export default function App() {
  const { photos, loading, error } = useFetchPhotos();
  const [state, dispatch] = useReducer(favouritesReducer, initialState);
  const [searchTerm, setSearchTerm] = useState('');

  // useCallback for search handler
  const handleSearch = useCallback((value) => {
    setSearchTerm(value);
  }, []);

  //  useMemo filterphotos
  const filteredPhotos = useMemo(() => {
    return photos.filter((photo) =>
      photo.author.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [photos, searchTerm]);

  const handleToggleFavourite = (id) => {
    dispatch({ type: 'TOGGLE_FAVOURITE', payload: id });
  };

  return (
    <div className="min-h-screen bg-zinc-50 text-zinc-900 font-sans">
  
      <header className="sticky top-0 z-10 bg-white/80 backdrop-blur-md border-b border-zinc-200 px-4 py-4 mb-8">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="bg-emerald-500 p-2 rounded-xl text-white shadow-lg shadow-emerald-500/20">
              <span className="text-xl">📷</span>
            </div>
            <h1 className="text-2xl font-bold tracking-tight">PhotoGallery</h1>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1.5 px-3 py-1.5 bg-zinc-100 rounded-full text-zinc-600 text-sm font-medium">
              <span className="text-red-500">❤️</span>
              <span>{state.favouriteIds.length} Favourites</span>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4">
        {/* Search Section */}
        <section className="mb-12">
          <div className="text-center mb-8">
            <h2 className="text-4xl font-bold mb-2 tracking-tight">Discover Inspiration</h2>
            <p className="text-zinc-500">Browse through our curated collection of stunning photography.</p>
          </div>
          <SearchBar value={searchTerm} onChange={handleSearch} />
        </section>

        {/* Content Section */}
        <section>
          {loading && (
            <div className="flex flex-col items-center justify-center py-32 gap-4">
              <div className="h-10 w-10 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin"></div>
              <p className="text-zinc-500 font-medium animate-pulse">Fetching beautiful moments...</p>
            </div>
          )}

          {error && (
            <div className="flex flex-col items-center justify-center py-32 px-4 text-center">
              <div className="bg-red-50 p-4 rounded-full mb-4">
                <span className="text-4xl">⚠️</span>
              </div>
              <h3 className="text-xl font-bold text-zinc-900 mb-2">Something went wrong</h3>
              <p className="text-zinc-500 max-w-md">{error}</p>
              <button 
                onClick={() => window.location.reload()}
                className="mt-6 px-6 py-2 bg-zinc-900 text-white rounded-xl hover:bg-zinc-800 transition-colors"
              >
                Try Again
              </button>
            </div>
          )}

          {!loading && !error && (
            <Gallery
              photos={filteredPhotos}
              favouriteIds={state.favouriteIds}
              onToggleFavourite={handleToggleFavourite}
            />
          )}
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-zinc-200 py-8 mt-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p className="text-zinc-400 text-sm">
            © {new Date().getFullYear()} PhotoGallery. Powered by Picsum Photos.
          </p>
        </div>
      </footer>
    </div>
  );
}
