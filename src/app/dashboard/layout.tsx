import { Metadata } from "next";
import Navbar from "@/components/Navbar";
import "@/styles/dashboard.css";

export const metadata: Metadata = {
  title: "Dashboard - Personal Expense Tracker",
  description: "View and manage your personal finances",
};

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="dashboard-container">
      <div className="dashboard-inner">
        {children}
      </div>
    </div>
  );
} 