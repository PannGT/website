import { useEffect } from "react";
import { BrowserRouter, Outlet, Route, Routes, useLocation } from "react-router-dom";
import { ThemeProvider } from "./lib/theme";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import PostDetail from "./pages/PostDetail";
import Admin from "./pages/Admin";
import DownloadPage from "./pages/Download";
import NotFound from "./pages/NotFound";

/** Gulir ke atas setiap kali berpindah rute */
function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, [pathname]);
  return null;
}

/** Layout situs publik: navbar + konten + footer */
function SiteLayout() {
  return (
    <div className="flex min-h-screen flex-col bg-slate-50 text-slate-900 transition-colors duration-300 dark:bg-navy-950 dark:text-slate-100">
      <Navbar />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <ScrollToTop />
        <Routes>
          <Route element={<SiteLayout />}>
            <Route index element={<Home />} />
            <Route path="post/:slug" element={<PostDetail />} />
            <Route path="download" element={<DownloadPage />} />
            <Route path="*" element={<NotFound />} />
          </Route>
          {/* Dashboard admin memakai layout tersendiri */}
          <Route path="admin" element={<Admin />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}
