import React from 'react';
import { motion } from 'framer-motion';
import ConstellationGame from '../interactive/ConstellationGame';

const TabHome = () => {
    const handleVideoPlay = () => {
        window.dispatchEvent(new CustomEvent('videoPlayerStarted'));
    };

    const handleVideoPause = () => {
        window.dispatchEvent(new CustomEvent('videoPlayerStopped'));
    };

    const handleVideoEnded = () => {
        window.dispatchEvent(new CustomEvent('videoPlayerStopped'));
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
            className="flex flex-col items-center space-y-8 px-0 md:px-4"
        >
            <div className="w-full max-w-4xl cosmic-card hand-border space-y-8">
                <div className="aspect-video bg-brutal-black relative overflow-hidden border-2 border-white/20 rounded-soft shadow-inner">
                    <video
                        className="w-full h-full object-cover opacity-80 hover:opacity-100 transition-opacity duration-500"
                        controls
                        onPlay={handleVideoPlay}
                        onPause={handleVideoPause}
                        onEnded={handleVideoEnded}
                    >
                        <source src="./intro-video.mp4" type="video/mp4" />
                        Your browser does not support the video tag.
                    </video>
                </div>
                <div className="font-hand text-4xl text-white text-center font-bold drop-shadow-md">
                    Hey Bella...
                </div>

                <div className="text-center space-y-6 pt-6 border-t border-white/10">
                    <p className="text-3xl leading-[42px] text-lis-light font-hand font-bold drop-shadow-sm">
                        I made this for you. It's a little collection of thoughts, memories, and things I wanted to say but couldn't find the right words for until now.
                    </p>
                    <p className="text-xl font-mono text-lis-blue/80 italic">
                        (Explore the tabs above, and don't forget to check the cassette player)
                    </p>
                    <div className="mt-4 p-4 bg-lis-pink/20 border-2 border-lis-pink/50 rounded-soft">
                        <p className="text-2xl font-hand font-bold text-lis-pink drop-shadow-md">
                            ✨ Click the polaroids in the margins to see them up close! ✨
                        </p>
                    </div>
                </div>
            </div>

            <div className="w-full py-8">
                <h3 className="text-3xl font-hand text-center mb-6 text-brutal-white bg-lis-blue/80 backdrop-blur-sm border-2 border-lis-darkblue/30 shadow-soft inline-block px-6 py-3 font-bold rounded-soft">
                    Connect the stars...
                </h3>
                <ConstellationGame />
            </div>
        </motion.div>
    );
};

export default TabHome;
