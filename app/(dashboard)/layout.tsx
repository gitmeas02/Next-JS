import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "../globals.css";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import AppSidebar from "@/components/ui/app-sidebar";
import { AppBreadcrumb } from "@/components/AppBreadcrumb";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Dashboard - Next One More",
  description: "Inventory Management System",
};

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <SidebarProvider className="flex h-full">
      <AppSidebar />
      <main className="flex-1 w-full overflow-auto no-scrollbar">
        <div className="flex items-center justify-start p-4 border-b">
          <SidebarTrigger />
          <AppBreadcrumb />
        </div>
        <div className="p-4">
          {children}
        </div>
      </main>
    </SidebarProvider>
  );
}
