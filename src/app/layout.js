import SideBar from "@/components/Sidebar";
import "./globals.css";
import { Inter } from "next/font/google";
import Navbar from "@/components/Navbar";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Réservation Matériel",
};

export default function RootLayout({ children }) {
  return (
    <html lang="fr">
      <body
        className={`${inter.className} bg-gradient-to-r from-cyan-500 to-blue-500 dark:from-black dark:to-white`}
      >
        <Navbar />
        <SideBar />
        <div className="scroll-container">
          <div className="content"> {children}</div>
        </div>
      </body>
    </html>
  );
}
