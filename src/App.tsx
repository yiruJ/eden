import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { lazy, Suspense, useEffect } from 'react';
import { HelmetProvider } from 'react-helmet-async';
import { Layout } from './components/layout/Layout';
import { HomePage } from './pages/HomePage';
import { AdminLayout } from './components/layout/AdminLayout';

const AboutPage       = lazy(() => import('./pages/AboutPage').then(m => ({ default: m.AboutPage })));
const ProgramsPage    = lazy(() => import('./pages/ProgramsPage').then(m => ({ default: m.ProgramsPage })));
const InstrumentsPage = lazy(() => import('./pages/InstrumentsPage').then(m => ({ default: m.InstrumentsPage })));
const TeachersPage    = lazy(() => import('./pages/TeachersPage').then(m => ({ default: m.TeachersPage })));
const ContactPage     = lazy(() => import('./pages/ContactPage').then(m => ({ default: m.ContactPage })));
const EnrolPage       = lazy(() => import('./pages/EnrolPage').then(m => ({ default: m.EnrolPage })));
const PrivacyPage     = lazy(() => import('./pages/PrivacyPage').then(m => ({ default: m.PrivacyPage })));
const ThankYouPage    = lazy(() => import('./pages/ThankYouPage').then(m => ({ default: m.ThankYouPage })));
const PricingPage     = lazy(() => import('./pages/PricingPage').then(m => ({ default: m.PricingPage })));
const NotFoundPage    = lazy(() => import('./pages/NotFoundPage').then(m => ({ default: m.NotFoundPage })));

// Admin pages
const AdminLoginPage         = lazy(() => import('./pages/admin/LoginPage').then(m => ({ default: m.LoginPage })));
const AdminConversationsPage = lazy(() => import('./pages/admin/ConversationsPage').then(m => ({ default: m.ConversationsPage })));
const AdminChatPage          = lazy(() => import('./pages/admin/ChatPage').then(m => ({ default: m.ChatPage })));
const AdminEventsPage        = lazy(() => import('./pages/admin/EventsPage').then(m => ({ default: m.EventsPage })));
const AdminDashboardPage     = lazy(() => import('./pages/admin/DashboardPage').then(m => ({ default: m.DashboardPage })));

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
          <Suspense fallback={null}>
            <Routes>
              {/* Public routes — with navbar/footer */}
              <Route element={<Layout />}>  
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
              </Route>

              {/* Admin routes - no navbar/footer */}
              <Route path="/admin" element={<AdminLoginPage />} />
              <Route element={<AdminLayout />}>
                <Route path="/admin/dashboard" element={<AdminDashboardPage />} />
                <Route path="/admin/conversations" element={<AdminConversationsPage />} />
                <Route path="/admin/conversations/:id" element={<AdminChatPage />} />
                <Route path="/admin/events" element={<AdminEventsPage />} />
              </Route>
            </Routes>
          </Suspense>
      </BrowserRouter>
    </HelmetProvider>
  );
}
