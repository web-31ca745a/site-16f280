import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const butterflies = [
    './images/decor/doodlebutterfly1.svg',
    './images/decor/doodlebutterfly2.svg',
    './images/decor/doodlebutterfly3.svg',
    './images/decor/doodlebutterfly4.svg'
];

const starryDoodle = './images/decor/starry-doodle-svgrepo-com.svg';

const doodlePaths = {
    home: [
        // Star
        "M12 2l3 7h7l-5 4 2 7-6-4-6 4 2-7-5-4h7z",
        // Shooting star
        "M2 2l20 20M22 22l-5-5M22 22l-5 5"
    ],
    apology: [
        // Broken heart
        "M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z",
        // Teardrop
        "M12 22c4.97 0 9-4.03 9-9 0-4.97-9-13-9-13S3 8.03 3 13c0 4.97 4.03 9 9 9z"
    ],
    growth: [
        // Leaf
        "M12 2C7.5 2 4 6.5 4 12s4.5 10 8 10 8-5.5 8-10S16.5 2 12 2zM12 22v-8",
        // Up arrow
        "M12 4v16M5 11l7-7 7 7"
    ],
    memories: [
        // Polaroid frame
        "M5 3h14c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H5c-1.1 0-2-.9-2-2V5c0-1.1.9-2 2-2zm0 4h14M9 17h6M9 11a3 3 0 106 0 3 3 0 00-6 0z",
        // Sparkle
        "M12 2l1.5 5.5L19 9l-5.5 1.5L12 16l-1.5-5.5L5 9l5.5-1.5L12 2zM6 16l1 3 3 1-3 1-1 3-1-3-3-1 3-1 1-3zM18 16l1 3 3 1-3 1-1 3-1-3-3-1 3-1 1-3z"
    ],
    future: [
        // Path
        "M2 12c2-2 4-2 6 0s4 2 6 0 4-2 6 0",
        // Map marker
        "M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"
    ],
    choice: [
        // Question mark
        "M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 17h-2v-2h2v2zm2.07-7.75l-.9.92C13.45 12.9 13 13.5 13 15h-2v-.5c0-1.1.45-2.1 1.17-2.83l1.24-1.26c.37-.36.59-.86.59-1.41 0-1.1-.9-2-2-2s-2 .9-2 2H8c0-2.21 1.79-4 4-4s4 1.79 4 4c0 .88-.36 1.68-.93 2.25z"
    ]
};

const doodleImages = {
    home: {
        left: [
            { src: './images/polaroids/IMG_20251121_135225_990.jpg', alt: 'First night', caption: 'first night' },
            { src: './images/polaroids/Screenshot_20240726-220423.webp', alt: 'Us sketch', caption: 'us' }
        ],
        right: [
            { src: './images/polaroids/Screenshot_20241126-013719.webp', alt: 'Me + you', caption: 'me + you' }
        ]
    },
    love: {
        left: [
            { src: './images/her-kisses.webp', alt: 'Her with kiss marks', caption: 'Beautiful' },
            { src: './images/her-beanie.webp', alt: 'Her in orange beanie', caption: 'So cute' },
            { src: './images/her-photo.webp', alt: 'Her photo', caption: 'Gorgeous' },
            { src: './images/her-painting-aurora.webp', alt: 'Aurora painting', caption: 'Her painting' }
        ],
        right: [
            { src: './images/doodles/colored-animals.webp', alt: 'Colorful character doodles', caption: 'Doodles' },
            { src: './images/doodles/sketch-animals.webp', alt: 'Sketch character doodles', caption: 'Sketches' },
            { src: './images/doodles/more-doodles.webp', alt: 'More doodles', caption: 'More art' },
            { src: './images/her-sketches-nature.webp', alt: 'Nature sketches', caption: 'Her art' }
        ]
    },
    memories: {
        left: [
            { src: './images/memories/sleepy-call-landscape.webp', alt: 'Her asleep on call', caption: 'sleepy call' },
            { src: './images/memories/minecraft-base.webp', alt: 'Minecraft base', caption: 'our base' },
            { src: './images/memories/fruit-goggles-2.webp', alt: 'Fruit by the foot glasses', caption: 'fruit goggles' }
        ],
        right: [
            { src: './images/memories/minecraft-bunny-bedroom.webp', alt: 'Minecraft bunny and bedroom', caption: 'bunny room' },
            { src: './images/memories/minecraft-house-2.webp', alt: 'Another Minecraft house we built', caption: 'another home' }
        ]
    },
    future: {
        left: [
            { src: './images/polaroids/labyrinth.webp', alt: 'Labyrinth movie night', caption: 'Labyrinth night' },
            { src: './images/polaroids/lastofus2.webp', alt: 'The Last of Us Part II', caption: 'TLOU Pt.2' },
            { src: './images/polaroids/mariokart8.webp', alt: 'Mario Kart 8 cover', caption: 'Mario Ka- maybe not this one' }
        ],
        right: [
            { src: './images/polaroids/littlenightmares3.webp', alt: 'Little Nightmares 3 cover', caption: 'Little Nightmares 3' },
            { src: './images/polaroids/prisoner_azkaban.webp', alt: 'Prisoner of Azkaban cover', caption: 'Prisoner of Azkaban' }
        ]
    },
    choice: {
        left: [
            { src: './images/polaroids/choice-1.png', alt: 'Our hopes and dreams', caption: 'our dreams' },
            { src: './images/polaroids/choice-2.png', alt: 'Our future plans', caption: 'future plans' },
            { src: './images/polaroids/choice-3.png', alt: 'What we wanted', caption: 'what we wanted' },
            { src: './images/polaroids/choice-4.png', alt: 'Our wishes', caption: 'our wishes' }
        ],
        right: [
            { src: './images/polaroids/choice-5.png', alt: 'Together forever', caption: 'together' },
            { src: './images/polaroids/choice-6.png', alt: 'Building our future', caption: 'building us' },
            { src: './images/polaroids/choice-7.png', alt: 'Our story', caption: 'our story' },
            { src: './images/polaroids/choice-8.png', alt: 'Making dreams real', caption: 'making it real' }
        ]
    }
};

