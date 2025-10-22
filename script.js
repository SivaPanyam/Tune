// ===== Application State =====
const appState = {
    isLoggedIn: false,
    currentUser: null,
    currentMood: 'happy',
    currentPage: 'home',
    isPlaying: false,
    currentSong: null,
    webcamStream: null,
    moodDetectionInterval: null
};

// Mood to music genre mapping
const moodToGenres = {
    happy: ['Pop', 'Dance', 'Funk', 'Disco'],
    energetic: ['EDM', 'Rock', 'Hip-Hop', 'Metal'],
    sad: ['Indie', 'Alternative', 'Blues', 'Ballad'],
    calm: ['Ambient', 'Classical', 'Jazz', 'Chill'],
    romantic: ['R&B', 'Soul', 'Love Songs', 'Acoustic'],
    angry: ['Rock', 'Metal', 'Punk', 'Rap'],
    focused: ['Lo-fi', 'Classical', 'Instrumental', 'Study Music'],
    nostalgic: ['Classic Rock', 'Oldies', 'Retro', 'Throwback'],
    party: ['Dance', 'EDM', 'Hip-Hop', 'Party Hits'],
    sleepy: ['Ambient', 'Lullaby', 'Meditation', 'Sleep Music']
};

// Mood emoji mapping
const moodEmojis = {
    happy: '😊',
    energetic: '⚡',
    sad: '😢',
    calm: '😌',
    romantic: '💕',
    angry: '😠',
    focused: '🎯',
    nostalgic: '🌅',
    party: '🎉',
    sleepy: '😴'
};

// ===== Initialization =====
document.addEventListener('DOMContentLoaded', () => {
    initializeApp();
});

function initializeApp() {
    // Check if user is already logged in
    const savedUser = localStorage.getItem('tuneaura_user');
    if (savedUser) {
        appState.currentUser = JSON.parse(savedUser);
        appState.isLoggedIn = true;
        
        // Check if mood is set
        const savedMood = localStorage.getItem('tuneaura_mood');
        if (savedMood) {
            appState.currentMood = savedMood;
            showPage('mainApp');
        } else {
            showPage('moodDetectionPage');
        }
    } else {
        showPage('loginPage');
    }

    setupEventListeners();
}

// ===== Event Listeners Setup =====
function setupEventListeners() {
    // Login/Signup
    document.getElementById('loginForm')?.addEventListener('submit', handleLogin);
    document.getElementById('signupForm')?.addEventListener('submit', handleSignup);
    document.getElementById('showSignup')?.addEventListener('click', (e) => {
        e.preventDefault();
        showPage('signupPage');
    });
    document.getElementById('showLogin')?.addEventListener('click', (e) => {
        e.preventDefault();
        showPage('loginPage');
    });

    // Mood Detection
    document.getElementById('startFacialDetection')?.addEventListener('click', startFacialDetection);
    document.getElementById('showMoodSelector')?.addEventListener('click', showMoodSelector);
    document.getElementById('showMindInput')?.addEventListener('click', showMindInput);
    document.getElementById('skipMoodDetection')?.addEventListener('click', () => {
        appState.currentMood = 'happy';
        saveMood('happy');
        showPage('mainApp');
    });

    // Facial Detection Modal
    document.getElementById('stopCamera')?.addEventListener('click', stopCamera);
    document.getElementById('confirmMood')?.addEventListener('click', confirmDetectedMood);

    // Manual Mood Selection
    document.querySelectorAll('.mood-item').forEach(item => {
        item.addEventListener('click', () => selectMood(item.dataset.mood));
    });

    // Mind Input
    document.getElementById('analyzeMind')?.addEventListener('click', analyzeMindInput);

    // Modal Close Buttons
    document.querySelectorAll('.modal .close').forEach(closeBtn => {
        closeBtn.addEventListener('click', function() {
            this.closest('.modal').classList.remove('active');
        });
    });

    // Navigation
    document.querySelectorAll('.sidebar .nav-item').forEach(item => {
        item.addEventListener('click', (e) => {
            e.preventDefault();
            if (item.id === 'moodDetectorNav') {
                showPage('moodDetectionPage');
            } else {
                const page = item.dataset.page;
                if (page) navigateToSection(page);
            }
        });
    });

    // User Profile Dropdown
    document.getElementById('userProfileBtn')?.addEventListener('click', toggleUserDropdown);
    document.getElementById('profileSettings')?.addEventListener('click', (e) => {
        e.preventDefault();
        navigateToSection('settings');
        document.getElementById('userDropdown').classList.remove('active');
    });
    document.getElementById('accountSettings')?.addEventListener('click', (e) => {
        e.preventDefault();
        navigateToSection('settings');
        document.getElementById('userDropdown').classList.remove('active');
    });
    document.getElementById('logoutBtn')?.addEventListener('click', handleLogout);

    // Change Mood Button
    document.getElementById('changeMoodBtn')?.addEventListener('click', showMoodSelector);
    document.getElementById('currentMoodDisplay')?.addEventListener('click', showMoodSelector);

    // Play/Pause
    document.querySelector('.play-pause')?.addEventListener('click', togglePlayPause);

    // Back/Forward Navigation
    document.getElementById('backBtn')?.addEventListener('click', () => window.history.back());
    document.getElementById('forwardBtn')?.addEventListener('click', () => window.history.forward());

    // Click outside dropdown to close
    document.addEventListener('click', (e) => {
        const dropdown = document.getElementById('userDropdown');
        const profileBtn = document.getElementById('userProfileBtn');
        if (dropdown && profileBtn && !profileBtn.contains(e.target)) {
            dropdown.classList.remove('active');
        }
    });
}

