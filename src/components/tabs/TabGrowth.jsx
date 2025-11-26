import React from 'react';
import { motion } from 'framer-motion';
import { letterContent } from '../../data/letterContent';
import FormattedText from '../utils/FormattedText';
import AestheticPlayer from '../interactive/AestheticPlayer';

const TabGrowth = () => {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="w-full max-w-4xl mx-auto space-y-8 pb-12 px-0 md:px-4"
        >
            <div className="cosmic-card hand-border space-y-6 max-w-4xl mx-auto">
                <h2 className="text-4xl font-hand text-white text-center mb-4 font-bold drop-shadow-md">
                    I'm Growing
                </h2>

                {letterContent.growth.paragraphs.map((paragraph, index) => (
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
                ))}
            </div>

            <div className="max-w-3xl mx-auto mt-8">
                <AestheticPlayer 
                    track={{ src: './imgrowing.wav' }}
                />
            </div>
        </motion.div>
    );
};

export default TabGrowth;
