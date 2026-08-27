/* ==========================================
   1. CENTRAL CONFIGURATION
========================================== */

const CONFIG = {
    // Girlfriend's name
    girlfriendName: "Laura Augrista Putri",

    // PIN code to unlock the website
    secretPin: "056493", // e.g. Her birthday date (DDMMYY)

    // Target birthday date-time (ISO format)
    // Timezone offset for Asia/Jakarta (WIB) is UTC+7 (+07:00)
    birthdayDate: "2026-08-27T00:00:00+07:00",

    // Music Configuration
    music: {
        title: "Ini Abadi",
        artist: "Perunggu",
        src: "assets/music/our-song.mp3"
    },

    // Scene 4 message (typewriter)
    birthdayMessage: `Selamat ulang tahun, sayang. ❤️

Terima kasih ya sudah selalu ada dan menghiasi hari-hariku dengan senyumanmu. 

Semoga di usiamu yang baru ini, setiap langkahmu dipenuhi keberkahan, impianmu tercapai satu per satu, dan kebahagiaan selalu memelukmu erat.

I'm so lucky to have you. I love you, always. ✨`,

    // Scene 6 Love Letter
    loveLetter: `Dear Laura,

Tepat hari ini, dunia kedatangan satu jiwa yang luar biasa—kamu. Aku menulis surat ini hanya untuk mengingatkanmu betapa berharganya dirimu bagi orang-orang di sekitarmu, terutama aku.

Melihat tawa kecilmu, mendengar ceritamu, dan melewati hari demi hari bersamamu adalah bagian favorit dalam hidupku. Terima kasih untuk kebaikan hatimu yang tak pernah habis, kesabaranmu, dan kasih sayang yang kamu berikan.

Semoga semua hal baik selalu menemukan jalan menuju dirimu. Di saat hari terasa berat, ingatlah bahwa aku akan selalu di sini untuk menemanimu dan mendukungmu.

Happy Birthday, my love. 

Love,
Me ❤️`
};

/* ==========================================
   2. PHOTO GALLERY DATA
========================================== */
const PHOTOS = [
    { src: "assets/photos/1.jpeg" },
    { src: "assets/photos/2.jpeg" },
    { src: "assets/photos/3.jpeg" },
    { src: "assets/photos/4.jpeg" },
    { src: "assets/photos/5.jpeg" },
    { src: "assets/photos/6.jpeg" },
    { src: "assets/photos/7.jpeg" },
    { src: "assets/photos/8.jpeg" },
    { src: "assets/photos/9.jpeg" },
    { src: "assets/photos/10.jpeg" },
    { src: "assets/photos/11.jpeg" },
    { src: "assets/photos/12.jpeg" }
];

/* ==========================================
   3. GLOBAL STATE & INITIALIZATION
========================================== */
const STATE = {
    currentScene: 0,
    pinDigits: [],
    countdownInterval: null,
    musicPlayed: false,
    micStream: null,
    audioContext: null,
    analyser: null,
    isCandleBlown: false,
    activeLightboxIndex: 0,
    heartsFound: 0
};

// DOM References
const DOM = {
    preloader: document.getElementById('preloader'),
    preloaderProgress: document.getElementById('preloader-progress'),
    customCursor: document.getElementById('custom-cursor'),
    sceneNav: document.getElementById('scene-navigation'),
    navDots: document.querySelectorAll('.nav-dot'),
    scenes: document.querySelectorAll('.scene'),
    
    // PIN Scene
    pinDisplay: document.getElementById('pin-display'),
    pinInput: document.getElementById('pin-input'),
    pinFeedback: document.getElementById('pin-feedback'),
    btnPinSubmit: document.getElementById('btn-pin-submit'),
    pinCard: document.querySelector('.pin-card'),
    keyBtns: document.querySelectorAll('.key-btn'),
    
    // Countdown Scene
    cdDays: document.getElementById('cd-days'),
    cdHours: document.getElementById('cd-hours'),
    cdMinutes: document.getElementById('cd-minutes'),
    cdSeconds: document.getElementById('cd-seconds'),
    btnCountdownNext: document.getElementById('btn-countdown-next'),
    countdownStatus: document.getElementById('countdown-status'),
    
    // Cake Scene
    svgCake: document.getElementById('svg-cake'),
    candleFlame: document.getElementById('candle-flame'),
    candleFlameInner: document.getElementById('candle-flame-inner'),
    smoke1: document.getElementById('smoke-trail-1'),
    smoke2: document.getElementById('smoke-trail-2'),
    cakeGlow: document.getElementById('cake-glow'),
    btnEnableMic: document.getElementById('btn-enable-mic'),
    wishSuccessMsg: document.getElementById('wish-success-msg'),
    btnCakeNext: document.getElementById('btn-cake-next'),
    blowInstruction: document.getElementById('blow-instruction'),
    
    // Message Scene
    typewriterMsg: document.getElementById('typewriter-msg'),
    btnMessageNext: document.getElementById('btn-message-next'),
    
    // Gallery Scene
    polaroidGallery: document.getElementById('polaroid-gallery'),
    btnGalleryNext: document.getElementById('btn-gallery-next'),
    
    // Lightbox
    lightbox: document.getElementById('lightbox-modal'),
    lightboxClose: document.getElementById('lightbox-close'),
    lightboxPrev: document.getElementById('lightbox-prev'),
    lightboxNext: document.getElementById('lightbox-next'),
    lightboxImgWrapper: document.getElementById('lightbox-img-wrapper'),
    lightboxCaption: document.getElementById('lightbox-caption'),
    
    // Envelope Scene
    envelopeContainer: document.getElementById('envelope-container'),
    envelopeFlap: document.getElementById('envelope-flap'),
    letterParchment: document.getElementById('letter-parchment'),
    letterContentText: document.getElementById('letter-content-text'),
    btnOpenEnvelope: document.getElementById('btn-open-envelope'),
    btnLetterNext: document.getElementById('btn-letter-next'),
    
    // Final Scene
    finalGfName: document.getElementById('final-gf-name'),
    finalFadingTextBox: document.getElementById('final-fading-text-box'),
    finalClimaxHeart: document.getElementById('final-climax-heart'),
    btnReplaySurprise: document.getElementById('btn-replay-surprise'),
    
    // Audio Player
    audioPlayer: document.getElementById('audio-player'),
    bgAudio: document.getElementById('bg-audio'),
    btnPlayPause: document.getElementById('btn-player-play-pause'),
    btnMute: document.getElementById('btn-player-mute'),
    volumeSlider: document.getElementById('player-volume'),
    progressBar: document.getElementById('player-progress-bar'),
    trackTitle: document.getElementById('player-track-title'),
    trackArtist: document.getElementById('player-track-artist'),
    
    // Ambient Parallax Layer
    ambientBg: document.getElementById('ambient-bg'),
    starsCanvas: document.getElementById('stars-canvas'),
    toastContainer: document.getElementById('toast-container')
};

