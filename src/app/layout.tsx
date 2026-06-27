// src/app/layout.tsx
import type { Metadata } from "next";
import { Inter, Geist } from "next/font/google";
import "./global.css";
import { Toaster } from "sonner";
import { cn } from "@/lib/utils";

const geist = Geist({subsets:['latin'],variable:'--font-sans'});

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Preorder Manager",
  description: "Manage your preorders efficiently",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={cn("font-sans", geist.variable)}>
      <body className={inter.className}>
        <div className="min-h-screen bg-gray-50">
          <div className="max-w-screen mx-auto">
            {children}
             <Toaster richColors position="top-right" />
          </div>
        </div>
      </body>
    </html>
  );
}
