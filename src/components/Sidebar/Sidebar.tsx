'use client'; // ОБЯЗАТЕЛЬНО: сообщает Next.js, что этот компонент работает в браузере

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import styles from './Sidebar.module.css';

export default function Sidebar() {
  const [username, setUsername] = useState('Sergey.Ivanov');

  useEffect(() => {
    // Получаем реальное имя пользователя из localStorage, если оно там есть
    const storedUsername = localStorage.getItem('username');
    if (storedUsername) {
      setUsername(storedUsername);
    }
  }, []);

  // Функция очистки сессии при выходе из профиля
  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    // Перенаправляем пользователя на форму входа
    window.location.href = '/auth/signin';
  };

  return (
    <div className={styles.sidebar}>
      <div className={styles.personal}>
        <p className={styles.personalName}>{username}</p>

        {/* Навешиваем клик на иконку выхода и добавляем указатель мыши при наведении */}
        <div
          className={styles.icon}
          onClick={handleLogout}
          style={{ cursor: 'pointer' }}
        >
          <svg>
            <use xlinkHref="/img/icon/sprite.svg#logout"></use>
          </svg>
        </div>
      </div>

      <div className={styles.block}>
        <div className={styles.list}>
          <div className={styles.item}>
            <Link className={styles.link} href="/music/main/category/1">
              <Image
                className={styles.img}
                src="/img/playlist01.png"
                alt="day's playlist"
                fill
                sizes="250px"
                priority
              />
            </Link>
          </div>
          <div className={styles.item}>
            <Link className={styles.link} href="/music/main/category/2">
              <Image
                className={styles.img}
                src="/img/playlist02.png"
                alt="100 dance hits"
                fill
                sizes="250px"
              />
            </Link>
          </div>
          <div className={styles.item}>
            <Link className={styles.link} href="/music/main/category/3">
              <Image
                className={styles.img}
                src="/img/playlist03.png"
                alt="indie charge"
                fill
                sizes="250px"
              />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
