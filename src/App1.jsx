import { Box, Button, Container, createTheme, CssBaseline, Fab, GlobalStyles, Grid, Paper, TextField, ThemeProvider, Typography } from '@mui/material';
import { useEffect, useMemo, useRef, useState } from 'react';

// --- SVG Icons ---
const BowIcon = () => (
    <svg viewBox="0 0 100 100" className="w-full h-full" fill="#ff8fab" stroke="#c51162" strokeWidth="3">
        <path d="M50 40 C 20 10, 20 70, 50 60 C 80 70, 80 10, 50 40 Z" />
        <path d="M50 60 L 30 90 L 50 70 L 70 90 Z" />
        <circle cx="50" cy="55" r="8" fill="#c51162" />
    </svg>
);

const HeartIcon = () => (
    <svg viewBox="0 0 24 24" className="w-full h-full" fill="#ff80ab">
        <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
    </svg>
);

const GiftIcon = ({ onClick }) => (
    <Box onClick={onClick} sx={{ cursor: 'pointer', width: 96, height: 96, mx: 'auto', transition: 'transform 0.3s', '&:hover': { transform: 'scale(1.1)' } }}>
        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 5.5V21M12 5.5C10.6063 5.5 9.80942 4.33579 9.5 3.5C9.19058 2.66421 8.5 1 6.5 1C4.5 1 4 3 4 3M12 5.5C13.3937 5.5 14.1906 4.33579 14.5 3.5C14.8094 2.66421 15.5 1 17.5 1C19.5 1 20 3 20 3" stroke="#d81b60" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M3 9H21" stroke="#d81b60" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M19 21H5C3.89543 21 3 20.1046 3 19V10C3 9.44772 3.44772 9 4 9H20C20.5523 9 21 9.44772 21 10V19C21 20.1046 20.1046 21 19 21Z" stroke="#f06292" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
    </Box>
);

const StarIcon = () => (
    <svg viewBox="0 0 24 24" className="w-full h-full" fill="#FFD700" stroke="#F9A825" strokeWidth="0.5">
        <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
    </svg>
);

const JarIcon = ({ onClick, sx }) => (
    <Box onClick={onClick} sx={{ cursor: 'pointer', width: 112, height: 112, mx: 'auto', transition: 'transform 0.3s', '&:hover': { transform: 'scale(1.1)' }, ...sx }}>
        <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M30 15 H 70 V 25 H 30 Z" fill="#c5cae9"/>
            <path d="M35 25 H 65 V 35 H 35 Z" fill="#9fa8da"/>
            <path d="M25 35 C 25 40, 20 40, 20 45 L 20 85 C 20 95, 30 95, 30 95 L 70 95 C 70 95, 80 95, 80 85 L 80 45 C 80 40, 75 40, 75 35 Z" fill="rgba(232, 234, 246, 0.7)" stroke="#5c6bc0" strokeWidth="3"/>
        </svg>
    </Box>
);

const EnvelopeIcon = () => (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" width="128" height="128">
        <path d="M4 7.00005L10.2 11.65C11.2667 12.45 12.7333 12.45 13.8 11.65L20 7" stroke="#e91e63" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <rect x="2" y="5" width="20" height="14" rx="2" stroke="#f48fb1" strokeWidth="2" strokeLinecap="round"/>
    </svg>
);

const FlowerIcon = () => (
    <svg viewBox="0 0 100 100" fill="#ff8fab" stroke="#c51162" strokeWidth="2">
        <circle cx="50" cy="50" r="15" />
        <circle cx="50" cy="25" r="12" />
        <circle cx="50" cy="75" r="12" />
        <circle cx="25" cy="50" r="12" />
        <circle cx="75" cy="50" r="12" />
        <circle cx="35" cy="35" r="12" />
        <circle cx="65" cy="65" r="12" />
        <circle cx="35" cy="65" r="12" />
        <circle cx="65" cy="35" r="12" />
    </svg>
);

const MusicOnIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="white"><path d="M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z"/></svg>
);

const MusicOffIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="white"><path d="M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6zm-2 16c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2z"/></svg>
);


