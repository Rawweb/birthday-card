import { motion } from 'framer-motion';

// Reusable fade-up animation so we don't repeat code on every element
// delay controls when each piece appears
function FadeUp({ children, delay }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, delay, ease: 'easeOut' }}
    >
      {children}
    </motion.div>
  );
}

export default function WelcomeScreen({ onStart }) {
  return (
    <div className='screen'>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '2rem',
          padding: '2rem 1.5rem',
          textAlign: 'center',
        }}
      >
        {/* 1. Title fades in first */}
        <FadeUp delay={0.2}>
          <h1
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: '2rem',
              fontWeight: 700,
              color: '#F5EAE8',
              letterSpacing: '0.05em',
            }}
          >
            It's Your Special Day Sweetest 🎀
          </h1>
        </FadeUp>

        {/* 2. Sleeping panda fades in second */}
        <FadeUp delay={0.8}>
          <div style={{ position: 'relative', display: 'inline-block' }}>
            {/* zzZZz floats upward on a loop */}
            <motion.span
              animate={{ opacity: [0, 1, 1, 0], y: [0, -6, -6, -14] }}
              transition={{
                duration: 2.5,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
              style={{
                position: 'absolute',
                top: '-2rem',
                left: '60%',
                transform: 'translateX(-50%)',
                fontFamily: 'var(--font-display)',
                fontStyle: 'italic',
                fontSize: '0.9rem',
                color: '#E85D75',
                whiteSpace: 'nowrap',
                pointerEvents: 'none',
              }}
            >
              zzZZz...
            </motion.span>

            {/* Panda sits inside a glowing circle */}
            <div
              style={{
                width: '110px',
                height: '110px',
                borderRadius: '50%',
                border: '2px solid rgba(232, 93, 117, 0.45)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '3.8rem',
                // Uses the heartbeat keyframe we defined in index.css
                animation: 'heartbeat 2s ease-in-out infinite',
              }}
            >
              🐼
            </div>
          </div>
        </FadeUp>

        {/* 3. Subtitle fades in third */}
        <FadeUp delay={1.3}>
          <p
            style={{
              fontFamily: 'var(--font-display)',
              fontStyle: 'italic',
              fontSize: '0.95rem',
              color: '#9E7070',
              letterSpacing: '0.05em',
            }}
          >
            I made something special for you...
          </p>
        </FadeUp>

        {/* 4. START button fades in last */}
        <FadeUp delay={1.8}>
          <motion.button
            className='btn-primary'
            onClick={onStart}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.96 }}
            style={{ marginTop: '0.5rem' }}
          >
            START ❤️
          </motion.button>
        </FadeUp>
      </div>
    </div>
  );
}
