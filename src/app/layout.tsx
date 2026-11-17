import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/src/components/ThemeProvicer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Elnoor Mutsa Maria",
  description: "Website Admin Official Elnoor",
  icons:{
    icon: "/el-con.svg", // Sesuaikan path jika nama file/foldernya berbeda (misal: /icon.png)
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="light">
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}