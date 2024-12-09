import "./globals.css";
import React from "react";
import { Inter } from "next/font/google";
import { clsx } from "clsx";
import Providers from "@/lib/providers";
import { SidebarNavigation } from "@/components/sidebar-navigation";
import { Metadata } from "next";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Projet L2 Base de données",
  description: "TODO",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <body className={clsx(inter.className, "w-screen h-screen")}>
        <Providers>
          <SidebarNavigation>{children}</SidebarNavigation>
        </Providers>
      </body>
    </html>
  );
}
