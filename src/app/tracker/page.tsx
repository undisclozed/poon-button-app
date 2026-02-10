'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

interface TarponCatch {
  id: number;
  fisherman: string;
  weight: number;
  length: number;
  location: string;
  lat: number;
  lng: number;
  timestamp: string;
}

export default function TarponTracker() {
  const [catches, setCatches] = useState<TarponCatch[]>([]);
  const [loading, setLoading] = useState(true);

  // Simulated real-time data (in production, this would fetch from an API)
  useEffect(() => {
    // Initial mock data
    const mockCatches: TarponCatch[] = [
      {
        id: 1,
        fisherman: 'Tidalwave Tim',
        weight: 195,
        length: 75,
        location: 'Boca Grande Pass',
        lat: 26.7153,
        lng: -82.2659,
        timestamp: new Date(Date.now() - 3600000).toISOString(),
      },
      {
        id: 2,
        fisherman: 'Saltwater Rick',
        weight: 185,
        length: 73,
        location: 'Key West Harbor',
        lat: 24.5551,
        lng: -81.7800,
        timestamp: new Date(Date.now() - 7200000).toISOString(),
      },
      {
        id: 3,
        fisherman: 'Captain Sarah',
        weight: 245,
        length: 82,
        location: 'Islamorada Flats',
        lat: 24.9244,
        lng: -80.6278,
        timestamp: new Date(Date.now() - 10800000).toISOString(),
      },
      {
        id: 4,
        fisherman: 'Big Catch Maggie',
        weight: 205,
        length: 78,
        location: 'Marathon Keys',
        lat: 24.7166,
        lng: -81.0362,
        timestamp: new Date(Date.now() - 5400000).toISOString(),
      },
    ];

    setCatches(mockCatches);
    setLoading(false);

    // Simulate real-time updates every 30 seconds
    const interval = setInterval(() => {
      const fishermanNames = ['Captain Sarah', 'Saltwater Rick', 'Big Catch Maggie', 'Tidalwave Tim'];
      const locations = [
        { name: 'Boca Grande Pass', lat: 26.7153, lng: -82.2659 },
        { name: 'Key West Harbor', lat: 24.5551, lng: -81.7800 },
        { name: 'Islamorada Flats', lat: 24.9244, lng: -80.6278 },
        { name: 'Marathon Keys', lat: 24.7166, lng: -81.0362 },
        { name: 'Tampa Bay', lat: 27.7676, lng: -82.6403 },
      ];

      const randomLocation = locations[Math.floor(Math.random() * locations.length)];
      const newCatch: TarponCatch = {
        id: Date.now(),
        fisherman: fishermanNames[Math.floor(Math.random() * fishermanNames.length)],
        weight: Math.floor(Math.random() * 100) + 80,
        length: Math.floor(Math.random() * 30) + 60,
        location: randomLocation.name,
        lat: randomLocation.lat,
        lng: randomLocation.lng,
        timestamp: new Date().toISOString(),
      };

      setCatches(prev => [newCatch, ...prev].slice(0, 10)); // Keep last 10
    }, 30000);

    return () => clearInterval(interval);
  }, []);

  const formatTime = (timestamp: string) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffMinutes = Math.floor((now.getTime() - date.getTime()) / 60000);
    
    if (diffMinutes < 60) return `${diffMinutes}m ago`;
    const diffHours = Math.floor(diffMinutes / 60);
    if (diffHours < 24) return `${diffHours}h ago`;
    return date.toLocaleDateString();
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-blue-600 text-white p-4 shadow-lg">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <Link href="/" className="text-2xl md:text-3xl font-bold flex items-center gap-2">
            <span>🐟</span> Tarpon Tracker
          </Link>
          <div className="flex items-center gap-2 bg-green-500 px-4 py-2 rounded-full">
            <div className="w-3 h-3 bg-white rounded-full animate-pulse" />
            <span className="font-semibold">LIVE</span>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto p-4 md:p-6">
        {/* Map Section */}
        <div className="bg-white rounded-lg shadow-lg p-4 mb-6">
          <h2 className="text-2xl font-bold mb-4 text-gray-800">📍 Live Catch Locations</h2>
          <div className="bg-blue-100 rounded-lg overflow-hidden" style={{ height: '400px' }}>
            {/* Simple map representation - in production, use Google Maps or Mapbox */}
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1792624.3374634277!2d-82.46!3d25.76!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x88c1455554d01f87%3A0x4c3c59b776de066e!2sFlorida%20Keys!5e0!3m2!1sen!2sus!4v1234567890"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
            />
          </div>
        </div>

        {/* Recent Catches */}
        <div className="bg-white rounded-lg shadow-lg p-4">
          <h2 className="text-2xl font-bold mb-4 text-gray-800">🎣 Recent Catches</h2>
          
          {loading ? (
            <div className="text-center py-8 text-gray-500">Loading catches...</div>
          ) : (
            <div className="space-y-4">
              {catches.map(catchData => (
                <div
                  key={catchData.id}
                  className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
                >
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-2xl">🎣</span>
                        <h3 className="text-xl font-bold text-gray-800">
                          {catchData.fisherman}
                        </h3>
                      </div>
                      <div className="grid grid-cols-2 gap-2 text-sm text-gray-600">
                        <div>
                          <span className="font-semibold">Weight:</span> {catchData.weight} lbs
                        </div>
                        <div>
                          <span className="font-semibold">Length:</span> {catchData.length}&quot;
                        </div>
                        <div className="col-span-2">
                          <span className="font-semibold">📍 Location:</span> {catchData.location}
                        </div>
                      </div>
                    </div>
                    <div className="text-sm text-gray-500 whitespace-nowrap">
                      {formatTime(catchData.timestamp)}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Stats Summary */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
          <div className="bg-gradient-to-br from-blue-500 to-blue-600 text-white rounded-lg p-6 shadow-lg">
            <div className="text-4xl font-bold">{catches.length}</div>
            <div className="text-blue-100">Total Catches Today</div>
          </div>
          <div className="bg-gradient-to-br from-green-500 to-green-600 text-white rounded-lg p-6 shadow-lg">
            <div className="text-4xl font-bold">
              {catches.length > 0 ? Math.max(...catches.map(c => c.weight)) : 0} lbs
            </div>
            <div className="text-green-100">Biggest Catch</div>
          </div>
          <div className="bg-gradient-to-br from-purple-500 to-purple-600 text-white rounded-lg p-6 shadow-lg">
            <div className="text-4xl font-bold">
              {catches.length > 0 ? Math.round(catches.reduce((sum, c) => sum + c.weight, 0) / catches.length) : 0} lbs
            </div>
            <div className="text-purple-100">Average Weight</div>
          </div>
        </div>

        {/* Back Button */}
        <div className="mt-8 text-center">
          <Link
            href="/"
            className="inline-block bg-blue-600 text-white px-8 py-4 rounded-full font-bold text-lg shadow-lg hover:bg-blue-700 transition-colors"
          >
            ← Back to Poon Button
          </Link>
        </div>
      </div>
    </div>
  );
}