// Start everything when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    initPreloader();
    initStarsCanvas();
    initCustomCursor();
    initPinPad();
    initGallery();
    initLightbox();
    initEnvelope();
    initAudioPlayer();
    initParallax();
    initEasterEggs();
});

/* ==========================================
   4. PRELOADER & RESOURCE PREPARATION
========================================== */
function initPreloader() {
    let progress = 0;
    const progressInterval = setInterval(() => {
        // Slow progress bar simulating asset load
        progress += Math.floor(Math.random() * 15) + 5;
        if (progress >= 100) {
            progress = 100;
            clearInterval(progressInterval);
            setTimeout(() => {
                DOM.preloader.style.opacity = '0';
                DOM.preloader.style.visibility = 'hidden';
                // Trigger scene 1 activation animation
                setTimeout(() => {
                    DOM.scenes[0].classList.add('active');
                }, 400);
            }, 600);
        }
        DOM.preloaderProgress.style.width = progress + '%';
    }, 150);

    // Preload Photos in background
    PHOTOS.forEach(photo => {
        const img = new Image();
        img.src = photo.src;
    });

    // Populate dynamic texts from config
    DOM.finalGfName.textContent = CONFIG.girlfriendName;
    DOM.letterContentText.textContent = CONFIG.loveLetter;

    // Spawn floating background hearts
    spawnBackgroundHearts();
}

function spawnBackgroundHearts() {
    const ambientBg = DOM.ambientBg;
    
    // Create container
    const heartsContainer = document.createElement('div');
    heartsContainer.classList.add('bg-floating-hearts');
    ambientBg.appendChild(heartsContainer);

    const heartSizes = [12, 16, 22, 14, 26, 18, 28];
    const totalHearts = 28;

    for (let i = 0; i < totalHearts; i++) {
        const heart = document.createElement('div');
        heart.classList.add('bg-heart');
        
        const size = heartSizes[Math.floor(Math.random() * heartSizes.length)];
        const leftPct = Math.random() * 100;
        const duration = 10 + Math.random() * 18; // 10s – 28s
        const delay = Math.random() * 20;

        heart.style.left = leftPct + '%';
        heart.style.animationDuration = duration + 's';
        heart.style.animationDelay = (-delay) + 's';
        heart.innerHTML = `
            <svg viewBox="0 0 24 24" width="${size}" height="${size}">
                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" fill="currentColor"/>
            </svg>
        `;

        heartsContainer.appendChild(heart);
    }
}

