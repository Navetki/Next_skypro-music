'use client';

import styles from './Search.module.css';

interface SearchProps {
  title?: string;
}

export default function Search({ title }: SearchProps) {
  const username =
    typeof window !== 'undefined'
      ? localStorage.getItem('username') || 'Гость'
      : 'Гость';

  return (
    <div className={styles.centerblock__search}>
      <div className={styles.search__block}>
        <svg className={styles.search__svg}>
          <use xlinkHref="/img/icon/sprite.svg#icon-search"></use>
        </svg>
        <input
          className={styles.search__text}
          type="search"
          placeholder="Поиск"
          name="search"
        />
      </div>

      <div className={styles.search__user}>
        <span
          className={styles.search__username}
          suppressHydrationWarning
          style={{ color: '#ffffff', marginRight: '14px', fontSize: '16px' }}
        >
          {typeof window !== 'undefined'
            ? localStorage.getItem('username') || 'Гость'
            : 'Гость'}
        </span>
        <div className={styles.search__avatar}>
          <svg
            style={{
              width: '100%',
              height: '100%',
              fill: 'transparent',
              stroke: '#696969',
            }}
          >
            <use xlinkHref="/img/icon/sprite.svg#icon-avatar"></use>
          </svg>
        </div>
      </div>
    </div>
  );
}
