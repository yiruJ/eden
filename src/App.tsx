import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import { HelmetProvider } from 'react-helmet-async';

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => { window.scrollTo(0, 0); }, [pathname]);
  return null;
}
import { Layout } from './components/layout/Layout';
import { HomePage } from './pages/HomePage';
import { AboutPage } from './pages/AboutPage';
import { ProgramsPage } from './pages/ProgramsPage';
import { InstrumentsPage } from './pages/InstrumentsPage';
import { TeachersPage } from './pages/TeachersPage';
import { ContactPage } from './pages/ContactPage';
import { EnrolPage } from './pages/EnrolPage';

export default function App() {
  return (
    <HelmetProvider>
      <BrowserRouter>
        <ScrollToTop />
        <Layout>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/programs" element={<ProgramsPage />} />
            <Route path="/instruments" element={<InstrumentsPage />} />
            <Route path="/instruments/:slug" element={<InstrumentsPage />} />
            <Route path="/teachers" element={<TeachersPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/enrol" element={<EnrolPage />} />
          </Routes>
        </Layout>
      </BrowserRouter>
    </HelmetProvider>
  );
}
