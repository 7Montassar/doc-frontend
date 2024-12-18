    import type { Metadata } from "next";
    import { Geist, Geist_Mono } from "next/font/google";
    import "@/app/globals.css";
    import Navbar from "@/app/(manager)/_components/Navbar";
    import React from "react";
    import AIChatbot from "@/components/AIChatbot";


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
                <Navbar />
                {children}
                <AIChatbot />
            </div>
        );
    }