const MarginDoodles = ({ side, activeTab, onImageClick }) => {
    // Check if this tab uses images or SVG paths
    const usesImages = Boolean(doodleImages[activeTab]);
    const doodles = usesImages ? doodleImages[activeTab][side] : (doodlePaths[activeTab] || doodlePaths.home);
    
    // Tab-specific positions for polaroids
    const polaroidPositions = {
        home: {
            left: [
                { top: 6, left: 10, rotation: -10 },
                { top: 52, left: 20, rotation: 9 }
            ],
            right: [
                { top: 8, left: 18, rotation: 7 }
            ]
        },
        love: {
            left: [
                { top: 6, left: 10, rotation: -10 },
                { top: 26, left: 42, rotation: 9 },
                { top: 46, left: 18, rotation: -6 },
                { top: 66, left: 56, rotation: 7 }
            ],
            right: [
                { top: 8, left: 18, rotation: 7 },
                { top: 30, left: 58, rotation: -9 },
                { top: 50, left: 26, rotation: 5 },
                { top: 64, left: 64, rotation: -7 }
            ]
        },
        memories: {
            left: [
                { top: 10, left: 14, rotation: -9 },
                { top: 38, left: 28, rotation: 8 },
                { top: 66, left: 10, rotation: -6 }
            ],
            right: [
                { top: 16, left: 36, rotation: 10 },
                { top: 54, left: 62, rotation: -8 }
            ]
        },
        future: {
            left: [
                { top: 6, left: 10, rotation: -10 },
                { top: 26, left: 42, rotation: 9 },
                { top: 46, left: 18, rotation: -6 }
            ],
            right: [
                { top: 8, left: 18, rotation: 7 },
                { top: 30, left: 58, rotation: -9 }
            ]
        },
        choice: {
            left: [
                { top: 6, left: 10, rotation: -10 },
                { top: 26, left: 42, rotation: 9 },
                { top: 46, left: 18, rotation: -6 },
                { top: 66, left: 56, rotation: 7 }
            ],
            right: [
                { top: 8, left: 18, rotation: 7 },
                { top: 30, left: 58, rotation: -9 },
                { top: 50, left: 26, rotation: 5 },
                { top: 70, left: 64, rotation: -7 }
            ]
        }
    };
    
    const positionsBySide = polaroidPositions[activeTab] || {
        left: [
            { top: 6, left: 10, rotation: -10 },
            { top: 26, left: 42, rotation: 9 },
            { top: 46, left: 18, rotation: -6 },
            { top: 66, left: 56, rotation: 7 },
            { top: 78, left: 30, rotation: -4 }
        ],
        right: [
            { top: 8, left: 18, rotation: 7 },
            { top: 30, left: 58, rotation: -9 },
            { top: 50, left: 26, rotation: 5 },
            { top: 64, left: 64, rotation: -7 },
            { top: 74, left: 40, rotation: 4 }
        ]
    };

    return (
        <div className={`relative w-full h-full pointer-events-none ${usesImages ? 'opacity-90' : 'opacity-30'}`}>
            <AnimatePresence mode="wait">
                <motion.div
                    key={activeTab}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.5 }}
                    className="w-full h-full"
                >
                    {usesImages ? (
                        // Render polaroid-style images for love tab
                        doodles.map((doodle, index) => {
                            const positions = positionsBySide[side] || positionsBySide.left;
                            const pos = positions[index] || positions[positions.length - 1];
                            
                            // Pick butterfly based on index and side to ensure variety
                            const butterflyIndex = (index + (side === 'right' ? 2 : 0)) % butterflies.length;
                            const butterfly = butterflies[butterflyIndex];
                            
                            // Randomly add starry doodle to some polaroids (about 30% chance)
                            const showStarry = (index * 7 + (side === 'right' ? 3 : 1)) % 10 < 3;
                            
                            // Vary butterfly position (avoiding center and photo)
                            // Keeping them in the white bottom margin area
                            const butterflyPositions = [
                                'bottom-2 right-2',
                                'bottom-2 left-2',
                                'bottom-3 right-1',
                                'bottom-3 left-1'
                            ];
                            const butterflyPos = butterflyPositions[index % butterflyPositions.length];
                            
                            // Starry position - in the white margin area with butterfly
                            const starryPositions = [
                                'bottom-2 left-2',
                                'bottom-2 right-2',
                                'bottom-3 left-1',
                                'bottom-3 right-1'
                            ];
                            const starryPos = starryPositions[index % starryPositions.length];

                            return (
                                <motion.div
                                    key={index}
                                    drag
                                    dragMomentum={false}
                                    dragElastic={0.1}
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        onImageClick?.(doodle);
                                    }}
                                    className="absolute cursor-pointer z-10 hover:z-50 pointer-events-auto"
                                    style={{
                                        top: `${pos.top}%`,
                                        left: `${pos.left}%`,
                                        width: '190px',
                                        rotate: pos.rotation
                                    }}
                                    initial={{
                                        scale: 0,
                                        opacity: 0,
                                        y: -50
                                    }}
                                    animate={{
                                        scale: 1,
                                        opacity: 1,
                                        y: [0, -15, 0]
                                    }}
                                    transition={{
                                        scale: {
                                            duration: 0.8,
                                            ease: "easeOut",
                                            delay: index * 0.3
                                        },
                                        opacity: {
                                            duration: 0.8,
                                            ease: "easeOut",
                                            delay: index * 0.3
                                        },
                                        y: {
                                            duration: 6 + index * 2,
                                            ease: "easeInOut",
                                            repeat: Infinity,
                                            repeatType: "reverse"
                                        }
                                    }}
                                    whileHover={{ scale: 1.05 }}
                                    whileDrag={{ scale: 1.1, zIndex: 100 }}
                                >
                                    {/* Polaroid frame */}
                                    <div className="bg-brutal-white p-3 pb-8 border-2 border-lis-dark/20 shadow-brutal transition-shadow rounded-soft relative">
                                        <div className="bg-lis-mint/50 overflow-hidden mb-2 border border-lis-dark/20 rounded-soft">
                                            <img
                                                src={doodle.src}
                                                alt={doodle.alt}
                                                className="w-full h-auto object-contain pointer-events-none select-none"
                                                draggable="false"
                                            />
                                        </div>
                                        <p className="font-hand text-lis-dark text-center text-lg leading-none font-bold select-none">{doodle.caption}</p>
                                        
                                        {/* Butterfly decoration */}
                                        <img 
                                            src={butterfly}
                                            alt=""
                                            className={`absolute ${butterflyPos} w-12 h-12 opacity-100 pointer-events-none select-none`}
                                            draggable="false"
                                        />
                                        
                                        {/* Starry doodle - randomly on some polaroids */}
                                        {showStarry && (
                                            <img 
                                                src={starryDoodle}
                                                alt=""
                                                className={`absolute ${starryPos} w-8 h-8 opacity-60 pointer-events-none select-none`}
                                                draggable="false"
                                            />
                                        )}
                                    </div>
                                </motion.div>
                            );
                        })
                    ) : (
                        // Render SVG paths for other tabs
                        doodles.map((path, index) => (
                            <motion.svg
                                key={index}
                                viewBox="0 0 24 24"
                                className="absolute w-12 h-12 text-cream"
                                style={{
                                    top: `${(index + 1) * 20}%`,
                                    left: side === 'left' ? `${Math.random() * 50}%` : `${50 + Math.random() * 40}%`,
                                    transform: `rotate(${Math.random() * 360}deg)`
                                }}
                            >
                                <motion.path
                                    d={path}
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="0.5"
                                    initial={{ pathLength: 0 }}
                                    animate={{ pathLength: 1 }}
                                    transition={{
                                        duration: 2,
                                        ease: "easeInOut",
                                        repeat: Infinity,
                                        repeatType: "reverse",
                                        repeatDelay: 1
                                    }}
                                />
                            </motion.svg>
                        ))
                    )}
                </motion.div>
            </AnimatePresence>
        </div>
    );
};

export default MarginDoodles;
