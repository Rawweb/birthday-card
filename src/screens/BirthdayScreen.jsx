import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CONFIG } from '../constants/config';

// Always shows 2 digits: 3 becomes "03", 27 stays "27"
function format(num) {
  return String(num).padStart(2, '0');
}

// ── CALCULATES exactly how long she has been alive ──
function calculateAge(birthdayStr) {
  const now = new Date();
  const birthday = new Date(birthdayStr);

  // Full years passed
  let years = now.getFullYear() - birthday.getFullYear();
  const birthdayThisYear = new Date(
    now.getFullYear(),
    birthday.getMonth(),
    birthday.getDate(),
  );
  if (now < birthdayThisYear) years--;

  // The most recent birthday date
  const lastBirthday = new Date(
    now >= birthdayThisYear ? now.getFullYear() : now.getFullYear() - 1,
    birthday.getMonth(),
    birthday.getDate(),
  );

  // Total milliseconds since last birthday
  const msSince = now - lastBirthday;

  // Break it down into days, hours, minutes, seconds
  const days = Math.floor(msSince / (1000 * 60 * 60 * 24));
  const afterDays = msSince % (1000 * 60 * 60 * 24);
  const hours = Math.floor(afterDays / (1000 * 60 * 60));
  const afterHours = afterDays % (1000 * 60 * 60);
  const minutes = Math.floor(afterHours / (1000 * 60));
  const seconds = Math.floor((afterHours % (1000 * 60)) / 1000);

  return { years, days, hours, minutes, seconds };
}

// ── FLIP CARD ──
// Shows one unit with a flip animation when its number changes
function FlipCard({ value, label, large }) {
  const [currentVal, setCurrentVal] = useState(value);
  const [previousVal, setPreviousVal] = useState(value);
  const [isFlipping, setIsFlipping] = useState(false);

  useEffect(() => {
    if (value !== currentVal) {
      setPreviousVal(currentVal);
      setIsFlipping(true);

      // After top flips away, swap the number underneath
      setTimeout(() => {
        setCurrentVal(value);
        setTimeout(() => setIsFlipping(false), 300);
      }, 250);
    }
  }, [value]);

  // Large card is used for YEARS so it stands out more
  const cardWidth = large ? 80 : 65;
  const cardHeight = large ? 100 : 80;
  const halfH = large ? 50 : 40;
  const fontSize = large ? '2.8rem' : '2.2rem';

  // Shared style for the number inside each half
  const numStyle = {
    position: 'absolute',
    left: 0,
    right: 0,
    height: cardHeight,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontFamily: 'var(--font-display)',
    fontSize,
    fontWeight: 700,
    color: '#F0A0A0',
    letterSpacing: '0.05em',
  };

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '0.6rem',
      }}
    >
      <div
        style={{
          width: cardWidth,
          borderRadius: '0.6rem',
          overflow: 'hidden',
          boxShadow:
            '0 8px 20px rgba(0,0,0,0.6), inset 0 1px 0 rgba(255,255,255,0.04)',
          border: '1px solid rgba(232, 93, 117, 0.2)',
          position: 'relative',
        }}
      >
        {/* TOP HALF - shows top portion of current number */}
        <div
          style={{
            height: halfH,
            overflow: 'hidden',
            position: 'relative',
            background: '#1C0A0A',
            borderBottom: '1px solid rgba(0,0,0,0.5)',
          }}
        >
          <div style={{ ...numStyle, top: 0 }}>{format(currentVal)}</div>
        </div>

        {/* BOTTOM HALF - shows bottom portion of current number */}
        <div
          style={{
            height: halfH,
            overflow: 'hidden',
            position: 'relative',
            background: '#160808',
          }}
        >
          <div style={{ ...numStyle, top: -halfH }}>{format(currentVal)}</div>
        </div>

        {/* CENTER DIVIDER LINE */}
        <div
          style={{
            position: 'absolute',
            top: '50%',
            left: 0,
            right: 0,
            height: '1.5px',
            background: 'rgba(0,0,0,0.8)',
            zIndex: 10,
            transform: 'translateY(-50%)',
          }}
        />

        {/* TOP FLIP - old number rotates down and disappears */}
        {isFlipping && (
          <motion.div
            initial={{ rotateX: 0 }}
            animate={{ rotateX: -90 }}
            transition={{ duration: 0.25, ease: 'easeIn' }}
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              height: halfH,
              overflow: 'hidden',
              background: '#1C0A0A',
              transformOrigin: 'bottom center',
              zIndex: 5,
            }}
          >
            <div style={{ ...numStyle, top: 0 }}>{format(previousVal)}</div>
          </motion.div>
        )}

        {/* BOTTOM REVEAL - new number rotates into view */}
        {isFlipping && (
          <motion.div
            initial={{ rotateX: 90 }}
            animate={{ rotateX: 0 }}
            transition={{ duration: 0.25, ease: 'easeOut', delay: 0.25 }}
            style={{
              position: 'absolute',
              bottom: 0,
              left: 0,
              right: 0,
              height: halfH,
              overflow: 'hidden',
              background: '#160808',
              transformOrigin: 'top center',
              zIndex: 5,
            }}
          >
            <div style={{ ...numStyle, top: -halfH }}>{format(value)}</div>
          </motion.div>
        )}
      </div>

      {/* Label below each card */}
      <span
        style={{
          fontFamily: 'var(--font-body)',
          fontSize: '0.58rem',
          letterSpacing: '0.2em',
          color: '#9E7070',
          textTransform: 'uppercase',
        }}
      >
        {label}
      </span>
    </div>
  );
}

// ── MAIN SCREEN ──
export default function BirthdayScreen({ onNext }) {
  // Starts with current age immediately
  const [age, setAge] = useState(() => calculateAge(CONFIG.birthday));

  // NEXT button appears after 5 seconds
  const [showNext, setShowNext] = useState(false);

  // Recalculates every second so seconds tick live
  useEffect(() => {
    const interval = setInterval(() => {
      setAge(calculateAge(CONFIG.birthday));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  // Shows NEXT after 5 seconds
  useEffect(() => {
    const timer = setTimeout(() => setShowNext(true), 5000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className='screen'>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '1.75rem',
          padding: '2rem 1.5rem',
          textAlign: 'center',
        }}
      >
        {/* PANDA with shake and heartbeat glow */}
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
              animation:
                'shake 0.8s ease-in-out infinite, heartbeat 2s ease-in-out infinite',
            }}
          >
            🐼
          </div>
        </motion.div>

        {/* HEADING */}
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

        {/* SUBTITLE */}
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
          You have been alive for exactly...
        </motion.p>

        {/* FLIP CLOCK */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9, duration: 0.6 }}
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '1rem',
          }}
        >
          {/* YEARS alone on top, bigger */}
          <FlipCard value={age.years} label='Years' large />

          {/* DAYS and HOURS side by side */}
          <div style={{ display: 'flex', gap: '1rem' }}>
            <FlipCard value={age.days} label='Days' />
            <FlipCard value={age.hours} label='Hours' />
          </div>

          {/* MINUTES and SECONDS side by side */}
          <div style={{ display: 'flex', gap: '1rem' }}>
            <FlipCard value={age.minutes} label='Minutes' />
            <FlipCard value={age.seconds} label='Seconds' />
          </div>
        </motion.div>

        {/* NEXT button appears after 5 seconds */}
        <AnimatePresence>
          {showNext && (
            <motion.button
              className='btn-primary'
              onClick={onNext}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 15 }}
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
