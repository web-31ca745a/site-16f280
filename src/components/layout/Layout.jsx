import React from 'react';
import Starfield from './Starfield';
import Navigation from './Navigation';
import MarginDoodles from './MarginDoodles';
import CassettePlayer from '../interactive/CassettePlayer';

const Layout = ({ children, activeTab, onTabChange }) => {
    return (
        <div className="min-h-screen relative overflow-hidden font-body text-lis-light">
            <Starfield />

            {/* Margin Doodles - Left */}
            <div className="fixed left-0 top-0 h-full w-[25%] hidden lg:block z-10">
                <MarginDoodles side="left" activeTab={activeTab} />
            </div>

            {/* Top Right Corner Vines SVG */}
            <div className="fixed right-0 top-0 w-48 h-64 lg:w-64 lg:h-80 z-30 pointer-events-none">
                <img 
                    src="/cornervines.svg" 
                    alt="Corner vines decoration" 
                    className="w-full h-full object-contain"
                />
            </div>

            {/* Margin Doodles - Right */}
            <div className="fixed right-0 top-0 h-full w-[25%] hidden lg:block z-10">
                <MarginDoodles side="right" activeTab={activeTab} />
            </div>

            {/* Main Content */}
            <main className="relative z-20 w-full max-w-5xl mx-auto min-h-screen flex flex-col p-4 md:p-8">
                <Navigation activeTab={activeTab} onTabChange={onTabChange} />

                <div className="flex-grow bg-lis-dark/90 backdrop-blur-sm border-4 border-brutal-black shadow-brutal-lg p-2 md:p-10 relative">
                    {/* Top Left Butterfly SVG - positioned at corner of main box */}
                    <div className="absolute -left-20 -top-12 w-40 h-40 lg:-left-28 lg:-top-16 lg:w-56 lg:h-56 z-10 pointer-events-none">
                        <img 
                            src="/path1.svg" 
                            alt="Butterfly decoration" 
                            className="w-full h-full object-contain"
                        />
                    </div>

                    {children}
                </div>
            </main>

            <CassettePlayer />
        </div>
    );
};

export default Layout;
