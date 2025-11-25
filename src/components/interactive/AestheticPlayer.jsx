import React, { useState, useEffect, useRef } from 'react';
import { Howl } from 'howler';
import { motion } from 'framer-motion';
import { Play, Pause } from 'lucide-react';

const AestheticPlayer = ({ track, onClose }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [frequencyData, setFrequencyData] = useState(new Array(64).fill(0));
  
  const soundRef = useRef(null);
  const rafRef = useRef(null);
  const analyserRef = useRef(null);
  const dataArrayRef = useRef(null);
  const starCanvasRef = useRef(null);
  const starAnimationRef = useRef(null);

  // Starfield effect
  useEffect(() => {
    const canvas = starCanvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width;
    canvas.height = rect.height;

    let stars = [];
    let shootingStars = [];

    const initStars = () => {
      stars = [];
      const numStars = Math.floor((canvas.width * canvas.height) / 2000);

      for (let i = 0; i < numStars; i++) {
        stars.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          radius: Math.random() * 2,
          alpha: Math.random(),
          speed: Math.random() * 0.05,
          twinkleSpeed: Math.random() * 0.02 + 0.005,
          twinkleDir: 1
        });
      }
    };

    const createShootingStar = () => {
      const startX = Math.random() * canvas.width;
      const startY = Math.random() * canvas.height / 2;
      const angle = Math.PI / 4;
      const speed = Math.random() * 7 + 3;
      const length = Math.random() * 100 + 30;

      shootingStars.push({
        x: startX,
        y: startY,
        len: length,
        speed: speed,
        angle: angle,
        opacity: 1,
        life: 1
      });
    };

    const drawStars = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw static stars
      stars.forEach(star => {
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${star.alpha})`;
        ctx.fill();

        star.alpha += star.twinkleSpeed * star.twinkleDir;
        if (star.alpha >= 1 || star.alpha <= 0.2) {
          star.twinkleDir *= -1;
        }

        star.y -= star.speed;
        if (star.y < 0) {
          star.y = canvas.height;
          star.x = Math.random() * canvas.width;
        }
      });

      // Draw shooting stars
      if (Math.random() < 0.05) {
        createShootingStar();
      }

      for (let i = shootingStars.length - 1; i >= 0; i--) {
        const star = shootingStars[i];

        const endX = star.x - star.len * Math.cos(star.angle);
        const endY = star.y - star.len * Math.sin(star.angle);

        const gradient = ctx.createLinearGradient(star.x, star.y, endX, endY);
        gradient.addColorStop(0, `rgba(255, 255, 255, ${star.opacity})`);
        gradient.addColorStop(1, `rgba(255, 255, 255, 0)`);

        ctx.beginPath();
        ctx.moveTo(star.x, star.y);
        ctx.lineTo(endX, endY);
        ctx.strokeStyle = gradient;
        ctx.lineWidth = 2;
        ctx.stroke();

        star.x += star.speed * Math.cos(star.angle);
        star.y += star.speed * Math.sin(star.angle);

        star.life -= 0.01;
        star.opacity = star.life;

        if (star.x > canvas.width || star.y > canvas.height || star.life <= 0) {
          shootingStars.splice(i, 1);
        }
      }

      starAnimationRef.current = requestAnimationFrame(drawStars);
    };

    initStars();
    drawStars();

    return () => {
      if (starAnimationRef.current) cancelAnimationFrame(starAnimationRef.current);
    };
  }, []);

  // Initialize Howler with Web Audio API
  useEffect(() => {
    if (!track) return;

    soundRef.current = new Howl({
      src: [track.src],
      html5: false, // Use Web Audio API for analysis
      onload: () => {
        setDuration(soundRef.current.duration());
        
        // Get the audio context and create analyser
        const ctx = Howler.ctx;
        const masterGain = Howler.masterGain;
        
        analyserRef.current = ctx.createAnalyser();
        analyserRef.current.fftSize = 128; // 64 frequency bins
        analyserRef.current.smoothingTimeConstant = 0.8;
        
        // Connect the analyser
        masterGain.connect(analyserRef.current);
        
        dataArrayRef.current = new Uint8Array(analyserRef.current.frequencyBinCount);
      },
      onend: () => {
        setIsPlaying(false);
        setProgress(0);
        setCurrentTime(0);
        // Notify cassette player to restore volume when track ends
        window.dispatchEvent(new CustomEvent('aestheticPlayerStopped'));
      }
    });

    return () => {
      if (soundRef.current) {
        // If player is playing when unmounting, notify cassette to restore volume
        if (soundRef.current.playing()) {
          window.dispatchEvent(new CustomEvent('aestheticPlayerStopped'));
        }
        soundRef.current.unload();
      }
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [track]);

  // Animation loop for progress and frequency data
  const updateVisualization = () => {
    if (soundRef.current && soundRef.current.playing()) {
      // Update progress
      const seek = soundRef.current.seek();
      setCurrentTime(seek);
      setProgress((seek / soundRef.current.duration()) * 100);
      
      // Update frequency data
      if (analyserRef.current && dataArrayRef.current) {
        analyserRef.current.getByteFrequencyData(dataArrayRef.current);
        setFrequencyData(Array.from(dataArrayRef.current));
      }
      
      rafRef.current = requestAnimationFrame(updateVisualization);
    }
  };

  useEffect(() => {
    if (isPlaying) {
      rafRef.current = requestAnimationFrame(updateVisualization);
    } else {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    }
  }, [isPlaying]);

  const togglePlay = () => {
    if (!soundRef.current) return;
    
    if (isPlaying) {
      soundRef.current.pause();
      // Notify cassette player to restore volume
      window.dispatchEvent(new CustomEvent('aestheticPlayerStopped'));
    } else {
      soundRef.current.play();
      // Notify cassette player to lower volume
      window.dispatchEvent(new CustomEvent('aestheticPlayerStarted'));
    }
    setIsPlaying(!isPlaying);
  };

  const handleSeek = (e) => {
    if (!soundRef.current) return;
    const progressBar = e.currentTarget;
    const rect = progressBar.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const percentage = Math.min(Math.max(x / rect.width, 0), 1);
    
    const newTime = percentage * duration;
    soundRef.current.seek(newTime);
    setProgress(percentage * 100);
    setCurrentTime(newTime);
  };

  const formatTime = (secs) => {
    const minutes = Math.floor(secs / 60);
    const seconds = Math.floor(secs % 60);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  // Generate smooth waveform path from frequency data
  const generateWavePath = () => {
    const points = 64;
    const width = 200;
    const height = 40;
    const stepX = width / points;
    
    let path = `M 0,${height / 2}`;
    
    for (let i = 0; i < points; i++) {
      const value = frequencyData[i] || 0;
      // Keep sensitivity at 0.7 to stay within bounds but still be reactive
      const amplitude = (value / 255) * (height / 2) * 0.7;
      const x = i * stepX;
      const y = (height / 2) + (Math.sin(i * 0.5) * amplitude);
      
      if (i === 0) {
        path += ` L ${x},${y}`;
      } else {
        // Smooth curve using quadratic bezier
        const prevX = (i - 1) * stepX;
        const cpX = (prevX + x) / 2;
        path += ` Q ${cpX},${y} ${x},${y}`;
      }
    }
    
    return path;
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="relative w-full max-w-3xl mx-auto bg-[#2a2535] p-3 select-none rounded-soft border-[3px] border-white/70 overflow-hidden"
    >
      {/* Background Starfield Canvas */}
      <canvas
        ref={starCanvasRef}
        className="absolute inset-0 w-full h-full pointer-events-none"
      />

      <div className="relative flex items-center gap-3">
        {/* Play/Pause Button */}
        <button 
          onClick={togglePlay}
          className="flex-shrink-0 w-10 h-10 flex items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors"
        >
          {isPlaying ? <Pause size={18} fill="currentColor" /> : <Play size={18} fill="currentColor" />}
        </button>

        {/* Waveform Visualizer */}
        <div className="flex-grow">
          <div 
            className="relative h-12 cursor-pointer group" 
            onClick={handleSeek}
          >
            {/* Reactive Waveform Line */}
            <svg 
              viewBox="0 0 200 40" 
              className="absolute inset-0 w-full h-full"
              preserveAspectRatio="none"
            >
              {/* Background wave (dimmed gray) */}
              <path 
                d={generateWavePath()}
                fill="none" 
                stroke="rgba(150, 150, 180, 0.3)" 
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              
              {/* Active wave (pastel pink/purple gradient) - clipped by progress */}
              <defs>
                <linearGradient id="activePinkGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#f9a8d4" />
                  <stop offset="50%" stopColor="#d8b4fe" />
                  <stop offset="100%" stopColor="#f9a8d4" />
                </linearGradient>
                <clipPath id="progressClip">
                  <rect x="0" y="0" width={`${progress}%`} height="40" />
                </clipPath>
              </defs>
              
              <path 
                d={generateWavePath()}
                fill="none" 
                stroke="url(#activePinkGradient)" 
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                clipPath="url(#progressClip)"
                style={{
                  filter: 'drop-shadow(0 0 6px rgba(249, 168, 212, 0.7))'
                }}
              />
            </svg>
          </div>
        </div>

        {/* Time Display */}
        <div className="flex-shrink-0 text-lg font-hand text-white/70 tracking-wide font-bold">
          <span>{formatTime(currentTime)}</span>
          <span className="mx-1">/</span>
          <span>{formatTime(duration || 0)}</span>
        </div>
      </div>
    </motion.div>
  );
};

export default AestheticPlayer;
