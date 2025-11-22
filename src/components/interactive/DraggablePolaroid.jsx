import React from 'react';
import Draggable from 'react-draggable';
import { clsx } from 'clsx';

const DraggablePolaroid = ({ image, caption, initialX, initialY, rotation }) => {
    return (
        <Draggable defaultPosition={{ x: initialX, y: initialY }}>
            <div
            className="absolute cursor-move z-10 hover:z-50 transition-transform duration-200"
            style={{ transform: `rotate(${rotation}deg)` }}
        >
            <div className="bg-brutal-white p-3 pb-8 border-2 border-lis-dark/20 shadow-soft w-48 transform hover:scale-105 hover:shadow-soft-lg transition-all rounded-soft">
                <div className="bg-lis-mint/50 overflow-hidden mb-2 border border-lis-dark/20 rounded-soft">
                    <img
                        src={image}
                        alt={caption}
                        className="w-full h-auto object-contain pointer-events-none"
                        draggable="false"
                    />
                </div>
                <p className="font-hand text-lis-dark text-center text-lg leading-none font-bold">{caption}</p>
            </div>
            </div>
        </Draggable>
    );
};

export default DraggablePolaroid;