/* ==========================================
   5. CANVAS STARFIELD & SHOOTING STARS
========================================== */
function initStarsCanvas() {
    const canvas = DOM.starsCanvas;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    window.addEventListener('resize', () => {
        width = canvas.width = window.innerWidth;
        height = canvas.height = window.innerHeight;
        createStars();
    });

    // Create Star instances
    let stars = [];
    const numStars = Math.floor((width * height) / 3500);

    function createStars() {
        stars = [];
        for (let i = 0; i < numStars; i++) {
            stars.push({
                x: Math.random() * width,
                y: Math.random() * height,
                radius: Math.random() * 1.8 + 0.3,
                alpha: Math.random(),
                alphaSpeed: (Math.random() * 0.02 + 0.005) * (Math.random() < 0.5 ? 1 : -1),
                color: Math.random() < 0.3 ? '#ffb7c5' : Math.random() < 0.6 ? '#c77dff' : '#ffffff'
            });
        }
    }

    createStars();

    // Shooting stars system
    let shootingStars = [];
    
    function spawnShootingStar() {
        shootingStars.push({
            x: Math.random() * width * 0.8,
            y: Math.random() * height * 0.4,
            length: Math.random() * 80 + 60,
            speed: Math.random() * 8 + 6,
            angle: Math.PI / 4 + (Math.random() - 0.5) * 0.2, // ~45 deg
            alpha: 1,
            decay: Math.random() * 0.015 + 0.01
        });
    }

    // Schedule shooting stars periodically
    setInterval(() => {
        if (Math.random() < 0.7 && shootingStars.length < 3) {
            spawnShootingStar();
        }
    }, 2500);

    function animate() {
        ctx.clearRect(0, 0, width, height);

        // Render Twinkling Stars
        stars.forEach(star => {
            star.alpha += star.alphaSpeed;
            if (star.alpha <= 0.1) {
                star.alpha = 0.1;
                star.alphaSpeed = -star.alphaSpeed;
            } else if (star.alpha >= 0.95) {
                star.alpha = 0.95;
                star.alphaSpeed = -star.alphaSpeed;
            }

            ctx.save();
            ctx.globalAlpha = star.alpha;
            ctx.fillStyle = star.color;
            ctx.beginPath();
            ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
            ctx.fill();

            // Subtle glow around larger stars
            if (star.radius > 1.2) {
                ctx.shadowBlur = 8;
                ctx.shadowColor = star.color;
            }
            ctx.restore();
        });

        // Render Shooting Stars
        for (let i = shootingStars.length - 1; i >= 0; i--) {
            const ss = shootingStars[i];
            ss.x += Math.cos(ss.angle) * ss.speed;
            ss.y += Math.sin(ss.angle) * ss.speed;
            ss.alpha -= ss.decay;

            if (ss.alpha <= 0) {
                shootingStars.splice(i, 1);
                continue;
            }

            const tailX = ss.x - Math.cos(ss.angle) * ss.length;
            const tailY = ss.y - Math.sin(ss.angle) * ss.length;

            const grad = ctx.createLinearGradient(ss.x, ss.y, tailX, tailY);
            grad.addColorStop(0, `rgba(255, 220, 240, ${ss.alpha})`);
            grad.addColorStop(0.3, `rgba(255, 71, 126, ${ss.alpha * 0.6})`);
            grad.addColorStop(1, 'rgba(255, 255, 255, 0)');

            ctx.save();
            ctx.strokeStyle = grad;
            ctx.lineWidth = 2;
            ctx.lineCap = 'round';
            ctx.beginPath();
            ctx.moveTo(ss.x, ss.y);
            ctx.lineTo(tailX, tailY);
            ctx.stroke();
            ctx.restore();
        }

        requestAnimationFrame(animate);
    }

    animate();
}



/* ==========================================
   6. CUSTOM CURSOR
========================================== */
function initCustomCursor() {
    const cursor = DOM.customCursor;
    
    // Enable on mouse move
    document.addEventListener('mousemove', (e) => {
        cursor.style.display = 'block';
        
        // Smooth cursor positioning
        gsap.to(cursor, {
            x: e.clientX,
            y: e.clientY,
            duration: 0.1,
            ease: 'power2.out'
        });
    });

    document.addEventListener('mouseleave', () => {
        cursor.style.display = 'none';
    });

    // Hover effect for buttons and clickables
    const clickables = 'button, a, .key-btn, .nav-dot, .polaroid-card, .envelope, #candle-group, .easter-egg-heart';
    document.addEventListener('mouseover', (e) => {
        if (e.target.closest(clickables)) {
            cursor.classList.add('hovered');
        }
    });

    document.addEventListener('mouseout', (e) => {
        if (e.target.closest(clickables)) {
            cursor.classList.remove('hovered');
        }
    });
}

/* ==========================================
   7. SCENE TRANSITION MANAGER
========================================== */
function changeScene(sceneIndex) {
    if (sceneIndex < 0 || sceneIndex >= DOM.scenes.length || sceneIndex === STATE.currentScene) return;
    
    const direction = sceneIndex > STATE.currentScene ? 'slide-out-left' : 'slide-out-right';
    const oldScene = DOM.scenes[STATE.currentScene];
    
    // Deactivate current scene
    oldScene.classList.remove('active', 'slide-out-left', 'slide-out-right');
    oldScene.classList.add(direction);
    oldScene.setAttribute('aria-hidden', 'true');
    
    // Update dots
    DOM.navDots[STATE.currentScene].classList.remove('active');
    
    // Prepare new scene
    const newScene = DOM.scenes[sceneIndex];
    const incomingDir = sceneIndex > STATE.currentScene ? 'slide-in-right' : 'slide-in-left';
    newScene.classList.remove('slide-out-left', 'slide-out-right');
    newScene.classList.add(incomingDir);
    
    // Update state
    STATE.currentScene = sceneIndex;
    
    // Activate new scene
    setTimeout(() => {
        newScene.classList.remove('slide-in-left', 'slide-in-right');
        newScene.classList.add('active');
        newScene.setAttribute('aria-hidden', 'false');
        DOM.navDots[sceneIndex].classList.add('active');
        
        // Trigger scene-specific callbacks
        onSceneEntered(sceneIndex);
    }, 50);
}

function onSceneEntered(sceneIndex) {
    if (sceneIndex > 0) {
        DOM.sceneNav.classList.add('visible');
    } else {
        DOM.sceneNav.classList.remove('visible');
    }

    const currentScene = DOM.scenes[sceneIndex];
    if (currentScene) currentScene.scrollTop = 0;

    switch(sceneIndex) {
        case 1: // Countdown
            initCountdown();
            break;
        case 2: // Gift Box
            initGiftBox();
            break;
        case 3: // Cake
            break;
        case 4: // Message
            startTypewriter();
            break;
        case 5: // Memories
            initGallery();
            animatePolaroids();
            break;
        case 6: // Letter
            // Reset envelope state if replaying
            break;
        case 7: // Final climax
            triggerFinalClimax();
            break;
    }
}

