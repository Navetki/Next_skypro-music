import { data as tracks } from '@/data';
import Track from '../Track/Track';
import styles from './Playlist.module.css';
import { formatTime } from '@/utils/helper';

export default function Playlist() {
  return (
    <div className={styles.contentPlaylist}>
      {tracks.map((track) => (
        <Track
          key={track._id}
          title={track.name}
          author={track.author}
          album={track.album}
          time={formatTime(track.duration_in_seconds)}
        />
      ))}
    </div>
  );
}
