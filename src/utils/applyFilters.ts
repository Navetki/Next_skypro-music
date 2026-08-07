import { TrackType } from '@/SharedTypes/ShareTypes';
import { initialStateType } from '@/store/features/trackSlice';

export const applyFilters = (state: initialStateType): TrackType[] => {
  let filteredPlaylist = [...state.pagePlayList];

  if (state.filters.search.trim() !== '') {
    const searchString = state.filters.search.toLowerCase();
    filteredPlaylist = filteredPlaylist.filter((track) => {
      return track.name && track.name.toLowerCase().includes(searchString);
    });
  }

  if (state.filters.authors.length > 0) {
    filteredPlaylist = filteredPlaylist.filter((track) => {
      return track.author && state.filters.authors.includes(track.author);
    });
  }

  if (state.filters.genres.length > 0) {
    filteredPlaylist = filteredPlaylist.filter((track) => {
      return (
        track.genre &&
        state.filters.genres.some((el) => track.genre.includes(el))
      );
    });
  }

  const yearFilter = state.filters.years.toLowerCase().trim();

  if (yearFilter.includes('новые')) {
    filteredPlaylist.sort((a, b) => {
      const dateA = a.release_date ? new Date(a.release_date).getTime() : 0;
      const dateB = b.release_date ? new Date(b.release_date).getTime() : 0;
      return dateB - dateA;
    });
  } else if (yearFilter.includes('старые')) {
    filteredPlaylist.sort((a, b) => {
      const dateA = a.release_date ? new Date(a.release_date).getTime() : 0;
      const dateB = b.release_date ? new Date(b.release_date).getTime() : 0;
      return dateA - dateB;
    });
  }

  return filteredPlaylist;
};
