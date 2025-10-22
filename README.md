# 🎵 TuneAura - Music for Your Mood

TuneAura is a complete Spotify clone with advanced mood detection features that personalizes your music experience based on your emotional state.

## ✨ Features

### Core Features (Spotify-like)

- 🎵 **Music Player** - Full-featured player with play/pause, skip, shuffle, and repeat
- 📚 **Library Management** - Organize your playlists, albums, and liked songs
- 🔍 **Search** - Find songs, artists, albums, and playlists
- 🎨 **Genre Browsing** - Explore music by genre
- 📱 **Responsive Design** - Works on desktop, tablet, and mobile
- 👤 **User Profiles** - Personal accounts with profile settings
- ⚙️ **Settings** - Customize playback quality, notifications, privacy, and more
- 🎧 **Now Playing Bar** - Always-visible player controls at the bottom
- 📋 **Playlists** - Create and manage custom playlists
- ❤️ **Liked Songs** - Save your favorite tracks

### Unique TuneAura Features

#### 1. 😊 Facial Mood Detection

- Uses your device's camera to analyze facial expressions
- AI-powered emotion recognition
- Automatically suggests music based on detected mood
- Real-time face scanning with visual feedback

#### 2. 🎯 Manual Mood Selection

- Choose from 10 different mood categories:
  - Happy 😊
  - Energetic ⚡
  - Sad 😢
  - Calm 😌
  - Romantic 💕
  - Angry 😠
  - Focused 🎯
  - Nostalgic 🌅
  - Party 🎉
  - Sleepy 😴
- Each mood generates personalized playlists

#### 3. 🧠 Mind Input Mode

- Natural language processing for mood detection
- Type your thoughts/feelings, and TuneAura finds matching music
- Keyword-based intelligent mood analysis
- Examples:
  - "I need motivation for my workout" → Energetic playlists
  - "Feeling nostalgic about summer days" → Nostalgic/Chill music
  - "Celebrating a special moment" → Party/Happy tracks

## 🚀 Installation & Setup

### Prerequisites

- Modern web browser (Chrome, Firefox, Safari, Edge)
- Web server (optional, for development)

### Quick Start

1. **Download the files:**

   - `index.html` - Main HTML structure
   - `styles.css` - All styling
   - `script.js` - Application logic

2. **Open the application:**

   - Simply open `index.html` in your web browser
   - Or use a local web server:

     ```bash
     # Python 3
     python -m http.server 8000

     # Python 2
     python -m SimpleHTTPServer 8000

     # Node.js (http-server)
     npx http-server
     ```

3. **Access the app:**
   - Open http://localhost:8000 in your browser

## 📖 User Guide

### First Time Setup

1. **Login/Signup**

   - Create a new account or login
   - Option to use social login (Google, Facebook, Apple)

2. **Mood Detection Setup**

   - Choose your preferred mood detection method:
     - **Facial Detection**: Grant camera permissions for AI scanning
     - **Manual Selection**: Pick your current mood from the grid
     - **Mind Input**: Describe your feelings in your own words
   - You can skip this step and set it later

3. **Start Listening**
   - Browse personalized playlists based on your mood
   - Search for specific songs, artists, or albums
   - Create custom playlists
   - Explore different genres

### Using Mood Features

#### Facial Mood Detection

1. Click "Start Camera" on the facial detection card
2. Grant camera permissions when prompted
3. Position your face within the outline
4. Wait 3 seconds for AI analysis
5. Review detected mood and confirm

#### Manual Mood Selection

1. Click "Choose Mood" button
2. Select from the mood grid
3. Music updates instantly based on selection

#### Mind Input

1. Click "Enter Thoughts" button
2. Type how you're feeling or what you're doing
3. Click "Find My Music"
4. TuneAura analyzes keywords and selects appropriate mood

### Changing Your Mood

- Click the mood indicator in the top-right corner
- Or click "Change Mood" button on the home page
- Your playlists update automatically

## ⚙️ Settings & Customization

### Profile Settings

- Update username and email
- Change profile picture
- Manage account preferences

### Playback Settings

