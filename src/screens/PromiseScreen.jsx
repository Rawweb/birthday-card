import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CONFIG } from '../constants/config';

export default function PromiseScreen({ onNext }) {
  // NEXT button appears after all promises have faded in
  const [showNext, setShowNext] = useState(false);

  // Total animation time = number of promises × stagger delay + base duration
  // 8 promises × 0.3s stagger + 0.6s duration = about 3 seconds
  // We wait 3.5 seconds then show the button
  useState(() => {
    const totalDelay = CONFIG.promises.length * 300 + 1200;
    const timer = setTimeout(() => setShowNext(true), totalDelay);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className='screen'>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '2rem',
          width: '100%',
          padding: '2rem 1.5rem',
          maxWidth: '420px',
          margin: '0 auto',
        }}
      >
        {/* ── HEADING ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          style={{ textAlign: 'center' }}
        >
          <h1
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: '1.9rem',
              fontWeight: 700,
              color: '#F5EAE8',
            }}
          >
            My Promises to You
          </h1>
          <p
            style={{
              fontFamily: 'var(--font-display)',
              fontStyle: 'italic',
              fontSize: '0.8rem',
              color: '#9E7070',
              marginTop: '0.4rem',
            }}
          >
            Every single one, I mean. 🤍
          </p>
        </motion.div>

        {/* ── PROMISE LIST ── */}
        {/* Each promise fades in from the bottom one after another */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '0.85rem',
            width: '100%',
          }}
        >
          {CONFIG.promises.map((promise, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              // Each promise waits for the previous one to finish
              transition={{
                delay: 0.4 + index * 0.3,
                duration: 0.5,
                ease: 'easeOut',
              }}
              style={{
                display: 'flex',
                alignItems: 'flex-start',
                gap: '0.85rem',
                padding: '1rem 1.25rem',
                borderRadius: '0.85rem',
                border: '1px solid rgba(232, 93, 117, 0.15)',
                background: 'rgba(28, 10, 10, 0.8)',
              }}
            >
              {/* Pulsing heart before each promise */}
              <motion.span
                animate={{ scale: [1, 1.25, 1] }}
                transition={{
                  duration: 1.8,
                  repeat: Infinity,
                  ease: 'easeInOut',
                  delay: index * 0.2,
                }}
                style={{
                  fontSize: '1rem',
                  flexShrink: 0,
                  marginTop: '2px',
                }}
              >
                🤍
              </motion.span>

              {/* The promise text */}
              <p
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: '0.9rem',
                  lineHeight: 1.65,
                  color: '#F5EAE8',
                }}
              >
                {promise}
              </p>
            </motion.div>
          ))}
        </div>

        {/* ── NEXT button appears after all promises are visible ── */}
        <AnimatePresence>
          {showNext && (
            <motion.button
              className='btn-primary'
              onClick={onNext}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.96 }}
            >
              NEXT 🤍
            </motion.button>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
