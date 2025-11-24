import React from 'react';
import { motion } from 'framer-motion';
import { letterContent } from '../../data/letterContent';
import ChoiceButtons from '../interactive/ChoiceButtons';
import FormattedText from '../utils/FormattedText';

const TabChoice = () => {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="w-full max-w-4xl mx-auto space-y-8 pb-12 px-0 md:px-4"
        >
            <div className="cosmic-card hand-border space-y-0 max-w-4xl mx-auto transform rotate-0 md:-rotate-1">
                {/* Video Box - Empty for now */}
                <div className="aspect-video bg-brutal-black relative overflow-hidden border-2 border-white/20 rounded-soft shadow-inner mb-8">
                    <div className="w-full h-full flex items-center justify-center">
                        <p className="text-lis-light font-hand text-2xl opacity-50">Video placeholder</p>
                    </div>
                </div>

                <h2 className="text-4xl font-hand text-white text-center mb-8 font-bold leading-[32px] drop-shadow-md">
                    Your Choice
                </h2>

                {letterContent.choice.paragraphs.map((paragraph, index) => (
                    <motion.p
                        key={index}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.1, duration: 0.6 }}
                        className="text-3xl leading-[42px] text-lis-light font-hand font-bold mb-8 drop-shadow-sm"
                    >
                        <FormattedText text={paragraph} />
                    </motion.p>
                ))}
            </div>

            <div className="py-8 border-t-4 border-brutal-black">
                <ChoiceButtons />
            </div>
        </motion.div>
    );
};

export default TabChoice;