/* ==========================================
   8. SCENE 01: PIN CODE PAD
========================================== */
function initPinPad() {
    // Handle on-screen keyboard clicks
    DOM.keyBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const val = btn.getAttribute('data-val');
            if (val !== null) {
                appendPinDigit(val);
            }
        });
    });

    DOM.pinInput.focus();

    // Clear and Delete keys
    document.getElementById('key-clear').addEventListener('click', clearPin);
    document.getElementById('key-delete').addEventListener('click', deletePinDigit);

    // Keyboard bindings for desk users
    document.addEventListener('keydown', (e) => {
        if (STATE.currentScene !== 0) return;
        
        if (e.key >= '0' && e.key <= '9') {
            appendPinDigit(e.key);
        } else if (e.key === 'Backspace') {
            deletePinDigit();
        } else if (e.key === 'Escape') {
            clearPin();
        } else if (e.key === 'Enter') {
            validatePin();
        }
    });

    DOM.btnPinSubmit.addEventListener('click', validatePin);
}

function appendPinDigit(digit) {
    if (STATE.pinDigits.length >= 6) return;
    STATE.pinDigits.push(digit);
    updatePinDisplay();
}

function deletePinDigit() {
    if (STATE.pinDigits.length === 0) return;
    STATE.pinDigits.pop();
    updatePinDisplay();
}

function clearPin() {
    STATE.pinDigits = [];
    updatePinDisplay();
    DOM.pinFeedback.textContent = "Enter the secret date/PIN to unlock ♡";
    DOM.pinFeedback.classList.remove('error');
}

function updatePinDisplay() {
    const dots = DOM.pinDisplay.querySelectorAll('.pin-dot');
    dots.forEach((dot, idx) => {
        if (idx < STATE.pinDigits.length) {
            dot.classList.add('filled');
        } else {
            dot.classList.remove('filled');
        }
    });
}

function validatePin() {
    const enteredPin = STATE.pinDigits.join('');
    
    if (enteredPin === CONFIG.secretPin) {
        // Success feedback
        DOM.pinFeedback.textContent = "Correct! Opening your surprise...";
        DOM.pinFeedback.classList.remove('error');
        
        // Trigger subtle confetti burst
        confetti({
            particleCount: 80,
            spread: 60,
            origin: { y: 0.8 },
            colors: ['#ff477e', '#7209b7', '#fcf8f2']
        });
        
        // Advance scene after 1 second
        setTimeout(() => {
            changeScene(1);
        }, 1200);
        
    } else {
        // Error feedback
        DOM.pinCard.classList.add('shake');
        DOM.pinFeedback.textContent = "Hmm... not quite 😝 Try again, sayang.";
        DOM.pinFeedback.classList.add('error');
        
        // Reset code display
        setTimeout(() => {
            DOM.pinCard.classList.remove('shake');
            clearPin();
        }, 800);
    }
}

/* ==========================================
   9. SCENE 02: COUNTDOWN SYSTEM
========================================== */
function initCountdown() {
    if (STATE.countdownInterval) clearInterval(STATE.countdownInterval);

    // Compute UTC+7 birthday time
    const targetDate = new Date(CONFIG.birthdayDate);

    function updateTimer() {
        const now = new Date();
        const difference = targetDate - now;

        if (difference <= 0) {
            // Already past target midnight
            clearInterval(STATE.countdownInterval);
            triggerMidnightEvent();
            return;
        }

        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((difference % (1000 * 60)) / 1000);

        DOM.cdDays.textContent = String(days).padStart(2, '0');
        DOM.cdHours.textContent = String(hours).padStart(2, '0');
        DOM.cdMinutes.textContent = String(minutes).padStart(2, '0');
        DOM.cdSeconds.textContent = String(seconds).padStart(2, '0');
    }

    updateTimer();
    STATE.countdownInterval = setInterval(updateTimer, 1000);

    // Bind countdown next button to go to Gift Box (Scene 2)
    // Use an onclick assignment to avoid duplicate bindings if initCountdown runs again
    DOM.btnCountdownNext.onclick = () => {
        changeScene(2);
    };
}

function triggerMidnightEvent() {
    DOM.cdDays.textContent = "00";
    DOM.cdHours.textContent = "00";
    DOM.cdMinutes.textContent = "00";
    DOM.cdSeconds.textContent = "00";

    DOM.countdownStatus.textContent = "✨ Hari ini adalah harinya!";
    
    if (typeof confetti !== 'undefined') {
        confetti({ particleCount: 150, spread: 80, origin: { y: 0.6 } });
    }

    DOM.btnCountdownNext.removeAttribute('disabled');
    DOM.btnCountdownNext.classList.remove('btn-locked');
    playMusic();
}

/* ==========================================
   9b. SCENE 02: GIFT BOX / SECRET CODE
========================================== */
function initGiftBox() {
    if (STATE.giftBoxInitialized) return;
    STATE.giftBoxInitialized = true;

    const giftboxLid = document.getElementById('giftbox-lid');
    const giftboxVisual = document.getElementById('giftbox-visual');
    const openedMsg = document.getElementById('giftbox-opened-msg');
    const sparkles = document.getElementById('giftbox-sparkles');
    const subtext = document.querySelector('#scene-giftbox .scene-subtext');

    giftboxVisual.addEventListener('click', () => {
        if (giftboxVisual.classList.contains('opened')) return;
        giftboxVisual.classList.add('opened');
        
        // Hide hint
        if (subtext) subtext.style.opacity = '0';

        // Animate box opening
        giftboxLid.classList.add('open');
        sparkles.classList.add('burst');
        
        if (typeof confetti !== 'undefined') {
            confetti({ particleCount: 120, spread: 90, origin: { y: 0.5 }, colors: ['#ff477e', '#7209b7', '#fcf8f2', '#ff9f1c'] });
        }

        setTimeout(() => {
            openedMsg.classList.remove('d-none');
        }, 800);
    });

    document.getElementById('btn-giftbox-next').addEventListener('click', () => {
        changeScene(3); // Go to cake
    });
}



