import React, { useState } from "react";
import { User } from "../types";
import Header from "./Header";
import Footer from "./Footer";
import Sidebar from "./Sidebar";

interface LayoutProps {
    children: React.ReactNode;
    user: User | null;
    hideFooter?: boolean;
    activePath?: string;
    onNavigate?: (path: string) => void;
    onGoogleSignIn?: () => void;
}

export default function Layout({
    children,
    user,
    hideFooter = false,
    activePath = "/",
    onNavigate,
    onGoogleSignIn
}: LayoutProps) {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    return (
        <div className="flex overflow-y-hidden h-screen bg-gray-50">
            {/* Sidebar - Persistent on desktop, drawer on mobile */}
            {user && onNavigate && (
                <Sidebar
                    isOpen={isSidebarOpen}
                    onClose={() => setIsSidebarOpen(false)}
                    activePath={activePath}
                    onNavigate={onNavigate}
                />
            )}

            <div className="flex flex-1 flex-col h-screen overflow-hidden">
                <Header
                    user={user}
                    onMenuClick={() => setIsSidebarOpen(true)}
                    onNavigate={onNavigate}
                    onGoogleSignIn={onGoogleSignIn}
                />

                <main className="flex-1 w-full h-full overflow-y-auto">
                    <div className="w-full flex flex-col">
                        <div className="bg-gray-50/10 pb-20 px-4">
                            {children}
                            {!hideFooter && (
                                <Footer variant={user ? "minimal" : "full"} />
                            )}
                        </div>

                    </div>
                </main>
            </div>
        </div>
    );
}
