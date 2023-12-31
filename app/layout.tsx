import type { Metadata } from "next";
import { Inter } from "next/font/google";
import ToasterProvider from "@/providers/toaster-provider";
import "./globals.css";
import Navbar from "@/components/navbar/navbar";
import Sidebar from "@/components/navbar/sidebar";
import UserProvider from "@/providers/user-provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='en'>
      <body className={inter.className}>
        <div className='h-full flex justify-center font-light'>
          <ToasterProvider />
          <UserProvider>
            {/* <ModalProvider /> */}
            <div className='h-full w-full'>
              <Navbar />
              <Sidebar />
              <main className='m-3'>{children}</main>
            </div>
          </UserProvider>
        </div>
      </body>
    </html>
  );
}
