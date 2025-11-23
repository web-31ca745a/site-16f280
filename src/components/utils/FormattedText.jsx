import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// Parses text with special formatting markers:
// **text** = pink highlight
// ~~strikethrough~~ = strikethrough
// __text__ = emphasis color
// {{video:path|text}} = clickable video link

const FormattedText = ({ text, className = "" }) => {
    const [showVideo, setShowVideo] = useState(null);
    
    // Check if text should be hidden (for preview sharing)
    const hideText = import.meta.env.VITE_HIDE_TEXT === 'true';
    
    if (hideText) {
        return <span className={className}>████████████████████</span>;
    }
    
    const parseText = (text) => {
        const parts = [];
        let currentIndex = 0;
        let key = 0;

        // Regex to match **text**, ~~text~~, __text__, or {{video:path|text}}
        const regex = /(\*\*.*?\*\*|~~.*?~~|__.*?__|{{video:.*?\|.*?}})/g;
        let match;

        while ((match = regex.exec(text)) !== null) {
            // Add text before the match
            if (match.index > currentIndex) {
                parts.push(
                    <span key={key++}>{text.slice(currentIndex, match.index)}</span>
                );
            }

            const matchedText = match[0];

            // Determine formatting
            if (matchedText.startsWith('{{video:')) {
                // Clickable video link
                const videoContent = matchedText.slice(8, -2); // Remove {{video: and }}
                const [videoPath, linkText] = videoContent.split('|');
                parts.push(
                    <button
                        key={key++}
                        onClick={() => setShowVideo(videoPath)}
                        className="text-blue-400 font-extrabold underline decoration-2 decoration-blue-400/50 hover:decoration-blue-400 hover:text-blue-300 transition-all cursor-pointer hover:scale-110 inline-block font-mono text-4xl"
                    >
                        {linkText}
                    </button>
                );
            } else if (matchedText.startsWith('**')) {
                const innerText = matchedText.slice(2, -2);
                // Pink highlight for "I love you" and "bella"
                parts.push(
                    <span key={key++} className="text-pink-400 font-extrabold">
                        {innerText}
                    </span>
                );
            } else if (matchedText.startsWith('~~')) {
                const innerText = matchedText.slice(2, -2);
                // Strikethrough with lighter color
                parts.push(
                    <span key={key++} className="line-through opacity-60 text-gray-300">
                        {innerText}
                    </span>
                );
            } else if (matchedText.startsWith('__')) {
                const innerText = matchedText.slice(2, -2);
                // Emphasis color (yellow/gold)
                parts.push(
                    <span key={key++} className="text-yellow-300 font-extrabold">
                        {innerText}
                    </span>
                );
            }

            currentIndex = regex.lastIndex;
        }

        // Add remaining text
        if (currentIndex < text.length) {
            parts.push(<span key={key++}>{text.slice(currentIndex)}</span>);
        }

        return parts;
    };

    return (
        <>
            <span className={className}>{parseText(text)}</span>
            
            <AnimatePresence>
                {showVideo && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[9999] flex items-center justify-center bg-brutal-black/90 p-4"
                        onClick={() => setShowVideo(null)}
                    >
                        <div 
                            className="relative w-full max-w-4xl bg-lis-white border-2 border-lis-dark/30 shadow-soft-lg p-4 rounded-soft"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <button
                                onClick={() => setShowVideo(null)}
                                className="absolute -top-12 right-0 bg-lis-purple text-brutal-white font-hand font-bold border-2 border-lis-dark/40 px-4 py-2 hover:bg-lis-pink rounded-soft"
                            >
                                Close
                            </button>
                            <div className="aspect-video bg-brutal-black border-2 border-lis-dark/30 flex items-center justify-center rounded-soft overflow-hidden">
                                <video src={showVideo} controls autoPlay className="w-full h-full" />
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
};

export default FormattedText;
