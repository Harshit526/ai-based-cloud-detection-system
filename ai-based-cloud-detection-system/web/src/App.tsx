import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { LandingView } from './views/LandingView';
import { LoginView } from './views/LoginView';
import { SignupView } from './views/SignupView';
import { AdminView } from './views/AdminView';
import { MainAppView } from './views/MainAppView';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingView />} />
        <Route path="/login" element={<LoginView />} />
        <Route path="/signup" element={<SignupView />} />
        <Route path="/admin" element={<AdminView />} />
        <Route path="/app/*" element={<MainAppView />} />
        {/* Fallback to landing page */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

export default App;
