import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { App } from './App';
import { RadioProvider } from './audio/RadioContext';
import { GameProvider } from './game/GameContext';
import { initHandsetMode } from './lib/handsetMode';
import './index.css';
import './styles/site-themes.css';
import './styles/site-layouts.css';
import './styles/site-character.css';
import './mobile-os.css';
// loaded last: owns the shell, replaces the two patch layers that used to sit here
import './styles/os1999.css';
import './styles/documents.css';

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
