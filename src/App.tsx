import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import HomePage from './pages/HomePage';
import PartyDetailPage from './pages/PartyDetailPage';
import './App.css';

export default function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/party/:id" element={<PartyDetailPage />} />
      </Routes>
    </BrowserRouter>
  );
}
