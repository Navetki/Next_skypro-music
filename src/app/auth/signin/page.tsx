'use client';

import styles from './signin.module.css';
import classNames from 'classnames';
import Link from 'next/link';
import { ChangeEvent, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function SignIn() {
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

    if (!password || !email) {
      return setErrorMessage('Заполните все поля');
    }

    setIsLoading(true);

    setTimeout(() => {
      const userLogin = email.split('@')[0];
      localStorage.setItem('token', 'mock_secure_token_value');
      localStorage.setItem('username', userLogin);

      setIsLoading(false);
      router.push('/music/main');
    }, 500);
  };

  return (
    <div className={styles.wrapper} suppressHydrationWarning>
      <div className={styles.containerEnter}>
        <div className={styles.modal__block}>
          <div className={styles.modal__form}>
            <Link href="/music/main">
              <div className={styles.modal__logo}>
                <img src="/img/logo_modal.png" alt="logo" />
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
                  color: 'red',
                  marginTop: '10px',
                  fontSize: '12px',
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
