import { Link } from 'react-router-dom';
import LoginButton from './LoginButton';

export default function Header() {
  return (
    <header className="header">
      <div className="header-inner">
        <Link to="/" className="logo">
          LATIN NIGHT
        </Link>
        <nav className="nav">
          <Link to="/" className="nav-link">파티 목록</Link>
          <Link to="/classes" className="nav-link">수업 공고</Link>
        </nav>
        <LoginButton />
      </div>
    </header>
  );
}
