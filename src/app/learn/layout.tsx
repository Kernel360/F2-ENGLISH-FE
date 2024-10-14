export default function LearnPageLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="max-w-[1080px] mx-auto pt-12 px-6">
      <main className="flex-1">{children}</main>
    </div>
  );
}
