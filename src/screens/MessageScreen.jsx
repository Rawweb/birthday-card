import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import confetti from 'canvas-confetti';
import { CONFIG } from '../constants/config';

export default function MessageScreen({ onRestart }) {
  // Stores how much of the message has been typed so far
  const [displayedText, setDisplayedText] = useState('');

  // Tracks if typing is finished so we can hide the cursor
  const [doneTyping, setDoneTyping] = useState(false);

  // Typewriter effect - adds one character every 35ms
  useEffect(() => {
    const fullMessage = CONFIG.message;
    let index = 0;

    const interval = setInterval(() => {
      index += 1;
      setDisplayedText(fullMessage.slice(0, index));

      // When all characters are shown, stop the interval
      if (index >= fullMessage.length) {
        clearInterval(interval);
        setDoneTyping(true);
      }
    }, 35);

    // Cleanup if she leaves the screen early
    return () => clearInterval(interval);
  }, []);

  // Fires the petal confetti shower when CELEBRATE is pressed
  function handleCelebrate() {
    // Center burst
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.3 },
      colors: ['#E85D75', '#F0A0A0', '#C1272D', '#FF6B8A', '#F5EAE8'],
      shapes: ['circle'],
    });

    // Left burst
    setTimeout(() => {
      confetti({
        particleCount: 60,
        spread: 90,
        origin: { y: 0.2, x: 0.2 },
        colors: ['#E85D75', '#F0A0A0', '#C1272D', '#FF6B8A'],
        shapes: ['circle'],
      });
    }, 300);

    // Right burst
    setTimeout(() => {
      confetti({
        particleCount: 60,
        spread: 90,
        origin: { y: 0.2, x: 0.8 },
        colors: ['#E85D75', '#F0A0A0', '#C1272D', '#FF6B8A'],
        shapes: ['circle'],
      });
    }, 500);
  }

  return (
    <div className='screen'>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '1.75rem',
          padding: '2rem 1.5rem',
          width: '100%',
        }}
      >
        {/* ── MESSAGE CARD ── */}
        <motion.div
          className='card'
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          style={{
            padding: '1.75rem',
            width: '100%',
            maxWidth: '380px',
          }}
        >
          {/* Card heading */}
          <div style={{ textAlign: 'center', marginBottom: '1.25rem' }}>
            <h2
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: '1.1rem',
                fontWeight: 700,
                letterSpacing: '0.15em',
                color: '#F5EAE8',
              }}
            >
              JUST FOR YOU ✦
            </h2>
            <p
              style={{
                fontFamily: 'var(--font-display)',
                fontStyle: 'italic',
                fontSize: '0.75rem',
                color: '#9E7070',
                marginTop: '0.3rem',
              }}
            >
              From my heart to yours
            </p>
          </div>

          {/* Divider line */}
          <div
            style={{
              height: '1px',
              background: 'rgba(232, 93, 117, 0.2)',
              marginBottom: '1.25rem',
            }}
          />

          {/* Message types out here character by character */}
          {/* whiteSpace pre-wrap keeps the line breaks from CONFIG.message */}
          <div
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: '0.92rem',
              lineHeight: 1.85,
              color: '#F5EAE8',
              minHeight: '150px',
              whiteSpace: 'pre-wrap',
            }}
          >
            {displayedText}

            {/* Blinking cursor only shows while still typing */}
            {!doneTyping && (
              <motion.span
                animate={{ opacity: [1, 0] }}
                transition={{ duration: 0.5, repeat: Infinity }}
                style={{ color: '#E85D75' }}
              >
                |
              </motion.span>
            )}
          </div>
        </motion.div>

        {/* ── BUTTONS ── */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.5 }}
          style={{
            display: 'flex',
            gap: '1rem',
            flexWrap: 'wrap',
            justifyContent: 'center',
          }}
        >
          {/* Celebrate fires the confetti shower */}
          <motion.button
            className='btn-primary'
            onClick={handleCelebrate}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.96 }}
          >
            CELEBRATE ✦
          </motion.button>

          {/* Restart takes her back to the welcome screen */}
          <motion.button
            className='btn-primary'
            onClick={onRestart}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.96 }}
            style={{ opacity: 0.65 }}
          >
            RESTART ↺
          </motion.button>
        </motion.div>
      </div>
    </div>
  );
}
