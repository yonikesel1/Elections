import Link from "next/link";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-6 p-4">
      <h1 className="text-3xl font-bold text-brand-600 text-center">
        איזו מפלגה באמת מייצגת את הדעות שלך?
      </h1>
      <p className="max-w-md text-center">
        מקם את עמדתך בכל אחד משלושת התחומים ותגלה מהי המפלגה הקרובה ביותר להשקפת העולם שלך. הנתונים
        אנונימיים לחלוטין.
      </p>
      <Link
        href="/quiz"
        className="rounded-lg bg-brand-600 px-6 py-3 text-white hover:opacity-90 transition"
      >
        התחל
      </Link>
      <Link href="/stats" className="underline text-sm text-brand-600">
        צפה בתוצאות הכלליות
      </Link>
    </main>
  );
} 