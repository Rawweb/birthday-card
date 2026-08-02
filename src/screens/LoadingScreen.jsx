import { motion, AnimatePresence } from 'framer-motion';

export default function LoadingScreen({ onComplete }) {
  return (
    <div className='screen'>
      {/* Everything is centered in this column */}
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '1.5rem',
        }}
      >
        {/* ── BEAR + HMM TEXT ── */}
        <div style={{ position: 'relative', display: 'inline-block' }}>
          {/* "Hmm" fades in and out on a loop above the bear */}
          <motion.span
            animate={{ opacity: [0, 1, 1, 0] }}
            transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
            style={{
              position: 'absolute',
              top: '-2.5rem',
              left: '100%',
              transform: 'translateX(-50%)',
              fontFamily: 'var(--font-display)',
              fontStyle: 'italic',
              fontSize: '1rem',
              color: '#E85D75',
              whiteSpace: 'nowrap',
              pointerEvents: 'none',
            }}
          >
            Hmm...
          </motion.span>

          {/* Bear bounces up and down forever */}
          <motion.div
            animate={{ y: [0, -14, 0] }}
            transition={{
              duration: 1.2,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
            style={{ fontSize: '5rem', lineHeight: 1 }}
          >
            🐼
          </motion.div>
        </div>

        {/* ── LOADING TEXT ── */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: '.95rem',
            letterSpacing: '0.1em',
            color: '#F5EAE8',
          }}
        >
          Loading something special...
        </motion.p>

        {/* ── PROGRESS BAR ── */}
        {/* Outer track */}
        <div
          style={{
            width: '220px',
            height: '5px',
            background: 'rgba(255, 255, 255, 0.08)',
            borderRadius: '9999px',
            overflow: 'hidden',
          }}
        >
          {/* Inner fill - animates from 0% to 100% over 3.5 seconds */}
          {/* When it finishes, onComplete is called after a small pause */}
          <motion.div
            initial={{ width: '0%' }}
            animate={{ width: '100%' }}
            transition={{ duration: 3.5, ease: 'linear' }}
            onAnimationComplete={() => setTimeout(() => onComplete(), 500)}
            style={{
              height: '100%',
              background: 'linear-gradient(to right, #C1272D, #E85D75)',
              borderRadius: '9999px',
            }}
          />
        </div>

        {/* ── JUST FOR YOU TEXT ── */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.6 }}
          style={{
            fontFamily: 'var(--font-body)',
            fontSize: '0.68rem',
            letterSpacing: '0.3em',
            color: '#9E7070',
          }}
        >
          • JUST FOR YOU •
        </motion.p>
      </div>
    </div>
  );
}
