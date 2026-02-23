import { useState } from 'react';
import { parties } from '../data/parties';
import PartyCard from '../components/PartyCard';

type Filter = 'All' | 'Salsa' | 'Bachata';

const FILTERS: Filter[] = ['All', 'Salsa', 'Bachata'];

export default function HomePage() {
  const [filter, setFilter] = useState<Filter>('All');

  const filtered = filter === 'All'
    ? parties
    : parties.filter((p) => p.genre.includes(filter));

  return (
    <main>
      <section className="hero">
        <h1 className="hero-title">LATIN NIGHT</h1>
        <p className="hero-sub">서울의 살사 & 바차타 파티를 한 곳에서</p>
      </section>

      <section className="party-section">
        <div className="filter-bar">
          {FILTERS.map((f) => (
            <button
              key={f}
              className={`filter-btn ${filter === f ? 'active' : ''}`}
              onClick={() => setFilter(f)}
            >
              {f === 'All' ? '전체' : f}
            </button>
          ))}
        </div>

        {filtered.length === 0 ? (
          <p className="empty">해당 장르의 파티가 없습니다.</p>
        ) : (
          <div className="party-grid">
            {filtered.map((party) => (
              <PartyCard key={party.id} party={party} />
            ))}
          </div>
        )}
      </section>
    </main>
  );
}
