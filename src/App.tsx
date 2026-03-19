import { BrowserRouter, Routes, Route } from 'react-router-dom';
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
    <BrowserRouter>
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
  );
}
