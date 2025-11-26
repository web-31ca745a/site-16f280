import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { letterContent } from '../../data/letterContent';
import DrawTogether from '../interactive/DrawTogether';
import FormattedText from '../utils/FormattedText';
import AestheticPlayer from '../interactive/AestheticPlayer';

const TabFuture = () => {
    const hideText = import.meta.env.VITE_HIDE_TEXT === 'true';
    const [showLogistics, setShowLogistics] = useState(false);
    
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="w-full max-w-4xl mx-auto space-y-12 pb-12 relative px-0 md:px-4"
        >
            <div className="cosmic-card hand-border space-y-0 max-w-4xl mx-auto transform rotate-0 md:rotate-1">
                <h2 className="text-4xl font-hand text-white text-center mb-8 font-bold leading-[32px] pt-6 drop-shadow-md">
                    What I Wish For
                </h2>

                {letterContent.future.paragraphs.map((paragraph, index) => (
                    <motion.p
                        key={index}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.1, duration: 0.6 }}
                        className="text-3xl leading-[42px] text-lis-light font-hand font-bold mb-8 drop-shadow-sm"
                    >
                        {hideText ? '████████████████████' : <FormattedText text={paragraph} />}
                    </motion.p>
                ))}

                <div className="max-w-3xl mx-auto mb-8">
                    <AestheticPlayer 
                        track={{ src: './whatiwant.wav' }}
                    />
                </div>

                {/* Toggleable Logistics Section */}
                <div className="mt-8 border-t-2 border-white/10 pt-6">
                    <button
                        onClick={() => setShowLogistics(!showLogistics)}
                        className="w-full flex items-center justify-center gap-2 text-xl font-hand text-lis-blue/80 hover:text-lis-blue transition-colors font-bold"
                    >
                        <span className="italic">boring logistic stuff</span>
                        {showLogistics ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                    </button>
                    
                    <AnimatePresence>
                        {showLogistics && (
                            <motion.div
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: 'auto' }}
                                exit={{ opacity: 0, height: 0 }}
                                transition={{ duration: 0.3 }}
                                className="overflow-hidden"
                            >
                                <p className="text-2xl leading-[36px] text-lis-light/90 font-hand font-bold mt-6 drop-shadow-sm bg-lis-dark/20 p-6 rounded-soft border border-white/10">
                                    Minimum wage in California is $34,320 a year at $16.50, but most places pay more than that. In six months I can comfortably save up $10k as I have low expenses, even if I visit you many times during that period. Once I have that saved up, I can come live with you for a bit and we can decide if it's what you want.
                                </p>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>

            <div className="relative py-8">
                <h3 className="text-2xl font-hand text-center mb-6 text-lis-dark bg-lis-yellow/60 backdrop-blur-sm border-2 border-lis-dark/20 shadow-soft inline-block px-6 py-3 font-bold mx-auto block w-fit rounded-soft">
                    Let's draw something new...
                </h3>
                <DrawTogether baseImage="./images/our-drawing.png" />
            </div>
        </motion.div>
    );
};

export default TabFuture;
