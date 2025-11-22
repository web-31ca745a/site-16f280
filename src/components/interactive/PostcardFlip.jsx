import React, { useState } from 'react';
import { motion } from 'framer-motion';

const PostcardFlip = ({ frontImage, message }) => {
    const [isFlipped, setIsFlipped] = useState(false);

    return (
        <div
            className="relative w-64 h-48 cursor-pointer perspective-1000"
            onClick={() => setIsFlipped(!isFlipped)}
        >
            <motion.div
                className="w-full h-full relative preserve-3d"
                animate={{ rotateY: isFlipped ? 180 : 0 }}
                transition={{ duration: 0.6 }}
                style={{ transformStyle: 'preserve-3d' }}
            >
                {/* Front */}
                <div className="absolute w-full h-full backface-hidden border-2 border-lis-dark/30 shadow-soft overflow-hidden bg-brutal-white rounded-soft">
                    <img src={frontImage} alt="Postcard Front" className="w-full h-full object-cover" />
                </div>

                {/* Back */}
                <div
                    className="absolute w-full h-full backface-hidden border-2 border-lis-dark/30 shadow-soft bg-lis-peach p-4 flex flex-col rotate-y-180 rounded-soft"
                    style={{ transform: 'rotateY(180deg)', backfaceVisibility: 'hidden' }}
                >
                    <div className="flex-1 border-r-2 border-lis-dark/30 pr-3">
                        <p className="font-hand text-lis-darker text-base leading-tight font-bold">{message}</p>
                    </div>
                    <div className="absolute top-2 right-2 w-10 h-12 border-2 border-lis-dark/30 flex items-center justify-center bg-brutal-white rounded-sm">
                        <span className="text-[10px] text-lis-dark font-bold">STAMP</span>
                    </div>
                </div>
            </motion.div>
        </div>
    );
};

export default PostcardFlip;
