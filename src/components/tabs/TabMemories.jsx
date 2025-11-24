import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { clsx } from 'clsx';
import { letterContent } from '../../data/letterContent';
import FormattedText from '../utils/FormattedText';
import AestheticPlayer from '../interactive/AestheticPlayer';

const MemoryPhoto = ({ src, alt, caption, side = 'left' }) => {
    return (
        <figure
            className={clsx(
                "w-full sm:w-60 bg-brutal-white p-3 pb-6 border-2 border-lis-dark/20 shadow-brutal rounded-soft",
                side === 'left' ? "float-left mr-6 mb-4 -rotate-2" : "float-right ml-6 mb-4 rotate-2"
            )}
        >
            <div className="bg-lis-mint/50 overflow-hidden border border-lis-dark/20 rounded-soft">
                <img
                    src={src}
                    alt={alt}
                    className="w-full h-auto object-contain select-none"
                    draggable="false"
                />
            </div>
            <figcaption className="font-hand text-lis-dark text-center text-lg font-bold mt-2 leading-none">
                {caption}
            </figcaption>
        </figure>
    );
};

const MinecraftGallery = () => {
    const shots = [
        { src: './images/memories/minecraft-house-exterior.webp', alt: 'Our Minecraft house exterior', caption: 'our house' },
        { src: './images/memories/minecraft-house-interior.webp', alt: 'Inside our Minecraft house', caption: 'inside our home' },
        { src: './images/memories/minecraft-lilypad-garden.webp', alt: 'Lilypad shaped garden', caption: 'lilypad garden' }
    ];

    return (
        <div className="mt-4 grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 bg-lis-dark/60 border border-white/10 rounded-soft p-3 sm:p-4 shadow-soft">
            {shots.map((shot, index) => (
                <div
                    key={index}
                    className="bg-brutal-white p-2 pb-4 border-2 border-lis-dark/20 shadow-brutal rounded-soft"
                >
                    <div className="bg-lis-mint/40 rounded-soft border border-lis-dark/20 overflow-hidden">
                        <img
                            src={shot.src}
                            alt={shot.alt}
                            className="w-full h-auto object-contain select-none"
                            draggable="false"
                        />
                    </div>
                    <p className="font-hand text-lis-dark text-center text-lg font-bold mt-2 leading-none">
                        {shot.caption}
                    </p>
                </div>
            ))}
        </div>
    );
};

const TabMemories = () => {
    const [showPlayer, setShowPlayer] = useState(true);

    const inlinePhotos = {
        1: {
            src: './images/memories/sleepy-call-portrait.webp',
            alt: 'Her asleep on a Discord call',
            caption: 'falling asleep with me on call',
            side: 'left'
        },
        6: {
            src: './images/memories/fruit-goggles-1.webp',
            alt: 'Fruit by the Foot worn as glasses',
            caption: 'fruit by the foot goggles',
            side: 'right'
        },
        8: {
            src: './images/memories/steamdeck-first-day.webp',
            alt: 'Her playing on my Steam Deck the day we met',
            caption: 'the day we met',
            side: 'left'
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="w-full pb-12 px-0 md:px-4 space-y-10"
        >
            {/* Audio Player Test */}
            {showPlayer && (
                <div className="max-w-4xl mx-auto mb-6">
                    <AestheticPlayer 
                        track={{ src: '/audio/Syd Matters - Obstacles.mp3' }}
                        onClose={() => setShowPlayer(false)}
                    />
                </div>
            )}

            <div className="cosmic-card hand-border space-y-0 max-w-4xl mx-auto transform rotate-0 md:rotate-1">
                <h2 className="text-4xl font-hand text-white text-center mb-8 font-bold leading-[32px] pt-6 drop-shadow-md">
                    What I Miss About Us
                </h2>

                {letterContent.memories.paragraphs.map((paragraph, index) => {
                    const photo = inlinePhotos[index];
                    const showMinecraftGallery = index === 3;

                    return (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1, duration: 0.6 }}
                            className="mb-8 last:mb-0"
                        >
                            {photo && (
                                <MemoryPhoto
                                    src={photo.src}
                                    alt={photo.alt}
                                    caption={photo.caption}
                                    side={photo.side}
                                />
                            )}
                            <p className="text-3xl leading-[42px] text-lis-light font-hand font-bold drop-shadow-sm">
                                <FormattedText text={paragraph} />
                            </p>

                            {showMinecraftGallery && <MinecraftGallery />}

                            <div className="clear-both"></div>
                        </motion.div>
                    );
                })}
            </div>
        </motion.div>
    );
};

export default TabMemories;
