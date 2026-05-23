import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { lazy, Suspense, useEffect } from 'react';
import { HelmetProvider } from 'react-helmet-async';
import { Layout } from './components/layout/Layout';
import { HomePage } from './pages/HomePage';

const AboutPage      = lazy(() => import('./pages/AboutPage').then(m => ({ default: m.AboutPage })));
const ProgramsPage   = lazy(() => import('./pages/ProgramsPage').then(m => ({ default: m.ProgramsPage })));
const InstrumentsPage = lazy(() => import('./pages/InstrumentsPage').then(m => ({ default: m.InstrumentsPage })));
const TeachersPage   = lazy(() => import('./pages/TeachersPage').then(m => ({ default: m.TeachersPage })));
const ContactPage    = lazy(() => import('./pages/ContactPage').then(m => ({ default: m.ContactPage })));
const EnrolPage      = lazy(() => import('./pages/EnrolPage').then(m => ({ default: m.EnrolPage })));
const PrivacyPage    = lazy(() => import('./pages/PrivacyPage').then(m => ({ default: m.PrivacyPage })));
const ThankYouPage   = lazy(() => import('./pages/ThankYouPage').then(m => ({ default: m.ThankYouPage })));
const PricingPage    = lazy(() => import('./pages/PricingPage').then(m => ({ default: m.PricingPage })));
const NotFoundPage   = lazy(() => import('./pages/NotFoundPage').then(m => ({ default: m.NotFoundPage })));

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => { window.scrollTo(0, 0); }, [pathname]);
  return null;
}

export default function App() {
  return (
    <HelmetProvider>
      <BrowserRouter>
        <ScrollToTop />
        <Layout>
          <Suspense fallback={null}>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/programs" element={<ProgramsPage />} />
              <Route path="/instruments" element={<InstrumentsPage />} />
              <Route path="/instruments/:slug" element={<InstrumentsPage />} />
              <Route path="/teachers" element={<TeachersPage />} />
              <Route path="/contact" element={<ContactPage />} />
              <Route path="/enrol" element={<EnrolPage />} />
              <Route path="/thank-you" element={<ThankYouPage />} />
              <Route path="/privacy" element={<PrivacyPage />} />
              <Route path="/pricing" element={<PricingPage />} />
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
          </Suspense>
        </Layout>
      </BrowserRouter>
    </HelmetProvider>
  );
}
