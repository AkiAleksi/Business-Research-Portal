export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-[calc(100vh-3.5rem)] flex items-center justify-center p-4 bg-gradient-to-br from-primary/5 via-transparent to-accent/5">
      <div className="w-full max-w-md">
        {children}
      </div>
    </div>
  );
}
