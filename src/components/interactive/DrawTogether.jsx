import React, { useRef, useEffect, useState } from 'react';
import { Eraser, PenTool, Undo, Download, Save, Trash2 } from 'lucide-react';

const DrawTogether = ({ baseImage }) => {
    const canvasRef = useRef(null);
    const [isDrawing, setIsDrawing] = useState(false);
    const [color, setColor] = useState('#f5a962');
    const [lineWidth, setLineWidth] = useState(3);
    const [tool, setTool] = useState('pen'); // 'pen' or 'eraser'
    const [history, setHistory] = useState([]);
    const [historyStep, setHistoryStep] = useState(-1);
    const bgColor = '#1a1f2e';

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        const parent = canvas.parentElement;
        
        // Fixed canvas dimensions for consistency across devices
        const CANVAS_WIDTH = 800;
        const CANVAS_HEIGHT = 600;
        
        // Initialize canvas size once
        canvas.width = CANVAS_WIDTH;
        canvas.height = CANVAS_HEIGHT;

        // Fill with background color
        ctx.fillStyle = bgColor;
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        // Check if there's a saved drawing
        const savedDrawing = localStorage.getItem('drawTogether');
        if (savedDrawing) {
            const img = new Image();
            img.onload = () => {
                ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
                saveToHistory();
            };
            img.src = savedDrawing;
        } else if (baseImage) {
            // Load base image if provided and no saved drawing
            const img = new Image();
            img.onload = () => {
                ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
                saveToHistory();
            };
            img.src = baseImage;
        } else {
            saveToHistory();
        }

        // No need for resize handler since canvas size is fixed
    }, [baseImage]);

    const saveToHistory = () => {
        const canvas = canvasRef.current;
        const newHistory = history.slice(0, historyStep + 1);
        newHistory.push(canvas.toDataURL());
        setHistory(newHistory);
        setHistoryStep(newHistory.length - 1);
    };

    const getCoordinates = (e) => {
        const canvas = canvasRef.current;
        const rect = canvas.getBoundingClientRect();
        
        // Handle both mouse and touch events
        const clientX = e.touches ? e.touches[0].clientX : e.clientX;
        const clientY = e.touches ? e.touches[0].clientY : e.clientY;
        
        // Scale coordinates from display size to canvas size
        const scaleX = canvas.width / rect.width;
        const scaleY = canvas.height / rect.height;
        
        return {
            x: (clientX - rect.left) * scaleX,
            y: (clientY - rect.top) * scaleY
        };
    };

    const startDrawing = (e) => {
        e.preventDefault(); // Prevent scrolling on touch
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        const { x, y } = getCoordinates(e);

        ctx.beginPath();
        ctx.moveTo(x, y);
        setIsDrawing(true);
    };

    const draw = (e) => {
        if (!isDrawing) return;
        e.preventDefault(); // Prevent scrolling on touch
        
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        const { x, y } = getCoordinates(e);

        ctx.lineWidth = tool === 'eraser' ? lineWidth * 3 : lineWidth;
        ctx.lineCap = 'round';
        ctx.globalCompositeOperation = 'source-over';
        ctx.strokeStyle = tool === 'eraser' ? bgColor : color;

        ctx.lineTo(x, y);
        ctx.stroke();
    };

    const stopDrawing = () => {
        if (isDrawing) {
            setIsDrawing(false);
            saveToHistory();
        }
    };

    const handleUndo = () => {
        if (historyStep > 0) {
            const canvas = canvasRef.current;
            const ctx = canvas.getContext('2d');
            const img = new Image();
            img.onload = () => {
                ctx.clearRect(0, 0, canvas.width, canvas.height);
                ctx.drawImage(img, 0, 0);
            };
            img.src = history[historyStep - 1];
            setHistoryStep(historyStep - 1);
        }
    };

    const handleSave = () => {
        const canvas = canvasRef.current;
        const dataUrl = canvas.toDataURL('image/png');
        localStorage.setItem('drawTogether', dataUrl);
        alert('Drawing saved!');
    };

    const handleClear = () => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        ctx.fillStyle = bgColor;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        // If there's a base image, redraw it
        if (baseImage) {
            const img = new Image();
            img.onload = () => {
                ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
                saveToHistory();
            };
            img.src = baseImage;
        } else {
            saveToHistory();
        }
        
        localStorage.removeItem('drawTogether');
    };

    const handleDownload = () => {
        const canvas = canvasRef.current;
        const link = document.createElement('a');
        link.download = 'our-drawing.png';
        link.href = canvas.toDataURL('image/png');
        link.click();
    };

    return (
        <div className="w-full bg-lis-purple/20 backdrop-blur-sm rounded-soft p-4 shadow-soft border-2 border-white/20">
            <div className="flex justify-between items-center mb-4 flex-wrap gap-2">
                <div className="flex space-x-2">
                    <button
                        onClick={() => setTool('pen')}
                        className={`p-2 rounded-soft transition-colors ${tool === 'pen' ? 'bg-lis-peach text-lis-dark' : 'bg-lis-dark/50 text-white'}`}
                        title="Pen"
                    >
                        <PenTool size={20} />
                    </button>
                    <button
                        onClick={() => setTool('eraser')}
                        className={`p-2 rounded-soft transition-colors ${tool === 'eraser' ? 'bg-lis-peach text-lis-dark' : 'bg-lis-dark/50 text-white'}`}
                        title="Eraser"
                    >
                        <Eraser size={20} />
                    </button>
                    <button
                        onClick={handleUndo}
                        disabled={historyStep <= 0}
                        className="p-2 rounded-soft transition-colors bg-lis-dark/50 text-white disabled:opacity-30 disabled:cursor-not-allowed"
                        title="Undo"
                    >
                        <Undo size={20} />
                    </button>
                </div>
                
                <div className="flex space-x-2 flex-wrap gap-1">
                    {['#f5a962', '#5CB8B2', '#E8A0BF', '#E74C3C', '#9B59B6', '#F1C40F', '#2ECC71', '#2C3E50', '#8B4513', '#ffffff'].map((c) => (
                        <button
                            key={c}
                            onClick={() => { setColor(c); setTool('pen'); }}
                            className={`w-6 h-6 rounded-full border-2 transition-all ${color === c && tool === 'pen' ? 'border-white scale-110' : 'border-transparent'}`}
                            style={{ backgroundColor: c }}
                            title="Color"
                        />
                    ))}
                </div>

                <div className="flex space-x-2">
                    <button
                        onClick={handleSave}
                        className="p-2 rounded-soft transition-colors bg-lis-mint/80 text-lis-dark hover:bg-lis-mint"
                        title="Save to browser"
                    >
                        <Save size={20} />
                    </button>
                    <button
                        onClick={handleDownload}
                        className="p-2 rounded-soft transition-colors bg-lis-blue/80 text-white hover:bg-lis-blue"
                        title="Download"
                    >
                        <Download size={20} />
                    </button>
                    <button
                        onClick={handleClear}
                        className="p-2 rounded-soft transition-colors bg-red-500/80 text-white hover:bg-red-500"
                        title="Clear drawing"
                    >
                        <Trash2 size={20} />
                    </button>
                </div>
            </div>

            <div className="relative w-full max-w-4xl mx-auto aspect-[4/3] rounded-soft border-2 border-dashed border-white/30 overflow-hidden cursor-crosshair bg-[#1a1f2e]">
                <canvas
                    ref={canvasRef}
                    onMouseDown={startDrawing}
                    onMouseMove={draw}
                    onMouseUp={stopDrawing}
                    onMouseLeave={stopDrawing}
                    onTouchStart={startDrawing}
                    onTouchMove={draw}
                    onTouchEnd={stopDrawing}
                    className="absolute top-0 left-0 w-full h-full touch-none"
                />
            </div>
            <p className="text-center text-sm text-lis-light/70 font-hand mt-2">Draw something with me...</p>
        </div>
    );
};

export default DrawTogether;
