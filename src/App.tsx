import { HashRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import WelcomeScreen from './pages/WelcomeScreen';
import DashboardLayout from './layouts/DashboardLayout';
import CentralDashboard from './pages/CentralDashboard';
import MidiasSociais from './pages/MidiasSociais';
import MarketingArea from './pages/MarketingArea';
import VendasFunnel from './pages/VendasFunnel';
import Financeiro from './pages/Financeiro';
import PresencaDigital from './pages/PresencaDigital';
import DocsArea from './pages/DocsArea';
import HelpQA from './pages/HelpQA';
import SupportChat from './pages/SupportChat';
import UserProfileArea from './pages/UserProfileArea';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/welcome" element={<WelcomeScreen />} />
        
        <Route path="/dashboard" element={<DashboardLayout />}>
          <Route index element={<CentralDashboard />} />
          <Route path="midias-sociais" element={<MidiasSociais />} />
          <Route path="marketing" element={<MarketingArea />} />
          <Route path="vendas" element={<VendasFunnel />} />
          <Route path="financeiro" element={<Financeiro />} />
          <Route path="presenca" element={<PresencaDigital />} />
          <Route path="perfil" element={<UserProfileArea />} />
          
          {/* New Support & Info Routes */}
          <Route path="docs" element={<DocsArea />} />
          <Route path="ajuda" element={<HelpQA />} />
          <Route path="suporte" element={<SupportChat />} />
        </Route>

        <Route path="*" element={<Navigate to="/welcome" replace />} />
      </Routes>
    </Router>
  );
}

export default App;
