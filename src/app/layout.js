import "./globals.css";
import { Inter } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";
import MainNavigation from "@/components/MainNavigation";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Réservation Matériel",
};

export default function RootLayout({ children }) {
  return (
    <ClerkProvider>
      <html lang="fr">
        <body
          className={`${inter.className}  bg-gradient-to-r from-cyan-500 to-blue-500 dark:from-black dark:to-white`}
        >
          <MainNavigation>{children}</MainNavigation>
        </body>
      </html>
    </ClerkProvider>
  );
}
