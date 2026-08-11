import Bar from '@/components/Bar/Bar';
export default function MusicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      {children}
      <Bar />
    </>
  );
}
