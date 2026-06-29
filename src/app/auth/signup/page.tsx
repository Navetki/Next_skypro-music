'use client';

import { ChangeEvent, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import styles from './signup.module.css';

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

  const onSubmit = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    setErrorMessage('');

    if (!password || !email || !repeatPassword) {
      return setErrorMessage('Заполните все поля');
    }

    if (password !== repeatPassword) {
      return setErrorMessage('Пароли не совпадают');
    }

    setIsLoading(true);

    setTimeout(() => {
      const generatedUsername = email.split('@')[0];
      localStorage.setItem('username', generatedUsername);
      localStorage.setItem('token', 'mock_secure_token_value');

      setIsLoading(false);
      router.push('/music/main');
    }, 500);
  };

  return (
    <div className={styles.wrapper} suppressHydrationWarning>
      <div className={styles.containerSignUp}>
        <div className={styles.modal__block}>
          <div className={styles.modal__form}>
            <Link href="/music/main">
              <div className={styles.modal__logo}>
                <img src="/img/logo_modal.png" alt="logo" />
              </div>
            </Link>

            <input
              suppressHydrationWarning
              className={styles.modal__input}
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
              name="repeat-password"
              placeholder="Повторите пароль"
              value={repeatPassword}
              onChange={onChangeRepeatPassword}
            />

            {errorMessage && (
              <div className={styles.errorContainer}>
                <span>{errorMessage}</span>
              </div>
            )}

            <button
              disabled={isLoading}
              onClick={onSubmit}
              className={styles.modal__btnSignupEnt}
            >
              {isLoading ? 'Регистрация...' : 'Зарегистрироваться'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
