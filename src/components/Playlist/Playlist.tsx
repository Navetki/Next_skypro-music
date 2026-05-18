import Track from '../Track/Track';
import styles from './Playlist.module.css';

const TRACKS = [
  {
    id: 1,
    title: 'Guilt',
    titleSpan: '',
    author: 'Nero',
    album: 'Welcome Reality',
    time: '4:44',
  },
  {
    id: 2,
    title: 'Elektro',
    titleSpan: '',
    author: 'Dynoro, Outwork, Mr. Gee',
    album: 'Elektro',
    time: '2:22',
  },
  {
    id: 3,
    title: 'I’m Fire',
    titleSpan: '',
    author: 'Ali Bakgor',
    album: 'I’m Fire',
    time: '2:22',
  },
  {
    id: 4,
    title: 'Non Stop',
    titleSpan: '(Remix)',
    author: 'Стоункат, Psychopath',
    album: 'Non Stop',
    time: '4:12',
  },
  {
    id: 5,
    title: 'Run Run',
    titleSpan: '(feat. AR/CO)',
    author: 'Jaded, Will Clarke, AR/CO',
    album: 'Run Run',
    time: '2:54',
  },
];

export default function Playlist() {
  return (
    <div className={styles.contentPlaylist}>
      {TRACKS.map((track) => (
        <Track
          key={track.id}
          title={track.title}
          titleSpan={track.titleSpan}
          author={track.author}
          album={track.album}
          time={track.time}
        />
      ))}
    </div>
  );
}
