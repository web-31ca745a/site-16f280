import React from 'react';
import { motion } from 'framer-motion';
import { letterContent } from '../../data/letterContent';
import { polaroids } from '../../data/polaroidData';
import { postcards } from '../../data/postcardData';
import DraggablePolaroid from '../interactive/DraggablePolaroid';
import PostcardFlip from '../interactive/PostcardFlip';
import WalmartCard from '../interactive/WalmartCard';
import FormattedText from '../utils/FormattedText';

const TabLove = () => {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="w-full pb-12 px-0 md:px-4"
        >
            {/* Wide text content - no polaroids interfering */}
            <div className="max-w-4xl mx-auto mb-12 cosmic-card hand-border space-y-6">
                <h2 className="text-4xl font-hand text-white text-center mb-4 font-bold drop-shadow-md">
                    Why I Love You
                </h2>

                {letterContent.love.paragraphs.map((paragraph, index) => {
                    if (paragraph === 'WALMART_CARD_PLACEHOLDER') {
                        return (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1, duration: 0.6 }}
                                className="pb-4 border-b border-white/10"
                            >
                                <WalmartCard imagePath="/images/cat-sweater.webp" />
                                <p className="text-3xl leading-[42px] text-lis-light font-hand font-bold drop-shadow-sm">
                                    <FormattedText text="You're the most beautiful girl on the entire planet, your fashion also really fucking leveled up. One of my favorite pictures you sent was you at Walmart - you were wearing that cat sweater and I think your hair was straight, you looked fucking gorgeous and all I said was something like ~~'cute'~~ even though I was honestly jaw dropped. I regret not praising you every time you sent a picture of yourself because I would honestly always have heart eyes for you, you're fucking jaw dropping, you deserved to know what I actually thought." />
                                </p>
                                <div className="clear-both"></div>
                            </motion.div>
                        );
                    }

                    return (
                        <motion.p
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1, duration: 0.6 }}
                            className="text-3xl leading-[42px] text-lis-light font-hand font-bold pb-4 border-b border-white/10 last:border-b-0 drop-shadow-sm"
                        >
                            <FormattedText text={paragraph} />
                        </motion.p>
                    );
                })}
            </div>

        </motion.div>
    );
};

export default TabLove;
