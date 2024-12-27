export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="max-w-[1400px]">
      <main className="mt-8">{children}</main>
    </div>
  );
}
