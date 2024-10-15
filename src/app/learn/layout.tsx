export default function LearnPageLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="w-full mx-auto">
      <main className="flex-1">{children}</main>
    </div>
  );
}
