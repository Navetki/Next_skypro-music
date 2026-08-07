import { applyFilters } from './applyFilters';
import { initialStateType } from '@/store/features/trackSlice';
import { TrackType } from '@/SharedTypes/ShareTypes';

const mockTracks: TrackType[] = [
  {
    _id: 1,
    name: 'Majesty',
    author: 'Winnie',
    genre: ['Rock'],
    release_date: '2023-01-01',
    album: 'A',
    duration_in_seconds: 100,
    logo: null,
    track_file: '',
    stared_user: [],
  },
  {
    _id: 2,
    name: 'Dropin',
    author: 'Alex',
    genre: ['Pop'],
    release_date: '2020-01-01',
    album: 'B',
    duration_in_seconds: 120,
    logo: null,
    track_file: '',
    stared_user: [],
  },
];

const createMockState = (filters: {
  authors: string[];
  genres: string[];
  years: string;
  search: string;
}): initialStateType => ({
  currentTrack: null,
  isPlay: false,
  currentPlaylist: [],
  playlist: [],
  shuffledPlaylist: [],
  isShuffle: false,
  allTracks: mockTracks,
  favoriteTracks: [],
  fetchError: null,
  fetchIsLoading: false,
  pagePlayList: mockTracks,
  filteredTracks: [],
  filters,
});

describe('applyFilters pure function', () => {
  test('Фильтрация по тексту поиска', () => {
    const state = createMockState({
      authors: [],
      genres: [],
      years: 'По умолчанию',
      search: 'maje',
    });
    const result = applyFilters(state);
    expect(result.length).toBe(1);
    expect(result[0].name).toBe('Majesty');
  });

  test('Фильтрация по автору', () => {
    const state = createMockState({
      authors: ['Winnie'],
      genres: [],
      years: 'По умолчанию',
      search: '',
    });
    const result = applyFilters(state);
    expect(result.length).toBe(1);
    expect(result[0].author).toBe('Winnie');
  });

  test('Сортировка сначала новые', () => {
    const state = createMockState({
      authors: [],
      genres: [],
      years: 'Сначала новые',
      search: '',
    });
    const result = applyFilters(state);
    expect(result[0]._id).toBe(1);
  });
});
