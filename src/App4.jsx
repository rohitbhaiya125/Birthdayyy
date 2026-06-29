// rach website
import { useRef, useState } from "react";

// =====================
// CHANGE THESE ONLY
// =====================
const ACCESS_CODE = "125103";

// Paste your direct Littlebox / mp3 / m4a audio link here.
// It must be a direct playable audio URL, not just a webpage link.
const MUSIC_URL = "https://litter.catbox.moe/omhkesp6a2ztd1rt.mp3";

// Put your images inside: public/photos/
// Then update the file names below.
const PHOTO_SLOTS = [
  {
    id: "childhood",
    src: "https://res.cloudinary.com/diap8ejji/image/upload/v1782744148/WhatsApp_Image_2026-06-28_at_11.24.00_PM_vqudrx.jpg",
    title: "The Origin Story",
    badge: "Beginner Cat-Lover Stage",
    note: "Early evidence that greatness was loading...",
  },
  {
    id: "latest",
    src: "https://res.cloudinary.com/diap8ejji/image/upload/v1782744148/WhatsApp_Image_2026-06-29_at_8.03.34_PM_x62r7d.jpg",
    title: "The Expert Era",
    badge: "Certified Cat Whisperer",
    note: "Current status: fully approved by the feline board.",
  },
  {
    id: "luri",
    src: "https://res.cloudinary.com/diap8ejji/image/upload/v1782744148/WhatsApp_Image_2026-06-29_at_8.03.50_PM_b8yytu.jpg",
    title: "Luri",
    badge: "Chief Purr Officer",
    note: "Responsible for emotional supervision and dramatic staring.",
  },
  {
    id: "sete",
    src: "https://res.cloudinary.com/diap8ejji/image/upload/v1782744148/WhatsApp_Image_2026-06-29_at_8.04.16_PM_js5wqm.jpg",
    title: "sete",
    badge: "Head of Naps",
    note: "Senior architect of softness, chaos, and snack strategy.",
  },
];

const CAT_QUOTES = [
  "Luri says: Access granted. This human is under strict feline supervision.",
  "Seti says: We reviewed the evidence. She has passed all cat-lover checks.",
  "Luri says: Five stars. Would request snacks from again.",
  "Seti says: This report is legally binding in cat court.",
];

// =====================
// SVG ICONS
// =====================
const CatHead = ({ className = "" }) => (
  <svg
    className={className}
    viewBox="0 0 128 128"
    fill="none"
    aria-hidden="true"
  >
    <path
      d="M25 53 18.5 22.5c-1.1-5.2 4.7-9.2 9.1-6.2L51 32.5a53 53 0 0 1 26 0l23.4-16.2c4.4-3 10.2 1 9.1 6.2L103 53c8.3 8.1 13 18.7 13 30.2C116 108.8 92.7 122 64 122S12 108.8 12 83.2C12 71.7 16.7 61.1 25 53Z"
      fill="currentColor"
    />
    <path
      d="M35 78c0 5.5 3.5 10 7.8 10s7.8-4.5 7.8-10-3.5-10-7.8-10S35 72.5 35 78ZM77.4 78c0 5.5 3.5 10 7.8 10S93 83.5 93 78s-3.5-10-7.8-10-7.8 4.5-7.8 10Z"
      fill="#2F1C3A"
    />
    <path
      d="M58 89.5c0-3.5 12-3.5 12 0 0 2.4-3 5.5-6 5.5s-6-3.1-6-5.5Z"
      fill="#FF8AAE"
    />
    <path
      d="M64 95v9M64 104c-6.5 6.5-16 3.5-18.5-2M64 104c6.5 6.5 16 3.5 18.5-2"
      stroke="#2F1C3A"
      strokeWidth="4"
      strokeLinecap="round"
    />
    <path
      d="M24 86H5M27 96 8 102M101 86h22M98 96l21 6"
      stroke="#2F1C3A"
      strokeWidth="4"
      strokeLinecap="round"
      opacity="0.55"
    />
  </svg>
);

