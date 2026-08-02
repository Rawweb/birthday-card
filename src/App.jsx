import { useState } from 'react';
import LockScreen from './screens/LockScreen';
import LoadingScreen from './screens/LoadingScreen';
import WelcomeScreen from './screens/WelcomeScreen';
import BirthdayScreen from './screens/BirthdayScreen';
import MemoriesScreen from './screens/MemoriesScreen';
import ReasonsScreen from './screens/ReasonsScreen';
import PromiseScreen from './screens/PromiseScreen';
import LetterScreen from './screens/LetterScreen';
import MessageScreen from './screens/MessageScreen';

// On page load, check if she was already on a screen
// If nothing is saved, start from lock
const savedScreen = localStorage.getItem('screen') || 'lock';

export default function App() {
  const [screen, setScreen] = useState(savedScreen);

  // Saves the screen to localStorage AND updates the UI at the same time
  function goTo(screenName) {
    localStorage.setItem('screen', screenName);
    setScreen(screenName);
  }

  // Restart clears localStorage completely so the full experience replays
  function restart() {
    localStorage.removeItem('screen');
    setScreen('lock');
  }

  if (screen === 'lock') return <LockScreen onUnlock={() => goTo('loading')} />;

  if (screen === 'loading')
    return <LoadingScreen onComplete={() => goTo('welcome')} />;

  if (screen === 'welcome')
    return <WelcomeScreen onStart={() => goTo('birthday')} />;

  if (screen === 'birthday')
    return <BirthdayScreen onNext={() => goTo('memories')} />;

  if (screen === 'memories')
    return <MemoriesScreen onMessage={() => goTo('reasons')} />;

  if (screen === 'reasons')
    return <ReasonsScreen onNext={() => goTo('promise')} />;

  if (screen === 'promise')
    return <PromiseScreen onNext={() => goTo('letter')} />;

  if (screen === 'letter')
    return <LetterScreen onOpen={() => goTo('message')} />;

  if (screen === 'message') return <MessageScreen onRestart={restart} />;
}
