import React, { useState, useEffect } from 'react';
import { Howl } from 'howler';
import { audioTracks } from '../../data/audioTracks';
import { Play, Pause, SkipForward, SkipBack, Volume2, VolumeX, Music, ChevronDown, ChevronUp } from 'lucide-react';
import { clsx } from 'clsx';
import { motion, AnimatePresence } from 'framer-motion';

const CassettePlayer = () => {
    const [isPlaying, setIsPlaying] = useState(false);
    const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
    const [sound, setSound] = useState(null);
    const [isMuted, setIsMuted] = useState(false);
    const [isOpen, setIsOpen] = useState(true);

    // Check for mobile on mount to default to closed
    useEffect(() => {
        if (window.innerWidth < 768) {
            setIsOpen(false);
        }
    }, []);

    const currentTrack = audioTracks[currentTrackIndex];

    useEffect(() => {
        if (sound) {
            sound.unload();
        }

        const newSound = new Howl({
            src: [currentTrack.file],
            html5: true,
            loop: true,
            volume: 0.5,
            onend: () => {
                handleNext();
            }
        });

        setSound(newSound);

        if (isPlaying) {
            newSound.play();
        }

        return () => {
            newSound.unload();
        };
    }, [currentTrackIndex]);

    const togglePlay = () => {
        if (!sound) return;

        if (isPlaying) {
            sound.pause();
        } else {
            sound.play();
        }
        setIsPlaying(!isPlaying);
    };

    const handleNext = () => {
        setCurrentTrackIndex((prev) => (prev + 1) % audioTracks.length);
    };

    const handlePrev = () => {
        setCurrentTrackIndex((prev) => (prev - 1 + audioTracks.length) % audioTracks.length);
    };

    const toggleMute = () => {
        if (!sound) return;
        sound.mute(!isMuted);
        setIsMuted(!isMuted);
    };

    return (
        <div className="fixed bottom-4 right-4 z-50 flex flex-col items-end">
            <AnimatePresence mode="wait">
                {isOpen ? (
                    <motion.div
                        key="player"
                        initial={{ opacity: 0, scale: 0.9, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: 20 }}
                        transition={{ duration: 0.2 }}
                        className="bg-lis-lavender border-2 border-lis-dark/30 p-4 shadow-soft-lg w-64 rounded-soft relative"
                    >
                        {/* Toggle Button */}
                        <button
                            onClick={() => setIsOpen(false)}
                            className="absolute -top-3 -right-3 bg-lis-blue text-white p-1 rounded-full border-2 border-lis-dark shadow-sm hover:bg-lis-teal transition-colors z-10"
                        >
                            <ChevronDown size={16} />
                        </button>

                        {/* Cassette Visual */}
                        <div className="bg-lis-dark border-2 border-lis-dark/30 p-2 mb-3 relative overflow-hidden h-24 flex items-center justify-center rounded-soft">
                            <div className="absolute w-full h-1 bg-lis-dark/50 top-1/2 transform -translate-y-1/2"></div>
                            <div className={clsx("w-12 h-12 rounded-full border-4 border-lis-blue bg-lis-darker mx-2 flex items-center justify-center", isPlaying && "animate-spin-slow")}>
                                <div className="w-2 h-2 bg-lis-blue rounded-full"></div>
                            </div>
                            <div className={clsx("w-12 h-12 rounded-full border-4 border-lis-blue bg-lis-darker mx-2 flex items-center justify-center", isPlaying && "animate-spin-slow")}>
                                <div className="w-2 h-2 bg-lis-blue rounded-full"></div>
                            </div>
                        </div>

                        {/* Track Info */}
                        <div className="mb-2 text-center bg-lis-light border-2 border-lis-dark/20 p-1 rounded-soft">
                            <p className="font-mono text-xs font-bold text-lis-dark truncate">{currentTrack.title}</p>
                        </div>

                        {/* Controls */}
                        <div className="flex justify-between items-center bg-lis-dark border-2 border-lis-dark/30 p-2 rounded-soft">
                            <button onClick={handlePrev} className="text-lis-blue hover:text-lis-teal transition-colors">
                                <SkipBack size={16} />
                            </button>
                            <button onClick={togglePlay} className="text-lis-blue hover:text-lis-teal transition-colors">
                                {isPlaying ? <Pause size={20} /> : <Play size={20} />}
                            </button>
                            <button onClick={handleNext} className="text-lis-blue hover:text-lis-teal transition-colors">
                                <SkipForward size={16} />
                            </button>
                            <div className="w-px h-4 bg-lis-dark/30 mx-1"></div>
                            <button onClick={toggleMute} className="text-lis-blue hover:text-lis-teal transition-colors">
                                {isMuted ? <VolumeX size={16} /> : <Volume2 size={16} />}
                            </button>
                        </div>
                    </motion.div>
                ) : (
                    <motion.button
                        key="minimized"
                        initial={{ opacity: 0, scale: 0.5 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.5 }}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => setIsOpen(true)}
                        className={clsx(
                            "w-12 h-12 rounded-full border-2 border-lis-dark/30 shadow-soft-lg flex items-center justify-center transition-colors",
                            isPlaying ? "bg-lis-blue text-white animate-pulse-slow" : "bg-lis-lavender text-lis-dark"
                        )}
                    >
                        <Music size={24} />
                    </motion.button>
                )}
            </AnimatePresence>
        </div>
    );
};

export default CassettePlayer;
