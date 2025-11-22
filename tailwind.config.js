/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                // Life is Strange inspired pastel palette
                lis: {
                    blue: '#7CB9E8',        // Soft pastel blue (butterfly)
                    darkblue: '#5A8AAF',    // Muted deep blue
                    teal: '#88D8C0',        // Soft mint teal
                    peach: '#FFD4B8',       // Gentle peachy pastel
                    lavender: '#C8B8DB',    // Soft lavender
                    mint: '#B8E6D5',        // Gentle mint green
                    pink: '#F4C2D7',        // Soft dusty pink
                    purple: '#B8A8D8',      // Muted purple
                    yellow: '#FFF4A3',      // Soft pale yellow
                    dark: '#2A2E3F',        // Dark background
                    darker: '#1E2230',      // Darker background
                    light: '#F8F7F4',       // Warm off-white
                    white: '#FFFFFF',       // Pure white
                },
                // Neobrutalist accent colors
                brutal: {
                    black: '#000000',
                    white: '#FFFFFF',
                },
            },
            fontFamily: {
                hand: ['"Caveat"', '"Patrick Hand"', 'cursive'],
                body: ['"Inter"', '"DM Sans"', 'sans-serif'],
                mono: ['"Courier New"', 'monospace'],
            },
            animation: {
                'spin-slow': 'spin 3s linear infinite',
                'twinkle': 'twinkle 3s ease-in-out infinite',
            },
            keyframes: {
                twinkle: {
                    '0%, 100%': { opacity: 0.3 },
                    '50%': { opacity: 1 },
                }
            },
            boxShadow: {
                'brutal': '4px 4px 0px 0px #000000',
                'brutal-lg': '8px 8px 0px 0px #000000',
                'brutal-blue': '6px 6px 0px 0px #5A8AAF',
                'soft': '3px 3px 0px 0px rgba(0,0,0,0.3)',
                'soft-lg': '5px 5px 0px 0px rgba(0,0,0,0.2)',
            },
            borderRadius: {
                'soft': '8px',
            }
        },
    },
    plugins: [],
}
