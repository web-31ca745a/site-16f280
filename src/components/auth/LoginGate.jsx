import React, { useEffect, useState } from 'react';
import Starfield from '../layout/Starfield';

const LoginGate = ({ onUnlock }) => {
    const [username, setUsername] = useState('');
    const [passcode, setPasscode] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const storedKey = 'bella-login-ok';
    const expectedUser = (import.meta.env.VITE_APP_USERNAME || 'baby').trim().toLowerCase();
    const expectedPass = (import.meta.env.VITE_APP_PASSCODE || '08/28').trim();

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
        const normalizedPass = passcode.trim();

        if (normalizedUser && normalizedPass && normalizedUser === expectedUser && normalizedPass === expectedPass) {
            localStorage.setItem(storedKey, 'true');
            onUnlock();
        } else {
            setError('Nope, try again.');
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
                            <p className="font-hand text-4xl text-amber-300 drop-shadow-md">WHO IS THIS FOR?</p>
                            <p className="font-hand text-2xl text-cream/80 leading-8">
                                Type our little passphrase to open the box. It&apos;s tucked away until you say the magic words. Username hint: that&apos;s not my name.
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
                                    Passphrase
                                </label>
                                <input
                                    type="password"
                                    value={passcode}
                                    onChange={(e) => setPasscode(e.target.value)}
                                    className="w-full bg-lis-dark/60 border-2 border-cream/20 focus:border-amber-300 text-cream font-hand text-2xl px-4 py-3 rounded-soft shadow-soft outline-none transition"
                                    placeholder="MM/DD"
                                    autoComplete="current-password"
                                />
                                {error && <p className="text-lis-pink font-mono text-sm">{error}</p>}
                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="w-full bg-amber-300 text-lis-dark font-hand text-2xl py-3 rounded-soft shadow-brutal hover:-translate-y-[2px] transition transform"
                                >
                                    {loading ? 'Opening...' : 'Open the box'}
                                </button>
                                <p className="text-xs text-cream/50 font-mono">
                                    Tip: set your own creds with <code className="text-amber-200">VITE_APP_USERNAME</code> / <code className="text-amber-200">VITE_APP_PASSCODE</code> and rebuild.
                                </p>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LoginGate;
