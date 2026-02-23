import { Link } from 'react-router-dom';

export default function Header() {
  return (
    <header className="header">
      <div className="header-inner">
        <Link to="/" className="logo">
          LATIN NIGHT
        </Link>
        <nav className="nav">
          <Link to="/" className="nav-link">파티 목록</Link>
        </nav>
      </div>
    </header>
  );
}
