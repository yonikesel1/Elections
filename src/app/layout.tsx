import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "בחירות בקליק",
  description: "מגלים איזו מפלגה מתאימה לדעות שלך",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="he" dir="rtl">
      <body className="bg-neutral-100 text-neutral-900">{children}</body>
    </html>
  );
} 