/* ==========================================
   10. SCENE 03: CAKE & CANDLE BLOWING
========================================== */
let isFlameClicked = false;

// Handle mouse/tap clicking on candle
document.getElementById('candle-group').addEventListener('click', blowCandle);

// Enable mic button
DOM.btnEnableMic.addEventListener('click', setupMicrophone);

function setupMicrophone() {
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
        DOM.btnEnableMic.textContent = "Listening...";
        DOM.btnEnableMic.classList.add('recording');
        
        navigator.mediaDevices.getUserMedia({ audio: true, video: false })
            .then(stream => {
                STATE.micStream = stream;
                STATE.audioContext = new (window.AudioContext || window.webkitAudioContext)();
                STATE.analyser = STATE.audioContext.createAnalyser();
                const source = STATE.audioContext.createMediaStreamSource(stream);
                source.connect(STATE.analyser);
                STATE.analyser.fftSize = 256;
                
                detectBlowing();
            })
            .catch(err => {
                showToast("Microphone denied. Click candle to blow! 🎂");
                DOM.btnEnableMic.textContent = "Permission Denied";
                DOM.btnEnableMic.classList.remove('recording');
            });
    } else {
        showToast("Microphone not supported on this browser.");
    }
}

function detectBlowing() {
    if (STATE.isCandleBlown) return;

    const dataArray = new Uint8Array(STATE.analyser.frequencyBinCount);
    STATE.analyser.getByteFrequencyData(dataArray);
    
    // Analyze volume amplitude
    let total = 0;
    for (let i = 0; i < dataArray.length; i++) {
        total += dataArray[i];
    }
    const average = total / dataArray.length;

    // Blowing threshold volume
    if (average > 45) {
        blowCandle();
        
        // Stop stream
        if (STATE.micStream) {
            STATE.micStream.getTracks().forEach(track => track.stop());
        }
        return;
    }

    requestAnimationFrame(detectBlowing);
}

function blowCandle() {
    if (STATE.isCandleBlown) return;
    STATE.isCandleBlown = true;

    // Extinguish visual flame
    DOM.candleFlame.style.display = 'none';
    DOM.candleFlameInner.style.display = 'none';
    DOM.cakeGlow.style.opacity = '0';

    // Activate smoke trails
    DOM.smoke1.classList.add('extinguished');
    DOM.smoke2.classList.add('extinguished');

    DOM.blowInstruction.textContent = "Blow successful! ✨";

    // Play visual feedback
    setTimeout(() => {
        DOM.wishSuccessMsg.classList.add('visible');
        DOM.btnCakeNext.classList.remove('d-none');
    }, 1000);
}

DOM.btnCakeNext.addEventListener('click', () => {
    changeScene(4);
});

/* ==========================================
   11. SCENE 04: TYPEWRITER MESSAGE
========================================== */
function startTypewriter() {
    const text = CONFIG.birthdayMessage;
    DOM.typewriterMsg.innerHTML = '';
    DOM.btnMessageNext.classList.add('d-none');
    
    let index = 0;
    
    function type() {
        if (index < text.length) {
            DOM.typewriterMsg.innerHTML += text.charAt(index);
            index++;
            // Slightly randomized rate for typing realism
            setTimeout(type, Math.random() * 40 + 30);
        } else {
            // Finished typing
            DOM.btnMessageNext.classList.remove('d-none');
        }
    }
    
    type();
}

DOM.btnMessageNext.addEventListener('click', () => {
    changeScene(5);
});

/* ==========================================
   12. SCENE 05: PHOTO MEMORIES
========================================== */
function initGallery() {
    DOM.polaroidGallery.innerHTML = '';
    
    PHOTOS.forEach((photo, index) => {
        const card = document.createElement('div');
        card.classList.add('polaroid-card');
        card.setAttribute('data-idx', index);

        card.innerHTML = `
            <div class="polaroid-img-wrapper">
                <img src="${photo.src}" alt="Memory ${index + 1}" class="polaroid-img">
            </div>
        `;

        // Safety fallback if local image does not exist
        const imgElement = card.querySelector('img');
        imgElement.onerror = function() {
            const wrapper = card.querySelector('.polaroid-img-wrapper');
            wrapper.innerHTML = `
                <div class="polaroid-placeholder-svg">
                    <svg viewBox="0 0 24 24" width="30" height="30" fill="currentColor">
                        <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
                    </svg>
                </div>
            `;
        };

        // Open Lightbox click event
        card.addEventListener('click', () => {
            openLightbox(index);
        });

        DOM.polaroidGallery.appendChild(card);
    });
}

function animatePolaroids() {
    const cards = DOM.polaroidGallery.querySelectorAll('.polaroid-card');

    // Reset before animating (in case of re-entry)
    cards.forEach(c => {
        c.classList.remove('visible');
        c.style.opacity = '0';
        c.style.transform = `rotate(${c.style.getPropertyValue('--rot-deg') || '0deg'}) scale(0.85)`;
    });

    // Stagger-animate each card in
    cards.forEach((card, idx) => {
        const rot = getComputedStyle(card).getPropertyValue('--rot-deg') || '0deg';
        setTimeout(() => {
            card.style.transition = 'opacity 0.45s ease, transform 0.45s cubic-bezier(0.34, 1.56, 0.64, 1)';
            card.style.opacity = '1';
            card.style.transform = `rotate(${rot})`;
            card.classList.add('visible');
        }, idx * 90);
    });
}