const Paw = ({ className = "" }) => (
  <svg className={className} viewBox="0 0 64 64" fill="currentColor" aria-hidden="true">
    <circle cx="20" cy="19" r="7" />
    <circle cx="32" cy="14" r="7" />
    <circle cx="44" cy="19" r="7" />
    <circle cx="17" cy="33" r="6" />
    <circle cx="47" cy="33" r="6" />
    <path d="M20 43c0-9 6-15 12-15s12 6 12 15c0 7-5 10-12 10s-12-3-12-10Z" />
  </svg>
);

const Sparkle = ({ className = "" }) => (
  <span className={`pointer-events-none select-none ${className}`}>✨</span>
);

// =====================
// HELPERS
// =====================
function imageFallback(label) {
  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" width="900" height="1200" viewBox="0 0 900 1200">
      <defs>
        <linearGradient id="g" x1="0" x2="1" y1="0" y2="1">
          <stop stop-color="#FFE4EC"/>
          <stop offset="0.5" stop-color="#FFF7D6"/>
          <stop offset="1" stop-color="#DFFFE8"/>
        </linearGradient>
      </defs>
      <rect width="900" height="1200" fill="url(#g)"/>
      <circle cx="450" cy="470" r="170" fill="#ffffff" opacity="0.65"/>
      <text x="450" y="470" text-anchor="middle" font-size="92">🐱</text>
      <text x="450" y="610" text-anchor="middle" font-family="Arial" font-size="44" fill="#7c3f58" font-weight="700">${label}</text>
      <text x="450" y="675" text-anchor="middle" font-family="Arial" font-size="28" fill="#9b6479">Replace this image in /public/photos</text>
    </svg>
  `;
  return `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(svg)}`;
}

function PhotoCard({ photo, onOpen, className = "" }) {
  return (
    <button
      type="button"
      onClick={() => onOpen(photo)}
      className={`group relative overflow-hidden rounded-[2rem] bg-white/80 p-3 text-left shadow-xl ring-1 ring-white/70 transition duration-500 hover:-translate-y-2 hover:rotate-0 hover:shadow-2xl ${className}`}
    >
      <div className="relative h-80 overflow-hidden rounded-[1.5rem] bg-pink-100">
        <img
          src={photo.src}
          alt={photo.title}
          onError={(e) => {
            e.currentTarget.onerror = null;
            e.currentTarget.src = imageFallback(photo.title);
          }}
          className="h-full w-full object-cover transition duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-transparent" />
        <div className="absolute bottom-3 left-3 right-3">
          <p className="inline-flex rounded-full bg-white/90 px-3 py-1 text-xs font-black text-pink-600 shadow">
            {photo.badge}
          </p>
          <h3 className="mt-2 text-xl font-black text-white drop-shadow">
            {photo.title}
          </h3>
        </div>
      </div>
      <p className="px-2 pt-3 text-sm font-medium text-gray-600">{photo.note}</p>
    </button>
  );
}

function MetricCard({ value, label, detail }) {
  return (
    <div className="rounded-[2rem] bg-white/70 p-5 text-center shadow-lg ring-1 ring-white/70 backdrop-blur">
      <div className="text-4xl font-black text-pink-500">{value}</div>
      <div className="mt-1 font-black text-gray-800">{label}</div>
      <p className="mt-2 text-sm text-gray-500">{detail}</p>
    </div>
  );
}

// =====================
// MAIN APP
// =====================
export default function App() {
  const audioRef = useRef(null);

  const [accessCode, setAccessCode] = useState("");
  const [error, setError] = useState("");
  const [isAuthenticated, setesAuthenticated] = useState(false);
  const [showBlast, setShowBlast] = useState(false);
  const [isPlaying, setesPlaying] = useState(false);
  const [selectedPhoto, setSelectedPhoto] = useState(null);
  const [quoteIndex, setQuoteIndex] = useState(0);
  const [pawBursts, setPawBursts] = useState([]);

  const playMusic = async () => {
    const audio = audioRef.current;

    if (!audio || !MUSIC_URL || MUSIC_URL.includes("PASTE_")) {
      setesPlaying(false);
      return;
    }

    try {
      audio.volume = 0.45;
      await audio.play();
      setesPlaying(true);
    } catch (err) {
      console.log("Audio play blocked or failed:", err);
      setesPlaying(false);
    }
  };

  const toggleMusic = async () => {
    const audio = audioRef.current;
    if (!audio || !MUSIC_URL || MUSIC_URL.includes("PASTE_")) return;

    if (audio.paused) {
      await playMusic();
    } else {
      audio.pause();
      setesPlaying(false);
    }
  };

  const handleUnlock = (e) => {
    e.preventDefault();

    if (accessCode.trim() !== ACCESS_CODE) {
      setError("Access denied. Luri & sete are judging this attempt.");
      return;
    }

    setError("");
    setShowBlast(true);
    playMusic();

    setTimeout(() => {
      setesAuthenticated(true);
      setShowBlast(false);
    }, 2600);
  };

  const handleStageClick = (e) => {
    if (!isAuthenticated) return;

    const target = e.target;
    if (
      target.closest &&
      target.closest("button, input, a, audio, img")
    ) {
      return;
    }

    const paw = {
      id: `${Date.now()}-${Math.random()}`,
      x: e.clientX,
      y: e.clientY,
      emoji: ["🐾", "💗", "✨", "🐱"][Math.floor(Math.random() * 4)],
    };

    setPawBursts((prev) => [...prev.slice(-14), paw]);

    setTimeout(() => {
      setPawBursts((prev) => prev.filter((item) => item.id !== paw.id));
    }, 1400);
  };

  const nextCatQuote = () => {
    setQuoteIndex((prev) => (prev + 1) % CAT_QUOTES.length);
  };

  return (
    <div
      onClick={handleStageClick}
      className="relative min-h-screen overflow-hidden bg-[#FFFDD0] font-sans text-gray-800"
    >
      <style>{`
        @keyframes softBlast {
          0% { transform: scale(0.25) rotate(-12deg); opacity: 0; filter: blur(6px); }
          35% { transform: scale(1.1) rotate(4deg); opacity: 1; filter: blur(0); }
          72% { transform: scale(1) rotate(-2deg); opacity: 1; }
          100% { transform: scale(1.2) rotate(0deg); opacity: 0; filter: blur(5px); }
        }

        @keyframes blastRing {
          0% { transform: scale(0.25); opacity: 0.9; }
          100% { transform: scale(3.5); opacity: 0; }
        }

        @keyframes floaty {
          0%, 100% { transform: translateY(0) rotate(-2deg); }
          50% { transform: translateY(-16px) rotate(2deg); }
        }

        @keyframes orbit {
          0% { transform: rotate(0deg) translateX(18px) rotate(0deg); }
          100% { transform: rotate(360deg) translateX(18px) rotate(-360deg); }
        }

        @keyframes shimmer {
          0% { transform: translateX(-120%); }
          100% { transform: translateX(120%); }
        }

        @keyframes pawPop {
          0% { transform: translate(-50%, -50%) scale(0.25) rotate(-20deg); opacity: 0; }
          25% { transform: translate(-50%, -80%) scale(1.25) rotate(8deg); opacity: 1; }
          100% { transform: translate(-50%, -150%) scale(0.75) rotate(18deg); opacity: 0; }
        }

        @keyframes cardIn {
          0% { transform: translateY(28px); opacity: 0; }
          100% { transform: translateY(0); opacity: 1; }
        }

        @keyframes wiggle {
          0%, 100% { transform: rotate(-3deg); }
          50% { transform: rotate(3deg); }
        }

        .soft-blast {
          animation: softBlast 2.6s cubic-bezier(.19,1,.22,1) forwards;
        }

        .blast-ring {
          animation: blastRing 2.3s ease-out forwards;
        }

        .floaty {
          animation: floaty 4s ease-in-out infinite;
        }

        .orbit {
          animation: orbit 7s linear infinite;
        }

        .paw-pop {
          animation: pawPop 1.4s ease-out forwards;
        }

        .card-in {
          animation: cardIn 0.8s ease-out both;
        }

        .wiggle {
          animation: wiggle 2.4s ease-in-out infinite;
        }

        .glass-shine::before {
          content: "";
          position: absolute;
          inset: 0;
          background: linear-gradient(110deg, transparent 20%, rgba(255,255,255,.48) 45%, transparent 70%);
          transform: translateX(-120%);
          animation: shimmer 4s ease-in-out infinite;
        }
        @keyframes autoScroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }

        .auto-scroll-track {
          width: max-content;
          animation: autoScroll 38s linear infinite;
        }

        .auto-scroll-track:hover {
          animation-play-state: paused;
        }          
      `}</style>

      <audio ref={audioRef} src={MUSIC_URL} loop preload="auto" />

      {/* Background blobs */}
      <div className="pointer-events-none absolute -left-28 top-20 h-80 w-80 rounded-full bg-pink-300/35 blur-3xl" />
      <div className="pointer-events-none absolute -right-24 top-1/3 h-96 w-96 rounded-full bg-mint-300/40 blur-3xl" />
      <div className="pointer-events-none absolute bottom-0 left-1/3 h-96 w-96 rounded-full bg-purple-300/25 blur-3xl" />

      {/* Click paw bursts */}
      {pawBursts.map((paw) => (
        <div
          key={paw.id}
          className="paw-pop pointer-events-none fixed z-[80] text-3xl"
          style={{ left: paw.x, top: paw.y }}
        >
          {paw.emoji}
        </div>
      ))}

      {/* Login Screen */}
      {!isAuthenticated && !showBlast && (
        <main className="relative z-10 flex min-h-screen items-center justify-center p-4">
          <form
            onSubmit={handleUnlock}
            className="glass-shine relative w-full max-w-md overflow-hidden rounded-[3rem] border border-white/70 bg-white/50 p-8 text-center shadow-2xl backdrop-blur-2xl"
          >
            <div className="relative mx-auto mb-5 flex h-28 w-28 items-center justify-center rounded-full bg-gradient-to-br from-pink-200 to-orange-100 text-pink-500 shadow-xl">
              <CatHead className="h-20 w-20 drop-shadow" />
              <Sparkle className="absolute -right-2 top-2 text-2xl" />
              <Sparkle className="absolute -left-2 bottom-5 text-xl" />
            </div>

            <p className="mb-2 text-xs font-black uppercase tracking-[0.35em] text-pink-400">
              Classified
            </p>

            <h1 className="text-3xl font-black tracking-tight text-gray-800">
              Luri & sete’s Portal
            </h1>

            <p className="mx-auto mt-3 max-w-xs text-sm font-medium text-gray-500">
              A top-secret report made by two cats for their favorite human.
            </p>

            <div className="mt-7">
              <input
                type="password"
                value={accessCode}
                onChange={(e) => setAccessCode(e.target.value)}
                placeholder="Enter access code"
                className="w-full rounded-full border border-white/80 bg-white/75 px-5 py-4 text-center text-lg font-bold tracking-widest text-gray-700 shadow-inner outline-none transition focus:ring-4 focus:ring-pink-200"
              />

              {error && (
                <p className="mt-3 rounded-full bg-red-50 px-4 py-2 text-sm font-bold text-red-500">
                  {error}
                </p>
              )}

              <button
                type="submit"
                className="mt-5 w-full rounded-full bg-gradient-to-r from-pink-500 to-orange-400 px-6 py-4 text-lg font-black text-white shadow-xl transition hover:-translate-y-1 hover:shadow-2xl active:translate-y-0"
              >
               Open the Secret Cat Report
              </button>
            </div>

            <p className="mt-5 text-xs font-semibold text-gray-400">
              Password hint: only approved humans may continue.
            </p>
          </form>
        </main>
      )}

      {/* Cat Blast */}
      {showBlast && (
        <div className="fixed inset-0 z-50 flex items-center justify-center overflow-hidden bg-gradient-to-br from-pink-100 via-orange-50 to-mint-100">
          <div className="blast-ring absolute h-36 w-36 rounded-full border-[18px] border-pink-300/70" />
          <div
            className="blast-ring absolute h-40 w-40 rounded-full border-[14px] border-orange-300/70"
            style={{ animationDelay: "0.2s" }}
          />
          <div
            className="blast-ring absolute h-44 w-44 rounded-full border-[10px] border-green-200/80"
            style={{ animationDelay: "0.4s" }}
          />

          {["🐾", "✨", "💗", "🐟", "⭐", "🐾", "💫", "🐱"].map((item, i) => (
            <span
              key={i}
              className="absolute text-4xl"
              style={{
                transform: `rotate(${i * 45}deg) translateY(-150px)`,
                animation: "floaty 2s ease-in-out infinite",
                animationDelay: `${i * 0.1}s`,
              }}
            >
              {item}
            </span>
          ))}

          <div className="soft-blast relative flex flex-col items-center">
            <div className="rounded-[3rem] bg-white/70 p-8 text-pink-500 shadow-2xl backdrop-blur-xl">
              <CatHead className="h-40 w-40" />
            </div>
            <h2 className="mt-6 rounded-full bg-white/70 px-6 py-3 text-2xl font-black text-pink-500 shadow-lg">
              Secret Cat Report Unlocked
            </h2>
          </div>
        </div>
      )}

      {/* Main Website */}
      {isAuthenticated && (
        <main className="relative z-10 mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
          {/* Hero */}
          <section className="card-in relative overflow-hidden rounded-[3rem] border border-white/70 bg-white/50 p-6 shadow-2xl backdrop-blur-2xl sm:p-10">
            <div className="absolute right-8 top-8 hidden h-28 w-28 rounded-full bg-pink-200/60 sm:block">
              <div className="orbit absolute left-1/2 top-1/2 text-3xl">🐾</div>
            </div>

            <div className="grid items-center gap-8 lg:grid-cols-[1.2fr_0.8fr]">
              <div>
                <p className="mb-3 inline-flex rounded-full bg-pink-100 px-4 py-2 text-xs font-black uppercase tracking-[0.25em] text-pink-500">
                  Official Cat Report
                </p>

                <h1 className="text-5xl font-black leading-tight tracking-tight text-gray-900 sm:text-7xl">
                  The Cat Takeover
                  <span className="block bg-gradient-to-r from-pink-500 via-orange-400 to-green-400 bg-clip-text text-transparent">
                    by Luri & sete
                  </span>
                </h1>

                <p className="mt-5 max-w-2xl text-lg font-medium leading-8 text-gray-600">
                  We hacked this tiny corner of the internet to present a very
                  serious, definitely scientific report about our favorite human.
                </p>

                <div className="mt-8 flex flex-wrap gap-3">
                  <a
                    href="#report"
                    className="rounded-full bg-gray-900 px-6 py-3 font-black text-white shadow-xl transition hover:-translate-y-1"
                  >
                    View Report
                  </a>
                  <button
                    type="button"
                    onClick={nextCatQuote}
                    className="rounded-full bg-white px-6 py-3 font-black text-pink-500 shadow-xl ring-1 ring-pink-100 transition hover:-translate-y-1"
                  >
                    Ask the Cats
                  </button>
                </div>

                <div className="mt-6 rounded-[2rem] bg-white/70 p-4 shadow-inner">
                  <p className="text-sm font-black text-gray-400">Current cat statement:</p>
                  <p className="mt-1 text-lg font-black text-gray-800">
                    “{CAT_QUOTES[quoteIndex]}”
                  </p>
                </div>
              </div>

              <div className="relative mx-auto flex h-80 w-80 items-center justify-center">
                <div className="absolute inset-0 rounded-full bg-gradient-to-br from-pink-200 to-orange-100 blur-xl" />
                <div className="floaty relative rounded-[3rem] bg-white/70 p-8 text-pink-500 shadow-2xl backdrop-blur">
                  <CatHead className="h-48 w-48" />
                </div>

                <div className="wiggle absolute -left-3 top-8 rounded-3xl bg-white/80 px-4 py-3 text-sm font-black shadow-xl">
                  Luri approved ✅
                </div>

                <div className="wiggle absolute -right-4 bottom-10 rounded-3xl bg-white/80 px-4 py-3 text-sm font-black shadow-xl">
                  sete verified 🐾
                </div>
              </div>
            </div>
          </section>

          {/* Mission */}
          <section
            id="report"
            className="card-in mt-10 grid gap-6 lg:grid-cols-[0.8fr_1.2fr]"
            style={{ animationDelay: "0.1s" }}
          >
            <div className="rounded-[3rem] bg-gradient-to-br from-orange-200 to-pink-200 p-8 shadow-xl">
              <p className="text-sm font-black uppercase tracking-[0.25em] text-white/80">
                Mission
              </p>
              <h2 className="mt-3 text-4xl font-black text-white drop-shadow">
                Why are we here?
              </h2>
            </div>

            <div className="rounded-[3rem] border border-white/70 bg-white/60 p-8 shadow-xl backdrop-blur">
              <p className="text-xl font-bold leading-9 text-gray-700">
                We, Luri and sete, noticed our human has been busy. So we took
                control of this website to show why she is actually one of the
                coolest humans in our tiny cat universe.
              </p>
              <p className="mt-4 text-sm font-semibold text-gray-400">
                Disclaimer: No keyboards were harmed. Only lightly walked on.
              </p>
            </div>
          </section>

          {/* Evolution */}
          <section className="mt-12">
            <div className="mb-6 flex items-end justify-between gap-4">
              <div>
                <p className="text-sm font-black uppercase tracking-[0.25em] text-pink-400">
                  Chapter 01
                </p>
                <h2 className="text-4xl font-black text-gray-900">
                  Evolution of a Cat Lover
                </h2>
              </div>
              <Paw className="hidden h-12 w-12 rotate-12 text-pink-300 sm:block" />
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              <PhotoCard
                photo={PHOTO_SLOTS[0]}
                onOpen={setSelectedPhoto}
                className="-rotate-2"
              />
              <PhotoCard
                photo={PHOTO_SLOTS[1]}
                onOpen={setSelectedPhoto}
                className="rotate-2"
              />
            </div>
          </section>

          {/* Developers */}
          <section className="mt-14">
            <div className="mb-6 text-center">
              <p className="text-sm font-black uppercase tracking-[0.25em] text-green-500">
                Chapter 02
              </p>
              <h2 className="text-4xl font-black text-gray-900">
                Meet the Developers
              </h2>
              <p className="mt-2 font-medium text-gray-500">
                The masterminds behind this extremely professional report.
              </p>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              <PhotoCard
                photo={PHOTO_SLOTS[2]}
                onOpen={setSelectedPhoto}
                className="rotate-1"
              />
              <PhotoCard
                photo={PHOTO_SLOTS[3]}
                onOpen={setSelectedPhoto}
                className="-rotate-1"
              />
            </div>
          </section>

          {/* Metrics */}
          <section className="mt-14 rounded-[3rem] bg-gray-900 p-7 text-white shadow-2xl sm:p-10">
            <div className="mb-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
              <div>
                <p className="text-sm font-black uppercase tracking-[0.25em] text-pink-300">
                  Chapter 03
                </p>
                <h2 className="mt-2 text-4xl font-black">
                  Key Human Metrics
                </h2>
              </div>
              <p className="max-w-md text-sm font-semibold text-white/50">
                Calculated by two cats with zero statistical training but
                excellent judgment.
              </p>
            </div>

            <div className="grid gap-4 md:grid-cols-3">
              <MetricCard
                value="98%"
                label="Snack Accuracy"
                detail="Almost always knows when cats deserve treats."
              />
              <MetricCard
                value="100%"
                label="Aesthetic Score"
                detail="Latest photo passed the feline vibe check."
              />
              <MetricCard
                value="10/10"
                label="Ear Scratch Quality"
                detail="Reviewed under strict cat supervision."
              />
            </div>
          </section>

          {/* Quote */}
          <section className="mt-14 overflow-hidden rounded-[3rem] border border-white/70 bg-white/60 p-8 text-center shadow-xl backdrop-blur sm:p-12">
            <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-pink-100 text-pink-500 shadow-lg">
              <CatHead className="h-14 w-14" />
            </div>
            <p className="text-sm font-black uppercase tracking-[0.25em] text-pink-400">
              A Word from the Boss
            </p>
            <blockquote className="mx-auto mt-4 max-w-3xl text-3xl font-black leading-tight text-gray-900 sm:text-4xl">
              “Meow meow. She is alright for a human. Five stars. Would
              recommend.”
            </blockquote>
            <p className="mt-4 font-bold text-gray-400">— Luri & sete</p>
          </section>

          {/* Gallery */}
        <section className="mt-14">
          <div className="mb-6">
            <p className="text-sm font-black uppercase tracking-[0.25em] text-orange-400">
              Chapter 04
            </p>
            <h2 className="text-4xl font-black text-gray-900">
              Current Vibe Gallery
            </h2>
            <p className="mt-2 font-medium text-gray-500">
              A highly official evidence board proving that the cat-lover allegations are true.
            </p>
          </div>

          <div className="relative overflow-hidden rounded-[3rem] bg-white/40 p-5 shadow-xl backdrop-blur">
            <div className="auto-scroll-track flex gap-5">
              {[...PHOTO_SLOTS, ...PHOTO_SLOTS].map((photo, index) => (
                <div key={`${photo.id}-${index}`} className="w-72 shrink-0">
                  <PhotoCard
                    photo={photo}
                    onOpen={setSelectedPhoto}
                    className={index % 2 === 0 ? "-rotate-2" : "rotate-2"}
                  />
                </div>
              ))}
            </div>
          </div>
        </section>

          {/* CTA */}
{/* CTA */}
        <section className="mb-24 mt-10 rounded-[3rem] bg-gradient-to-br from-pink-500 to-orange-400 p-8 text-center text-white shadow-2xl sm:p-12">
          <h2 className="text-4xl font-black">Case Closed?</h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg font-bold text-white/85">
            Ask the cats. Or ask the human assistant who helped Luri & Seti turn
            their investigation into this secret report.
          </p>
          <p className="mt-6 inline-flex rounded-full bg-white/20 px-5 py-3 text-sm font-black backdrop-blur">
            Hope this made you smile 🐱✨
          </p>
        </section>

          {/* Music Button */}
          <button
            type="button"
            onClick={toggleMusic}
            className="fixed bottom-6 right-6 z-40 flex h-16 w-16 items-center justify-center rounded-full bg-gray-900 text-2xl text-white shadow-2xl transition hover:-translate-y-1 hover:scale-105"
            title="Toggle music"
          >
            {isPlaying ? "🎵" : "🔇"}
          </button>
        </main>
      )}

      {/* Photo Modal */}
      {selectedPhoto && (
        <div className="fixed inset-0 z-[90] flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm">
          <div className="relative max-h-[92vh] w-full max-w-3xl overflow-hidden rounded-[2rem] bg-white shadow-2xl">
            <button
              type="button"
              onClick={() => setSelectedPhoto(null)}
              className="absolute right-4 top-4 z-10 rounded-full bg-white/90 px-4 py-2 font-black text-gray-900 shadow-lg"
            >
              Close
            </button>

            <img
              src={selectedPhoto.src}
              alt={selectedPhoto.title}
              onError={(e) => {
                e.currentTarget.onerror = null;
                e.currentTarget.src = imageFallback(selectedPhoto.title);
              }}
              className="max-h-[72vh] w-full object-cover"
            />

            <div className="p-6">
              <p className="inline-flex rounded-full bg-pink-100 px-3 py-1 text-xs font-black text-pink-500">
                {selectedPhoto.badge}
              </p>
              <h3 className="mt-3 text-3xl font-black text-gray-900">
                {selectedPhoto.title}
              </h3>
              <p className="mt-2 font-medium text-gray-500">
                {selectedPhoto.note}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}