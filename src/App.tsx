import { ThemeProvider } from '@/components/theme-provider';
import { Toaster } from '@/components/ui/sonner';
import DreamAnalyzer from '@/components/dream-analyzer';
import Header from '@/components/header';
import { Sidebar } from '@/components/sidebar';

function App() {
  return (
    <ThemeProvider defaultTheme="light" storageKey="dream-theme">
      <div className="min-h-screen bg-background">
        <div className="flex">
          <Sidebar />
          <div className="flex-1">
            <Header />
            <main className="px-8 py-6">
              <DreamAnalyzer />
            </main>
          </div>
        </div>
        <Toaster />
      </div>
    </ThemeProvider>
  );
}

export default App;