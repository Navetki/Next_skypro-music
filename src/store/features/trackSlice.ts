import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TrackType } from '@/SharedTypes/ShareTypes';

type initialStateType = {
  currentTrack: TrackType | null;
  isPlay: boolean;
  currentPlaylist: TrackType[];
  playlist: TrackType[];
  shuffledPlaylist: TrackType[];
  isShuffle: boolean;
  allTracks: TrackType[];
  favoriteTracks: TrackType[];
  fetchError: null | string;
  fetchIsLoading: boolean;
};

const initialState: initialStateType = {
  currentTrack: null,
  isPlay: false,
  playlist: [],
  currentPlaylist: [],
  shuffledPlaylist: [],
  isShuffle: false,
  allTracks: [],
  favoriteTracks: [],
  fetchError: null,
  fetchIsLoading: true,
};

const trackSlice = createSlice({
  name: 'Tracks',
  initialState,
  reducers: {
    setCurrentTrack: (state, action: PayloadAction<TrackType>) => {
      state.currentTrack = action.payload;
    },
    setIsPlaying: (state, action: PayloadAction<boolean>) => {
      state.isPlay = action.payload;
    },
    setIsShuffled: (state, action: PayloadAction<boolean>) => {
      state.isShuffle = action.payload;
    },
    setCurrentPlaylist: (state, action: PayloadAction<TrackType[]>) => {
      state.currentPlaylist = action.payload;
      state.shuffledPlaylist = [...action.payload].sort(
        () => Math.random() - 0.5,
      );
    },
    setNextTrack: (state) => {
      const currentList = state.isShuffle
        ? state.shuffledPlaylist
        : state.currentPlaylist;
      const index = currentList.findIndex(
        (t) => t._id === state.currentTrack?._id,
      );
      if (index !== -1 && index < currentList.length - 1) {
        state.currentTrack = currentList[index + 1];
      }
    },
    setPrevTrack: (state) => {
      const currentList = state.isShuffle
        ? state.shuffledPlaylist
        : state.currentPlaylist;
      const index = currentList.findIndex(
        (t) => t._id === state.currentTrack?._id,
      );
      if (index > 0) {
        state.currentTrack = currentList[index - 1];
      }
    },
    setAllTracks: (state, action: PayloadAction<TrackType[]>) => {
      state.allTracks = action.payload;
    },
    setFavoriteTracks: (state, action: PayloadAction<TrackType[]>) => {
      state.favoriteTracks = action.payload;
    },
    setFetchError: (state, action: PayloadAction<string>) => {
      state.fetchError = action.payload;
    },
    addLikedTracks: (state, action: PayloadAction<TrackType>) => {
      const isExist = state.favoriteTracks.some(
        (t) => t._id === action.payload._id,
      );
      if (!isExist) {
        state.favoriteTracks.push(action.payload);
      }
    },
    removeLikedTracks: (state, action: PayloadAction<TrackType>) => {
      state.favoriteTracks = state.favoriteTracks.filter(
        (t) => t._id !== action.payload._id,
      );
    },
    setFetchIsLoading: (state, action: PayloadAction<boolean>) => {
      state.fetchIsLoading = action.payload;
    },
  },
});

export const {
  setCurrentTrack,
  setIsPlaying,
  setCurrentPlaylist,
  setNextTrack,
  setPrevTrack,
  setIsShuffled,
  setAllTracks,
  setFetchError,
  setFavoriteTracks,
  addLikedTracks,
  removeLikedTracks,
  setFetchIsLoading,
} = trackSlice.actions;

export const trackSliceReducer = trackSlice.reducer;
