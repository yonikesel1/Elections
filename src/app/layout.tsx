"use client";

import "./globals.css";
import ClientLayout from "./ClientLayout";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="he" dir="rtl">
      <body className="bg-gradient-to-b from-brand-100 to-white text-neutral-900 min-h-screen">
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  );
}
