import type { Metadata } from "next";
import { Inter, Roboto } from "next/font/google";
import "./globals.css";
import AppBar from "@/components/AppBar";
import Footer from "@/components/Footer";
import { SessionProvider } from "next-auth/react";

const inter = Inter({ weight: "400", subsets: ["latin"] });
const roboto = Roboto({ weight: "400", subsets: ["latin"] });

export const metadata: Metadata = {
  title: "PocketBook",
  description: "Budgets made easy",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <SessionProvider>
      <html lang="en">
        <body
          className={`${roboto.className} flex flex-col h-lvh overflow-hidden `}
        >
          <AppBar />
          <div className="h-full overflow-auto">{children}</div>
          <Footer />
        </body>
      </html>
    </SessionProvider>
  );
}
