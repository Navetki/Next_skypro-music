import classnames from 'classnames';
import Playlist from '../Playlist/Playlist';
import styles from './Centerblock.module.css';

export default function Centerblock() {
  return (
    <div className={styles.centerblock}>
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
      <div className={styles.filter}>
        <div className={styles.filterTitle}>Искать по:</div>
        <div className={styles.filterButton}>исполнителю</div>
        <div className={styles.filterButton}>году выпуска</div>
        <div className={styles.filterButton}>жанру</div>
      </div>
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
        <Playlist />
      </div>
    </div>
  );
}