// --- Animation Keyframes (Global Styles) ---
const animationStyles = `
    .falling-item { position: absolute; width: 25px; height: 25px; opacity: 0.8; animation: fall 10s infinite linear; }
    @keyframes fall { 0% { transform: translateY(-10vh) rotate(0deg); } 100% { transform: translateY(110vh) rotate(360deg); } }
    
    .confetti-piece { position: absolute; width: 8px; height: 16px; opacity: 0.9; }
    @keyframes confetti-fall { 0% { transform: translateY(0) rotate(0); } 100% { transform: translateY(110vh) rotate(720deg); } }

    @keyframes fade-in-up { 0% { opacity: 0; transform: translateY(20px); } 100% { opacity: 1; transform: translateY(0); } }
    @keyframes pulse-slow { 0%, 100% { transform: scale(1); } 50% { transform: scale(1.03); } }
    @keyframes pulse-strong { 0%, 100% { transform: scale(1); } 50% { transform: scale(1.05); } }
    @keyframes fade-in-scale { 0% { opacity: 0; transform: scale(0.95); } 100% { opacity: 1; transform: scale(1); } }
    @keyframes wiggle { 0%, 100% { transform: rotate(0); } 25% { transform: rotate(-3deg); } 75% { transform: rotate(3deg); } }
    @keyframes fade-in-late { 0% { opacity: 0; } 100% { opacity: 1; } animation: fade-in 1s 0.5s ease-in forwards; }

    .star-animation-1, .star-animation-2, .star-animation-3, .star-animation-4, .star-animation-5 { animation-duration: 1.5s; animation-timing-function: ease-out; animation-fill-mode: forwards; opacity: 0; }
    .star-animation-1 { animation-name: fly-out-1; animation-delay: 0.1s; }
    .star-animation-2 { animation-name: fly-out-2; animation-delay: 0.2s; }
    .star-animation-3 { animation-name: fly-out-3; animation-delay: 0.3s; }
    .star-animation-4 { animation-name: fly-out-4; animation-delay: 0.15s; }
    .star-animation-5 { animation-name: fly-out-5; animation-delay: 0.25s; }

    @keyframes fly-out-1 { 0% { transform: translate(0, 0) scale(0.3); opacity: 1; } 100% { transform: translate(-80px, -100px) scale(1) rotate(90deg); opacity: 0; } }
    @keyframes fly-out-2 { 0% { transform: translate(0, 0) scale(0.3); opacity: 1; } 100% { transform: translate(80px, -120px) scale(1) rotate(180deg); opacity: 0; } }
    @keyframes fly-out-3 { 0% { transform: translate(0, 0) scale(0.3); opacity: 1; } 100% { transform: translate(0, -150px) scale(1.2) rotate(-90deg); opacity: 0; } }
    @keyframes fly-out-4 { 0% { transform: translate(0, 0) scale(0.3); opacity: 1; } 100% { transform: translate(-120px, -60px) scale(1) rotate(45deg); opacity: 0; } }
    @keyframes fly-out-5 { 0% { transform: translate(0, 0) scale(0.3); opacity: 1; } 100% { transform: translate(100px, -50px) scale(1) rotate(-45deg); opacity: 0; } }
    
    @keyframes float-in { 0% { opacity: 0; transform: translateY(30px) scale(0.9); } 100% { opacity: 1; transform: translateY(0) scale(1); } }
    @keyframes pulse-gentle { 0%, 100% { transform: scale(1); } 50% { transform: scale(1.05); } }

    .burst-item { position: absolute; top: 50%; left: 50%; width: 30px; height: 30px; animation-duration: 1.2s; animation-timing-function: ease-out; animation-fill-mode: forwards; }
    .burst-1 { animation-name: burst-1; } .burst-2 { animation-name: burst-2; } .burst-3 { animation-name: burst-3; } .burst-4 { animation-name: burst-4; } .burst-5 { animation-name: burst-5; } .burst-6 { animation-name: burst-6; } .burst-7 { animation-name: burst-7; } .burst-8 { animation-name: burst-8; } .burst-9 { animation-name: burst-9; } .burst-10 { animation-name: burst-10; } .burst-11 { animation-name: burst-11; } .burst-12 { animation-name: burst-12; }
    @keyframes burst-1 { 0% { transform: translate(-50%, -50%) rotate(0) scale(0.5); opacity: 1; } 100% { transform: translate(-50vw, -50vh) rotate(180deg) scale(1); opacity: 0; } }
    @keyframes burst-2 { 0% { transform: translate(-50%, -50%) rotate(0) scale(0.5); opacity: 1; } 100% { transform: translate(50vw, 50vh) rotate(180deg) scale(1); opacity: 0; } }
    @keyframes burst-3 { 0% { transform: translate(-50%, -50%) rotate(0) scale(0.5); opacity: 1; } 100% { transform: translate(-50vw, 50vh) rotate(180deg) scale(1); opacity: 0; } }
    @keyframes burst-4 { 0% { transform: translate(-50%, -50%) rotate(0) scale(0.5); opacity: 1; } 100% { transform: translate(50vw, -50vh) rotate(180deg) scale(1); opacity: 0; } }
    @keyframes burst-5 { 0% { transform: translate(-50%, -50%) rotate(0) scale(0.5); opacity: 1; } 100% { transform: translate(0, -50vh) rotate(180deg) scale(1); opacity: 0; } }
    @keyframes burst-6 { 0% { transform: translate(-50%, -50%) rotate(0) scale(0.5); opacity: 1; } 100% { transform: translate(0, 50vh) rotate(180deg) scale(1); opacity: 0; } }
    @keyframes burst-7 { 0% { transform: translate(-50%, -50%) rotate(0) scale(0.5); opacity: 1; } 100% { transform: translate(-50vw, 0) rotate(180deg) scale(1); opacity: 0; } }
    @keyframes burst-8 { 0% { transform: translate(-50%, -50%) rotate(0) scale(0.5); opacity: 1; } 100% { transform: translate(50vw, 0) rotate(180deg) scale(1); opacity: 0; } }
    @keyframes burst-9 { 0% { transform: translate(-50%, -50%) rotate(0) scale(0.5); opacity: 1; } 100% { transform: translate(-30vw, -40vh) rotate(180deg) scale(1); opacity: 0; } }
    @keyframes burst-10 { 0% { transform: translate(-50%, -50%) rotate(0) scale(0.5); opacity: 1; } 100% { transform: translate(40vw, 30vh) rotate(180deg) scale(1); opacity: 0; } }
    @keyframes burst-11 { 0% { transform: translate(-50%, -50%) rotate(0) scale(0.5); opacity: 1; } 100% { transform: translate(-40vw, 30vh) rotate(180deg) scale(1); opacity: 0; } }
    @keyframes burst-12 { 0% { transform: translate(-50%, -50%) rotate(0) scale(0.5); opacity: 1; } 100% { transform: translate(30vw, -40vh) rotate(180deg) scale(1); opacity: 0; } }
`;

