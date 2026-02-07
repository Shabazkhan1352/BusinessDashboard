import "./globals.css";
import Providers from "./providers";

export const metadata = {
  title: "IntelliDash",
  description: "AI-powered business management dashboard",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-slate-50 antialiased">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
