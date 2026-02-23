import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import Header from './components/Header';
import HomePage from './pages/HomePage';
import PartyDetailPage from './pages/PartyDetailPage';
import ClassBoardPage from './pages/ClassBoardPage';
import './App.css';

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/party/:id" element={<PartyDetailPage />} />
          <Route path="/classes" element={<ClassBoardPage />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}
