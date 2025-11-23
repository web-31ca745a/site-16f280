import React from 'react';
import Draggable from 'react-draggable';
import { clsx } from 'clsx';

const butterflies = [
    '/images/decor/doodlebutterfly1.svg',
    '/images/decor/doodlebutterfly2.svg',
    '/images/decor/doodlebutterfly3.svg',
    '/images/decor/doodlebutterfly4.svg'
];

const DraggablePolaroid = ({ image, caption, initialX, initialY, rotation, id }) => {
    // Use a hash of the id to pick a butterfly (ensures consistency but variety)
    const getButterflyIndex = (id) => {
        if (!id) return 0;
        const hash = String(id).split('').reduce((acc, char) => {
            return acc + char.charCodeAt(0);
        }, 0);
        return hash % butterflies.length;
    };

    const butterflyIndex = getButterflyIndex(id);
    const butterfly = butterflies[butterflyIndex];

    return (
        <Draggable defaultPosition={{ x: initialX, y: initialY }}>
            <div
            className="absolute cursor-move z-10 hover:z-50 transition-transform duration-200"
            style={{ transform: `rotate(${rotation}deg)` }}
        >
            <div className="bg-brutal-white p-3 pb-8 border-2 border-lis-dark/20 shadow-soft w-48 transform hover:scale-105 hover:shadow-soft-lg transition-all rounded-soft relative">
                <div className="bg-lis-mint/50 overflow-hidden mb-2 border border-lis-dark/20 rounded-soft">
                    <img
                        src={image}
                        alt={caption}
                        className="w-full h-auto object-contain pointer-events-none"
                        draggable="false"
                    />
                </div>
                <p className="font-hand text-lis-dark text-center text-lg leading-none font-bold">{caption}</p>
                
                {/* Butterfly decoration */}
                <img 
                    src={butterfly}
                    alt=""
                    className="absolute bottom-1 right-2 w-12 h-12 opacity-100 pointer-events-none"
                    draggable="false"
                />
            </div>
            </div>
        </Draggable>
    );
};

export default DraggablePolaroid;
