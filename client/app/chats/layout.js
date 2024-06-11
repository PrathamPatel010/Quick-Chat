import { Inter } from "next/font/google";
import '../globals.css';

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
    title: "Chats",
    description: "Generated by create next app",
};

export default function RootLayout({ children }) {
    return (
        <html className={'dark'} lang="en">
        <body className={inter.className}>{children}</body>
        </html>
    );
}