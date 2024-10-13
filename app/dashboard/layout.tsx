import { Sidebar } from '@/components/sidebar'; 

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen">
      <Sidebar /> 
      <main className="flex-1 p-4"> 
        {children}
      </main>
    </div>
  );
}
