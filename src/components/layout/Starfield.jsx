import { useEffect, useRef } from 'react';

const Starfield = () => {
    const canvasRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        let animationFrameId;
        let stars = [];
        let shootingStars = [];

        const resizeCanvas = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
            initStars();
        };

        const initStars = () => {
            stars = [];
            const numStars = Math.floor((window.innerWidth * window.innerHeight) / 4000);

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
            const startY = Math.random() * canvas.height / 2; // Start mostly in top half
            const angle = Math.PI / 4; // 45 degrees
            const speed = Math.random() * 7 + 3; // Slower (was 15+10)
            const length = Math.random() * 200 + 50; // Longer

            shootingStars.push({
                x: startX,
                y: startY,
                len: length,
                speed: speed,
                angle: angle,
                opacity: 1,
                life: 1 // Life factor for fading
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

                // Twinkle effect
                star.alpha += star.twinkleSpeed * star.twinkleDir;
                if (star.alpha >= 1 || star.alpha <= 0.2) {
                    star.twinkleDir *= -1;
                }

                // Subtle movement
                star.y -= star.speed;
                if (star.y < 0) {
                    star.y = canvas.height;
                    star.x = Math.random() * canvas.width;
                }
            });

            // Draw and update shooting stars
            // Chance to spawn a new shooting star
            if (Math.random() < 0.08) { // More frequent (increased from 0.02)
                createShootingStar();
            }

            for (let i = shootingStars.length - 1; i >= 0; i--) {
                const star = shootingStars[i];

                const endX = star.x - star.len * Math.cos(star.angle);
                const endY = star.y - star.len * Math.sin(star.angle);

                // Draw trail
                const gradient = ctx.createLinearGradient(star.x, star.y, endX, endY);
                gradient.addColorStop(0, `rgba(255, 255, 255, ${star.opacity})`);
                gradient.addColorStop(1, `rgba(255, 255, 255, 0)`);

                ctx.beginPath();
                ctx.moveTo(star.x, star.y);
                ctx.lineTo(endX, endY);
                ctx.strokeStyle = gradient;
                ctx.lineWidth = 4; // Thicker
                ctx.stroke();

                // Move star
                star.x += star.speed * Math.cos(star.angle);
                star.y += star.speed * Math.sin(star.angle);

                // Fade out
                star.life -= 0.01;
                star.opacity = star.life;

                // Remove if out of bounds or faded
                if (star.x > canvas.width || star.y > canvas.height || star.life <= 0) {
                    shootingStars.splice(i, 1);
                }
            }

            animationFrameId = requestAnimationFrame(drawStars);
        };

        window.addEventListener('resize', resizeCanvas);
        resizeCanvas();
        drawStars();

        return () => {
            window.removeEventListener('resize', resizeCanvas);
            cancelAnimationFrame(animationFrameId);
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            className="fixed top-0 left-0 w-full h-full pointer-events-none z-0"
        />
    );
};

export default Starfield;
