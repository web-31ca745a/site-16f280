import React, { useState } from 'react';
import { motion } from 'framer-motion';

const WalmartCard = ({ imagePath }) => {
    const [isFlipped, setIsFlipped] = useState(false);

    const handleFlip = () => {
        console.log('Card clicked! Current state:', isFlipped);
        setIsFlipped(!isFlipped);
    };

    return (
        <div className="float-right ml-6 mb-6 w-64 sm:w-80 relative z-50">
            <motion.div
                className="relative w-full cursor-pointer z-50"
                style={{ perspective: '1000px', height: '400px' }}
                onClick={handleFlip}
                onPointerDown={(e) => {
                    console.log('Pointer down detected!');
                }}
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.2 }}
            >
                <motion.div
                    className="w-full h-full relative"
                    initial={false}
                    animate={{ rotateY: isFlipped ? 180 : 0 }}
                    transition={{ duration: 0.6, type: 'spring', stiffness: 100 }}
                    style={{ transformStyle: 'preserve-3d' }}
                >
                    {/* Front of card */}
                    <div
                        className="absolute w-full h-full"
                        style={{ 
                            backfaceVisibility: 'hidden',
                            WebkitBackfaceVisibility: 'hidden'
                        }}
                    >
                        <div className="bg-white p-4 shadow-xl h-full flex flex-col rounded-soft">
                            <div className="flex-1 bg-gray-100 mb-3 overflow-hidden">
                                {imagePath ? (
                                    <img
                                        src={imagePath}
                                        alt="Walmart photo"
                                        className="w-full h-full object-contain"
                                    />
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center text-gray-400">
                                        [Add Walmart photo here]
                                    </div>
                                )}
                            </div>
                            <p className="text-center font-hand text-xl text-gray-700">
                                Click to flip 💕
                            </p>
                        </div>
                    </div>

                    {/* Back of card */}
                    <div
                        className="absolute w-full h-full"
                        style={{ 
                            backfaceVisibility: 'hidden',
                            WebkitBackfaceVisibility: 'hidden',
                            transform: 'rotateY(180deg)'
                        }}
                    >
                        <div className="bg-gradient-to-br from-pink-100 via-purple-100 to-blue-100 p-6 shadow-xl h-full flex flex-col items-center justify-center rounded-soft overflow-hidden">
                            <div className="text-center space-y-3 max-w-full">
                                <p className="font-hand text-xl text-gray-700">
                                    What I really wanted to say:
                                </p>
                                <p className="font-hand text-2xl font-bold text-pink-600 leading-tight px-2">
                                    BABBYYYYYYYYY YOU LOOK SO FUCKING GOOD, LITERAL ANGEL ON PLANET EARTH, YOU'RE SO FUCKING STUNNING
                                </p>
                                <div className="text-3xl">
                                    💞💞💞💞💞💞
                                </div>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </motion.div>
        </div>
    );
};

export default WalmartCard;
