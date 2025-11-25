import React, { useState, useRef, useEffect } from 'react';
import { createPortal } from 'react-dom';
import confetti from 'canvas-confetti';
import { motion, AnimatePresence } from 'framer-motion';

const ChoiceButtons = () => {
    const [showVideo, setShowVideo] = useState(null); // 'yes', 'no'
    const [showAudio, setShowAudio] = useState(false);
    const audioRef = useRef(null);

    const handleYes = () => {
        confetti({
            particleCount: 100,
            spread: 70,
            origin: { y: 0.6 },
            colors: ['#4A90E2', '#5CB8B2', '#F5A962', '#E8A0BF']
        });
        setShowVideo('yes');
    };

    const handleNo = () => {
        setShowAudio(true);
    };

    const handleVideoPlay = () => {
        window.dispatchEvent(new CustomEvent('videoPlayerStarted'));
    };

    const handleVideoPause = () => {
        window.dispatchEvent(new CustomEvent('videoPlayerStopped'));
    };

    const handleVideoEnded = () => {
        window.dispatchEvent(new CustomEvent('videoPlayerStopped'));
    };

    const handleAudioPlay = () => {
        window.dispatchEvent(new CustomEvent('videoPlayerStarted'));
    };

    const handleAudioPause = () => {
        window.dispatchEvent(new CustomEvent('videoPlayerStopped'));
    };

    const handleAudioEnded = () => {
        window.dispatchEvent(new CustomEvent('videoPlayerStopped'));
    };

    const closeVideo = () => {
        window.dispatchEvent(new CustomEvent('videoPlayerStopped'));
        setShowVideo(null);
    };

    const closeAudio = () => {
        if (audioRef.current) {
            audioRef.current.pause();
            audioRef.current.currentTime = 0;
        }
        window.dispatchEvent(new CustomEvent('videoPlayerStopped'));
        setShowAudio(false);
    };

    // Auto-play audio when modal opens
    useEffect(() => {
        if (showAudio && audioRef.current) {
            audioRef.current.play();
        }
    }, [showAudio]);

    return (
        <>
            <div className="flex flex-col items-center space-y-8 w-full">
                <div className="flex flex-wrap justify-center gap-4 md:gap-8">
                    <motion.button
                        whileHover={{ scale: 1.05, y: -4 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={handleYes}
                        className="px-8 py-4 bg-lis-mint text-lis-dark font-hand font-bold text-xl border-2 border-lis-teal/40 shadow-soft-lg hover:bg-lis-teal hover:text-brutal-white transition-colors rounded-soft"
                    >
                        Yes, let's try
                    </motion.button>

                    <motion.button
                        whileHover={{ scale: 1.05, y: -4 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={handleNo}
                        className="px-8 py-4 bg-lis-lavender text-brutal-white font-hand font-bold text-xl border-2 border-lis-purple/40 shadow-soft-lg hover:bg-lis-pink transition-colors rounded-soft"
                    >
                        No, I can't
                    </motion.button>
                </div>
            </div>

            {showVideo && createPortal(
                <AnimatePresence>
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[9999] flex items-center justify-center bg-brutal-black/90 p-4"
                        onClick={closeVideo}
                    >
                        <div 
                            className="relative w-full max-w-4xl bg-lis-white border-2 border-lis-dark/30 shadow-soft-lg p-4 rounded-soft"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <button
                                onClick={closeVideo}
                                className="absolute -top-12 right-0 bg-lis-purple text-brutal-white font-hand font-bold border-2 border-lis-dark/40 px-4 py-2 hover:bg-lis-pink rounded-soft"
                            >
                                Close
                            </button>
                            <div className="aspect-video bg-brutal-black border-2 border-lis-dark/30 flex items-center justify-center rounded-soft overflow-hidden">
                                <video 
                                    src={`/videos/response-${showVideo}.mp4`} 
                                    controls 
                                    autoPlay 
                                    className="w-full h-full"
                                    onPlay={handleVideoPlay}
                                    onPause={handleVideoPause}
                                    onEnded={handleVideoEnded}
                                />
                            </div>
                        </div>
                    </motion.div>
                </AnimatePresence>,
                document.body
            )}

            {showAudio && createPortal(
                <AnimatePresence>
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[9999] flex items-center justify-center bg-brutal-black/90 p-4"
                        onClick={closeAudio}
                    >
                        <div 
                            className="relative w-full max-w-2xl bg-lis-white border-2 border-lis-dark/30 shadow-soft-lg p-8 rounded-soft"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <button
                                onClick={closeAudio}
                                className="absolute -top-12 right-0 bg-lis-purple text-brutal-white font-hand font-bold border-2 border-lis-dark/40 px-4 py-2 hover:bg-lis-pink rounded-soft"
                            >
                                Close
                            </button>
                            <div className="flex flex-col items-center space-y-6">
                                <h3 className="text-3xl font-hand text-lis-dark font-bold">💔</h3>
                                <audio 
                                    ref={audioRef}
                                    controls 
                                    className="w-full"
                                    onPlay={handleAudioPlay}
                                    onPause={handleAudioPause}
                                    onEnded={handleAudioEnded}
                                >
                                    <source src="./noicant.wav" type="audio/wav" />
                                    Your browser does not support the audio element.
                                </audio>
                            </div>
                        </div>
                    </motion.div>
                </AnimatePresence>,
                document.body
            )}
        </>
    );
};

export default ChoiceButtons;
