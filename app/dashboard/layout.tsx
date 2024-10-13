import { Sidebar } from '@/components/sidebar'; 
import './dashboard.css'; 

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="dashboard-layout">
      <Sidebar /> 
      <main className="flex-1 p-6"> 
        {children}
      </main>
    </div>
  );
}