DOM.btnGalleryNext.addEventListener('click', () => {
    changeScene(6);
});

/* ==========================================
   13. GALLERY LIGHTBOX MODAL
========================================== */
function initLightbox() {
    DOM.lightboxClose.addEventListener('click', closeLightbox);
    DOM.lightboxPrev.addEventListener('click', showPrevLightbox);
    DOM.lightboxNext.addEventListener('click', showNextLightbox);

    // Keyboard navigations
    document.addEventListener('keydown', (e) => {
        if (!DOM.lightbox.classList.contains('active')) return;
        
        if (e.key === 'Escape') closeLightbox();
        if (e.key === 'ArrowLeft') showPrevLightbox();
        if (e.key === 'ArrowRight') showNextLightbox();
    });
}

function openLightbox(index) {
    STATE.activeLightboxIndex = index;
    updateLightboxContent();
    DOM.lightbox.classList.add('active');
}

function closeLightbox() {
    DOM.lightbox.classList.remove('active');
}

function showPrevLightbox() {
    STATE.activeLightboxIndex = (STATE.activeLightboxIndex - 1 + PHOTOS.length) % PHOTOS.length;
    updateLightboxContent();
}

function showNextLightbox() {
    STATE.activeLightboxIndex = (STATE.activeLightboxIndex + 1) % PHOTOS.length;
    updateLightboxContent();
}

function updateLightboxContent() {
    const photo = PHOTOS[STATE.activeLightboxIndex];
    DOM.lightboxImgWrapper.innerHTML = `<img src="${photo.src}" alt="Memory ${STATE.activeLightboxIndex + 1}">`;
    DOM.lightboxCaption.textContent = '';

    // Placeholder inside lightbox if file missing
    const lightboxImg = DOM.lightboxImgWrapper.querySelector('img');
    lightboxImg.onerror = function() {
        DOM.lightboxImgWrapper.innerHTML = `
            <div class="polaroid-placeholder-svg" style="height: 300px; width: 400px; border-radius: 8px;">
                <svg viewBox="0 0 24 24" width="40" height="40" fill="currentColor">
                    <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
                </svg>
            </div>
        `;
    };
}

/* ==========================================
   14. SCENE 06: ENVELOPE & LETTER
========================================== */
function initEnvelope() {
    DOM.btnOpenEnvelope.addEventListener('click', toggleEnvelope);
    DOM.btnLetterNext.addEventListener('click', () => {
        // Hide overlay before going to next scene
        const overlay = document.getElementById('letter-overlay');
        if (overlay) overlay.classList.remove('active');
        changeScene(7);
    });

    // Create the overlay element
    const overlay = document.createElement('div');
    overlay.id = 'letter-overlay';
    overlay.classList.add('letter-overlay');
    // Click overlay to close letter (optional UX)
    overlay.addEventListener('click', () => {
        DOM.envelopeContainer.classList.remove('open');
        overlay.classList.remove('active');
        DOM.btnOpenEnvelope.classList.remove('d-none');
        DOM.btnLetterNext.classList.add('d-none');
    });
    const sceneLetter = document.getElementById('scene-letter');
    if (sceneLetter) sceneLetter.appendChild(overlay);
}

function toggleEnvelope() {
    if (!DOM.envelopeContainer.classList.contains('open')) {
        DOM.envelopeContainer.classList.add('open');
        DOM.btnOpenEnvelope.classList.add('d-none');

        // Show dark overlay behind letter
        const overlay = document.getElementById('letter-overlay');
        if (overlay) overlay.classList.add('active');
        
        // Display next button after envelope open completes
        setTimeout(() => {
            DOM.btnLetterNext.classList.remove('d-none');
        }, 1200);
    }
}

/* ==========================================
   15. SCENE 07: FINAL SURPRISE & CLIMAX
========================================== */
function triggerFinalClimax() {
    // Spawn floating photo strips on left and right
    spawnFinalPhotoStrips();

    // Reveal message lines sequentially
    const lines = DOM.finalFadingTextBox.querySelectorAll('.final-fade-line');
    
    lines.forEach((line, idx) => {
        setTimeout(() => {
            line.classList.add('visible');
        }, (idx * 1800) + 800);
    });

    const climaxDelay = (lines.length * 1800) + 1800;

    // Reveal climax pulsing large heart
    setTimeout(() => {
        DOM.finalClimaxHeart.classList.add('visible');

        // Check if confetti is loaded
        if (typeof confetti !== 'undefined') {
            // Initial massive burst
            confetti({
                particleCount: 200,
                spread: 120,
                origin: { y: 0.6 },
                colors: ['#ff477e', '#7209b7', '#fcf8f2', '#ff9f1c', '#c77dff'],
                zIndex: 9999
            });

            // Sustained double-sided rain for 8 seconds
            const end = Date.now() + (8 * 1000);
            (function frame() {
                confetti({
                    particleCount: 5,
                    angle: 55,
                    spread: 70,
                    origin: { x: 0, y: 0.8 },
                    colors: ['#ff477e', '#7209b7', '#fcf8f2'],
                    zIndex: 9999
                });
                confetti({
                    particleCount: 5,
                    angle: 125,
                    spread: 70,
                    origin: { x: 1, y: 0.8 },
                    colors: ['#ff477e', '#7209b7', '#c77dff'],
                    zIndex: 9999
                });
                if (Date.now() < end) requestAnimationFrame(frame);
            }());
        }

        // Rising mini hearts from the heart element
        spawnFinalHearts();

    }, climaxDelay);
}