// ===== Page Management =====
function showPage(pageId) {
    document.querySelectorAll('.page').forEach(page => {
        page.classList.remove('active');
    });
    document.getElementById(pageId)?.classList.add('active');

    // Update UI if showing main app
    if (pageId === 'mainApp') {
        updateMainAppUI();
    }
}

// ===== Login/Signup Handlers =====
function handleLogin(e) {
    e.preventDefault();
    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;

    // Simple validation (in production, this would be server-side)
    if (email && password) {
        const user = {
            email: email,
            username: email.split('@')[0],
            loginDate: new Date().toISOString()
        };

        appState.currentUser = user;
        appState.isLoggedIn = true;
        localStorage.setItem('tuneaura_user', JSON.stringify(user));

        // Check if mood is already set
        const savedMood = localStorage.getItem('tuneaura_mood');
        if (savedMood) {
            appState.currentMood = savedMood;
            showPage('mainApp');
        } else {
            showPage('moodDetectionPage');
        }
    } else {
        alert('Please enter valid credentials');
    }
}

function handleSignup(e) {
    e.preventDefault();
    const email = document.getElementById('signupEmail').value;
    const password = document.getElementById('signupPassword').value;
    const username = document.getElementById('signupUsername').value;
    const dob = document.getElementById('signupDOB').value;

    if (email && password && username && dob) {
        const user = {
            email: email,
            username: username,
            dob: dob,
            signupDate: new Date().toISOString()
        };

        appState.currentUser = user;
        appState.isLoggedIn = true;
        localStorage.setItem('tuneaura_user', JSON.stringify(user));

        showPage('moodDetectionPage');
    } else {
        alert('Please fill in all fields');
    }
}

function handleLogout(e) {
    e.preventDefault();
    appState.isLoggedIn = false;
    appState.currentUser = null;
    localStorage.removeItem('tuneaura_user');
    localStorage.removeItem('tuneaura_mood');
    
    if (appState.webcamStream) {
        stopCamera();
    }
    
    showPage('loginPage');
}

// ===== Facial Mood Detection =====
function startFacialDetection() {
    const modal = document.getElementById('facialDetectionModal');
    modal.classList.add('active');
    
    // Request camera access
    navigator.mediaDevices.getUserMedia({ video: true })
        .then(stream => {
            appState.webcamStream = stream;
            const video = document.getElementById('webcam');
            video.srcObject = stream;
            
            // Update status
            document.querySelector('.detection-status').textContent = 'Analyzing your mood...';
            
            // Simulate mood detection after 3 seconds
            setTimeout(() => {
                detectMoodFromFace();
            }, 3000);
        })
        .catch(err => {
            console.error('Error accessing camera:', err);
            alert('Unable to access camera. Please ensure you have granted camera permissions.');
            modal.classList.remove('active');
        });
}

