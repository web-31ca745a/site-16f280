import React from 'react';
import { motion } from 'framer-motion';
import { letterContent } from '../../data/letterContent';
import DrawTogether from '../interactive/DrawTogether';

const TabFuture = () => {
    const hideText = import.meta.env.VITE_HIDE_TEXT === 'true';
    
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-2xl mx-auto space-y-12 pb-12 relative px-0 md:px-4"
        >
            <div className="cosmic-card hand-border space-y-0 max-w-2xl mx-auto transform rotate-1">
                <h2 className="text-4xl font-hand text-white text-center mb-8 font-bold leading-[32px] pt-6 drop-shadow-md">
                    What I Want
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
                        {hideText ? '████████████████████' : paragraph}
                    </motion.p>
                ))}
            </div>

            <div className="relative py-8">
                <h3 className="text-2xl font-hand text-center mb-6 text-lis-dark bg-lis-yellow/60 backdrop-blur-sm border-2 border-lis-dark/20 shadow-soft inline-block px-6 py-3 font-bold mx-auto block w-fit rounded-soft">
                    Let's draw something new...
                </h3>
                <DrawTogether />
            </div>
        </motion.div>
    );
};

export default TabFuture;
