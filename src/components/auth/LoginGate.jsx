import React, { useEffect, useState } from 'react';
import Starfield from '../layout/Starfield';
import { trackLogin } from '../../utils/tracking';

const LoginGate = ({ onUnlock }) => {
    const [username, setUsername] = useState('');
    const [month, setMonth] = useState('');
    const [day, setDay] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const storedKey = 'bella-login-ok';
    const expectedUser = (import.meta.env.VITE_APP_USERNAME || 'baby').trim().toLowerCase();
    const expectedPass = (import.meta.env.VITE_APP_PASSCODE || '08/28').trim();
    
    const months = [
        { value: '01', label: 'January' },
        { value: '02', label: 'February' },
        { value: '03', label: 'March' },
        { value: '04', label: 'April' },
        { value: '05', label: 'May' },
        { value: '06', label: 'June' },
        { value: '07', label: 'July' },
        { value: '08', label: 'August' },
        { value: '09', label: 'September' },
        { value: '10', label: 'October' },
        { value: '11', label: 'November' },
        { value: '12', label: 'December' }
    ];
    
    const days = Array.from({ length: 31 }, (_, i) => {
        const dayNum = i + 1;
        return { value: dayNum.toString().padStart(2, '0'), label: dayNum.toString() };
    });

    useEffect(() => {
        const remembered = localStorage.getItem(storedKey);
        if (remembered === 'true') {
            onUnlock();
        }
    }, [onUnlock]);

    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        const normalizedUser = username.trim().toLowerCase();
        const formattedDate = month && day ? `${month}/${day}` : '';

        if (normalizedUser && formattedDate && normalizedUser === expectedUser && formattedDate === expectedPass) {
            localStorage.setItem(storedKey, 'true');
            trackLogin(); // Track successful login
            onUnlock();
        } else {
            setError("Username hint: that's not my name.");
        }
        setLoading(false);
    };

    return (
        <div className="min-h-screen relative overflow-hidden bg-lis-dark text-cream flex items-center justify-center px-4">
            <Starfield />
            <div className="relative z-10 w-full max-w-3xl">
                <div className="cosmic-card hand-border shadow-brutal-lg border-4 border-brutal-black/80 bg-lis-dark/90 backdrop-blur-md p-8 md:p-12 rounded-soft">
                    <div className="flex flex-col md:flex-row gap-8 md:gap-12 items-center">
                        <div className="w-full md:w-1/2 space-y-4">
                            <p className="font-hand text-4xl text-amber-300 drop-shadow-md">Just for you</p>
                            <p className="font-hand text-2xl text-cream/80 leading-8">
                                Something I made just for you. Enter your name and our special date to unlock it.
                            </p>
                        </div>
                        <div className="w-full md:w-1/2">
                            <form onSubmit={handleSubmit} className="space-y-4">
                                <label className="block text-sm uppercase tracking-[0.2em] text-cream/60 font-mono">
                                    Username
                                </label>
                                <input
                                    type="text"
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                    className="w-full bg-lis-dark/60 border-2 border-cream/20 focus:border-amber-300 text-cream font-hand text-2xl px-4 py-3 rounded-soft shadow-soft outline-none transition"
                                    placeholder="who is this for?"
                                    autoFocus
                                    autoComplete="username"
                                />
                                <label className="block text-sm uppercase tracking-[0.2em] text-cream/60 font-mono">
                                    Special Date (MM/DD)
                                </label>
                                <div className="flex gap-3">
                                    <select
                                        value={month}
                                        onChange={(e) => setMonth(e.target.value)}
                                        className="flex-1 bg-lis-dark/60 border-2 border-cream/20 focus:border-amber-300 text-cream font-hand text-xl px-4 py-3 rounded-soft shadow-soft outline-none transition cursor-pointer"
                                    >
                                        <option value="">Month</option>
                                        {months.map(m => (
                                            <option key={m.value} value={m.value}>{m.label}</option>
                                        ))}
                                    </select>
                                    <select
                                        value={day}
                                        onChange={(e) => setDay(e.target.value)}
                                        className="flex-1 bg-lis-dark/60 border-2 border-cream/20 focus:border-amber-300 text-cream font-hand text-xl px-4 py-3 rounded-soft shadow-soft outline-none transition cursor-pointer"
                                    >
                                        <option value="">Day</option>
                                        {days.map(d => (
                                            <option key={d.value} value={d.value}>{d.label}</option>
                                        ))}
                                    </select>
                                </div>
                                {error && <p className="text-lis-pink font-mono text-sm">{error}</p>}
                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="w-full bg-amber-300 text-lis-dark font-hand text-2xl py-3 rounded-soft shadow-brutal hover:-translate-y-[2px] transition transform"
                                >
                                    {loading ? 'Opening...' : 'Open the box'}
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LoginGate;