- **Audio Quality**: Low (96 kbps) to Very High (Lossless)
- **Crossfade**: Smooth transitions between songs
- **Normalize Volume**: Consistent volume across tracks

### Mood Detection Settings

- Enable/disable automatic mood detection
- Set detection frequency (every song, 30 min, hourly, manual)
- Toggle playlist updates based on mood

### Display Settings

- **Theme**: Dark, Light, or Auto
- **Language**: Multiple language support
- Customize interface preferences

### Privacy Settings

- Private session mode
- Control listening activity sharing
- Manage data preferences

## 🎮 Keyboard Shortcuts

- **Space Bar**: Play/Pause
- **→ Arrow**: Skip forward
- **← Arrow**: Skip backward
- **↑ Arrow**: Volume up
- **↓ Arrow**: Volume down

## 🏗️ Technical Architecture

### Technologies Used

- **HTML5**: Semantic structure
- **CSS3**: Modern styling with grid and flexbox
- **Vanilla JavaScript**: No frameworks, pure JS
- **Local Storage**: User data persistence
- **Media Devices API**: Camera access for facial detection
- **Font Awesome**: Icon library

### File Structure

```
tuneaura/
├── index.html          # Main HTML structure
├── styles.css          # All styling and animations
├── script.js           # Application logic
└── README.md          # Documentation
```

### Key Components

#### State Management

- `appState` object manages application state
- LocalStorage for persistence
- Real-time UI updates

#### Mood Detection Engine

- Facial analysis using camera stream
- Keyword-based text analysis
- Mood-to-genre mapping system

#### Music Player

- Simulated playback (ready for API integration)
- Progress tracking
- Volume control
- Playlist management

## 🔧 Customization

### Adding New Moods

Edit the `moodToGenres` object in `script.js`:

```javascript
const moodToGenres = {
  yourMood: ["Genre1", "Genre2", "Genre3"],
  // ... existing moods
};
```

### Changing Color Scheme

Modify CSS variables in `styles.css`:

```css
:root {
  --bg-primary: #121212;
  --bg-highlight: #1db954;
  /* ... other colors */
}
```

### Adding Music API Integration

Replace simulated functions in `script.js`:

- `simulatePlayback()` → Connect to audio API
- `fetchPlaylists()` → Get real playlists
- `searchMusic()` → Implement real search

## 🚀 Future Enhancements

- [ ] Real music streaming integration (Spotify API)
- [ ] Advanced AI mood detection using TensorFlow.js
- [ ] Social features (share playlists, follow friends)
- [ ] Offline mode with PWA support
- [ ] Voice commands
- [ ] Smart recommendations using machine learning
- [ ] Concert and event discovery
- [ ] Lyrics display
- [ ] Podcast support
- [ ] Cross-device synchronization

## 🐛 Troubleshooting

### Camera Not Working

- Grant camera permissions in browser settings
- Ensure you're using HTTPS or localhost
- Check if another app is using the camera

### Music Not Playing

- This is a demo with simulated playback
- Integrate a real music API for actual streaming

### Login Issues

- Clear browser cache and localStorage
- Use different email/username

### Responsive Design Issues

- Clear browser cache
- Try different browser
- Check viewport settings

## 📱 Browser Support

- ✅ Chrome 90+
- ✅ Firefox 88+
- ✅ Safari 14+
- ✅ Edge 90+
- ✅ Opera 76+

## 🔐 Privacy & Security

- All data stored locally in browser
- No server-side data transmission
- Camera stream processed locally
- User controls all permissions

## 📄 License

This is a demonstration project. For production use, ensure compliance with music streaming licenses and APIs.

## 🤝 Contributing

This is a complete standalone application. To extend:

1. Fork the project
2. Add your features
3. Test thoroughly
4. Document changes

## 📞 Support

For issues or questions:

- Check the troubleshooting section
- Review browser console for errors
- Ensure all three files are in the same directory

## 🎉 Credits

- **Design Inspiration**: Spotify
- **Icons**: Font Awesome
- **Concept**: Original mood detection features

---

**Enjoy your personalized music experience with TuneAura!** 🎵✨

_Made with ❤️ for music lovers who want their playlist to match their mood_
