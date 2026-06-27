'use client';

import { useState } from 'react';
import classNames from 'classnames';
import { getUniqueValueByKey, YEAR_OPTIONS } from '@/utils/helper';
import FilterItem from '../FilterItem/FilterItem';
import styles from './Filter.module.css';
import { TrackType } from '@/SharedTypes/ShareTypes'; // Импортируем тип трека

// 1. Обязательно объявляем интерфейс пропсов для TypeScript
interface FilterProps {
  tracks: TrackType[];
}

// 2. Принимаем tracks в качестве пропса (удалили статический импорт из @/data)
export default function Filter({ tracks }: FilterProps) {
  const [activeFilter, setActiveFilter] = useState<string | null>(null);

  const handleFilterClick = (filterName: string) => {
    setActiveFilter((prev) => (prev === filterName ? null : filterName));
  };

  // 3. Теперь уникальные авторы и жанры вытаскиваются из живых данных сервера!
  const authors = getUniqueValueByKey(tracks, 'author');
  const genres = getUniqueValueByKey(tracks, 'genre');

  return (
    <div className={styles.filter}>
      <div className={styles.filterTitle}>Искать по:</div>

      <div className={styles.filterWrapper}>
        <button
          onClick={() => handleFilterClick('author')}
          className={classNames(styles.filter__button, {
            [styles.active]: activeFilter === 'author',
          })}
        >
          исполнителю
        </button>
        {activeFilter === 'author' && (
          <div className={styles.filter__popup}>
            <ul className={styles.filter__list}>
              {authors.map((author, index) => (
                <FilterItem key={index} value={author} />
              ))}
            </ul>
          </div>
        )}
      </div>

      <div className={styles.filterWrapper}>
        <button
          onClick={() => handleFilterClick('year')}
          className={classNames(styles.filter__button, {
            [styles.active]: activeFilter === 'year',
          })}
        >
          году выпуска
        </button>
        {activeFilter === 'year' && (
          <div className={styles.filter__popup}>
            <ul className={styles.filter__list}>
              {YEAR_OPTIONS.map((year, index) => (
                <FilterItem key={index} value={year} />
              ))}
            </ul>
          </div>
        )}
      </div>

      <div className={styles.filterWrapper}>
        <button
          onClick={() => handleFilterClick('genre')}
          className={classNames(styles.filter__button, {
            [styles.active]: activeFilter === 'genre',
          })}
        >
          жанру
        </button>
        {activeFilter === 'genre' && (
          <div className={styles.filter__popup}>
            <ul className={styles.filter__list}>
              {genres.map((genre, index) => (
                <FilterItem key={index} value={genre} />
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}
