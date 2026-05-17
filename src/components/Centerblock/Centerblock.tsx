import Link from 'next/link';
import classnames from 'classnames';
import styles from './Centerblock.module.css';

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

export default function Centerblock() {
  return (
    <div className={styles.centerblock}>
      {/* Поиск */}
      <div className={styles.search}>
        <svg className={styles.searchSvg}>
          <use xlinkHref="/img/icon/sprite.svg#icon-search"></use>
        </svg>
        <input
          className={styles.searchText}
          type="search"
          placeholder="Поиск"
          name="search"
        />
      </div>

      <h2 className={styles.h2}>Треки</h2>

      {/* Фильтры */}
      <div className={styles.filter}>
        <div className={styles.filterTitle}>Искать по:</div>
        <div className={styles.filterButton}>исполнителю</div>
        <div className={styles.filterButton}>году выпуска</div>
        <div className={styles.filterButton}>жанру</div>
      </div>

      {/* Таблица треков */}
      <div className={styles.content}>
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

        <div className={styles.contentPlaylist}>
          {TRACKS.map((track) => (
            <div key={track.id} className={styles.playlistItem}>
              <div className={styles.playlistTrack}>
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
                <div className={styles.trackAuthor}>
                  <Link className={styles.trackAuthorLink} href="#">
                    {track.author}
                  </Link>
                </div>
                <div className={styles.trackAlbum}>
                  <Link className={styles.trackAlbumLink} href="#">
                    {track.album}
                  </Link>
                </div>
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
    </div>
  );
}
