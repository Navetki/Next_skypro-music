import Link from 'next/link';
import classnames from 'classnames';
import styles from './Playlist.module.css';

// Выносим данные треков в массив, чтобы избежать дублирования разметки
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
    author: 'Стопфап (или ваш автор)', // Добавьте правильного автора, когда пришлете 3 часть
    album: 'Non Stop',
    time: '4:12',
  },
];

export default function Playlist() {
  return (
    <div className={styles.content}>
      {/* Шапка таблицы плейлиста */}
      <div className={styles.contentTitle}>
        <div className={classnames(styles.playlistTitleCol, styles.col01)}>
          Трек
        </div>
        <div className={classnames(styles.playlistTitleCol, styles.col02)}>
          Исполнитель
        </div>
        <div className={classnames(styles.playlistTitleCol, styles.col03)}>
          Альбом
        </div>
        <div className={classnames(styles.playlistTitleCol, styles.col04)}>
          <svg className={styles.playlistTitleSvg}>
            <use xlinkHref="/img/icon/sprite.svg#icon-watch"></use>
          </svg>
        </div>
      </div>

      {/* Список треков */}
      <div className={styles.contentPlaylist}>
        {TRACKS.map((track) => (
          <div key={track.id} className={styles.playlistItem}>
            <div className={styles.playlistTrack}>
              {/* Название трека */}
              <div className={styles.trackTitle}>
                <div className={styles.trackTitleImage}>
                  <svg className={styles.trackTitleSvg}>
                    <use xlinkHref="/img/icon/sprite.svg#icon-note"></use>
                  </svg>
                </div>
                <div className={styles.trackTitleText}>
                  <Link className={styles.trackTitleLink} href="#">
                    {track.title}{' '}
                    {track.titleSpan && (
                      <span className={styles.trackTitleSpan}>
                        {track.titleSpan}
                      </span>
                    )}
                  </Link>
                </div>
              </div>

              {/* Автор */}
              <div className={styles.trackAuthor}>
                <Link className={styles.trackAuthorLink} href="#">
                  {track.author}
                </Link>
              </div>

              {/* Альбом */}
              <div className={styles.trackAlbum}>
                <Link className={styles.trackAlbumLink} href="#">
                  {track.album}
                </Link>
              </div>

              {/* Время и лайк */}
              <div className={styles.trackTime}>
                <svg className={styles.trackTimeSvg}>
                  <use xlinkHref="/img/icon/sprite.svg#icon-like"></use>
                </svg>
                <span className={styles.trackTimeText}>{track.time}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
