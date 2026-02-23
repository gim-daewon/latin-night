import { useNavigate } from 'react-router-dom';
import type { Party } from '../types';

interface Props {
  party: Party;
}

export default function PartyCard({ party }: Props) {
  const navigate = useNavigate();
  const spotsLeft = party.capacity - party.enrolled;

  return (
    <div className="card" onClick={() => navigate(`/party/${party.id}`)}>
      <div className="card-image-wrap">
        <img src={party.image} alt={party.title} className="card-image" />
        <div className="card-genres">
          {party.genre.map((g) => (
            <span key={g} className={`genre-tag genre-${g.toLowerCase()}`}>{g}</span>
          ))}
        </div>
      </div>
      <div className="card-body">
        <h3 className="card-title">{party.title}</h3>
        <div className="card-meta">
          <span className="card-meta-item">
            <span className="meta-icon">📅</span>
            {party.date} {party.time}
          </span>
          <span className="card-meta-item">
            <span className="meta-icon">📍</span>
            {party.venue} · {party.location}
          </span>
        </div>
        <div className="card-footer">
          <span className="card-price">₩{party.price.toLocaleString()}</span>
          <span className={`card-spots ${spotsLeft <= 5 ? 'spots-low' : ''}`}>
            잔여 {spotsLeft}석
          </span>
        </div>
      </div>
    </div>
  );
}
