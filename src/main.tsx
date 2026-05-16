import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { App } from './App';
import { RadioProvider } from './audio/RadioContext';
import { GameProvider } from './game/GameContext';
import { initHandsetMode } from './lib/handsetMode';
import './index.css';
import './mobile-os.css';

initHandsetMode();

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <GameProvider>
      <RadioProvider>
        <App />
      </RadioProvider>
    </GameProvider>
  </StrictMode>,
);
