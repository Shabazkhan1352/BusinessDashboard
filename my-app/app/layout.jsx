import "./globals.css";

export const metadata = {
  title: "IntelliDash",
  description: "AI-powered business management dashboard",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="antialiased">{children}</body>
    </html>
  );
}
