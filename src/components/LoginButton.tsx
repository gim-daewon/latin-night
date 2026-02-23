import { useAuth } from '../contexts/AuthContext';

export default function LoginButton() {
  const { user, login, logout } = useAuth();

  if (user) {
    return (
      <div className="user-info">
        {user.profileImage && (
          <img src={user.profileImage} alt={user.nickname} className="user-avatar" />
        )}
        <span className="user-nickname">{user.nickname}</span>
        <button className="logout-btn" onClick={logout}>로그아웃</button>
      </div>
    );
  }

  return (
    <button className="kakao-btn" onClick={login}>
      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 3C6.48 3 2 6.58 2 11c0 2.76 1.64 5.2 4.13 6.73L5 21l4.2-2.2A11.8 11.8 0 0012 19c5.52 0 10-3.58 10-8s-4.48-8-10-8z"/>
      </svg>
      카카오로 로그인
    </button>
  );
}
