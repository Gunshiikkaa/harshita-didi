import React, { useState, useEffect } from 'react';
import IntroScreen from './components/IntroScreen';
import Navbar from './components/Navbar';
import HeroBanner from './components/HeroBanner';
import MemoryRow from './components/MemoryRow';
import Timeline from './components/Timeline';
import DatePlanner from './components/DatePlanner';
import MemoryVault from './components/MemoryVault';
import SecretLetter from './components/SecretLetter';
import GalleryWall from './components/GalleryWall';
import CinematicEnding from './components/CinematicEnding';
import './App.css';

// Audio Context reference variables
let audioCtx = null;
let musicTimer = null;
let currentChordIdx = 0;

export default function App() {
  const [activeProfile, setActiveProfile] = useState(null);
  const [activeTab, setActiveTab] = useState('home');
  const [selectedMemory, setSelectedMemory] = useState(null);
  const [isMusicPlaying, setIsMusicPlaying] = useState(false);
  const [isThemeSongPlaying, setIsThemeSongPlaying] = useState(false);
  const [likedMemories, setLikedMemories] = useState({});
  const [isEditingSpotlight, setIsEditingSpotlight] = useState(false);
  const [spotlightTitle, setSpotlightTitle] = useState(() => 
    localStorage.getItem('spotlightTitle_v2') || "COLLEGE METRO\nDIARIES"
  );
  const [spotlightSubtitle, setSpotlightSubtitle] = useState(() => 
    localStorage.getItem('spotlightSubtitle_v2') || "METRO TRAVELLING FOR COLLEGE"
  );
  const [spotlightText, setSpotlightText] = useState(() => 
    localStorage.getItem('spotlightText_v2') || "Boarding the crowded metro coach every morning, finding space to stand close, and sharing a single pair of headphones. Those long rides to college became the best part of our day. Between the rush hours, the screeching tracks, and the announcements, we built our own quiet world, talking about everything and nothing. It wasn't just a commute; it was where we grew closer, one station at a time."
  );
  const [spotlightQuote, setSpotlightQuote] = useState(() => 
    localStorage.getItem('spotlightQuote_v2') || "It is not the destination, but the journey—and who you share it with—that makes life beautiful."
  );
  const [spotlightImage, setSpotlightImage] = useState(() => 
    localStorage.getItem('spotlightImage_v2') || "/couple_sunset_date.png"
  );

  const [galleryCards, setGalleryCards] = useState(() => {
    const saved = localStorage.getItem('galleryCards_v4');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) {}
    }
    return [
      {
        id: 'g1',
        style: 'polaroid',
        title: "Silly Faces, Pure Joy",
        date: "2024",
        desc: "Sticking our tongues out and catching raw, unfiltered moments. Love is when you can be completely silly together.",
        img: "/wall_slide1.jpg",
        objectPosition: "center 15%",
        aspectRatio: "3/4"
      },
      {
        id: 'g2',
        style: 'polaroid',
        title: "Commute Companions",
        date: "2024",
        desc: "Sharing screen time, scrolling through memories, and finding a quiet, personal space in the middle of a busy metro coach.",
        img: "/wall_slide2.jpg",
        objectPosition: "center 20%",
        aspectRatio: "3/4"
      },
      {
        id: 'g3',
        style: 'polaroid',
        title: "After Party",
        date: "2024",
        desc: "Dressed up, leaning close, and sharing laughs in the cozy glow of our favorite restaurant.",
        img: "/wall_slide3.png",
        objectPosition: "center 20%",
        aspectRatio: "3/4"
      }
    ];
  });

  useEffect(() => {
    localStorage.setItem('spotlightTitle_v2', spotlightTitle);
    localStorage.setItem('spotlightSubtitle_v2', spotlightSubtitle);
    localStorage.setItem('spotlightText_v2', spotlightText);
    localStorage.setItem('spotlightQuote_v2', spotlightQuote);
    localStorage.setItem('spotlightImage_v2', spotlightImage);
  }, [spotlightTitle, spotlightSubtitle, spotlightText, spotlightQuote, spotlightImage]);

  useEffect(() => {
    localStorage.setItem('galleryCards_v4', JSON.stringify(galleryCards));
  }, [galleryCards]);

  const handleAddGalleryCard = (newCard) => {
    setGalleryCards(prev => [newCard, ...prev]);
  };

  const [bucketList, setBucketList] = useState([
    { id: 'b1', title: 'Road trip to the coast', done: false },
    { id: 'b2', title: 'Couples cooking masterclass', done: false },
    { id: 'b3', title: 'Pitch blankets for midnight stargazing', done: true },
    { id: 'b4', title: 'Write a joint future bucket list', done: false }
  ]);

  // Ambient sound generator using Web Audio API
  const startAmbientMusic = () => {
    try {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      if (!AudioContext) return;
      if (!audioCtx) {
        audioCtx = new AudioContext();
      }
      if (audioCtx.state === 'suspended') {
        audioCtx.resume();
      }

      // Soothing chord progression in C/F major:
      // 1. Cmaj7 (C3, E3, G3, B3)
      // 2. Am7 (A2, C3, E3, G3)
      // 3. Fmaj7 (F2, A2, C3, E3)
      // 4. G6 (G2, B2, D3, E3)
      const chords = [
        [130.81, 164.81, 196.00, 246.94], // C3, E3, G3, B3
        [110.00, 130.81, 164.81, 196.00], // A2, C3, E3, G3
        [87.31, 110.00, 130.81, 164.81],  // F2, A2, C3, E3
        [98.00, 123.47, 146.83, 164.81]   // G2, B2, D3, E3
      ];

      const playChord = () => {
        if (!audioCtx || audioCtx.state !== 'running') return;
        const now = audioCtx.currentTime;
        const notes = chords[currentChordIdx];
        currentChordIdx = (currentChordIdx + 1) % chords.length;

        // Soothing low-pass filter to soften high frequencies
        const filter = audioCtx.createBiquadFilter();
        filter.type = 'lowpass';
        filter.frequency.setValueAtTime(350, now);

        notes.forEach((freq, index) => {
          const osc = audioCtx.createOscillator();
          const gain = audioCtx.createGain();
          
          osc.type = 'sine'; // Pure warm tone
          osc.frequency.setValueAtTime(freq, now + index * 0.2); // Slightly arpeggiated entry

          // Sound envelope: slow swell and fade out
          gain.gain.setValueAtTime(0, now);
          gain.gain.linearRampToValueAtTime(0.04, now + index * 0.2 + 0.5); // Warm fade-in
          gain.gain.exponentialRampToValueAtTime(0.0001, now + 4.8); // Long decay

          osc.connect(filter);
          filter.connect(gain);
          gain.connect(audioCtx.destination);

          osc.start(now + index * 0.2);
          osc.stop(now + 5.2);
        });
      };

      playChord();
      musicTimer = setInterval(playChord, 5200);

    } catch (err) {
      console.warn("Could not play ambient background audio", err);
    }
  };

  const stopAmbientMusic = () => {
    if (musicTimer) {
      clearInterval(musicTimer);
      musicTimer = null;
    }
    if (audioCtx && audioCtx.state === 'running') {
      audioCtx.suspend();
    }
  };

  const handleToggleMusic = () => {
    if (isThemeSongPlaying) {
      setIsThemeSongPlaying(false);
    } else if (isMusicPlaying) {
      stopAmbientMusic();
      setIsMusicPlaying(false);
    } else {
      setIsMusicPlaying(true);
      // Wait for brief user interaction confirmation block resolution
      setTimeout(() => {
        startAmbientMusic();
      }, 50);
    }
  };

  const handleToggleThemeSong = () => {
    if (isThemeSongPlaying) {
      setIsThemeSongPlaying(false);
    } else {
      stopAmbientMusic();
      setIsMusicPlaying(false);
      setIsThemeSongPlaying(true);
    }
  };

  // Turn off music if profile is unmounted/switched
  const handleSwitchProfile = () => {
    stopAmbientMusic();
    setIsMusicPlaying(false);
    setIsThemeSongPlaying(false);
    setActiveProfile(null);
    setActiveTab('home');
  };

  const handleReaction = (memoryId, type) => {
    setLikedMemories(prev => ({
      ...prev,
      [memoryId]: prev[memoryId] === type ? null : type
    }));

    // Trigger custom particle effect inside modal
    if (type === 'love') {
      try {
        const rect = document.querySelector('.modal-image-wrapper').getBoundingClientRect();
        const container = document.createElement('div');
        container.style.position = 'fixed';
        container.style.inset = '0';
        container.style.pointerEvents = 'none';
        container.style.zIndex = '9999';
        document.body.appendChild(container);

        for (let i = 0; i < 15; i++) {
          const heart = document.createElement('span');
          heart.innerHTML = '❤️';
          heart.style.position = 'absolute';
          heart.style.left = `${rect.left + rect.width / 2 + (Math.random() - 0.5) * 80}px`;
          heart.style.top = `${rect.top + rect.height / 2 + (Math.random() - 0.5) * 40}px`;
          heart.style.fontSize = `${Math.random() * 15 + 15}px`;
          heart.style.transition = 'all 1s ease-out';
          heart.style.opacity = '1';
          container.appendChild(heart);

          // Force reflow
          void heart.offsetHeight;

          heart.style.transform = `translate(${(Math.random() - 0.5) * 200}px, -${Math.random() * 150 + 100}px) scale(1.5)`;
          heart.style.opacity = '0';
        }

        setTimeout(() => container.remove(), 1200);
      } catch (err) {}
    }
  };

  const toggleBucketListItem = (itemId) => {
    setBucketList(prev => prev.map(item => 
      item.id === itemId ? { ...item, done: !item.done } : item
    ));
  };

  // Rows Catalog Data
  const continueWatchingItems = [
    {
      id: 'c1',
      title: 'LATE NIGHT TRANSIT',
      img: '/top_slide1.jpg',
      desc: 'Sharing giggles and taking silly selfies at the station platform, making waiting for the next train our favorite pastime.',
      matchRate: '99% Match',
      year: '2024',
      location: 'Metro Station',
      date: 'May 15, 2024',
      tags: 'Heartfelt • Cheerful • Original',
      objectPosition: 'center 20%'
    },
    {
      id: 'c2',
      title: 'LAZY PARK AFTERNOONS',
      img: '/top_slide2.jpg',
      desc: 'Relaxing on the grass, enjoying the sun and flowers, and having deep conversations under the shade.',
      matchRate: '98% Match',
      year: '2024',
      location: 'Sunder Nursery',
      date: 'October 10, 2024',
      tags: 'Heartfelt • Relaxed • Peaceful',
      objectPosition: 'center 40%'
    },
    {
      id: 'c3',
      title: 'SUNNY DAY ADVENTURES',
      img: '/top_slide3.jpg',
      desc: 'Walking in the bright sun, shielding our eyes, and smiling through the heat because we are together.',
      matchRate: '97% Match',
      year: '2024',
      location: 'City Walk',
      date: 'February 22, 2024',
      tags: 'Cheerful • Sunny • Romantic',
      objectPosition: 'center 20%'
    },
    {
      id: 'c4',
      title: 'MATCHING CARGO VIBES',
      img: '/top_slide4.jpg',
      desc: 'Taking a stroll in matching pink outfits and cargo pants, showing off our style and coordination.',
      matchRate: '99.5% Match',
      year: '2024',
      location: 'Park Avenue',
      date: 'March 8, 2024',
      tags: 'Sweet • Stylish • Fun',
      objectPosition: 'center 20%'
    },
    {
      id: 'c5',
      title: 'THE ULTIMATE HUG',
      img: '/top_slide5.jpg',
      desc: 'Leaning close, wrapping arms around each other, and capturing the warmth of our bond in a single frame.',
      matchRate: '99.9% Match',
      year: '2025',
      location: 'Campus Walk',
      date: 'April 5, 2025',
      tags: 'Romantic • Cozy • Warm',
      objectPosition: 'center 25%'
    }
  ];

  const trendingNowItems = [
    {
      id: 't1',
      title: 'THE METRO COMMUTE',
      img: '/memory_slide1.jpg',
      desc: 'Wearing masks, sharing a quiet ride on the metro, and holding onto each other through every single stop.',
      matchRate: '98.5% Match',
      year: '2023',
      location: 'Metro Transit',
      date: 'December 14, 2023',
      tags: 'Sweet • Cozy • Daily Life',
      objectPosition: 'center 20%'
    },
    {
      id: 't2',
      title: 'EXPLORING QUTUB MINAR',
      img: '/memory_slide2.jpg',
      desc: 'Standing together in front of the historic carved red walls of Qutub Minar, holding a bag of treats, and making new memories in ancient places.',
      matchRate: '99.1% Match',
      year: '2024',
      location: 'Delhi Heritage',
      date: 'January 5, 2024',
      tags: 'Adventure • Travel • Heartfelt',
      objectPosition: 'center 25%'
    },
    {
      id: 't3',
      title: 'WARM SHOULDER TO LEAN ON',
      img: '/memory_slide3.jpg',
      desc: 'Leaning close, sharing a warm smile, and finding comfort in simply sitting side by side on a cozy afternoon.',
      matchRate: '99% Match',
      year: '2024',
      location: 'Cozy Corner',
      date: 'March 22, 2024',
      tags: 'Romantic • Warm • Cozy',
      objectPosition: 'center 20%'
    },
    {
      id: 't4',
      title: 'MATCHING SMILES & TURBANS',
      img: '/memory_slide4.jpg',
      desc: 'A bright pink turban, sweet matching smiles, and a picture-perfect moment captured for the scrapbook.',
      matchRate: '99.8% Perfect',
      year: '2024',
      location: 'Home Studio',
      date: 'April 18, 2024',
      tags: 'Sweet • Cheerful • Original',
      objectPosition: 'center 25%'
    }
  ];


  if (!activeProfile) {
    return <IntroScreen onProfileSelect={setActiveProfile} />;
  }

  return (
    <div className="main-layout">
      <Navbar 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
        activeProfile={activeProfile}
        onSwitchProfile={handleSwitchProfile}
        isMusicPlaying={isMusicPlaying || isThemeSongPlaying}
        onToggleMusic={handleToggleMusic}
      />

      {/* Main Tab Routing */}
      <main style={{ flex: 1, paddingTop: activeTab === 'home' ? 0 : '70px' }}>
        {activeTab === 'home' && (
          <>
            <HeroBanner activeProfile={activeProfile} />
            
            <div className="rows-container">
              <MemoryRow 
                title="Memories" 
                subtitle="Click any card to read the full episode description and view reaction details."
                items={trendingNowItems} 
                onCardClick={setSelectedMemory} 
                variant="memories"
              />
              <MemoryRow 
                title="TOP 5 HITS IN HEARTS TODAY" 
                items={continueWatchingItems} 
                onCardClick={setSelectedMemory} 
                variant="top5"
              />

              {/* Featured Documentary Spotlight Section */}
              <div className="spotlight-section">
                {/* Left Side Image Card */}
                <div className="spotlight-image-wrapper">
                  <video 
                    src="/video.mp4" 
                    className="spotlight-image" 
                    autoPlay 
                    loop 
                    muted 
                    playsInline 
                  />
                  <div className="spotlight-badge">
                    <span className="spotlight-badge-dot"></span>
                    FEATURED VIDEO
                  </div>
                  <button className="spotlight-edit-btn" onClick={() => setIsEditingSpotlight(true)}>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                      <path d="M18.5 2.5a2.121 2.121 0 1 1 3 3L12 15l-4 1 1-4z" />
                    </svg>
                    CUSTOMIZE STORY
                  </button>
                </div>

                {/* Right Side Content */}
                <div className="spotlight-content">
                  <div className="spotlight-category-header">
                    <span style={{ color: 'var(--netflix-red)' }}>COUPLEFLIX</span> DOCUMENTARY SPOTLIGHT  |  <span>📅 EST. 2023</span>
                  </div>
                  <h2 className="spotlight-title-text">
                    {spotlightTitle.split('\n').map((line, i) => (
                      <React.Fragment key={i}>
                        {line}
                        <br />
                      </React.Fragment>
                    ))}
                  </h2>
                  <div className="spotlight-subtitle-text">{spotlightSubtitle}</div>
                  <p className="spotlight-description">"{spotlightText}"</p>
                  <div className="spotlight-quote-box">
                    <p className="spotlight-quote">
                      "{spotlightQuote}"
                    </p>
                  </div>
                </div>
              </div>

              {/* Memories Gallery Wall Section */}
              <GalleryWall 
                cards={galleryCards}
                onAddCard={handleAddGalleryCard}
              />

              {/* Custom Interactive Row: Our List (Date Night Checklist) */}
              <div style={{ marginTop: '1rem' }}>
                <h2 className="memory-row-title">My List (Date Night Bucket List)</h2>
                <div style={{
                  backgroundColor: '#161616',
                  border: '1px solid #222',
                  borderRadius: '6px',
                  padding: '1.5rem',
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
                  gap: '1rem'
                }}>
                  {bucketList.map((item) => (
                    <div 
                      key={item.id} 
                      onClick={() => toggleBucketListItem(item.id)}
                      style={{
                        padding: '1rem',
                        backgroundColor: item.done ? 'rgba(229, 9, 20, 0.05)' : '#222',
                        border: '1px solid',
                        borderColor: item.done ? 'var(--netflix-red)' : '#333',
                        borderRadius: '4px',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        gap: '1rem',
                        transition: 'all 0.2s ease',
                        boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.transform = 'scale(1.02)';
                        e.currentTarget.style.borderColor = 'var(--netflix-red)';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.transform = 'scale(1)';
                        e.currentTarget.style.borderColor = item.done ? 'var(--netflix-red)' : '#333';
                      }}
                    >
                      <span style={{ 
                        fontSize: '0.9rem', 
                        color: item.done ? '#a3a3a3' : '#fff',
                        textDecoration: item.done ? 'line-through' : 'none'
                      }}>
                        {item.title}
                      </span>
                      <div style={{
                        width: '20px',
                        height: '20px',
                        borderRadius: '4px',
                        border: '2px solid',
                        borderColor: item.done ? 'var(--netflix-red)' : '#777',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        backgroundColor: item.done ? 'var(--netflix-red)' : 'transparent',
                        color: 'white',
                        fontSize: '0.75rem',
                        fontWeight: 900
                      }}>
                        {item.done && '✓'}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Cinematic Ending Section */}
            <CinematicEnding 
              memories={[...trendingNowItems, ...continueWatchingItems]} 
              isThemeSongPlaying={isThemeSongPlaying}
              onToggleThemeSong={handleToggleThemeSong}
              onNavigateToTimeline={() => setActiveTab('timeline')}
            />
          </>
        )}

        {activeTab === 'timeline' && <Timeline />}
        {activeTab === 'planner' && <DatePlanner />}
        {activeTab === 'vault' && <MemoryVault onCardClick={setSelectedMemory} />}
        {activeTab === 'letter' && <SecretLetter />}
      </main>

      {/* Global Memory Detail Modal Lightbox */}
      {selectedMemory && (
        <div className="modal-overlay" onClick={() => setSelectedMemory(null)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close-btn" onClick={() => setSelectedMemory(null)}>
              <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12"/>
              </svg>
            </button>
            
            <div className="modal-image-wrapper">
              <img 
                src={selectedMemory.img} 
                className="modal-image" 
                alt={selectedMemory.title} 
              />
              <div className="modal-gradient"></div>
              <div style={{
                position: 'absolute',
                bottom: '1.5rem',
                left: '2rem',
                zIndex: 10
              }}>
                <h2 style={{ fontSize: '2rem', textTransform: 'uppercase', marginBottom: '0.25rem', textShadow: '2px 2px 4px rgba(0,0,0,0.8)' }}>
                  {selectedMemory.title}
                </h2>
                <div style={{ display: 'flex', gap: '10px', fontSize: '0.85rem', color: '#ccc', textShadow: '1px 1px 2px rgba(0,0,0,0.8)' }}>
                  <span>{selectedMemory.date}</span>
                  <span>•</span>
                  <span>{selectedMemory.location}</span>
                </div>
              </div>
            </div>

            <div className="modal-body" style={{ padding: '1.5rem 2rem' }}>
              <div className="modal-main-info" style={{ flex: 2 }}>
                <p style={{ fontSize: '1rem', lineHeight: '1.5', color: '#e5e5e5' }}>
                  {selectedMemory.desc}
                </p>

                {/* Micro Interaction: Reactions */}
                <div style={{ marginTop: '1.5rem', borderTop: '1px solid #333', paddingTop: '1rem' }}>
                  <span style={{ fontSize: '0.8rem', color: '#a3a3a3', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                    How much do you love this memory?
                  </span>
                  <div style={{ display: 'flex', gap: '10px', marginTop: '0.5rem' }}>
                    <button
                      onClick={() => handleReaction(selectedMemory.id, 'like')}
                      style={{
                        backgroundColor: likedMemories[selectedMemory.id] === 'like' ? 'rgba(255,255,255,0.15)' : 'rgba(255,255,255,0.05)',
                        border: likedMemories[selectedMemory.id] === 'like' ? '1px solid #fff' : '1px solid #444',
                        color: likedMemories[selectedMemory.id] === 'like' ? '#fff' : '#ccc',
                        padding: '0.4rem 1rem',
                        borderRadius: '4px',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '6px',
                        transition: 'all 0.2s ease',
                        fontSize: '0.9rem'
                      }}
                    >
                      👍 Liked
                    </button>
                    <button
                      onClick={() => handleReaction(selectedMemory.id, 'love')}
                      style={{
                        backgroundColor: likedMemories[selectedMemory.id] === 'love' ? 'rgba(229,9,20,0.15)' : 'rgba(255,255,255,0.05)',
                        border: likedMemories[selectedMemory.id] === 'love' ? '1px solid var(--netflix-red)' : '1px solid #444',
                        color: likedMemories[selectedMemory.id] === 'love' ? 'var(--netflix-red)' : '#ccc',
                        padding: '0.4rem 1rem',
                        borderRadius: '4px',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '6px',
                        transition: 'all 0.2s ease',
                        fontSize: '0.9rem'
                      }}
                    >
                      ❤️ Love It!
                    </button>
                    <button
                      onClick={() => handleReaction(selectedMemory.id, 'laugh')}
                      style={{
                        backgroundColor: likedMemories[selectedMemory.id] === 'laugh' ? 'rgba(245,158,11,0.15)' : 'rgba(255,255,255,0.05)',
                        border: likedMemories[selectedMemory.id] === 'laugh' ? '1px solid var(--accent-amber)' : '1px solid #444',
                        color: likedMemories[selectedMemory.id] === 'laugh' ? 'var(--accent-amber)' : '#ccc',
                        padding: '0.4rem 1rem',
                        borderRadius: '4px',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '6px',
                        transition: 'all 0.2s ease',
                        fontSize: '0.9rem'
                      }}
                    >
                      😂 Funny
                    </button>
                  </div>
                </div>
              </div>

              <div className="modal-side-info" style={{ flex: 1, paddingLeft: '1.5rem', borderLeft: '1px solid #333' }}>
                <div>
                  <div className="info-label">Category:</div>
                  <div className="info-value">{selectedMemory.category || 'Special Memory'}</div>
                </div>
                <div style={{ marginTop: '1rem' }}>
                  <div className="info-label">Release Year:</div>
                  <div className="info-value">{selectedMemory.year}</div>
                </div>
                <div style={{ marginTop: '1rem' }}>
                  <div className="info-label">Match Score:</div>
                  <div className="info-value" style={{ color: '#4ade80', fontWeight: 'bold' }}>
                    {selectedMemory.matchRate}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Customize Spotlight Modal */}
      {isEditingSpotlight && (
        <div className="modal-overlay" onClick={() => setIsEditingSpotlight(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()} style={{ maxWidth: '500px' }}>
            <button className="modal-close-btn" onClick={() => setIsEditingSpotlight(false)}>
              <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12"/>
              </svg>
            </button>
            <div style={{ padding: '2rem' }}>
              <h2 style={{ fontSize: '1.5rem', marginBottom: '1.5rem', fontFamily: 'var(--font-outfit)', textTransform: 'uppercase', color: '#fff' }}>
                Customize Featured Story
              </h2>
              
              <div style={{ marginBottom: '1rem' }}>
                <label style={{ display: 'block', fontSize: '0.8rem', color: '#a3a3a3', marginBottom: '0.25rem', textTransform: 'uppercase', fontWeight: 700 }}>Title (Use Line Breaks if needed)</label>
                <textarea 
                  rows="3"
                  value={spotlightTitle} 
                  onChange={(e) => setSpotlightTitle(e.target.value)} 
                  style={{ width: '100%', padding: '0.6rem', background: '#222', border: '1px solid #444', color: '#fff', borderRadius: '4px', fontFamily: 'inherit' }}
                />
              </div>

              <div style={{ marginBottom: '1rem' }}>
                <label style={{ display: 'block', fontSize: '0.8rem', color: '#a3a3a3', marginBottom: '0.25rem', textTransform: 'uppercase', fontWeight: 700 }}>Red Subtitle</label>
                <input 
                  type="text" 
                  value={spotlightSubtitle} 
                  onChange={(e) => setSpotlightSubtitle(e.target.value)} 
                  style={{ width: '100%', padding: '0.6rem', background: '#222', border: '1px solid #444', color: '#fff', borderRadius: '4px' }}
                />
              </div>

              <div style={{ marginBottom: '1rem' }}>
                <label style={{ display: 'block', fontSize: '0.8rem', color: '#a3a3a3', marginBottom: '0.25rem', textTransform: 'uppercase', fontWeight: 700 }}>Story Description</label>
                <textarea 
                  rows="4"
                  value={spotlightText} 
                  onChange={(e) => setSpotlightText(e.target.value)} 
                  style={{ width: '100%', padding: '0.6rem', background: '#222', border: '1px solid #444', color: '#fff', borderRadius: '4px', resize: 'vertical' }}
                />
              </div>

              <div style={{ marginBottom: '1rem' }}>
                <label style={{ display: 'block', fontSize: '0.8rem', color: '#a3a3a3', marginBottom: '0.25rem', textTransform: 'uppercase', fontWeight: 700 }}>Bottom Quote</label>
                <input 
                  type="text" 
                  value={spotlightQuote} 
                  onChange={(e) => setSpotlightQuote(e.target.value)} 
                  style={{ width: '100%', padding: '0.6rem', background: '#222', border: '1px solid #444', color: '#fff', borderRadius: '4px' }}
                />
              </div>

              <div style={{ marginBottom: '1.5rem' }}>
                <label style={{ display: 'block', fontSize: '0.8rem', color: '#a3a3a3', marginBottom: '0.25rem', textTransform: 'uppercase', fontWeight: 700 }}>Image URL</label>
                <input 
                  type="text" 
                  value={spotlightImage} 
                  onChange={(e) => setSpotlightImage(e.target.value)} 
                  style={{ width: '100%', padding: '0.6rem', background: '#222', border: '1px solid #444', color: '#fff', borderRadius: '4px' }}
                />
              </div>

              <div style={{ display: 'flex', gap: '10px', justifyContent: 'flex-end' }}>
                <button 
                  onClick={() => setIsEditingSpotlight(false)}
                  style={{ padding: '0.6rem 1.25rem', background: 'transparent', border: '1px solid #555', color: '#fff', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' }}
                >
                  Cancel
                </button>
                <button 
                  onClick={() => setIsEditingSpotlight(false)}
                  style={{ padding: '0.6rem 1.25rem', background: 'var(--netflix-red)', border: 'none', color: '#fff', borderRadius: '4px', fontWeight: 'bold', cursor: 'pointer' }}
                >
                  Save Changes
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Cinematic Footer */}
      <footer style={{
        backgroundColor: '#0c0c0c',
        borderTop: '1px solid #222',
        padding: '1.5rem 4% 1.5rem',
        color: 'var(--text-grey)',
        fontSize: '0.8rem',
        zIndex: 10
      }}>
        <div style={{ display: 'flex', justifyContent: 'center', gap: '1.5rem', marginBottom: '1.5rem', listStyle: 'none' }}>
          <span>Terms of Romance</span>
          <span>Privacy & Hugs</span>
          <span>Date Policy</span>
          <span>Contact Vatsal</span>
        </div>
        <div style={{ textAlign: 'center' }}>
          <p>© 2026 CoupleFlix Inc. Crafted with ❤️ for Harshita.</p>
          <p style={{ marginTop: '0.5rem', fontSize: '0.75rem', opacity: 0.5 }}>
            All characters and memories in this series are entirely real and cherished. Any similarity to other love stories is purely coincidental.
          </p>
        </div>
      </footer>
      {isThemeSongPlaying && (
        <iframe
          width="0"
          height="0"
          src="https://www.youtube.com/embed/vvRo5tOU32Q?autoplay=1&enablejsapi=1&start=40"
          title="Theme Song"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          style={{ display: 'none', position: 'absolute', width: 0, height: 0, pointerEvents: 'none' }}
        />
      )}
    </div>
  );
}
