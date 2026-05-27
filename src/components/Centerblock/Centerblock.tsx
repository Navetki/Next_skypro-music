import classnames from 'classnames';
import Playlist from '../Playlist/Playlist';
import Filter from '../Filter/Filter';
import Search from '../Search/Search';
import styles from './Centerblock.module.css';

export default function Centerblock() {
  return (
    <div className={styles.centerblock}>
      <Search title="Заголовок" />
      <h2 className={styles.h2}>Треки</h2>

      <Filter />

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