// --- Components ---

const FallingAnimation = () => {
    const items = useMemo(() => {
        const generatedItems = [];
        for (let i = 0; i < 30; i++) {
            const style = {
                left: `${Math.random() * 100}vw`,
                animationDuration: `${Math.random() * 5 + 7}s`,
                animationDelay: `${Math.random() * 10}s`,
                transform: `scale(${Math.random() * 0.6 + 0.4})`,
            };
            const isHeart = Math.random() > 0.5;
            generatedItems.push({ id: i, isHeart, style });
        }
        return generatedItems;
    }, []);

    return (
        <Box sx={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', pointerEvents: 'none', zIndex: 0 }}>
            {items.map(item => (
                <Box key={item.id} className="falling-item" sx={item.style}>
                    {item.isHeart ? <HeartIcon /> : <BowIcon />}
                </Box>
            ))}
        </Box>
    );
};

const Confetti = () => {
    const confettiPieces = useMemo(() => {
        const pieces = [];
        const colors = ['#f44336', '#e91e63', '#9c27b0', '#673ab7', '#3f51b5', '#2196f3', '#03a9f4', '#00bcd4', '#009688', '#4caf50', '#8bc34a', '#cddc39', '#ffeb3b', '#ffc107', '#ff9800', '#ff5722'];
        for (let i = 0; i < 100; i++) {
            pieces.push({
                id: i,
                style: {
                    left: `${Math.random() * 100}vw`,
                    top: `${-20 - Math.random() * 100}px`,
                    backgroundColor: colors[Math.floor(Math.random() * colors.length)],
                    transform: `rotate(${Math.random() * 360}deg)`,
                    animation: `confetti-fall ${Math.random() * 3 + 2}s linear ${Math.random() * 2}s forwards`,
                }
            });
        }
        return pieces;
    }, []);

    return (
        <Box sx={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', pointerEvents: 'none', zIndex: 50 }}>
            {confettiPieces.map(piece => <Box key={piece.id} className="confetti-piece" sx={piece.style} />)}
        </Box>
    );
};

const Countdown = ({ timeLeft, isBirthday }) => {
    const formatTime = (time) => time.toString().padStart(2, '0');

    if (isBirthday) {
        return (
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', mb: 5 }}>
                <Confetti />
                <Typography variant="h3" component="div" sx={{ fontFamily: 'Playfair Display', fontWeight: 700, color: 'primary.main', animation: 'pulse-strong 2s infinite' }}>
                    Happy Birthday!
                </Typography>
            </Box>
        );
    }

    return (
        <Grid container spacing={{ xs: 1, sm: 2 }} mb={5} justifyContent="center">
            <Grid item xs={12} sx={{ textAlign: 'center', mb: 2 }}>
            </Grid>
            {Object.entries(timeLeft).map(([unit, value]) => (
                <Grid item xs={6} sm={3} key={unit} sx={{ textAlign: 'center' }}>
                    <Paper elevation={3} sx={{ p: { xs: 1, sm: 2 }, backgroundColor: 'rgba(252, 228, 236, 0.7)' }}>
                        <Typography variant="h3" sx={{ fontWeight: 700, color: 'primary.main', fontSize: { xs: '2rem', sm: '3rem' } }}>
                            {formatTime(value)}
                        </Typography>
                        <Typography variant="overline" sx={{ color: 'text.secondary', textTransform: 'capitalize' }}>
                            {unit}
                        </Typography>
                    </Paper>
                </Grid>
            ))}
        </Grid>
    );
};

const Carousel = ({ images }) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const carouselRef = useRef(null);
    const [translateZ, setTranslateZ] = useState(250);

    useEffect(() => {
        const calculateTranslateZ = () => {
            if (carouselRef.current) {
                const width = carouselRef.current.clientWidth * 0.8; // 80% width of the image
                const newTranslateZ = (width / 2) / Math.tan(Math.PI / images.length);
                setTranslateZ(newTranslateZ);
            }
        };

        calculateTranslateZ();
        window.addEventListener('resize', calculateTranslateZ);
        return () => window.removeEventListener('resize', calculateTranslateZ);
    }, [images.length]);


    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex((prevIndex) => prevIndex + 1);
        }, 4000);
        return () => clearInterval(interval);
    }, []);

    const angle = 360 / images.length;
    const rotateY = currentIndex * -angle;

    return (
        <Box mb={5}>
            <Typography variant="h4" sx={{ fontFamily: 'Playfair Display', fontWeight: 700, color: 'primary.main', mb: 5, textAlign: 'center' }}  >
                Some Memories
            </Typography>
            <Box
                
                ref={carouselRef}
                sx={{
                    position: 'relative',
                    maxWidth: 500,
                    mx: 'auto',
                    height: { xs: 200, sm: 320 },
                    perspective: '1000px',
                }}
            >
                <Box
                    sx={{
                        width: '97%',
                        height: '90%',
                        marginTop:"10px",
                        position: 'absolute',
                        transformStyle: 'preserve-3d',
                        transition: 'transform 1s ease-in-out',
                        transform: `rotateY(${rotateY}deg)`,
                    }}
                >
                    {images.map((image, index) => {
                        const itemRotateY = index * angle;

                        return (
                            <Paper
                                key={index}
                                elevation={4}
                                sx={{
                                    position: 'absolute',
                                    top: '10%',
                                    left: '10%',
                                    width: '80%',
                                    height: '80%',
                                    transform: `rotateY(${itemRotateY}deg) translateZ(${translateZ}px)`,
                                    borderRadius: 4,
                                    overflow: 'hidden',
                                    backfaceVisibility: 'hidden',
                                }}
                            >
                                <Box
                                    component="img"
                                    src={image.src}
                                    alt={image.alt}
                                    sx={{
                                        width: '100%',
                                        height: '100%',
                                        objectFit: 'cover',
                                        objectPosition: 'center',
                                    }}
                                    onError={(e) => { e.target.onerror = null; e.target.src = 'https://placehold.co/600x400/f8bbd0/333?text=Image+Error'; }}
                                />
                            </Paper>
                        );
                    })}
                </Box>
            </Box>
        </Box>
    );
};

