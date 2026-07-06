'use client';

import { authUser, authUserReturn } from '@/services/auth/authApi';
import styles from './signin.module.css';
import classNames from 'classnames';
import Link from 'next/link';
import { ChangeEvent, useState } from 'react';
import { useRouter } from 'next/navigation';
import { AxiosError } from 'axios';
import Image from 'next/image';

export default function Signin() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const onChangeEmail = (e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const onChangePassword = (e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const onSubmit = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    setErrorMessage('');

    if (!email.trim() || !password.trim()) {
      setErrorMessage('Заполните все поля');
      return;
    }

    setIsLoading(true);

    authUser({ email, password })
      .then((res: authUserReturn) => {
        console.log('Успешный вход от сервера:', res);

        const userData = res.result || res;
        const token = res.access || res.token || 'local_session_token_success';

        localStorage.setItem('token', token);
        localStorage.setItem(
          'username',
          userData.username || userData.email || 'Пользователь',
        );

        router.push('/music/main');
      })
      .catch((error) => {
        console.error(error);

        if (error instanceof AxiosError && error.response) {
          const serverError = error.response.data;
          const msg =
            serverError?.detail ||
            serverError?.message ||
            JSON.stringify(serverError);
          setErrorMessage(msg || 'Неверная почта или пароль');
        } else {
          setErrorMessage('Ошибка сети. Не удалось связаться с сервером.');
        }
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <div className={styles.wrapper} suppressHydrationWarning>
      <div className={styles.containerEnter}>
        <div className={styles.modal__block}>
          <div className={styles.modal__form}>
            <Link href="/music/main">
              <div className={styles.modal__logo}>
                <Image
                  src="/img/logo_modal.png"
                  alt="logo"
                  width={250}
                  height={40}
                />
              </div>
            </Link>

            <input
              suppressHydrationWarning
              className={classNames(styles.modal__input, styles.login)}
              type="text"
              name="login"
              placeholder="Почта"
              value={email}
              onChange={onChangeEmail}
            />

            <input
              suppressHydrationWarning
              className={styles.modal__input}
              type="password"
              name="password"
              placeholder="Пароль"
              value={password}
              onChange={onChangePassword}
            />

            {errorMessage && (
              <div
                className={styles.errorContainer}
                style={{
                  color: '#ff4d4d',
                  padding: '10px 0',
                  fontSize: '14px',
                  textAlign: 'center',
                }}
              >
                <span>{errorMessage}</span>
              </div>
            )}

            <button
              disabled={isLoading}
              onClick={onSubmit}
              className={styles.modal__btnEnter}
            >
              {isLoading ? 'Загрузка...' : 'Войти'}
            </button>

            <Link href={'/auth/signup'} className={styles.modal__btnSignup}>
              Зарегистрироваться
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
