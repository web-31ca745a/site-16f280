import React from 'react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

const tabs = [
    { id: 'home', label: 'Home' },
    { id: 'apology', label: "I'm Sorry" },
    { id: 'growth', label: "I'm Growing" },
    { id: 'love', label: "Why I Love You" },
    { id: 'future', label: "What I Want" },
    { id: 'choice', label: "Your Choice" },
];

const Navigation = ({ activeTab, onTabChange }) => {
    return (
        <nav className="sticky top-0 z-30 w-full mb-0">
            <div className="flex gap-3 md:gap-2 overflow-x-auto overflow-y-hidden no-scrollbar pb-1">
                {tabs.map((tab) => (
                    <button
                        key={tab.id}
                        onClick={() => onTabChange(tab.id)}
                        className={twMerge(
                            "flex-shrink-0 px-4 py-3 font-hand text-base md:text-lg font-bold border-2 border-b-0 transition-all duration-200 rounded-t-lg",
                            activeTab === tab.id
                                ? "bg-lis-blue text-brutal-white border-lis-darkblue/40 shadow-soft-lg translate-y-0"
                                : "bg-lis-lavender text-lis-dark border-lis-dark/30 shadow-soft hover:bg-lis-pink hover:-translate-y-1 hover:shadow-soft-lg"
                        )}
                    >
                        {tab.label}
                    </button>
                ))}
            </div>
        </nav>
    );
};

export default Navigation;