const LoveReasons = () => {
    const reasons = useMemo(() => [
        "How we can laugh for hours about literally nothing.",
        "For always being my partner-in-crime for late-night adventures.",
        "Your ability to give the absolute best advice.",
        "That you know what I'm thinking with just one look.",
        "How you're always honest, especially when I need to hear it.",
        "That you share my weird obsession with [a show/hobby].", // TODO: Personalize this!
        "Knowing you'll always be in my corner, no matter what."
    ], []);

    const [reason, setReason] = useState(reasons[0]);
    const [animationKey, setAnimationKey] = useState(0);

    const showNewReason = () => {
        let newReason;
        do { newReason = reasons[Math.floor(Math.random() * reasons.length)]; } while (newReason === reason);
        setReason(newReason);
        setAnimationKey(prevKey => prevKey + 1);
    };

    return (
        <Paper elevation={2} sx={{ p: 3, mb: 5, backgroundColor: 'rgba(255, 255, 255, 0.9)', textAlign: 'center' }}>
            <Typography variant="h4" sx={{ fontFamily: 'Playfair Display', fontWeight: 700, color: 'primary.main', mb: 2 }}>
                A Few Reasons You're the Best!
            </Typography>
            <Typography key={animationKey} variant="h6" sx={{ fontStyle: 'italic', color: 'text.secondary', minHeight: 64, display: 'flex', alignItems: 'center', justifyContent: 'center', animation: 'fade-in-scale 0.5s ease-out forwards' }}>
                "{reason}"
            </Typography>
            <Button
                onClick={showNewReason}
                variant="contained"
                sx={{ mt: 2, borderRadius: '50px', px: 3, transition: 'transform 0.3s', '&:hover': { transform: 'scale(1.05)' } }}
            >
                Tell Me Another
            </Button>
        </Paper>
    );
};