function spawnFinalHearts() {
    const container = DOM.finalClimaxHeart.parentElement;
    const heartRect = DOM.finalClimaxHeart.getBoundingClientRect();
    const containerRect = container.getBoundingClientRect();

    const cx = heartRect.left - containerRect.left + heartRect.width / 2;
    const cy = heartRect.top - containerRect.top + heartRect.height / 2;

    const sizes = [14, 18, 10, 22, 12, 16];

    // Spawn 30 mini hearts in bursts
    for (let i = 0; i < 30; i++) {
        setTimeout(() => {
            const h = document.createElement('div');
            h.classList.add('final-mini-heart');

            const size = sizes[Math.floor(Math.random() * sizes.length)];
            const offsetX = (Math.random() - 0.5) * 300;
            const duration = 1.2 + Math.random() * 1.5;

            h.style.left = (cx + offsetX) + 'px';
            h.style.top = cy + 'px';
            h.style.animationDuration = duration + 's';
            h.style.transform = `translateX(${offsetX}px)`;
            h.innerHTML = `<svg viewBox="0 0 24 24" width="${size}" height="${size}"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" fill="currentColor"/></svg>`;
            container.style.position = 'relative';
            container.appendChild(h);

            // Remove after animation
            setTimeout(() => h.remove(), duration * 1000 + 200);
        }, i * 120);
    }

    // Keep spawning more hearts every 3s
    const heartInterval = setInterval(() => {
        for (let i = 0; i < 10; i++) {
            setTimeout(() => {
                const h = document.createElement('div');
                h.classList.add('final-mini-heart');
                const size = sizes[Math.floor(Math.random() * sizes.length)];
                const offsetX = (Math.random() - 0.5) * 360;
                const duration = 1.5 + Math.random() * 1.5;
                h.style.left = (cx + offsetX) + 'px';
                h.style.top = cy + 'px';
                h.style.animationDuration = duration + 's';
                h.innerHTML = `<svg viewBox="0 0 24 24" width="${size}" height="${size}"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" fill="currentColor"/></svg>`;
                container.appendChild(h);
                setTimeout(() => h.remove(), duration * 1000 + 200);
            }, i * 100);
        }
    }, 3000);

    // Stop after 30 seconds
    setTimeout(() => clearInterval(heartInterval), 30000);
}

function spawnFinalPhotoStrips() {
    const finalSection = document.getElementById('scene-final');
    if (!finalSection) return;

    // Remove old strips if replaying
    finalSection.querySelectorAll('.final-photo-strip').forEach(el => el.remove());

    const leftStrip = document.createElement('div');
    leftStrip.classList.add('final-photo-strip', 'strip-left');

    const rightStrip = document.createElement('div');
    rightStrip.classList.add('final-photo-strip', 'strip-right');

    // Left strip: photos 0-5, Right strip: photos 6-11
    const leftPhotos = PHOTOS.slice(0, 6);
    const rightPhotos = PHOTOS.slice(6, 12);

    leftPhotos.forEach((photo, i) => {
        const img = document.createElement('img');
        img.src = photo.src;
        img.alt = `Memory ${i + 1}`;
        img.classList.add('final-strip-img');
        img.style.animationDelay = `${i * 0.15}s`;
        leftStrip.appendChild(img);
    });

    rightPhotos.forEach((photo, i) => {
        const img = document.createElement('img');
        img.src = photo.src;
        img.alt = `Memory ${i + 7}`;
        img.classList.add('final-strip-img');
        img.style.animationDelay = `${i * 0.15}s`;
        rightStrip.appendChild(img);
    });

    finalSection.appendChild(leftStrip);
    finalSection.appendChild(rightStrip);

    // Animate in after a short delay
    setTimeout(() => {
        leftStrip.classList.add('visible');
        rightStrip.classList.add('visible');
    }, 400);
}

// Replay Surprise configuration
DOM.btnReplaySurprise.addEventListener('click', () => {
    // Reset state values
    STATE.pinDigits = [];
    STATE.isCandleBlown = false;
    
    // Reset layout elements
    DOM.candleFlame.style.display = 'block';
    DOM.candleFlameInner.style.display = 'block';
    DOM.cakeGlow.style.opacity = '0.7';
    DOM.smoke1.classList.remove('extinguished');
    DOM.smoke2.classList.remove('extinguished');
    DOM.blowInstruction.textContent = "Blow the candle, or click/tap it!";
    DOM.wishSuccessMsg.classList.remove('visible');
    DOM.btnCakeNext.classList.add('d-none');
    
    DOM.envelopeContainer.classList.remove('open');
    DOM.btnOpenEnvelope.classList.remove('d-none');
    DOM.btnLetterNext.classList.add('d-none');
    
    const lines = DOM.finalFadingTextBox.querySelectorAll('.final-fade-line');
    lines.forEach(line => line.classList.remove('visible'));
    DOM.finalClimaxHeart.classList.remove('visible');

    // Return to PIN Scene
    changeScene(0);
    clearPin();
});

