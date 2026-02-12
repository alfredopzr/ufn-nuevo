export const metadata = {
  title: "Admin — UFN",
};

// This is a pass-through layout. Auth is handled by middleware.
// The admin nav is rendered inside each page/sub-layout that needs it.
export default function AdminRootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
