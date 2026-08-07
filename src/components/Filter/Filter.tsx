'use client';

import { useState, useMemo, useCallback } from 'react';
import classNames from 'classnames';
import { getUniqueValueByKey, YEAR_OPTIONS } from '@/utils/helper';
import FilterItem from '../FilterItem/FilterItem';
import styles from './Filter.module.css';
import { TrackType } from '@/SharedTypes/ShareTypes';
import { useAppDispatch, useAppSelector } from '@/store/store';
import {
  setFilterAuthors,
  setFilterGenres,
  setFilterYears,
} from '@/store/features/trackSlice';

interface FilterProps {
  tracks: TrackType[];
}

export default function Filter({ tracks }: FilterProps) {
  const dispatch = useAppDispatch();

  const activeAuthors = useAppSelector((state) => state.tracks.filters.authors);
  const activeGenres = useAppSelector((state) => state.tracks.filters.genres);
  const activeYear = useAppSelector((state) => state.tracks.filters.years);

  const [activeFilter, setActiveFilter] = useState<string | null>(null);

  const handleFilterClick = useCallback((filterName: string) => {
    setActiveFilter((prev) => (prev === filterName ? null : filterName));
  }, []);

  const authors = useMemo(() => {
    return getUniqueValueByKey(tracks, 'author');
  }, [tracks]);

  const genres = useMemo(() => {
    return getUniqueValueByKey(tracks, 'genre');
  }, [tracks]);

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
          {activeAuthors.length > 0 && (
            <span className={styles.filter__counter}>
              {activeAuthors.length}
            </span>
          )}
        </button>
        {activeFilter === 'author' && (
          <div className={styles.filter__popup}>
            <ul className={styles.filter__list}>
              {authors.map((author, index) => (
                <div
                  key={index}
                  onClick={() => dispatch(setFilterAuthors(author))}
                >
                  <FilterItem
                    value={author}
                    isActive={activeAuthors.includes(author)}
                  />
                </div>
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
                <div key={index} onClick={() => dispatch(setFilterYears(year))}>
                  <FilterItem value={year} isActive={activeYear === year} />
                </div>
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
          {activeGenres.length > 0 && (
            <span className={styles.filter__counter}>
              {activeGenres.length}
            </span>
          )}
        </button>
        {activeFilter === 'genre' && (
          <div className={styles.filter__popup}>
            <ul className={styles.filter__list}>
              {genres.map((genre, index) => (
                <div
                  key={index}
                  onClick={() => dispatch(setFilterGenres(genre))}
                >
                  <FilterItem
                    value={genre}
                    isActive={activeGenres.includes(genre)}
                  />
                </div>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}
