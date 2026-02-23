import { useEffect, useState } from 'react';
import { collection, onSnapshot, orderBy, query, type Timestamp } from 'firebase/firestore';
import { db } from '../lib/firebase';
import { useAuth } from '../contexts/AuthContext';
import PostForm from '../components/PostForm';

interface ClassPost {
  id: string;
  title: string;
  content: string;
  genre: string[];
  date: string;
  time: string;
  venue: string;
  price: number;
  authorId: string;
  authorName: string;
  authorImage: string;
  createdAt: Timestamp | null;
}

export default function ClassBoardPage() {
  const { user } = useAuth();
  const [posts, setPosts] = useState<ClassPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [expanded, setExpanded] = useState<string | null>(null);

  useEffect(() => {
    if (!db) {
      setLoading(false);
      return;
    }
    const q = query(collection(db, 'classes'), orderBy('createdAt', 'desc'));
    const unsub = onSnapshot(q, (snap) => {
      setPosts(
        snap.docs.map((doc) => ({ id: doc.id, ...doc.data() } as ClassPost))
      );
      setLoading(false);
    });
    return unsub;
  }, []);

  return (
    <main className="board-page">
      <div className="board-header">
        <div>
          <h1 className="board-title">수업 공고</h1>
          <p className="board-sub">살사 & 바차타 수업을 찾아보세요</p>
        </div>
        {user && (
          <button className="write-btn" onClick={() => setShowForm(true)}>
            + 공고 작성
          </button>
        )}
      </div>

      {!db && (
        <div className="board-notice">
          Firebase 연결이 필요합니다. <code>.env.local</code> 파일에 Firebase 설정을 추가해주세요.
        </div>
      )}

      {loading ? (
        <p className="board-loading">불러오는 중...</p>
      ) : posts.length === 0 ? (
        <p className="empty">
          {db ? '등록된 수업 공고가 없습니다.' : ''}
          {!user && db && <> 로그인 후 첫 번째 공고를 작성해보세요.</>}
        </p>
      ) : (
        <div className="class-list">
          {posts.map((post) => (
            <div
              key={post.id}
              className={`class-card ${expanded === post.id ? 'expanded' : ''}`}
            >
              <div
                className="class-card-head"
                onClick={() => setExpanded(expanded === post.id ? null : post.id)}
              >
                <div className="class-card-left">
                  <div className="class-genres">
                    {post.genre.map((g) => (
                      <span key={g} className={`genre-tag genre-${g.toLowerCase()}`}>{g}</span>
                    ))}
                  </div>
                  <h3 className="class-title">{post.title}</h3>
                  <div className="class-meta">
                    <span>📅 {post.date}{post.time && ` ${post.time}`}</span>
                    <span>📍 {post.venue}</span>
                    {post.price > 0 && <span>₩{post.price.toLocaleString()}</span>}
                  </div>
                </div>
                <div className="class-card-right">
                  <div className="class-author">
                    {post.authorImage && (
                      <img src={post.authorImage} alt={post.authorName} className="author-avatar" />
                    )}
                    <span className="author-name">{post.authorName}</span>
                  </div>
                  <span className="expand-icon">{expanded === post.id ? '▲' : '▼'}</span>
                </div>
              </div>

              {expanded === post.id && post.content && (
                <div className="class-content">
                  <p>{post.content}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {showForm && <PostForm onClose={() => setShowForm(false)} />}
    </main>
  );
}
