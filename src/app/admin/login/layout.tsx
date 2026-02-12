// Login page bypasses the admin layout auth check.
// The middleware handles redirect logic (logged-in users go to /admin).
export default function LoginLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen">{children}</div>
  );
}
