'use client';

import styles from './Search.module.css';
import { useAppDispatch, useAppSelector } from '@/store/store';
import { setSearchValue } from '@/store/features/trackSlice';

export default function Search() {
  const dispatch = useAppDispatch();
  const searchInput = useAppSelector((state) => state.tracks.filters.search);

  const onSearchInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setSearchValue(e.target.value));
  };

  return (
    <div className={styles.search}>
      <svg className={styles.searchSvg}>
        <use xlinkHref="/img/icon/sprite.svg#icon-search"></use>
      </svg>
      <input
        className={styles.searchText}
        type="search"
        placeholder="Поиск"
        name="search"
        value={searchInput}
        onChange={onSearchInput}
      />
    </div>
  );
}
