import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { TrackType } from '@/SharedTypes/ShareTypes';
import Track from './Track';
import ReduxProvider from '@/store/ReduxProvider';
import { formatTime } from '@/utils/helper';

const mockTrack: TrackType = {
  _id: 1,
  name: 'Chase',
  author: 'Alexander Nakarada',
  album: 'Chase',
  duration_in_seconds: 205,
  genre: ['Rock'],
  release_date: '2023-01-01',
  logo: null,
  track_file: '',
  stared_user: [],
};

const mockPlaylist: TrackType[] = [mockTrack];

describe('Track component', () => {
  test('Отрисовка данных теста', () => {
    render(
      <ReduxProvider>
        <Track track={mockTrack} playlist={mockPlaylist} />
      </ReduxProvider>,
    );

    expect(screen.getAllByText(mockTrack.name).length).toBeGreaterThan(0);
    expect(screen.getAllByText(mockTrack.author).length).toBeGreaterThan(0);
    expect(screen.getAllByText(mockTrack.album).length).toBeGreaterThan(0);

    const formattedTime = formatTime(mockTrack.duration_in_seconds);
    expect(screen.getAllByText(formattedTime).length).toBeGreaterThan(0);
  });
});
