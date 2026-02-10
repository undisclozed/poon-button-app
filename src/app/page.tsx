'use client';

import { useState } from 'react';
import Link from 'next/link';

interface Tarpon {
  id: number;
  x: number;
  y: number;
}

export default function PoonButton() {
  const [tarpons, setTarpons] = useState<Tarpon[]>([]);
  const [audioElement, setAudioElement] = useState<HTMLAudioElement | null>(null);

  const handlePoonClick = () => {
    // Play sound (will fail gracefully if audio file doesn't exist)
    if (!audioElement) {
      const audio = new Audio('/poon-button-app/poon.mp3');
      audio.play().catch(() => {
        // Fallback: use Web Audio API to create a simple tone
        const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
        const audioContext = new AudioContextClass();
        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();
        
        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);
        
        oscillator.frequency.value = 800;
        oscillator.type = 'sine';
        gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.5);
        
        oscillator.start(audioContext.currentTime);
        oscillator.stop(audioContext.currentTime + 0.5);
      });
      setAudioElement(audio);
    } else {
      audioElement.currentTime = 0;
      audioElement.play().catch(() => console.log('Audio playback failed'));
    }

    // Spawn tarpon at random position
    const newTarpon: Tarpon = {
      id: Date.now(),
      x: Math.random() * (window.innerWidth - 100),
      y: Math.random() * (window.innerHeight - 100),
    };

    setTarpons(prev => [...prev, newTarpon]);

    // Remove tarpon after animation
    setTimeout(() => {
      setTarpons(prev => prev.filter(t => t.id !== newTarpon.id));
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-400 to-blue-600 flex flex-col items-center justify-center p-4 relative overflow-hidden">
      {/* Animated Tarpons */}
      {tarpons.map(tarpon => (
        <div
          key={tarpon.id}
          className="absolute animate-bounce"
          style={{
            left: `${tarpon.x}px`,
            top: `${tarpon.y}px`,
            width: '80px',
            height: '80px',
            animation: 'bounce 2s ease-out',
          }}
        >
          <img src="/poon-button-app/tarpon.png" alt="Tarpon" className="w-full h-full object-contain" />
        </div>
      ))}

      {/* Main Content */}
      <div className="z-10 text-center">
        <h1 className="text-5xl md:text-7xl font-bold text-white mb-8 drop-shadow-lg">
          POON BUTTON
        </h1>
        
        <button
          onClick={handlePoonClick}
          className="bg-red-500 hover:bg-red-600 text-6xl md:text-8xl font-bold py-8 px-16 rounded-full shadow-2xl transform hover:scale-105 transition-all duration-200 active:scale-95"
        >
          🎣
        </button>

        <p className="text-white text-xl mt-8 font-semibold drop-shadow">
          Tap to spawn POON!
        </p>

        <Link
          href="/tracker"
          className="mt-12 inline-block bg-white text-blue-600 px-8 py-4 rounded-full font-bold text-lg shadow-lg hover:bg-blue-50 transition-colors"
        >
          View Live Tracker →
        </Link>
      </div>
    </div>
  );
}
