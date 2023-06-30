import "./globals.css";
import { dark } from "@clerk/themes";
import { Inter } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";
import MainNavigation from "@/components/MainNavigation";
import { frFR } from "@clerk/localizations";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Réservation Matériel",
};

export default function RootLayout({ children }) {
  return (
    <ClerkProvider localization={frFR}>
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
