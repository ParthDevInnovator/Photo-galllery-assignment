export const initialState = {
  favouriteIds: JSON.parse(localStorage.getItem('favourites') || '[]'),
};

export function favouritesReducer(state, action) {
  switch (action.type) {
    case 'TOGGLE_FAVOURITE': {
      const isFavourite = state.favouriteIds.includes(action.payload);
      const newFavourites = isFavourite
        ? state.favouriteIds.filter((id) => id !== action.payload)
        : [...state.favouriteIds, action.payload];
      
      localStorage.setItem('favourites', JSON.stringify(newFavourites));
      
      return {
        ...state,
        favouriteIds: newFavourites,
      };
    }
    default:
      return state;
  }
}
