import React, { useRef, useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const ConstellationGame = () => {
    const canvasRef = useRef(null);
    const [progress, setProgress] = useState(1); // 1 = Chaos, 0 = Aligned
    const starsRef = useRef([]);
    const animationFrameRef = useRef();
    const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

    // Detailed Butterfly Path (Blue Morpho style)
    // This is a simplified path for the sake of the example, but complex enough to look good
    const butterflyPath = new Path2D("M150 100 C 120 50, 50 50, 50 120 C 50 180, 120 180, 150 150 C 180 180, 250 180, 250 120 C 250 50, 180 50, 150 100 M 150 150 C 130 220, 60 250, 60 180 M 150 150 C 170 220, 240 250, 240 180");

    // Pre-render a glowing star sprite for performance
    const createStarSprite = () => {
        const canvas = document.createElement('canvas');
        const size = 32; // Sprite size
        canvas.width = size;
        canvas.height = size;
        const ctx = canvas.getContext('2d');
        const center = size / 2;

        // Glow
        const gradient = ctx.createRadialGradient(center, center, 0, center, center, center);
        gradient.addColorStop(0, 'rgba(255, 255, 255, 1)');
        gradient.addColorStop(0.2, 'rgba(255, 255, 255, 0.8)');
        gradient.addColorStop(0.5, 'rgba(255, 255, 255, 0.2)');
        gradient.addColorStop(1, 'rgba(255, 255, 255, 0)');

        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(center, center, center, 0, Math.PI * 2);
        ctx.fill();

        return canvas;
    };

    const starSpriteRef = useRef(null);

    useEffect(() => {
        starSpriteRef.current = createStarSprite();

        const updateDimensions = () => {
            if (canvasRef.current) {
                const parent = canvasRef.current.parentElement;
                const { clientWidth, clientHeight } = parent;
                const dpr = window.devicePixelRatio || 1;

                canvasRef.current.style.width = `${clientWidth}px`;
                canvasRef.current.style.height = `${clientHeight}px`;
                canvasRef.current.width = clientWidth * dpr;
                canvasRef.current.height = clientHeight * dpr;

                const ctx = canvasRef.current.getContext('2d');
                ctx.scale(dpr, dpr);

                setDimensions({ width: clientWidth, height: clientHeight });
                initParticles(clientWidth, clientHeight);
            }
        };

        window.addEventListener('resize', updateDimensions);
        setTimeout(updateDimensions, 100);

        return () => window.removeEventListener('resize', updateDimensions);
    }, []);

    const initParticles = (width, height) => {
        const dpr = window.devicePixelRatio || 1;
        const offCanvas = document.createElement('canvas');
        offCanvas.width = width * dpr;
        offCanvas.height = height * dpr;
        const ctx = offCanvas.getContext('2d');
        ctx.scale(dpr, dpr);

        // Draw Butterfly
        ctx.save();
        const scale = Math.min(width, height) / 350;
        ctx.translate(width * 0.25, height / 2);
        ctx.scale(scale, scale);
        ctx.translate(-150, -150);
        ctx.fillStyle = 'white';
        ctx.fill(butterflyPath);
        ctx.restore();

        // Draw Text
        const fontSize = width < 600 ? 24 : 36;
        ctx.font = `900 ${fontSize}px "Nothing You Could Do", cursive`;
        ctx.fillStyle = 'white';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';

        const textX = width * 0.7;
        const textY = height / 2;

        ctx.fillText("Finding my way", textX, textY - 25);
        ctx.fillText("back to you", textX, textY + 25);

        // Sample Pixels
        const imageData = ctx.getImageData(0, 0, width * dpr, height * dpr);
        const data = imageData.data;
        const particles = [];

        // PERFORMANCE: We can use a low step (high density) because we use sprites now!
        const step = 3;

        for (let y = 0; y < height * dpr; y += step) {
            for (let x = 0; x < width * dpr; x += step) {
                const index = (y * (width * dpr) + x) * 4;
                if (data[index + 3] > 128) {
                    const jitter = (Math.random() - 0.5) * 2;
                    particles.push({
                        targetX: (x + jitter) / dpr,
                        targetY: (y + jitter) / dpr,
                        randomX: Math.random() * width,
                        randomY: Math.random() * height,
                        x: Math.random() * width,
                        y: Math.random() * height,
                        size: (Math.random() * 0.8 + 0.4), // Scale for sprite
                        alpha: Math.random() * 0.6 + 0.4,
                        speed: Math.random() * 0.02 + 0.01
                    });
                }
            }
        }

        // Background stars
        for (let i = 0; i < 30; i++) {
            particles.push({
                targetX: Math.random() * width,
                targetY: Math.random() * height,
                randomX: Math.random() * width,
                randomY: Math.random() * height,
                x: Math.random() * width,
                y: Math.random() * height,
                size: Math.random() * 0.5 + 0.2,
                alpha: Math.random() * 0.3 + 0.1,
                speed: Math.random() * 0.01 + 0.005,
                isBackground: true
            });
        }

        starsRef.current = particles;
    };

    useEffect(() => {
        const render = () => {
            const canvas = canvasRef.current;
            if (!canvas) return;
            const ctx = canvas.getContext('2d');
            const { width, height } = canvas;

            ctx.clearRect(0, 0, width, height);

            // No shadowBlur needed, sprite has glow
            const sprite = starSpriteRef.current;

            starsRef.current.forEach(star => {
                let currentTargetX, currentTargetY;

                if (star.isBackground) {
                    currentTargetX = star.randomX;
                    currentTargetY = star.randomY;
                } else {
                    currentTargetX = star.randomX * progress + star.targetX * (1 - progress);
                    currentTargetY = star.randomY * progress + star.targetY * (1 - progress);
                }

                const floatX = Math.sin(Date.now() * star.speed * 0.001 + star.targetX) * 2;
                const floatY = Math.cos(Date.now() * star.speed * 0.001 + star.targetY) * 2;

                const floatFactor = progress > 0.1 ? 1 : 0.2;

                star.x = currentTargetX + floatX * floatFactor;
                star.y = currentTargetY + floatY * floatFactor;

                // Draw Sprite
                // Size is a multiplier for the 32x32 sprite
                const s = star.size * 12; // Base size
                ctx.globalAlpha = star.alpha;
                // Color tinting is hard with drawImage, so we rely on alpha
                // For the "blue" tint when aligned, we could use a second blue sprite, 
                // but let's stick to white glow for now as it's cleaner.

                ctx.drawImage(sprite, star.x - s / 2, star.y - s / 2, s, s);
            });

            ctx.globalAlpha = 1;
            animationFrameRef.current = requestAnimationFrame(render);
        };

        render();

        return () => cancelAnimationFrame(animationFrameRef.current);
    }, [progress]);

    const handleSliderChange = (e) => {
        setProgress(parseFloat(e.target.value));
    };

    return (
        <div className="w-full space-y-6">
            {/* Canvas Container with Deep Space Look */}
            <div className="w-full h-64 rounded-soft overflow-hidden relative bg-gradient-to-b from-[#050510] via-[#0a0a2a] to-[#050510] border-2 border-white/20 shadow-brutal">
                <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />
            </div>

            {/* Slider Control - Below Canvas */}
            <div className="w-full max-w-md mx-auto space-y-3">
                <div className="relative">
                    <input
                        type="range"
                        min="0"
                        max="1"
                        step="0.005"
                        value={progress}
                        onChange={handleSliderChange}
                        className="slider-constellation w-full"
                    />
                </div>
                <div className="flex justify-between text-sm font-mono text-lis-blue/70 px-2">
                    <span className="tracking-wide">ALIGNED</span>
                    <span className="tracking-wide">CHAOS</span>
                </div>
            </div>
        </div>
    );
};

export default ConstellationGame;
