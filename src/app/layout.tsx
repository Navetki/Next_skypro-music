import type { Metadata } from 'next';
import { Montserrat } from 'next/font/google';
import './globals.css';

// Настраиваем шрифт Montserrat для латиницы и кириллицы
const montserrat = Montserrat({
  subsets: ['latin', 'cyrillic'],
  weight: ['400', '500', '600', '700'], // подгружаем нужные веса
  variable: '--font-montserrat',
});

export const metadata: Metadata = {
  title: 'Skypro Music',
  description: 'Музыкальный плеер',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru" className={`${montserrat.variable}`}>
      {/* Применяем montserrat.className, чтобы шрифт наследовался всем проектом */}
      <body className={montserrat.className}>{children}</body>
    </html>
  );
}
