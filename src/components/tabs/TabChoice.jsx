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
            className="max-w-2xl mx-auto space-y-8 pb-12 px-0 md:px-4"
        >
            <h2 className="text-4xl font-hand text-white bg-lis-purple/80 backdrop-blur-sm border-2 border-white/40 shadow-soft-lg text-center mb-8 px-6 py-4 font-bold mx-auto inline-block rounded-soft drop-shadow-md">
                Your Choice
            </h2>

            <div className="space-y-6 mb-12">
                {letterContent.choice.paragraphs.map((paragraph, index) => (
                    <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.1, duration: 0.6 }}
                        className={`cosmic-card hand-border p-6 pt-2 font-hand font-bold text-3xl leading-[42px] text-lis-light transform ${index % 2 === 0 ? '-rotate-1' : 'rotate-1'}`}
                    >
                        <p className="pt-1 drop-shadow-sm">
                            <FormattedText text={paragraph} />
                        </p>
                    </motion.div>
                ))}
            </div>

            <div className="py-8 border-t-4 border-brutal-black">
                <ChoiceButtons />
            </div>
        </motion.div>
    );
};

export default TabChoice;
