import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CONFIG } from '../constants/config';

export default function LockScreen({ onUnlock }) {
  const [pin, setPin] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [isError, setIsError] = useState(false);

  function handleNumberPress(number) {
    if (pin.length >= 6) return;

    // Add the new number to what was already typed
    const newPin = pin + number;
    setPin(newPin);

    // Once 6 digits are entered, check if it matches
    if (newPin.length === 6) {
      if (newPin === CONFIG.passkey) {
        // Correct! Wait a tiny moment then go to next screen
        setTimeout(() => onUnlock(), 400);
      } else {
        // Wrong! Shake the card then clear the dots
        setIsError(true);
        setTimeout(() => {
          setPin('');
          setIsError(false);
        }, 800);
      }
    }
  }

  // Removes the last digit when backspace is pressed
  function handleDelete() {
    setPin((prev) => prev.slice(0, -1));
  }

  // The 9 number buttons (we handle 0 separately at the bottom)
  const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9];

  return (
    <div className='screen'>
      {/* ── MODAL: Shows when she clicks the profile picture ── */}
      <AnimatePresence>
        {showModal && (
          // Dark overlay behind the modal - clicking it closes the modal
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowModal(false)}
            style={{
              position: 'fixed',
              inset: 0,
              background: 'rgba(0, 0, 0, 0.8)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              zIndex: 50,
              padding: '1.5rem',
            }}
          >
            {/* Modal card - stopPropagation stops clicks inside from closing it */}
            <motion.div
              initial={{ opacity: 0, scale: 0.85 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.85 }}
              transition={{ type: 'spring', stiffness: 300, damping: 25 }}
              onClick={(e) => e.stopPropagation()}
              className='card'
              style={{
                padding: '1rem',
                width: '100%',
                maxWidth: '280px',
                position: 'relative',
              }}
            >
              {/* X close button */}
              <button
                onClick={() => setShowModal(false)}
                style={{
                  position: 'absolute',
                  top: '0.6rem',
                  right: '0.6rem',
                  width: '28px',
                  height: '28px',
                  borderRadius: '50%',
                  border: 'none',
                  background: 'rgba(232, 93, 117, 0.8)',
                  color: '#F5EAE8',
                  fontSize: '13px',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  zIndex: 1,
                }}
              >
                ✕
              </button>

              {/* Her photo fills the modal */}
              <img
                src={CONFIG.lockPhoto}
                alt='passkey hint'
                style={{
                  width: '100%',
                  borderRadius: '0.75rem',
                  display: 'block',
                  objectFit: 'cover',
                  maxHeight: '340px',
                }}
              />

              {/* The passkey shown below the photo */}
              <p
                style={{
                  textAlign: 'center',
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.8rem',
                  letterSpacing: '0.2em',
                  color: '#F0A0A0',
                  marginTop: '0.85rem',
                  paddingBottom: '0.25rem',
                }}
              >
                PASSWORD = {CONFIG.passkey}
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── MAIN LOCK CARD ── */}
      <motion.div
        className='card'
        // Card fades and slides up when the page first loads
        initial={{ opacity: 0, y: 30 }}
        animate={{
          opacity: 1,
          y: 0,
          // Shakes left and right when wrong pin is entered
          x: isError ? [-10, 10, -8, 8, -4, 4, 0] : 0,
        }}
        transition={{
          opacity: { duration: 0.5 },
          y: { duration: 0.5 },
          x: { duration: 0.45 },
        }}
        style={{
          padding: '2rem 1.5rem',
          width: '100%',
          maxWidth: '340px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '1.25rem',
        }}
      >
        {/* ── Profile picture (click this to see the passkey hint) ── */}
        <motion.button
          onClick={() => setShowModal(true)}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.97 }}
          style={{
            background: 'none',
            border: '2.5px solid rgba(232, 93, 117, 0.45)',
            borderRadius: '50%',
            padding: '3px',
            cursor: 'pointer',
            transition: 'border-color 0.3s, box-shadow 0.3s',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.borderColor = 'rgba(232, 93, 117, 0.9)';
            e.currentTarget.style.boxShadow =
              '0 0 14px rgba(232, 93, 117, 0.4)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.borderColor = 'rgba(232, 93, 117, 0.45)';
            e.currentTarget.style.boxShadow = 'none';
          }}
        >
          <img
            src={CONFIG.lockPhoto}
            alt='click for hint'
            style={{
              width: '68px',
              height: '68px',
              borderRadius: '50%',
              objectFit: 'cover',
              display: 'block',
            }}
          />
        </motion.button>

        {/* ── LOCKED heading ── */}
        <h1
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: '1.8rem',
            fontWeight: 600,
            letterSpacing: '0.3em',
            color: '#F5EAE8',
          }}
        >
          LOCKED
        </h1>

        {/* ── Hint text below the heading ── */}
        <p
          style={{
            fontFamily: 'var(--font-body)',
            fontSize: '0.72rem',
            color: '#9E7070',
            letterSpacing: '0.05em',
            textAlign: 'center',
            marginTop: '-0.5rem',
          }}
        >
          {CONFIG.hint}
        </p>

        {/* ── The 4 pin dots ── */}
        <div style={{ display: 'flex', gap: '0.85rem' }}>
          {[0, 1, 2, 3, 4, 5].map((index) => (
            <motion.div
              key={index}
              animate={{
                scale: index < pin.length ? 1.2 : 1,
              }}
              transition={{ type: 'spring', stiffness: 400 }}
              style={{
                width: '10px',
                height: '10px',
                borderRadius: '50%',
                background:
                  index < pin.length
                    ? isError
                      ? '#C1272D'
                      : '#E85D75'
                    : 'rgba(255, 255, 255, 0.15)',
                // Dots glow when filled, plain depth shadow when empty
                boxShadow:
                  index < pin.length
                    ? isError
                      ? '0 0 10px rgba(193, 39, 45, 0.7)'
                      : '0 0 10px rgba(232, 93, 117, 0.6)'
                    : '0 2px 4px rgba(0, 0, 0, 0.5)',
                transition: 'background 0.2s, box-shadow 0.2s',
              }}
            />
          ))}
        </div>

        {/* ── Number keypad ── */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: '0.6rem',
            width: '100%',
          }}
        >
          {/* Numbers 1 through 9 */}
          {numbers.map((num) => (
            <button
              key={num}
              className='pin-btn'
              onClick={() => handleNumberPress(String(num))}
            >
              {num}
            </button>
          ))}

          {/* Bottom row: backspace, 0, empty */}
          <button className='pin-btn' onClick={handleDelete}>
            ⌫
          </button>

          <button className='pin-btn' onClick={() => handleNumberPress('0')}>
            0
          </button>

          {/* Empty cell to keep the grid balanced */}
          <div />
        </div>
      </motion.div>
    </div>
  );
}
