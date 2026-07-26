'use client';

import { createUser } from '@/services/auth/authApi';
import styles from '../signin/signin.module.css';
import classNames from 'classnames';
import Link from 'next/link';
import { ChangeEvent, useState } from 'react';
import { useRouter } from 'next/navigation';
import { AxiosError } from 'axios';
import Image from 'next/image';

export default function SignUp() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const onChangeEmail = (e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const onChangePassword = (e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const onChangeRepeatPassword = (e: ChangeEvent<HTMLInputElement>) => {
    setRepeatPassword(e.target.value);
  };

  const onSubmit = (e: React.FormEvent) => {
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

    createUser({ email, password, username: email.split('@')[0] })
      .then((res: unknown) => {
        console.log('Успешная регистрация:', res);
        router.push('/auth/signin');
      })
      .catch((error: unknown) => {
        console.error(error);
        if (error instanceof AxiosError && error.response) {
          const serverError = error.response.data;
          const msg =
            serverError?.detail ||
            serverError?.message ||
            JSON.stringify(serverError);
          setErrorMessage(msg || 'Ошибка при регистрации');
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
                  priority
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

            <input
              suppressHydrationWarning
              className={styles.modal__input}
              type="password"
              name="password"
              placeholder="Повторите пароль"
              value={repeatPassword}
              onChange={onChangeRepeatPassword}
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
              {isLoading ? 'Регистрация...' : 'Зарегистрироваться'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
