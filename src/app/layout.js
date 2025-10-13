import "./globals.css";
import "./style.css"; 

export const metadata = {
  title: "Summarist",
  description: "Gain more knowledge in less time",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
