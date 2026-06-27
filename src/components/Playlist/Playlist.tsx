import { TrackType } from '@/SharedTypes/ShareTypes';
import Track from '../Track/Track';
import styles from './Playlist.module.css';

interface PlaylistProps {
  initialTracks: TrackType[];
}

export default function Playlist({ initialTracks }: PlaylistProps) {
  if (!initialTracks || initialTracks.length === 0) {
    return (
      <div style={{ color: '#b1b1b1', marginTop: '20px' }}>
        В этом списке пока нет треков...
      </div>
    );
  }

  return (
    <div className={styles.contentPlaylist}>
      {initialTracks.map((track) => (
        <Track
          key={track._id || track.track_file}
          track={track}
          playlist={initialTracks}
        />
      ))}
    </div>
  );
}
