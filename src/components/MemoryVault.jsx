import React, { useState } from 'react';

export default function MemoryVault({ onCardClick }) {
  const [activeFilter, setActiveFilter] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  const categories = ['All', 'Dates', 'Trips', 'Silly'];

  const memories = [
    {
      id: 'v1',
      title: 'Double Trouble',
      category: 'Silly',
      date: 'Jul 14, 2024',
      location: 'Cozy Café',
      img: '/memory_vault/39244640-b621-40bc-a08b-1f2b26d20018 2.JPG',
      desc: 'Caught in a silly moment where both of us could not stop laughing. The absolute definition of our goofy chemistry.',
      matchRate: '99.9% Fun',
      year: '2024'
    },
    {
      id: 'v2',
      title: 'Sweet Treats',
      category: 'Dates',
      date: 'Sep 5, 2024',
      location: 'Dessert Parlor',
      img: '/memory_vault/5d91ab0d-f2b4-4510-9c00-fa6644d26ac5 3.JPG',
      desc: 'Sharing our favorite sweet treats and fighting over who gets the last bite of the delicious chocolate pastry.',
      matchRate: '97% Sweet',
      year: '2024'
    },
    {
      id: 'v3',
      title: 'Casual Stroll',
      category: 'Dates',
      date: 'Nov 12, 2024',
      location: 'City Center',
      img: '/memory_vault/70e243af-b920-4512-a3d1-ae6340d4ae54 2.JPG',
      desc: 'A casual afternoon walk through the city, enjoying the cool breeze and each other\'s warm company.',
      matchRate: '98.2% Perfect',
      year: '2024'
    },
    {
      id: 'v4',
      title: 'Indie Concert Vibe',
      category: 'Trips',
      date: 'Oct 18, 2024',
      location: 'Music Festival',
      img: '/memory_vault/72bc5ccb-b8d8-4dcf-ad98-f5e7aa56625e 2.JPG',
      desc: 'Singing along to our favorite songs in the middle of a massive crowd. Nothing compares to the energy of live music with you.',
      matchRate: '99% Match',
      year: '2024'
    },
    {
      id: 'v5',
      title: 'The Sunset Glow',
      category: 'Trips',
      date: 'Jun 24, 2024',
      location: 'Sunset Point',
      img: '/memory_vault/7BA5E4E4-92B1-4671-A01B-2DEA92D25C8B.JPG',
      desc: 'Watching the sky turn into a canvas of oranges and purples. A quiet moment where time stood absolutely still.',
      matchRate: '98.8% Warmth',
      year: '2024'
    },
    {
      id: 'v6',
      title: 'Cozy Evening',
      category: 'Dates',
      date: 'Dec 25, 2024',
      location: 'Our Happy Place',
      img: '/memory_vault/8D8CFB11-4EC3-4187-A0AE-238985C3B790.jpg',
      desc: 'Wrapped in cozy blankets, celebrating the holiday season with inside jokes and unlimited warm cups of hot chocolate.',
      matchRate: '100% Cozy',
      year: '2024'
    },
    {
      id: 'v7',
      title: 'Foodie Adventures',
      category: 'Dates',
      date: 'May 19, 2024',
      location: 'Gourmet Bistro',
      img: '/memory_vault/c67bd337-71c9-488c-8c1f-53764b9a3288 2.JPG',
      desc: 'Trying out an exotic menu. Some dishes were amazing, some were questionable, but the company was top-tier.',
      matchRate: '96.5% Yummy',
      year: '2024'
    },
    {
      id: 'v8',
      title: 'Silly Selfies',
      category: 'Silly',
      date: 'Aug 30, 2024',
      location: 'Photo Booth',
      img: '/memory_vault/FE397E7B-6556-4C78-A17C-B3056E080F33.jpg',
      desc: 'Making the weirdest faces for the camera. Love is finding someone who matches your level of absolute craziness.',
      matchRate: '99.5% Comedy',
      year: '2024'
    },
    {
      id: 'v9',
      title: 'Warm Hugs',
      category: 'Dates',
      date: 'Jan 12, 2024',
      location: 'Evening Park',
      img: '/memory_vault/ff98cb10-b7d2-4405-b696-5ee02f91d39f 2.JPG',
      desc: 'A big warm hug in the chilly winter evening. Finding my absolute safest and happiest place in your arms.',
      matchRate: '99.9% Match',
      year: '2024'
    },
    {
      id: 'v10',
      title: 'The Epic Roadtrip',
      category: 'Trips',
      date: 'Mar 21, 2024',
      location: 'Highways & Hills',
      img: '/memory_vault/FullSizeRender 3.jpg',
      desc: 'Windows rolled down, music blasting, and the open road ahead of us. An adventure that we will remember forever.',
      matchRate: '99.2% Match',
      year: '2024'
    },
    {
      id: 'v11',
      title: 'Coffee & Conversations',
      category: 'Dates',
      date: 'Apr 5, 2024',
      location: 'Neighborhood Café',
      img: '/memory_vault/IMG_0029.jpg',
      desc: 'Spending hours talking about everything and nothing over cups of warm hazelnut lattes. Time always flies with you.',
      matchRate: '97.5% Match',
      year: '2024'
    },
    {
      id: 'v12',
      title: 'Cute & Goofy',
      category: 'Silly',
      date: 'Jun 15, 2024',
      location: 'Amusement Park',
      img: '/memory_vault/IMG_2607 2.jpg',
      desc: 'A goofy moment captured on the go. There is never a dull day when we are exploring the world together.',
      matchRate: '98.9% Fun',
      year: '2024'
    },
    {
      id: 'v13',
      title: 'Late Night Drive',
      category: 'Trips',
      date: 'Aug 22, 2024',
      location: 'City Bypass',
      img: '/memory_vault/IMG_2887 2.jpg',
      desc: 'Driving under the city lights late at night, listening to slow indie music and talking about our future plans.',
      matchRate: '99.1% Romantic',
      year: '2024'
    },
    {
      id: 'v14',
      title: 'Sun-Kissed',
      category: 'Dates',
      date: 'Sep 18, 2024',
      location: 'Botanical Garden',
      img: '/memory_vault/IMG_2927 2.jpg',
      desc: 'Standing in the warm afternoon sunlight, surrounded by flowers, and capturing a perfectly radiant smile.',
      matchRate: '98.4% Glow',
      year: '2024'
    },
    {
      id: 'v15',
      title: 'Matching Vibes',
      category: 'Silly',
      date: 'Nov 3, 2024',
      location: 'Shopping Spree',
      img: '/memory_vault/IMG_2949 2.jpg',
      desc: 'Trying on matching outfits and laughing at how coordinated we look. A fun little fashion show of our own.',
      matchRate: '99.8% Match',
      year: '2024'
    },
    {
      id: 'v16',
      title: 'Delicious Brunch',
      category: 'Dates',
      date: 'May 8, 2024',
      location: 'Sunny Terrace',
      img: '/memory_vault/IMG_3059 2.jpg',
      desc: 'A beautiful Sunday brunch session filled with delicious food, fresh juice, and lovely conversations under the sun.',
      matchRate: '96.9% Yummy',
      year: '2024'
    },
    {
      id: 'v17',
      title: 'The Perfect View',
      category: 'Trips',
      date: 'Feb 14, 2024',
      location: 'Mountain Resort',
      img: '/memory_vault/IMG_3543 2.jpg',
      desc: 'Waking up to a breathtaking view of the hills, wrapping ourselves in blankets and breathing in the crisp mountain air.',
      matchRate: '99.5% Perfect',
      year: '2024'
    },
    {
      id: 'v18',
      title: 'Winter Magic',
      category: 'Dates',
      date: 'Dec 20, 2024',
      location: 'Festive Market',
      img: '/memory_vault/IMG_3591 2.jpg',
      desc: 'Walking through the brightly lit festive stalls, eating warm snacks and sharing giggles in the cold winter air.',
      matchRate: '98% Match',
      year: '2024'
    },
    {
      id: 'v19',
      title: 'Happy Hearts',
      category: 'Dates',
      date: 'Jul 28, 2024',
      location: 'Lake Pier',
      img: '/memory_vault/IMG_6410 2.jpg',
      desc: 'Sitting by the edge of the lake pier, watching the gentle ripples in the water, and leaning in close.',
      matchRate: '99.3% Peaceful',
      year: '2024'
    },
    {
      id: 'v20',
      title: 'Weekend Escape',
      category: 'Trips',
      date: 'Oct 5, 2024',
      location: 'Forest Retreat',
      img: '/memory_vault/IMG_7269 2.jpg',
      desc: 'Taking a quick weekend break away from the city hustle to reconnect with nature and recharge our souls.',
      matchRate: '97.8% Relaxed',
      year: '2024'
    },
    {
      id: 'v21',
      title: 'Rainy Day Shenanigans',
      category: 'Silly',
      date: 'Aug 11, 2024',
      location: 'Street Corners',
      img: '/memory_vault/IMG_7916 3.jpg',
      desc: 'Getting caught in the rain, splash-dancing in puddles, and not caring at all about getting completely soaked.',
      matchRate: '95.6% Adventure',
      year: '2024'
    },
    {
      id: 'v22',
      title: 'Forever & Always',
      category: 'Dates',
      date: 'Nov 30, 2024',
      location: 'Scenic Overlook',
      img: '/memory_vault/IMG_8530 2.jpg',
      desc: 'Holding hands tight and promising to stand side-by-side through all of life\'s beautiful journeys and adventures.',
      matchRate: '100% Match',
      year: '2024'
    }
  ];

  const filteredMemories = memories.filter((memory) => {
    const matchesCategory = activeFilter === 'All' || memory.category === activeFilter;
    const matchesSearch = memory.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          memory.desc.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          memory.location.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <section style={{ padding: '2rem 4%', minHeight: '80vh' }}>
      <div style={{ textAlign: 'center', marginBottom: '1rem' }}>
        <h2 style={{ fontSize: '2.5rem', fontFamily: "'Cinzel', 'Georgia', serif", textTransform: 'uppercase' }}>
          Memory <span style={{ color: 'var(--netflix-red)' }}>Vault</span>
        </h2>
        <p style={{ color: 'var(--text-grey)', marginTop: '0.35rem', fontSize: '0.9rem' }}>
          Browse and filter our catalog of adventures, dates, and funny highlights.
        </p>
      </div>

      {/* Filter and Search Bar */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        gap: '1.5rem',
        marginBottom: '1.25rem',
        flexWrap: 'wrap'
      }}>
        {/* Category Tabs */}
        <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveFilter(cat)}
              style={{
                backgroundColor: activeFilter === cat ? 'var(--netflix-red)' : 'rgba(255, 255, 255, 0.05)',
                border: '1px solid',
                borderColor: activeFilter === cat ? 'var(--netflix-red)' : 'rgba(255, 255, 255, 0.1)',
                color: '#fff',
                padding: '0.5rem 1.25rem',
                borderRadius: '4px',
                cursor: 'pointer',
                fontSize: '0.9rem',
                fontWeight: 600,
                transition: 'all 0.2s ease'
              }}
              onMouseEnter={(e) => {
                if (activeFilter !== cat) e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.1)';
              }}
              onMouseLeave={(e) => {
                if (activeFilter !== cat) e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.05)';
              }}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Search Input */}
        <div style={{ position: 'relative', width: '300px', maxWidth: '100%' }}>
          <input
            type="text"
            placeholder="Search memories..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{
              width: '100%',
              backgroundColor: 'rgba(0, 0, 0, 0.8)',
              border: '1px solid #444',
              borderRadius: '4px',
              padding: '0.6rem 1rem 0.6rem 2.5rem',
              color: '#fff',
              fontSize: '0.9rem',
              outline: 'none',
              transition: 'border-color 0.2s ease'
            }}
            onFocus={(e) => e.target.style.borderColor = 'var(--netflix-red)'}
            onBlur={(e) => e.target.style.borderColor = '#444'}
          />
          {/* Search Glass SVG Icon */}
          <svg 
            width="16" 
            height="16" 
            fill="currentColor" 
            viewBox="0 0 16 16"
            style={{
              position: 'absolute',
              left: '0.8rem',
              top: '50%',
              transform: 'translateY(-50%)',
              color: 'var(--text-grey)',
              pointerEvents: 'none'
            }}
          >
            <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0"/>
          </svg>
        </div>
      </div>

      {/* Grid Results */}
      {filteredMemories.length > 0 ? (
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
          gap: '1.5rem'
        }}>
          {filteredMemories.map((memory) => (
            <div
              key={memory.id}
              onClick={() => onCardClick(memory)}
              style={{
                backgroundColor: '#181818',
                borderRadius: '6px',
                overflow: 'hidden',
                cursor: 'pointer',
                transition: 'all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1)',
                border: '1px solid #222',
                boxShadow: '0 4px 10px rgba(0,0,0,0.3)',
                aspectRatio: '16/10'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'scale(1.04) translateY(-5px)';
                e.currentTarget.style.borderColor = 'rgba(255,255,255,0.2)';
                e.currentTarget.style.boxShadow = '0 10px 20px rgba(0,0,0,0.5)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'scale(1) translateY(0)';
                e.currentTarget.style.borderColor = '#222';
                e.currentTarget.style.boxShadow = '0 4px 10px rgba(0,0,0,0.3)';
              }}
            >
              <div style={{ position: 'relative', width: '100%', height: '65%' }}>
                <img 
                  src={memory.img} 
                  alt={memory.title} 
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  loading="lazy"
                />
                <span style={{
                  position: 'absolute',
                  top: '0.5rem',
                  right: '0.5rem',
                  backgroundColor: 'rgba(0,0,0,0.7)',
                  padding: '0.2rem 0.6rem',
                  fontSize: '0.75rem',
                  borderRadius: '20px',
                  fontWeight: 600,
                  color: 'var(--accent-amber)',
                  border: '1px solid rgba(245, 158, 11, 0.3)'
                }}>
                  {memory.category}
                </span>
              </div>
              <div style={{ padding: '0.85rem', height: '35%', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                <div style={{ fontWeight: 700, fontSize: '1rem', color: '#fff', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                  {memory.title}
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', color: 'var(--text-grey)', marginTop: '0.25rem' }}>
                  <span>{memory.date}</span>
                  <span>{memory.matchRate}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div style={{
          textAlign: 'center',
          padding: '4rem 2rem',
          color: 'var(--text-grey)',
          backgroundColor: '#111',
          borderRadius: '8px',
          border: '1px solid #222'
        }}>
          <p style={{ fontSize: '1.1rem' }}>No memories found matching your filters/search.</p>
          <button 
            onClick={() => { setActiveFilter('All'); setSearchQuery(''); }}
            style={{
              marginTop: '1rem',
              backgroundColor: 'transparent',
              border: '1px solid var(--netflix-red)',
              color: 'var(--netflix-red)',
              padding: '0.5rem 1.5rem',
              borderRadius: '4px',
              cursor: 'pointer',
              fontWeight: 600,
              transition: 'all 0.2s ease'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = 'var(--netflix-red)';
              e.currentTarget.style.color = '#fff';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = 'transparent';
              e.currentTarget.style.color = 'var(--netflix-red)';
            }}
          >
            Reset Filters
          </button>
        </div>
      )}
    </section>
  );
}