function detectMoodFromFace() {
    // Simulate AI mood detection
    // In production, this would use TensorFlow.js or similar for actual facial analysis
    const moods = ['happy', 'calm', 'energetic', 'focused', 'nostalgic'];
    const detectedMood = moods[Math.floor(Math.random() * moods.length)];
    
    // Capture frame
    const video = document.getElementById('webcam');
    const canvas = document.getElementById('canvas');
    const ctx = canvas.getContext('2d');
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    ctx.drawImage(video, 0, 0);
    
    // Show result
    document.querySelector('.detection-overlay').style.display = 'none';
    const resultDiv = document.getElementById('detectedMoodResult');
    resultDiv.style.display = 'block';
    
    document.getElementById('moodName').textContent = detectedMood.charAt(0).toUpperCase() + detectedMood.slice(1);
    document.getElementById('moodEmoji').textContent = moodEmojis[detectedMood];
    
    appState.currentMood = detectedMood;
}

function stopCamera() {
    if (appState.webcamStream) {
        appState.webcamStream.getTracks().forEach(track => track.stop());
        appState.webcamStream = null;
    }
    document.getElementById('facialDetectionModal').classList.remove('active');
    document.querySelector('.detection-overlay').style.display = 'flex';
    document.getElementById('detectedMoodResult').style.display = 'none';
}

function confirmDetectedMood() {
    saveMood(appState.currentMood);
    stopCamera();
    showPage('mainApp');
}

// ===== Manual Mood Selection =====
function showMoodSelector() {
    document.getElementById('moodSelectorModal').classList.add('active');
}

function selectMood(mood) {
    appState.currentMood = mood;
    saveMood(mood);
    document.getElementById('moodSelectorModal').classList.remove('active');
    
    // Update UI if on main app
    if (document.getElementById('mainApp').classList.contains('active')) {
        updateMainAppUI();
    } else {
        showPage('mainApp');
    }
}

// ===== Mind Input Analysis =====
function showMindInput() {
    document.getElementById('mindInputModal').classList.add('active');
}

function analyzeMindInput() {
    const input = document.getElementById('mindInput').value.trim();
    
    if (!input) {
        alert('Please share your thoughts');
        return;
    }
    
    // Simple keyword-based mood detection
    const keywords = {
        happy: ['happy', 'joy', 'excited', 'great', 'awesome', 'celebrating', 'wonderful'],
        sad: ['sad', 'down', 'depressed', 'lonely', 'miss', 'heartbreak', 'cry'],
        energetic: ['workout', 'gym', 'run', 'energy', 'pump', 'motivated', 'active'],
        calm: ['relax', 'chill', 'peace', 'quiet', 'meditate', 'unwind', 'calm'],
        romantic: ['love', 'romance', 'date', 'heart', 'partner', 'relationship'],
        angry: ['angry', 'mad', 'frustrated', 'annoyed', 'furious', 'rage'],
        focused: ['study', 'work', 'concentrate', 'focus', 'productive', 'task'],
        nostalgic: ['memory', 'remember', 'past', 'childhood', 'nostalgia', 'miss'],
        party: ['party', 'dance', 'club', 'celebrate', 'fun', 'friends'],
        sleepy: ['sleep', 'tired', 'rest', 'bed', 'sleepy', 'exhausted']
    };
    
    let detectedMood = 'happy';
    let maxMatches = 0;
    
    const lowerInput = input.toLowerCase();
    
    for (const [mood, words] of Object.entries(keywords)) {
        let matches = 0;
        words.forEach(word => {
            if (lowerInput.includes(word)) matches++;
        });
        if (matches > maxMatches) {
            maxMatches = matches;
            detectedMood = mood;
        }
    }
    
    appState.currentMood = detectedMood;
    saveMood(detectedMood);
    
    document.getElementById('mindInputModal').classList.remove('active');
    document.getElementById('mindInput').value = '';
    
    showPage('mainApp');
}

// ===== Mood Management =====
function saveMood(mood) {
    localStorage.setItem('tuneaura_mood', mood);
    appState.currentMood = mood;
}

