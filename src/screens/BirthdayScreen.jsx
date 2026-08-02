import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CONFIG } from '../constants/config';

export default function BirthdayScreen({ onNext }) {
  // The three numbers that count up on screen
  const [years, setYears] = useState(0);
  const [months, setMonths] = useState(0);
  const [days, setDays] = useState(0);

  // NEXT button only appears after all counting is done
  const [showNext, setShowNext] = useState(false);

  // Target numbers - change these in config if needed
  const targetYears = CONFIG.age; // 27
  const targetMonths = 0;
  const targetDays = 0;

  useEffect(() => {
    // Wait a second before counting starts
    const startDelay = setTimeout(() => {
      // Count years from 0 to 27
      let y = 0;
      const yearInterval = setInterval(() => {
        y += 1;
        setYears(y);

        if (y >= targetYears) {
          clearInterval(yearInterval);

          // After years finish, count months
          let m = 0;
          if (targetMonths > 0) {
            const monthInterval = setInterval(() => {
              m += 1;
              setMonths(m);
              if (m >= targetMonths) clearInterval(monthInterval);
            }, 80);
          }

          // Count days at the same time as months
          let d = 0;
          if (targetDays > 0) {
            const dayInterval = setInterval(() => {
              d += 1;
              setDays(d);
              if (d >= targetDays) clearInterval(dayInterval);
            }, 60);
          }

          // Show the NEXT button after everything is done
          setTimeout(() => setShowNext(true), 800);
        }
      }, 80); // 80ms per year = about 2 seconds for 27
    }, 1000);

    return () => clearTimeout(startDelay);
  }, []);

  return (
    <div className='screen'>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '2rem',
          textAlign: 'center',
          padding: '2rem 1.5rem',
        }}
      >
        {/* ── PANDA shaking its head ── */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <div
            style={{
              width: '100px',
              height: '100px',
              borderRadius: '50%',
              border: '2px solid rgba(232, 93, 117, 0.45)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '3.5rem',
              // shake moves the head, heartbeat pulses the glow ring
              animation:
                'shake 0.8s ease-in-out infinite, heartbeat 2s ease-in-out infinite',
            }}
          >
            🐼
          </div>
        </motion.div>

        {/* ── HAPPY BIRTHDAY heading ── */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.7 }}
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: '1.9rem',
            fontWeight: 700,
            color: '#F5EAE8',
            lineHeight: 1.3,
          }}
        >
          Happy Birthday My Girl 🎀
        </motion.h1>

        {/* ── YOU HAVE COMPLETED subtitle ── */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.6 }}
          style={{
            fontFamily: 'var(--font-display)',
            fontStyle: 'italic',
            fontSize: '0.85rem',
            color: '#9E7070',
            marginTop: '-1rem',
          }}
        >
          You have completed
        </motion.p>

        {/* ── THREE COUNTERS ── */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9, duration: 0.6 }}
          style={{
            display: 'flex',
            gap: '2.5rem',
            alignItems: 'flex-end',
          }}
        >
          {/* Years */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '0.4rem',
            }}
          >
            <span
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: '3.5rem',
                fontWeight: 700,
                color: '#F0A0A0',
                lineHeight: 1,
              }}
            >
              {years}
            </span>
            <span
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: '0.65rem',
                letterSpacing: '0.2em',
                color: '#9E7070',
              }}
            >
              YEARS
            </span>
          </div>

          {/* Months */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '0.4rem',
            }}
          >
            <span
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: '3.5rem',
                fontWeight: 700,
                color: '#F0A0A0',
                lineHeight: 1,
              }}
            >
              {months}
            </span>
            <span
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: '0.65rem',
                letterSpacing: '0.2em',
                color: '#9E7070',
              }}
            >
              MONTHS
            </span>
          </div>

          {/* Days */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '0.4rem',
            }}
          >
            <span
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: '3.5rem',
                fontWeight: 700,
                color: '#F0A0A0',
                lineHeight: 1,
              }}
            >
              {days}
            </span>
            <span
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: '0.65rem',
                letterSpacing: '0.2em',
                color: '#9E7070',
              }}
            >
              DAYS
            </span>
          </div>
        </motion.div>

        {/* ── NEXT button, only appears after counting finishes ── */}
        <AnimatePresence>
          {showNext && (
            <motion.button
              className='btn-primary'
              onClick={onNext}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.96 }}
            >
              NEXT 🎀
            </motion.button>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
