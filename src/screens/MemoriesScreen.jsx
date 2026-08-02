import { motion } from 'framer-motion';
import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectCoverflow, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';
import { CONFIG } from '../constants/config';

export default function MemoriesScreen({ onMessage }) {
  return (
    <div className='screen'>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '2rem',
          width: '100%',
          padding: '2rem 0',
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
            Special Memories
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
            Swipe for more ✦
          </p>
        </motion.div>

        {/* ── PHOTO CAROUSEL ── */}
        {/* The coverflow effect makes the center photo bigger than the sides */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          style={{ width: '100%' }}
        >
          <Swiper
            effect='coverflow'
            grabCursor={true}
            centeredSlides={true}
            slidesPerView='auto'
            coverflowEffect={{
              rotate: 0,
              stretch: 0,
              depth: 100,
              modifier: 2.5,
              slideShadows: false,
            }}
            pagination={{ clickable: true }}
            modules={[EffectCoverflow, Pagination]}
            style={{ paddingBottom: '2.5rem' }}
          >
            {CONFIG.memories.map((photo, index) => (
              <SwiperSlide key={index} style={{ width: '240px' }}>
                <img
                  src={photo}
                  alt={`memory ${index + 1}`}
                  style={{
                    width: '100%',
                    height: '320px',
                    objectFit: 'cover',
                    borderRadius: '1rem',
                    border: '1px solid rgba(232, 93, 117, 0.25)',
                    display: 'block',
                  }}
                />
              </SwiperSlide>
            ))}
          </Swiper>
        </motion.div>

        {/* ── MESSAGE BUTTON ── */}
        <motion.button
          className='btn-primary'
          onClick={onMessage}
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.5 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.96 }}
        >
          ✦ MESSAGE
        </motion.button>
      </div>
    </div>
  );
}