const GiftBox = ({ isBirthday }) => {
    const [isOpen, setIsOpen] = useState(false);

    const handleOpen = () => { if (!isOpen) { setIsOpen(true); } };
    
    useEffect(() => {
        if (isOpen) {
            const timer = setTimeout(() => setIsOpen(false), 5000);
            return () => clearTimeout(timer);
        }
    }, [isOpen]);

    return (
        <Box textAlign="center">
            <Typography variant="h4" sx={{ fontFamily: 'Playfair Display', fontWeight: 700, color: 'primary.main', mb: 2 }}>
                A Little Surprise for You
            </Typography>
            <Box sx={{ position: 'relative', width: 192, height: 192, mx: 'auto' }}>
                <Box sx={{ transition: 'all 0.7s ease-out', opacity: isOpen ? 0 : 1, transform: isOpen ? 'translateY(-32px)' : 'translateY(0)' }}>
                    <GiftIcon onClick={handleOpen} />
                    <Typography variant="body2" sx={{ color: 'text.secondary', mt: 1 }}>Click me!</Typography>
                </Box>
                <Paper elevation={4} sx={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', p: 2, backgroundColor: 'rgba(252, 228, 236, 0.8)', borderRadius: 2, transition: 'all 0.7s ease-out', opacity: isOpen ? 1 : 0, transform: isOpen ? 'scale(1)' : 'scale(0.5)' }}>
                    <Typography sx={{ fontWeight: 'bold', color: 'primary.dark' }}>
                        {isBirthday 
                            ? "Wishing you a day as awesome as you are! Happy Birthday, bestie! 🎉"
                            : "Just a little something to make you smile while we wait for your special day!"
                        }
                    </Typography>
                </Paper>
            </Box>
        </Box>
    );
};

const WishJar = () => {
    const [isWished, setIsWished] = useState(false);

    const handleWish = () => { if (!isWished) { setIsWished(true); } };

    useEffect(() => {
        if (isWished) {
            const timer = setTimeout(() => setIsWished(false), 4000);
            return () => clearTimeout(timer);
        }
    }, [isWished]);

    const starBurst = useMemo(() => [
        { id: 1, className: 'star-animation-1' }, { id: 2, className: 'star-animation-2' }, { id: 3, className: 'star-animation-3' }, { id: 4, className: 'star-animation-4' }, { id: 5, className: 'star-animation-5' },
    ], []);

    return (
        <Box mt={5} pt={5} sx={{ borderTop: '2px dashed #f8bbd0', textAlign: 'center' }}>
            <Typography variant="h4" sx={{ fontFamily: 'Playfair Display', fontWeight: 700, color: 'primary.main', mb: 2 }}>
                Make a Birthday Wish
            </Typography>
            <Box sx={{ position: 'relative', width: 192, height: 192, mx: 'auto' }}>
                <JarIcon onClick={handleWish} sx={{ animation: isWished ? 'wiggle 0.5s ease-in-out' : 'none' }} />
                <Typography variant="body2" sx={{ color: 'text.secondary', mt: 1, transition: 'opacity 0.5s', opacity: isWished ? 0 : 1 }}>
                    Click the jar!
                </Typography>
                
                {isWished && (
                    <Box sx={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}>
                        {starBurst.map(star => (
                            <Box key={star.id} sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translateX(-50%)', width: 24, height: 24 }} className={star.className}>
                                <StarIcon />
                            </Box>
                        ))}
                         <Typography sx={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#303f9f', fontWeight: 'bold', animation: 'fade-in-late 1s 0.5s ease-in forwards', opacity: 0 }}>
                            Wish for an amazing year made! ✨
                        </Typography>
                    </Box>
                )}
            </Box>
        </Box>
    );
};

const BurstAnimation = () => {
    const burstItems = useMemo(() => {
        const items = [];
        for (let i = 1; i <= 12; i++) {
            items.push({
                id: i,
                isStar: Math.random() > 0.5,
                className: `burst-${i}`,
            });
        }
        return items;
    }, []);

    return (
        <Box sx={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}>
            {burstItems.map(item => (
                <Box key={item.id} className={`burst-item ${item.className}`}>
                    {item.isStar ? <StarIcon /> : <FlowerIcon />}
                </Box>
            ))}
        </Box>
    );
};

const Letter = ({ onOpen, onStartMusic }) => {
    const [isBursting, setIsBursting] = useState(false);

    const handleClick = () => {
        if (isBursting) return;
        onStartMusic();
        setIsBursting(true);
        setTimeout(onOpen, 1200); // Wait for burst to finish
    };

    return (
        <Box
            onClick={handleClick}
            sx={{
                position: 'relative',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                height: '100vh',
                cursor: 'pointer',
            }}
        >
            {isBursting ? (
                <BurstAnimation />
            ) : (
                <Box sx={{ animation: 'float-in 1s ease-out forwards', textAlign: 'center' }}>
                    <Box sx={{ animation: 'pulse-gentle 2s infinite' }}>
                        <EnvelopeIcon />
                    </Box>
                    <Typography sx={{ mt: 2, color: 'primary.main', fontWeight: 'bold' }}>
                        A special note for you...
                    </Typography>
                    <Typography sx={{ color: 'text.secondary', fontSize: '0.9rem' }}>
                        (Click to open)
                    </Typography>
                </Box>
            )}
        </Box>
    );
};

const PasswordScreen = ({ onSuccess }) => {
    const [password, setPassword] = useState('');
    const [error, setError] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (password === '125103') {
            setError(false);
            onSuccess();
        } else {
            setError(true);
        }
    };

    return (
        <Box
            sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                height: '100vh',
                animation: 'float-in 1s ease-out forwards',
            }}
        >
            <Paper elevation={6} sx={{ p: 4, borderRadius: 4, textAlign: 'center', bgcolor: 'rgba(255, 255, 255, 0.85)' }}>
                <Typography variant="h5" sx={{ fontFamily: 'Playfair Display', color: 'primary.main', mb: 2 }}>
                    A Secret Surprise Awaits...
                </Typography>
                <Typography sx={{ mb: 3, color: 'text.secondary' }}>
                    Please enter the password.
                </Typography>
                <Box component="form" onSubmit={handleSubmit} noValidate>
                    <TextField
                        variant="outlined"
                        type="password"
                        label="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        error={error}
                        helperText={error ? 'Incorrect password' : ''}
                        fullWidth
                    />
                    <Button type="submit" variant="contained" sx={{ mt: 2 }}>
                        Unlock
                    </Button>
                </Box>
            </Paper>
        </Box>
    );
};