function updateMainAppUI() {
    if (!appState.currentUser) return;
    
    // Update username
    const usernameElem = document.getElementById('username');
    if (usernameElem) {
        usernameElem.textContent = appState.currentUser.username || 'User';
    }
    
    // Update mood displays
    const currentMoodText = document.getElementById('currentMoodText');
    const bannerMood = document.getElementById('bannerMood');
    
    if (currentMoodText) {
        currentMoodText.textContent = appState.currentMood.charAt(0).toUpperCase() + appState.currentMood.slice(1);
    }
    
    if (bannerMood) {
        bannerMood.textContent = appState.currentMood.charAt(0).toUpperCase() + appState.currentMood.slice(1);
    }
    
    // Update mood indicator icon
    const moodIndicator = document.querySelector('.mood-indicator i');
    if (moodIndicator) {
        const iconMap = {
            happy: 'fa-smile',
            energetic: 'fa-bolt',
            sad: 'fa-sad-tear',
            calm: 'fa-spa',
            romantic: 'fa-heart',
            angry: 'fa-angry',
            focused: 'fa-bullseye',
            nostalgic: 'fa-clock',
            party: 'fa-glass-cheers',
            sleepy: 'fa-moon'
        };
        moodIndicator.className = `fas ${iconMap[appState.currentMood] || 'fa-smile'}`;
    }
    
    // Update settings fields
    const settingsUsername = document.getElementById('settingsUsername');
    const settingsEmail = document.getElementById('settingsEmail');
    
    if (settingsUsername && appState.currentUser) {
        settingsUsername.value = appState.currentUser.username || '';
    }
    
    if (settingsEmail && appState.currentUser) {
        settingsEmail.value = appState.currentUser.email || '';
    }
}

// ===== Navigation =====
function navigateToSection(sectionName) {
    // Update sidebar navigation
    document.querySelectorAll('.sidebar .nav-item').forEach(item => {
        item.classList.remove('active');
        if (item.dataset.page === sectionName) {
            item.classList.add('active');
        }
    });
    
    // Update content sections
    document.querySelectorAll('.content-section').forEach(section => {
        section.classList.remove('active');
    });
    
    const targetSection = document.getElementById(`${sectionName}Section`);
    if (targetSection) {
        targetSection.classList.add('active');
    }
    
    appState.currentPage = sectionName;
}

function toggleUserDropdown() {
    const dropdown = document.getElementById('userDropdown');
    dropdown.classList.toggle('active');
}

// ===== Playback Controls =====
function togglePlayPause() {
    const playPauseBtn = document.querySelector('.play-pause i');
    
    if (appState.isPlaying) {
        playPauseBtn.className = 'fas fa-play';
        appState.isPlaying = false;
    } else {
        playPauseBtn.className = 'fas fa-pause';
        appState.isPlaying = true;
        
        // Simulate song playing
        simulatePlayback();
    }
}

function simulatePlayback() {
    if (!appState.isPlaying) return;
    
    const progressFill = document.querySelector('.progress-fill');
    const currentTimeElem = document.querySelector('.time-current');
    
    let currentTime = 0;
    const totalTime = 225; // 3:45 in seconds
    
    const interval = setInterval(() => {
        if (!appState.isPlaying) {
            clearInterval(interval);
            return;
        }
        
        currentTime += 1;
        const percentage = (currentTime / totalTime) * 100;
        
        if (progressFill) {
            progressFill.style.width = `${percentage}%`;
        }
        
        if (currentTimeElem) {
            const minutes = Math.floor(currentTime / 60);
            const seconds = currentTime % 60;
            currentTimeElem.textContent = `${minutes}:${seconds.toString().padStart(2, '0')}`;
        }
        
        if (currentTime >= totalTime) {
            clearInterval(interval);
            appState.isPlaying = false;
            document.querySelector('.play-pause i').className = 'fas fa-play';
        }
    }, 1000);
}

// ===== Interactive Elements =====
// Progress bar seek
document.querySelector('.progress-bar')?.addEventListener('click', function(e) {
    const rect = this.getBoundingClientRect();
    const percentage = (e.clientX - rect.left) / rect.width;
    const progressFill = this.querySelector('.progress-fill');
    if (progressFill) {
        progressFill.style.width = `${percentage * 100}%`;
    }
});

// Volume control
document.querySelector('.volume-bar')?.addEventListener('click', function(e) {
    const rect = this.getBoundingClientRect();
    const percentage = (e.clientX - rect.left) / rect.width;
    const volumeFill = this.querySelector('.volume-fill');
    if (volumeFill) {
        volumeFill.style.width = `${percentage * 100}%`;
    }
});

