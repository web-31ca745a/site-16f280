import React, { useRef, useEffect, useState } from 'react';
import { Eraser, PenTool, Undo } from 'lucide-react';

const DrawTogether = ({ baseImage }) => {
    const canvasRef = useRef(null);
    const [isDrawing, setIsDrawing] = useState(false);
    const [color, setColor] = useState('#f5a962');
    const [lineWidth, setLineWidth] = useState(3);
    const [tool, setTool] = useState('pen'); // 'pen' or 'eraser'

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');

        // Set canvas size
        const resizeCanvas = () => {
            const parent = canvas.parentElement;
            canvas.width = parent.clientWidth;
            canvas.height = 400;

            // Restore base image if needed or clear
            ctx.fillStyle = 'rgba(255, 255, 255, 0.1)';
            ctx.fillRect(0, 0, canvas.width, canvas.height);
        };

        resizeCanvas();
        window.addEventListener('resize', resizeCanvas);

        return () => window.removeEventListener('resize', resizeCanvas);
    }, []);

    const startDrawing = (e) => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        const rect = canvas.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        ctx.beginPath();
        ctx.moveTo(x, y);
        setIsDrawing(true);
    };

    const draw = (e) => {
        if (!isDrawing) return;
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        const rect = canvas.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        ctx.lineWidth = lineWidth;
        ctx.lineCap = 'round';
        ctx.strokeStyle = tool === 'eraser' ? 'rgba(26, 31, 46, 1)' : color; // Eraser paints background color

        ctx.lineTo(x, y);
        ctx.stroke();
    };

    const stopDrawing = () => {
        setIsDrawing(false);
        // Save to local storage logic here
    };

    return (
        <div className="w-full bg-navy-800 rounded-lg p-4 shadow-lg">
            <div className="flex justify-between items-center mb-4">
                <div className="flex space-x-2">
                    <button
                        onClick={() => setTool('pen')}
                        className={`p-2 rounded ${tool === 'pen' ? 'bg-amber-400 text-navy-900' : 'bg-navy-900 text-cream'}`}
                    >
                        <PenTool size={20} />
                    </button>
                    <button
                        onClick={() => setTool('eraser')}
                        className={`p-2 rounded ${tool === 'eraser' ? 'bg-amber-400 text-navy-900' : 'bg-navy-900 text-cream'}`}
                    >
                        <Eraser size={20} />
                    </button>
                </div>
                <div className="flex space-x-2">
                    {['#f5a962', '#b8a8d4', '#f5a3b8', '#ffffff'].map((c) => (
                        <button
                            key={c}
                            onClick={() => { setColor(c); setTool('pen'); }}
                            className={`w-6 h-6 rounded-full border-2 ${color === c && tool === 'pen' ? 'border-white' : 'border-transparent'}`}
                            style={{ backgroundColor: c }}
                        />
                    ))}
                </div>
            </div>

            <div className="relative w-full h-[400px] bg-navy-900/50 rounded border-2 border-dashed border-navy-700 overflow-hidden cursor-crosshair">
                {/* Base Image would go here as background */}
                <canvas
                    ref={canvasRef}
                    onMouseDown={startDrawing}
                    onMouseMove={draw}
                    onMouseUp={stopDrawing}
                    onMouseLeave={stopDrawing}
                    className="absolute top-0 left-0"
                />
            </div>
            <p className="text-center text-xs text-gray-500 mt-2">Draw something with me...</p>
        </div>
    );
};

export default DrawTogether;
