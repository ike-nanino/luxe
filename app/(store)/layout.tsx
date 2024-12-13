import type { Metadata } from "next";
import "../globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import Header from "@/components/Header";
import { SanityLive } from "@/sanity/lib/live";


export const metadata: Metadata = {
  title: "Luxé",
  description: "A fullstack E-commerce website by Nanino",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider dynamic>
    <html lang="en">
      <body>
        <main>
          <Header />
          {children}
        </main>

        <SanityLive />
      </body>
    </html>
    </ClerkProvider>
  );
}
