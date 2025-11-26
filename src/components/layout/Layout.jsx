import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Starfield from './Starfield';
import Navigation from './Navigation';
import MarginDoodles from './MarginDoodles';
import CassettePlayer from '../interactive/CassettePlayer';

const Layout = ({ children, activeTab, onTabChange }) => {
    const [focusedImage, setFocusedImage] = useState(null);
    
    return (
        <div className="min-h-screen relative overflow-hidden font-body text-lis-light">
            <Starfield />

            {/* Margin Doodles - Left */}
            <div className="fixed left-0 top-0 h-full w-[25%] hidden lg:block z-10">
                <MarginDoodles side="left" activeTab={activeTab} onImageClick={setFocusedImage} />
            </div>

            {/* Top Right Corner Vines SVG */}
            <div className="fixed right-0 top-2 w-48 h-64 lg:w-64 lg:h-80 z-30 pointer-events-none hidden md:block">
                <img 
                    src="./images/decor/cornervines.svg" 
                    alt="Corner vines decoration" 
                    className="w-full h-full object-contain"
                />
            </div>

            {/* Margin Doodles - Right */}
            <div className="fixed right-0 top-0 h-full w-[25%] hidden lg:block z-10">
                <MarginDoodles side="right" activeTab={activeTab} onImageClick={setFocusedImage} />
            </div>

            {/* Main Content */}
            <main className="relative z-20 w-full max-w-5xl mx-auto min-h-screen flex flex-col p-4 md:p-8">
                <Navigation activeTab={activeTab} onTabChange={onTabChange} />

                <div className="flex-grow bg-lis-dark/90 backdrop-blur-sm border-4 border-brutal-black shadow-brutal-lg p-2 md:p-10 relative">
                    {/* Top Left Butterfly SVG - positioned at corner of main box */}
                    <div className="absolute -left-20 -top-12 w-40 h-40 lg:-left-28 lg:-top-16 lg:w-56 lg:h-56 z-10 pointer-events-none">
                        <img 
                            src="./images/decor/path1.svg" 
                            alt="Butterfly decoration" 
                            className="w-full h-full object-contain"
                        />
                    </div>

                    {children}
                </div>
            </main>

            <CassettePlayer />
            
            {/* Modal overlay for focused polaroid - renders at top level */}
            <AnimatePresence>
                {focusedImage && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setFocusedImage(null)}
                        className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[9999] flex items-center justify-center pointer-events-auto cursor-pointer p-4"
                    >
                        <motion.div
                            initial={{ scale: 0.5, rotate: -10, opacity: 0 }}
                            animate={{ scale: 1, rotate: 0, opacity: 1 }}
                            exit={{ scale: 0.5, rotate: 10, opacity: 0 }}
                            transition={{ type: "spring", duration: 0.5 }}
                            onClick={(e) => e.stopPropagation()}
                            className="relative max-w-lg w-full"
                        >
                            {/* Large centered polaroid */}
                            <div className="bg-brutal-white p-4 pb-10 border-4 border-lis-dark/30 shadow-brutal-lg rounded-soft relative">
                                <div className="bg-lis-mint/50 overflow-hidden border-2 border-lis-dark/20 rounded-soft">
                                    <img
                                        src={focusedImage.src}
                                        alt={focusedImage.alt}
                                        className="w-full h-auto object-contain select-none"
                                        draggable="false"
                                    />
                                </div>
                                <p className="font-hand text-lis-dark text-center text-2xl font-bold mt-3 select-none">
                                    {focusedImage.caption}
                                </p>
                                
                                {/* Close button */}
                                <button
                                    onClick={() => setFocusedImage(null)}
                                    className="absolute -top-3 -right-3 w-10 h-10 bg-lis-pink border-2 border-lis-dark/30 rounded-full shadow-brutal flex items-center justify-center text-white font-bold text-xl hover:scale-110 transition-transform"
                                    aria-label="Close"
                                >
                                    ×
                                </button>
                            </div>
                            
                            {/* Instruction text */}
                            <p className="text-center text-white/80 font-hand text-lg mt-4">
                                Click anywhere to close
                            </p>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default Layout;
