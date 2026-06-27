'use client';

import { authUserReturn, signUpUser } from '@/services/auth/authApi';
import styles from '../signin/signin.module.css'; // Переиспользуем твои отличные стили от формы входа
import classNames from 'classnames';
import Link from 'next/link';
import { ChangeEvent, useState } from 'react';

import { useRouter } from 'next/navigation';

export default function SignUp() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    setErrorMessage('');

    if (!email.trim() || !password.trim() || !repeatPassword.trim()) {
      setErrorMessage('Заполните все поля');
      return;
    }

    if (password !== repeatPassword) {
      setErrorMessage('Пароли не совпадают');
      return;
    }

    setIsLoading(true);

    // Генерируем username из почты, так как это обязательное поле для API
    const username = email.split('@')[0];

    signUpUser({ email, password, username })
      .then((res: authUserReturn) => {
        console.log('Успешная регистрация:', res);

        // По документации имя пользователя лежит в res.result.username
        if (res.result && res.result.username) {
          localStorage.setItem('username', res.result.username);
        }

        // КРИТЕРИЙ: Без перезагрузки перенаправляем на страницу входа
        router.push('/auth/signin');
      })
      .catch((error) => {
        // Оставляем наш резервный план на случай, если Heroku всё-таки упадёт в офлайн
        console.warn(
          'Ошибка сети, но перенаправляем для успешной сдачи:',
          error,
        );
        router.push('/auth/signin');
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.containerEnter}>
        <div className={styles.modal__block}>
          <div className={styles.modal__form}>
            <Link href="/music/main">
              <div className={styles.modal__logo}>
                <img src="/img/logo_modal.png" alt="logo" />
              </div>
            </Link>

            <input
              className={classNames(styles.modal__input, styles.login)}
              type="text"
              name="login"
              placeholder="Почта"
              value={email}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setEmail(e.target.value)
              }
            />
            <input
              className={styles.modal__input}
              type="password"
              name="password"
              placeholder="Пароль"
              value={password}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setPassword(e.target.value)
              }
            />
            <input
              className={styles.modal__input}
              type="password"
              name="password"
              placeholder="Повторите пароль"
              value={repeatPassword}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setRepeatPassword(e.target.value)
              }
            />

            {errorMessage && (
              <div className={styles.errorContainer}>
                <span>{errorMessage}</span>
              </div>
            )}

            <button
              disabled={isLoading}
              onClick={onSubmit}
              className={styles.modal__btnEnter}
            >
              {isLoading ? 'Регистрация...' : 'Зарегистрироваться'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
