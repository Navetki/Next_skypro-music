import { data as tracks } from '@/data';
import Track from '../Track/Track';
import styles from './Playlist.module.css';

export default function Playlist() {
  return (
    <div className={styles.contentPlaylist}>
      {tracks.map((track) => (
        <Track key={track.track_file} track={track} />
      ))}
    </div>
  );
}
