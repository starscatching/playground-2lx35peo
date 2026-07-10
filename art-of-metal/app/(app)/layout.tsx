import Sidebar from "@/components/Sidebar";

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ background: "#080808", color: "#F5F5F5", display: "flex", minHeight: "100vh" }}>
      <Sidebar />
      <main style={{ flex: 1, marginLeft: 160, minHeight: "100vh", overflowX: "hidden" }}>
        {children}
      </main>
    </div>
  );
}
