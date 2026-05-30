import React from 'react';

export default function Timeline() {
  const milestones = [
    {
      date: 'Aug 2019',
      title: 'The First Sight 👀',
      desc: 'I saw you in the debsoc orientation- thought this sardaar ji is cute with the peach pagg but no, i am not going after a guy xd',
      icon: '✨'
    },
    {
      date: '14th Feb 2020',
      title: 'First WhatsApp Conversation 💬',
      desc: 'Texted you for the first time on whatsapp regarding sponsorship of logicia to which you said: need to talk to two more restaurants, will get back to you',
      icon: '📱'
    },
    {
      date: 'August 2022',
      title: 'Corners Office Gurgaon 🏢',
      desc: 'Started with weekend meetings and ladaais and sorting out and lots of exploring new places',
      icon: '🗺️'
    },
    {
      date: '2025 - Present',
      title: 'MDI The Disaster ⚠️',
      desc: 'Still hate this college so let\'s not ;)',
      icon: '😂'
    }
  ];

  return (
    <section className="timeline-section">
      <div style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
        <h2 style={{ fontSize: '2.5rem', fontFamily: "'Cinzel', 'Georgia', serif", textTransform: 'uppercase' }}>
          Our Milestone <span style={{ color: 'var(--netflix-red)' }}>Timeline</span>
        </h2>
        <p style={{ color: 'var(--text-grey)', marginTop: '0.35rem', fontSize: '0.9rem' }}>
          Chronological episodes of our journey together
        </p>
      </div>

      <div className="timeline-wrapper">
        {milestones.map((node, index) => (
          <div key={index} className="timeline-node">
            <div className="timeline-dot"></div>
            
            <div className="timeline-content-card">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                <span className="timeline-date">{node.date}</span>
                <span style={{ fontSize: '1.3rem' }}>{node.icon}</span>
              </div>
              <h3 className="timeline-node-title">{node.title}</h3>
              <p className="timeline-node-desc">{node.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
