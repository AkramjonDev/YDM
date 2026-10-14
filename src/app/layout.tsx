import type { Metadata } from "next";
import { Geist_Mono, Inter, Montserrat } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin", "cyrillic"],
  weight: ["400", "500", "600", "700"],
});

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin", "cyrillic"],
  weight: ["600", "700", "800"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Oʻzbekiston Yoshlar Diplomatiya Markazi",
    template: "%s — Yoshlar Diplomatiya Markazi",
  },
  description:
    "Yoshlarni xalqaro munosabatlar va jamoatchilik diplomatiyasi sohasida tayyorlovchi, Oʻzbekistonning ijobiy imijini dunyoga tanituvchi markaz.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="uz"
      className={`${inter.variable} ${montserrat.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
