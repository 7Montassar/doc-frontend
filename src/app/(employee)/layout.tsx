import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "@/app/globals.css";
import Navbar from "@/app/(employee)/_components/Navbar";
import AIChatbot from "@/components/AIChatbot";
import React from "react";


const geistSans = Geist({
    variable: "--font-geist-sans",
    subsets: ["latin"],
});

const geistMono = Geist_Mono({
    variable: "--font-geist-mono",
    subsets: ["latin"],
});

export const metadata = {
    title: 'DocFlow - Streamline Your Document Management',
    description: 'Modern document management system for businesses',
}

export default function RootLayout({
                                       children,
                                   }: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <div
            className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        >
        <Navbar/>

        {children}

    {/*<AIChatbot />*/}

        </div>
    );
}
