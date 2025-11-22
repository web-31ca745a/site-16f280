import React from 'react';
import { motion } from 'framer-motion';
import { letterContent } from '../../data/letterContent';
import FormattedText from '../utils/FormattedText';

const TabGrowth = () => {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-2xl mx-auto space-y-8 pb-12 px-4"
        >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                <div className="bg-lis-light/60 backdrop-blur-sm p-3 border-2 border-lis-teal/20 shadow-soft hover:shadow-soft-lg rotate-2 transform hover:rotate-0 transition-all duration-300 rounded-soft">
                    <div className="bg-lis-mint/60 h-48 flex items-center justify-center border border-lis-dark/20 rounded-soft">
                        <p className="text-lis-darker font-mono text-lg font-bold">Placeholder: Therapy Notes</p>
                    </div>
                    <p className="text-center font-hand text-lis-dark mt-3 text-xl font-bold">Working on it</p>
                </div>
                <div className="bg-lis-light/60 backdrop-blur-sm p-3 border-2 border-lis-pink/20 shadow-soft hover:shadow-soft-lg -rotate-2 transform hover:rotate-0 transition-all duration-300 rounded-soft">
                    <div className="bg-lis-pink/60 h-48 flex items-center justify-center border border-lis-dark/20 rounded-soft">
                        <p className="text-lis-darker font-mono text-lg font-bold">Placeholder: Journal</p>
                    </div>
                    <p className="text-center font-hand text-lis-dark mt-3 text-xl font-bold">Daily reflections</p>
                </div>
            </div>

            <div className="cosmic-card hand-border space-y-6">
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
        </motion.div>
    );
};

export default TabGrowth;