// Like button toggle
document.querySelectorAll('.now-playing-left .icon-btn').forEach(btn => {
    btn.addEventListener('click', function() {
        const icon = this.querySelector('i');
        if (icon.classList.contains('far')) {
            icon.classList.remove('far');
            icon.classList.add('fas');
        } else {
            icon.classList.remove('fas');
            icon.classList.add('far');
        }
    });
});

// Search functionality
document.getElementById('searchInput')?.addEventListener('input', function(e) {
    const query = e.target.value.toLowerCase();
    // In production, this would search through actual music library
    console.log('Searching for:', query);
});

// Create playlist
document.getElementById('createPlaylist')?.addEventListener('click', function(e) {
    e.preventDefault();
    const playlistName = prompt('Enter playlist name:');
    if (playlistName) {
        const playlistsSection = document.querySelector('.playlists-section');
        const newPlaylist = document.createElement('div');
        newPlaylist.className = 'playlist-item';
        newPlaylist.textContent = playlistName;
        playlistsSection.appendChild(newPlaylist);
    }
});

// Theme selector
document.getElementById('themeSelect')?.addEventListener('change', function(e) {
    const theme = e.target.value;
    // In production, this would change the theme
    console.log('Theme changed to:', theme);
    
    if (theme === 'light') {
        // Light theme would be implemented here
        alert('Light theme coming soon!');
    }
});

// Play buttons on cards
document.querySelectorAll('.play-btn').forEach(btn => {
    btn.addEventListener('click', function(e) {
        e.stopPropagation();
        
        // Update now playing
        const card = this.closest('.music-card') || this.closest('.quick-pick-item');
        if (card) {
            const title = card.querySelector('h3')?.textContent || 'Unknown Song';
            const artist = card.querySelector('p')?.textContent || 'Unknown Artist';
            
            document.querySelector('.now-playing-info h4').textContent = title;
            document.querySelector('.now-playing-info p').textContent = artist;
            
            // Start playing
            appState.isPlaying = true;
            document.querySelector('.play-pause i').className = 'fas fa-pause';
            simulatePlayback();
        }
    });
});

// Music card click
document.querySelectorAll('.music-card, .quick-pick-item').forEach(card => {
    card.addEventListener('click', function() {
        const title = this.querySelector('h3')?.textContent || 'Unknown Song';
        console.log('Selected:', title);
        // In production, this would navigate to the album/playlist page
    });
});

// Library items click
document.querySelectorAll('.library-item').forEach(item => {
    item.addEventListener('click', function() {
        const title = this.querySelector('h3')?.textContent;
        console.log('Opening:', title);
        // In production, this would navigate to the playlist/album page
    });
});

// Genre cards click
document.querySelectorAll('.genre-card').forEach(card => {
    card.addEventListener('click', function() {
        const genre = this.querySelector('h3')?.textContent;
        console.log('Browsing genre:', genre);
        // In production, this would show genre-specific content
    });
});

// ===== Utility Functions =====
function formatTime(seconds) {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
}

// ===== Keyboard Shortcuts =====
document.addEventListener('keydown', (e) => {
    // Space bar to play/pause
    if (e.code === 'Space' && e.target.tagName !== 'INPUT' && e.target.tagName !== 'TEXTAREA') {
        e.preventDefault();
        togglePlayPause();
    }
    
    // Arrow keys for seeking
    if (e.code === 'ArrowRight' && appState.isPlaying) {
        // Skip forward 10 seconds
        console.log('Skip forward');
    }
    
    if (e.code === 'ArrowLeft' && appState.isPlaying) {
        // Skip backward 10 seconds
        console.log('Skip backward');
    }
});

// ===== Console Welcome Message =====
console.log('%c🎵 Welcome to TuneAura! 🎵', 'font-size: 20px; font-weight: bold; color: #1db954;');
console.log('%cMusic that reads your mood', 'font-size: 14px; color: #b3b3b3;');
console.log('%cFeatures:', 'font-size: 14px; font-weight: bold; color: #1db954;');
console.log('✓ Facial mood detection');
console.log('✓ Manual mood selection');
console.log('✓ Mind input analysis');
console.log('✓ Personalized playlists');
console.log('✓ Full music player controls');

// ===== Service Worker Registration (for future PWA support) =====
if ('serviceWorker' in navigator) {
    // Uncomment when service worker is implemented
    // navigator.serviceWorker.register('/sw.js').then(reg => {
    //     console.log('Service Worker registered:', reg);
    // });
}