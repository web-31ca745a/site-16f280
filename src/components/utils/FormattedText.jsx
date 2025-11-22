import React from 'react';

// Parses text with special formatting markers:
// **text** = pink highlight
// ~~strikethrough~~ = strikethrough
// __text__ = emphasis color

const FormattedText = ({ text, className = "" }) => {
    const parseText = (text) => {
        const parts = [];
        let currentIndex = 0;
        let key = 0;

        // Regex to match **text**, ~~text~~, or __text__
        const regex = /(\*\*.*?\*\*|~~.*?~~|__.*?__)/g;
        let match;

        while ((match = regex.exec(text)) !== null) {
            // Add text before the match
            if (match.index > currentIndex) {
                parts.push(
                    <span key={key++}>{text.slice(currentIndex, match.index)}</span>
                );
            }

            const matchedText = match[0];
            const innerText = matchedText.slice(2, -2);

            // Determine formatting
            if (matchedText.startsWith('**')) {
                // Pink highlight for "I love you" and "bella"
                parts.push(
                    <span key={key++} className="text-pink-400 font-extrabold">
                        {innerText}
                    </span>
                );
            } else if (matchedText.startsWith('~~')) {
                // Strikethrough with lighter color
                parts.push(
                    <span key={key++} className="line-through opacity-60 text-gray-300">
                        {innerText}
                    </span>
                );
            } else if (matchedText.startsWith('__')) {
                // Emphasis color (yellow/gold)
                parts.push(
                    <span key={key++} className="text-yellow-300 font-extrabold">
                        {innerText}
                    </span>
                );
            }

            currentIndex = regex.lastIndex;
        }

        // Add remaining text
        if (currentIndex < text.length) {
            parts.push(<span key={key++}>{text.slice(currentIndex)}</span>);
        }

        return parts;
    };

    return <span className={className}>{parseText(text)}</span>;
};

export default FormattedText;
