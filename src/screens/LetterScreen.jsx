import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function LetterScreen({ onOpen }) {
  // When true, plays the opening animation before moving forward
  const [isOpening, setIsOpening] = useState(false);

  // Called when she taps the heart card
  function handleOpen() {
    // Prevent double tapping
    if (isOpening) return;

    setIsOpening(true);

    // Wait for the animation to finish then go to message screen
    setTimeout(() => onOpen(), 900);
  }

  return (
    <div className='screen'>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '2.5rem',
          padding: '2rem 1.5rem',
          textAlign: 'center',
        }}
      >
        {/* ── HEADING ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: '1.7rem',
              fontWeight: 700,
              letterSpacing: '0.08em',
              color: '#F5EAE8',
            }}
          >
            A Letter, Just For You
          </h1>

          <p
            style={{
              fontFamily: 'var(--font-display)',
              fontStyle: 'italic',
              fontSize: '0.82rem',
              color: '#9E7070',
              marginTop: '0.6rem',
            }}
          >
            Tap the heart to unseal your message...
          </p>
        </motion.div>

        {/* ── ENVELOPE CARD ── */}
        <AnimatePresence>
          {!isOpening && (
            <motion.div
              initial={{ opacity: 0, scale: 0.85 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.2 }}
              transition={{ duration: 0.5 }}
              onClick={handleOpen}
              className='card'
              style={{
                width: '220px',
                height: '220px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '1rem',
                cursor: 'pointer',
                // Uses the heartbeat glow keyframe from index.css
                animation: 'heartbeat 2s ease-in-out infinite',
              }}
            >
              {/* Pulsing heart icon */}
              <motion.div
                animate={{ scale: [1, 1.12, 1] }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
                style={{ fontSize: '3.5rem', lineHeight: 1 }}
              >
                🤍
              </motion.div>

              {/* TAP TO OPEN label */}
              <p
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: '0.68rem',
                  letterSpacing: '0.25em',
                  color: '#9E7070',
                }}
              >
                TAP TO OPEN
              </p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* ── OPENING BURST - shows when card is tapped ── */}
        <AnimatePresence>
          {isOpening && (
            <motion.div
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: [0, 1, 0], scale: [0.5, 1.3, 1.8] }}
              transition={{ duration: 0.8, ease: 'easeOut' }}
              style={{ fontSize: '4rem' }}
            >
              💌
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
