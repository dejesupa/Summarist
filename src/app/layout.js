import "./globals.css";
import "./style.css";
import { AuthProvider } from "./context/AuthContext";
import ClientLayout from "./ClientLayout"; // 👈 import the new wrapper

export const metadata = {
  title: "Summarist",
  description: "AI-powered book summaries platform",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="flex min-h-screen bg-[#f9f9f9] text-[#032b41]">
        <AuthProvider>
          <ClientLayout>{children}</ClientLayout>
        </AuthProvider>
      </body>
    </html>
  );
}
