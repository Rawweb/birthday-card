import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectCards } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/effect-cards';
import { CONFIG } from '../constants/config';

export default function ReasonsScreen({ onNext }) {
  // Tracks which card is currently showing
  const [currentIndex, setCurrentIndex] = useState(0);

  // Next button only appears on the last card
  const isLastCard = currentIndex === CONFIG.reasons.length - 1;

  // Formats numbers like 1 → "001", 2 → "002"
  function formatNumber(num) {
    return String(num).padStart(3, '0');
  }

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
            Why I Love You
          </h1>
          <p
            style={{
              fontFamily: 'var(--font-display)',
              fontStyle: 'italic',
              fontSize: '0.8rem',
              color: '#9E7070',
              marginTop: '0.4rem',
              letterSpacing: '0.05em',
            }}
          >
            Swipe through each one... 🤍
          </p>
        </motion.div>

        {/* ── CARD COUNTER ── */}
        {/* Shows "03 / 10" so she knows how many are left */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '0.75rem',
            letterSpacing: '0.2em',
            color: '#9E7070',
            marginBottom: '-1rem',
          }}
        >
          {formatNumber(currentIndex + 1)} /{' '}
          {formatNumber(CONFIG.reasons.length)}
        </motion.p>

        {/* ── SWIPEABLE REASON CARDS ── */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          style={{ width: '100%', maxWidth: '320px' }}
        >
          <Swiper
            effect='cards'
            grabCursor={true}
            modules={[EffectCards]}
            onSlideChange={(swiper) => setCurrentIndex(swiper.activeIndex)}
          >
            {CONFIG.reasons.map((reason, index) => (
              <SwiperSlide key={index}>
                <div
                  className='card'
                  style={{
                    padding: '2.5rem 2rem',
                    minHeight: '280px',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '1.5rem',
                    textAlign: 'center',
                    cursor: 'grab',
                  }}
                >
                  {/* Large card number */}
                  <span
                    style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: '0.75rem',
                      letterSpacing: '0.3em',
                      color: '#E85D75',
                    }}
                  >
                    {formatNumber(index + 1)}
                  </span>

                  {/* Divider */}
                  <div
                    style={{
                      width: '40px',
                      height: '1px',
                      background: 'rgba(232, 93, 117, 0.4)',
                    }}
                  />

                  {/* The reason itself */}
                  <p
                    style={{
                      fontFamily: 'var(--font-display)',
                      fontStyle: 'italic',
                      fontSize: '1.05rem',
                      lineHeight: 1.75,
                      color: '#F5EAE8',
                    }}
                  >
                    {reason}
                  </p>

                  {/* Small heart at the bottom */}
                  <motion.span
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{
                      duration: 1.5,
                      repeat: Infinity,
                      ease: 'easeInOut',
                    }}
                    style={{ fontSize: '1.25rem' }}
                  >
                    🤍
                  </motion.span>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </motion.div>

        {/* ── NEXT button only shows on the last card ── */}
        <AnimatePresence>
          {isLastCard && (
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
              NEXT 🤍
            </motion.button>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
