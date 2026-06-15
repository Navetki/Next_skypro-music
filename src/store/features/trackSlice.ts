import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TrackType } from '@/SharedTypes/ShareTypes';

type initialStateType = {
  currentTrack: TrackType | null;
  isPlay: boolean;
  playlist: TrackType[];
  shuffledPlaylist: TrackType[];
  isShuffle: boolean;
  isLoop: boolean;
};

const initialState: initialStateType = {
  currentTrack: null,
  isPlay: false,
  playlist: [],
  shuffledPlaylist: [],
  isShuffle: false,
  isLoop: false,
};

const trackSlice = createSlice({
  name: 'tracks',
  initialState,
  reducers: {
    setCurrentTrack: (state, action: PayloadAction<TrackType | null>) => {
      state.currentTrack = action.payload;
    },
    setCurrentPlaylist: (state, action: PayloadAction<TrackType[]>) => {
      state.playlist = action.payload;
      state.shuffledPlaylist = [...action.payload].sort(
        () => Math.random() - 0.5,
      );
    },
    setIsPlay: (state, action: PayloadAction<boolean>) => {
      state.isPlay = action.payload;
    },
    toggleShuffle: (state) => {
      state.isShuffle = !state.isShuffle;

      if (state.isShuffle) {
        state.shuffledPlaylist = [...state.playlist].sort(
          () => Math.random() - 0.5,
        );
      }
    },
    toggleLoop: (state) => {
      state.isLoop = !state.isLoop;
    },
    setNextTrack: (state) => {
      const playlist = state.isShuffle
        ? state.shuffledPlaylist
        : state.playlist;

      if (!state.currentTrack || playlist.length === 0) return;

      const curIndex = playlist.findIndex(
        (el) => el._id === state.currentTrack?._id,
      );

      if (curIndex !== -1 && curIndex < playlist.length - 1) {
        state.currentTrack = playlist[curIndex + 1];
        state.isPlay = true;
      }
    },
    setPrevTrack: (state) => {
      const playlist = state.isShuffle
        ? state.shuffledPlaylist
        : state.playlist;

      if (!state.currentTrack || playlist.length === 0) return;

      const curIndex = playlist.findIndex(
        (el) => el._id === state.currentTrack?._id,
      );

      if (curIndex > 0) {
        state.currentTrack = playlist[curIndex - 1];
        state.isPlay = true;
      }
    },
  },
});

export const {
  setCurrentTrack,
  setIsPlay,
  setCurrentPlaylist,
  toggleShuffle,
  toggleLoop,
  setNextTrack,
  setPrevTrack,
} = trackSlice.actions;

export const trackSliceReducer = trackSlice.reducer;
