import { useState, type FormEvent } from 'react';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../lib/firebase';
import { useAuth } from '../contexts/AuthContext';

interface Props {
  onClose: () => void;
}

const GENRES = ['Salsa', 'Bachata'];

export default function PostForm({ onClose }: Props) {
  const { user } = useAuth();
  const [submitting, setSubmitting] = useState(false);
  const [form, setForm] = useState({
    title: '',
    content: '',
    genre: [] as string[],
    date: '',
    time: '',
    venue: '',
    price: '',
  });

  function toggleGenre(g: string) {
    setForm((f) => ({
      ...f,
      genre: f.genre.includes(g) ? f.genre.filter((x) => x !== g) : [...f.genre, g],
    }));
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!user || !db) return;
    if (!form.title || !form.date || !form.venue || form.genre.length === 0) {
      alert('제목, 장르, 날짜, 장소는 필수입니다.');
      return;
    }
    setSubmitting(true);
    try {
      await addDoc(collection(db, 'classes'), {
        title: form.title,
        content: form.content,
        genre: form.genre,
        date: form.date,
        time: form.time,
        venue: form.venue,
        price: Number(form.price) || 0,
        authorId: user.id,
        authorName: user.nickname,
        authorImage: user.profileImage,
        createdAt: serverTimestamp(),
      });
      onClose();
    } catch (err) {
      console.error(err);
      alert('저장 중 오류가 발생했습니다.');
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2 className="modal-title">수업 공고 작성</h2>
          <button className="modal-close" onClick={onClose}>✕</button>
        </div>
        <form className="post-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label">제목 *</label>
            <input
              className="form-input"
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
              placeholder="수업 제목을 입력하세요"
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label">장르 *</label>
            <div className="genre-checks">
              {GENRES.map((g) => (
                <label key={g} className="genre-check-label">
                  <input
                    type="checkbox"
                    checked={form.genre.includes(g)}
                    onChange={() => toggleGenre(g)}
                  />
                  <span className={`genre-tag genre-${g.toLowerCase()}`}>{g}</span>
                </label>
              ))}
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label className="form-label">날짜 *</label>
              <input
                className="form-input"
                type="date"
                value={form.date}
                onChange={(e) => setForm({ ...form, date: e.target.value })}
                required
              />
            </div>
            <div className="form-group">
              <label className="form-label">시간</label>
              <input
                className="form-input"
                type="time"
                value={form.time}
                onChange={(e) => setForm({ ...form, time: e.target.value })}
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label className="form-label">장소 *</label>
              <input
                className="form-input"
                value={form.venue}
                onChange={(e) => setForm({ ...form, venue: e.target.value })}
                placeholder="스튜디오명, 주소"
                required
              />
            </div>
            <div className="form-group">
              <label className="form-label">수강료 (원)</label>
              <input
                className="form-input"
                type="number"
                value={form.price}
                onChange={(e) => setForm({ ...form, price: e.target.value })}
                placeholder="0"
                min="0"
              />
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">내용</label>
            <textarea
              className="form-textarea"
              value={form.content}
              onChange={(e) => setForm({ ...form, content: e.target.value })}
              placeholder="수업 소개, 레벨, 강사 소개 등"
              rows={5}
            />
          </div>

          <div className="form-actions">
            <button type="button" className="btn-cancel" onClick={onClose}>취소</button>
            <button type="submit" className="btn-submit" disabled={submitting}>
              {submitting ? '저장 중...' : '공고 등록'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
