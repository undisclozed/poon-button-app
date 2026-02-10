# 🐟 Poon Button App

**Status**: Ready for deployment and testing  
**Built**: Feb 10, 2026 07:27 EST  
**Purpose**: Tarpon fishing tracking and celebration app

## 📱 Features

### Page 1: Poon Button
- Large interactive button with fish emoji (🎣)
- Plays "Poon!" sound on tap (with audio fallback)
- Spawns animated tarpon fish emojis (🐟) at random positions
- Bounce animations (2-second duration)
- Mobile-optimized touch interface
- Link to Live Tracker page

### Page 2: Live Tarpon Tracker
- **Real-time catch feed** - Updates every 30 seconds with new catches
- **Live GPS map** - Embedded Google Maps showing Florida Keys fishing locations
- **Catch details** - Fisherman name, weight, length, location, timestamp
- **Statistics dashboard**:
  - Total catches today
  - Biggest catch (weight)
  - Average weight
- **Mobile-responsive** design with card layout

## 🚀 Quick Deploy to Vercel

```bash
npx vercel login
npx vercel --prod
```

**That's it!** You'll get a live URL in ~60 seconds.

## 🔧 Local Development

```bash
npm install
npm run dev
```

Open http://localhost:3000

## 📁 Project Structure

```
poon-button-app/
├── src/app/
│   ├── page.tsx          # Poon Button (Page 1)
│   ├── tracker/
│   │   └── page.tsx      # Live Tracker (Page 2)
│   ├── layout.tsx        # App layout & metadata
│   └── globals.css       # Global styles
├── public/
│   ├── AUDIO_NOTE.txt    # Audio file instructions
│   └── poon.mp3          # (Add your audio here)
└── package.json
```

## 🎵 Audio Setup (Optional)

The app works with a fallback beep sound. To add custom audio:

1. Record someone saying "Poon!" enthusiastically
2. Convert to MP3 format
3. Save as `public/poon.mp3`
4. Redeploy

## 🧪 Testing Checklist

- [ ] Button spawns fish on tap
- [ ] Audio plays (or fallback beep works)
- [ ] Fish animations are smooth
- [ ] Tracker page loads
- [ ] Map displays correctly
- [ ] Catch feed updates
- [ ] Works on mobile (iOS/Android)
- [ ] Responsive layout on all screen sizes

## 📊 Tech Stack

- **Framework**: Next.js 14 (React 18)
- **Styling**: Tailwind CSS
- **Language**: TypeScript
- **Deployment**: Vercel (recommended)
- **Build**: Static + ISR

## 🌐 API Integration (Future)

Currently uses mock data that simulates real-time updates. To connect to a live API:

1. Create API endpoint for tarpon catches
2. Update `/tracker/page.tsx` to fetch from your API
3. Replace mock data with real coordinates
4. Add WebSocket for true real-time updates (optional)

## 📞 Support

- Build issues? Run `npm run build` to check for errors
- Deployment issues? See `DEPLOY.md` for multiple deployment methods
- Need features? This is iteration 1 - built for speed, ready to enhance!

---

**Emergency Recovery Build** - Rebuilt from scratch after wild-harbor crash at 06:27 EST  
**Deadline**: 7 AM EST (missed, but deployed ASAP for fisherman testing)