/* ==========================================
   16. PERSISTENT MUSIC CONTROLLER
========================================== */
function initAudioPlayer() {
    const audio = DOM.bgAudio;

    // Try to load local file first; fall back to a streaming CDN version
    audio.src = CONFIG.music.src;
    
    DOM.trackTitle.textContent = CONFIG.music.title;
    DOM.trackArtist.textContent = CONFIG.music.artist;

    DOM.btnPlayPause.addEventListener('click', toggleMusic);
    DOM.btnMute.addEventListener('click', toggleMute);
    DOM.volumeSlider.addEventListener('input', changeVolume);
    DOM.bgAudio.volume = 0.5;

    audio.addEventListener('timeupdate', () => {
        const percent = (audio.currentTime / audio.duration) * 100;
        DOM.progressBar.style.width = percent + '%';
    });

    // Graceful fallback if mp3 not found
    audio.addEventListener('error', () => {
        // Try a free romantic royalty-free fallback track
        if (!audio.dataset.triedFallback) {
            audio.dataset.triedFallback = '1';
            audio.src = 'https://cdn.pixabay.com/audio/2023/09/24/audio_e3efb9b870.mp3';
            DOM.trackTitle.textContent = '♫ Romantic Melody';
            DOM.trackArtist.textContent = 'Background Music';
            audio.load();
            audio.play().catch(() => {
                showToast('Letakkan lagu di: assets/music/our-song.mp3 ♫');
            });
        } else {
            showToast('Letakkan lagu di: assets/music/our-song.mp3 ♫');
        }
    });
}

function playMusic() {
    const audio = DOM.bgAudio;
    
    audio.play().then(() => {
        STATE.musicPlayed = true;
        DOM.audioPlayer.classList.add('visible');
        DOM.audioPlayer.classList.add('playing');
        
        // Swap play to pause icon
        DOM.btnPlayPause.querySelector('.icon-play').classList.add('d-none');
        DOM.btnPlayPause.querySelector('.icon-pause').classList.remove('d-none');
    }).catch(err => {
        // Autoplay blocked by browser rules
        console.log("Autoplay blocked, waiting for user play gesture.");
        DOM.audioPlayer.classList.add('visible');
    });
}

function toggleMusic() {
    const audio = DOM.bgAudio;
    if (audio.paused) {
        audio.play();
        DOM.audioPlayer.classList.add('playing');
        DOM.btnPlayPause.querySelector('.icon-play').classList.add('d-none');
        DOM.btnPlayPause.querySelector('.icon-pause').classList.remove('d-none');
    } else {
        audio.pause();
        DOM.audioPlayer.classList.remove('playing');
        DOM.btnPlayPause.querySelector('.icon-play').classList.remove('d-none');
        DOM.btnPlayPause.querySelector('.icon-pause').classList.add('d-none');
    }
}

function toggleMute() {
    const audio = DOM.bgAudio;
    audio.muted = !audio.muted;
    if (audio.muted) {
        DOM.volumeSlider.value = 0;
    } else {
        DOM.volumeSlider.value = audio.volume;
    }
}

function changeVolume(e) {
    const vol = e.target.value;
    DOM.bgAudio.volume = vol;
    DOM.bgAudio.muted = (vol == 0);
}

/* ==========================================
   17. SYSTEM EASTER EGGS
========================================== */
function initEasterEggs() {
    const eggCoordinates = [
        { top: '80%', left: '8%' },
        { top: '15%', left: '88%' },
        { top: '90%', left: '92%' }
    ];

    eggCoordinates.forEach((coord, index) => {
        const heartEgg = document.createElement('div');
        heartEgg.classList.add('easter-egg-heart');
        heartEgg.style.top = coord.top;
        heartEgg.style.left = coord.left;
        
        heartEgg.innerHTML = `
            <svg viewBox="0 0 24 24" width="16" height="16">
                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" fill="currentColor"/>
            </svg>
        `;

        heartEgg.addEventListener('click', () => {
            heartEgg.style.display = 'none';
            STATE.heartsFound++;
            
            showToast(`You found a little piece of my heart. ❤️ (${STATE.heartsFound}/3)`);
        });

        document.body.appendChild(heartEgg);
    });
}

/* ==========================================
   21. AMBIENT PARALLAX SYSTEM
========================================== */
function initParallax() {
    const glows = document.querySelectorAll('.bg-glow');
    const hearts = document.querySelectorAll('.easter-egg-heart');
    const bgHearts = document.querySelector('.bg-floating-hearts');

    // Check if on mobile to disable heavy parallax
    const isMobile = window.matchMedia("(max-width: 768px)").matches;
    if (isMobile) return;

    document.addEventListener('mousemove', (e) => {
        const mouseX = (e.clientX / window.innerWidth - 0.5) * 60; // Max movement 30px
        const mouseY = (e.clientY / window.innerHeight - 0.5) * 60;

        // Shift glowing shapes
        glows.forEach((glow, idx) => {
            const factor = (idx + 1) * 0.15;
            gsap.to(glow, {
                x: mouseX * factor * 10,
                y: mouseY * factor * 10,
                duration: 1.5,
                ease: 'power2.out'
            });
        });

        if (bgHearts) {
            gsap.to(bgHearts, {
                x: mouseX * -2,
                y: mouseY * -2,
                duration: 2,
                ease: 'power1.out'
            });
        }

        // Shift easter eggs slightly
        hearts.forEach(heart => {
            gsap.to(heart, {
                x: mouseX * 0.25,
                y: mouseY * 0.25,
                duration: 1,
                ease: 'power1.out'
            });
        });
    });
}

/* ==========================================
   19. SYSTEM TOAST SYSTEM
========================================== */
function showToast(message) {
    const toast = document.createElement('div');
    toast.classList.add('toast');
    toast.textContent = message;
    
    DOM.toastContainer.appendChild(toast);
    
    // Force reflow
    toast.offsetHeight;
    
    toast.classList.add('show');
    
    setTimeout(() => {
        toast.classList.remove('show');
        setTimeout(() => {
            toast.remove();
        }, 300);
    }, 3500);
}
