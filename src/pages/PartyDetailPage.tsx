import { useParams, useNavigate } from 'react-router-dom';
import { parties } from '../data/parties';

export default function PartyDetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const party = parties.find((p) => p.id === id);

  if (!party) {
    return (
      <main className="detail-not-found">
        <p>파티를 찾을 수 없습니다.</p>
        <button onClick={() => navigate('/')}>목록으로 돌아가기</button>
      </main>
    );
  }

  const spotsLeft = party.capacity - party.enrolled;
  const isSoldOut = spotsLeft === 0;

  return (
    <main className="detail">
      <div className="detail-image-wrap">
        <img src={party.image} alt={party.title} className="detail-image" />
        <div className="detail-genres">
          {party.genre.map((g) => (
            <span key={g} className={`genre-tag genre-${g.toLowerCase()}`}>{g}</span>
          ))}
        </div>
      </div>

      <div className="detail-content">
        <button className="back-btn" onClick={() => navigate(-1)}>← 목록으로</button>

        <h1 className="detail-title">{party.title}</h1>

        <div className="detail-info">
          <div className="info-row">
            <span className="info-label">날짜</span>
            <span>{party.date} {party.time}</span>
          </div>
          <div className="info-row">
            <span className="info-label">장소</span>
            <span>{party.venue} · {party.location}</span>
          </div>
          <div className="info-row">
            <span className="info-label">강사</span>
            <span>{party.instructor}</span>
          </div>
          <div className="info-row">
            <span className="info-label">가격</span>
            <span className="detail-price">₩{party.price.toLocaleString()}</span>
          </div>
          <div className="info-row">
            <span className="info-label">잔여석</span>
            <span className={spotsLeft <= 5 ? 'spots-low' : ''}>
              {isSoldOut ? '마감' : `${spotsLeft} / ${party.capacity}`}
            </span>
          </div>
        </div>

        <p className="detail-desc">{party.description}</p>

        <button
          className={`reserve-btn ${isSoldOut ? 'sold-out' : ''}`}
          disabled={isSoldOut}
        >
          {isSoldOut ? '마감되었습니다' : '예약하기'}
        </button>
      </div>
    </main>
  );
}