const MusicToggle = ({ onToggle, isMuted }) => (
    <Fab
        color="primary"
        onClick={onToggle}
        sx={{ position: 'fixed', bottom: 16, right: 16, zIndex: 100 }}
    >
        {isMuted ? <MusicOffIcon /> : <MusicOnIcon />}
    </Fab>
);


// --- Main App Component ---
export default function App() {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isLetterOpen, setIsLetterOpen] = useState(false);
    const [isPlaying, setIsPlaying] = useState(false);
    const audioRef = useRef(null);

    // --- IMPORTANT ---
    // 1. Get a URL for your audio file (e.g., from Litterbox.catbox.moe)
    // 2. Paste the link below to replace the placeholder.
    const yourMusicUrl = "PASTE_YOUR_MUSIC_LINK_HERE";

    const startMusic = () => {
        if (audioRef.current) {
            audioRef.current.play().catch(error => console.log("Audio play failed:", error));
            setIsPlaying(true);
        }
    };

    const toggleMusic = () => {
        if (audioRef.current) {
            if (isPlaying) {
                audioRef.current.pause();
            } else {
                audioRef.current.play().catch(error => console.log("Audio play failed:", error));
            }
            setIsPlaying(!isPlaying);
        }
    };

    const images = [
        { src: "https://res.cloudinary.com/diap8ejji/image/upload/v1755457750/WhatsApp_Image_2025-08-18_at_12.22.53_AM_c94wjn.jpg", alt: "Her Picture 1" },
        { src: "https://res.cloudinary.com/diap8ejji/image/upload/t_Banner 16:9/v1755457706/WhatsApp_Image_2025-08-18_at_12.26.04_AM_i7lslf.jpg", alt: "Her Picture 2" },
        { src: "https://res.cloudinary.com/diap8ejji/image/upload/t_Banner 16:9/v1755457706/WhatsApp_Image_2025-08-18_at_12.30.00_AM_jga62d.jpg", alt: "Her Picture 3" },
        { src: "https://res.cloudinary.com/diap8ejji/image/upload/v1755458080/WhatsApp_Image_2025-08-18_at_12.30.45_AM_1_coj6mi.jpg", alt: "Her Picture 5" },
        { src: "https://res.cloudinary.com/diap8ejji/image/upload/t_Banner 16:9/v1755457707/WhatsApp_Image_2025-08-18_at_12.25.27_AM_drpjxm.jpg", alt: "Her Picture 4" },
        { src: "https://res.cloudinary.com/diap8ejji/image/upload/t_Banner 16:9/v1755604807/WhatsApp_Image_2025-08-19_at_5.29.05_PM_yiedwr.jpg", alt: "Her Picture 2" },
        { src: "https://res.cloudinary.com/diap8ejji/image/upload/t_Banner 16:9/v1755604839/WhatsApp_Image_2025-08-19_at_5.28.25_PM_nuq7lm.jpg", alt: "Her Picture 3" },
    ];

    const calculateTimeLeft = useMemo(() => () => {
        const now = new Date();
        let targetYear = now.getFullYear();
        if (now.getMonth() > 8 || (now.getMonth() === 8 && now.getDate() > 1)) {
            targetYear++;
        }
        const difference = new Date(`Sep 1, ${targetYear} 00:00:00`) - now;

        let timeLeft = {};
        if (difference > 0) {
            timeLeft = { days: Math.floor(difference / (1000 * 60 * 60 * 24)), hours: Math.floor((difference / (1000 * 60 * 60)) % 24), minutes: Math.floor((difference / 1000 / 60) % 60), seconds: Math.floor((difference / 1000) % 60) };
        }
        return timeLeft;
    }, []);
    
    const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());
    const [isBirthday, setIsBirthday] = useState(Object.keys(calculateTimeLeft()).length === 0);

    useEffect(() => {
        if (isBirthday) return;
        const timer = setTimeout(() => {
            const newTimeLeft = calculateTimeLeft();
            setTimeLeft(newTimeLeft);
            if (Object.keys(newTimeLeft).length === 0) {
                setIsBirthday(true);
            }
        }, 1000);
        return () => clearTimeout(timer);
    }, [timeLeft, isBirthday, calculateTimeLeft]);

    const theme = createTheme({
        palette: {
            primary: { main: '#e91e63' },
        },
        typography: {
            fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
        },
    });

    const renderContent = () => {
        if (!isAuthenticated) {
            return <PasswordScreen onSuccess={() => setIsAuthenticated(true)} />;
        }
        if (!isLetterOpen) {
            return <Letter onOpen={() => setIsLetterOpen(true)} onStartMusic={startMusic} />;
        }
        return (
            <>
                <MusicToggle onToggle={toggleMusic} isMuted={!isPlaying} />
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '100vh', p: { xs: 2, sm: 3 } }}>
                    <Container maxWidth="md">
                        <Paper elevation={6} sx={{ p: { xs: 2, sm: 4, md: 6 }, textAlign: 'center', borderRadius: 4, bgcolor: 'rgba(255, 255, 255, 0.8)', backdropFilter: 'blur(5px)', animation: 'fade-in-up 1s 0.2s ease-out forwards', opacity: 0 }}>
                            <Box component="header" mb={4}>
                                <Typography variant="h2" component="h1" sx={{ fontFamily: 'Playfair Display', fontWeight: 700, color: 'primary.main', animation: 'pulse-slow 4s infinite', fontSize: { xs: '2.5rem', sm: '3.5rem', md: '4rem' } }}>
                                    Can't Wait for Your Birthday!
                                </Typography>
                                <Typography variant="h6" sx={{ color: 'text.secondary', mt: 1 }}>
                                    The countdown to your special day has begun...
                                </Typography>
                            </Box>
                            
                            <Countdown timeLeft={timeLeft} isBirthday={isBirthday} />
                            <Carousel images={images} />
                            <LoveReasons />
                             <Paper elevation={0} sx={{ p: 3, mb: 5, backgroundColor: 'rgba(255, 255, 255, 0.9)', boxShadow: 'inset 0 2px 4px 0 rgb(0 0 0 / 0.05)', textAlign: 'center' }}>
                                <Typography variant="h4" sx={{ fontFamily: 'Playfair Display', fontWeight: 700, color: 'primary.main', mb: 2 }}>
                                    A Message for You
                                </Typography>
                                <Typography variant="body1" sx={{ color: 'text.secondary', lineHeight: 1.7 }}>
                                    {/* TODO: Write your personal, heartfelt message here */}
                                    "Every moment with you is a treasure, and I can't wait to celebrate the amazing person you are. Counting down the seconds until I can wish you the happiest of birthdays in person. You deserve all the love and joy in the world."
                                </Typography>
                            </Paper>
                            <GiftBox isBirthday={isBirthday} />
                            <WishJar />
                        </Paper>
                    </Container>
                </Box>
            </>
        );
    };

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <GlobalStyles styles={animationStyles} />
            <audio ref={audioRef} src={"https://litter.catbox.moe/wg8m48.mp3"} loop />
            <FallingAnimation />
            <Box sx={{ minHeight: '100vh', background: '#fce4ec' }}>
                {renderContent()}
            </Box>
        </ThemeProvider>
    );
}
