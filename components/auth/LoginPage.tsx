import React, { useState } from 'react';
import { ComicButton } from '../ui/ComicButton';
import { authClient } from '../../lib/auth-client';

interface LoginPageProps {
  onLogin: () => void;
  onBack: () => void;
}

export const LoginPage: React.FC<LoginPageProps> = ({ onLogin, onBack }) => {
  const [isRegister, setIsRegister] = useState(false);
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      if (isRegister) {
        const { data, error } = await authClient.signUp.email({
          email,
          password,
          name,
          image: undefined, // Optional
        }, {
          onRequest: () => {
            setLoading(true);
          },
          onSuccess: () => {
            setLoading(false);
            onLogin();
          },
          onError: (ctx) => {
            setLoading(false);
            setError(ctx.error.message);
          }
        });
      } else {
        const { data, error } = await authClient.signIn.email({
          email,
          password
        }, {
          onRequest: () => {
            setLoading(true);
          },
          onSuccess: () => {
            setLoading(false);
            onLogin();
          },
          onError: (ctx) => {
            setLoading(false);
            setError(ctx.error.message);
          }
        });
      }
    } catch (err: any) {
      setLoading(false);
      setError(err.message || "An unexpected error occurred");
    }
  };

  return (
    <div className="min-h-screen bg-comic-dark flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 z-0 opacity-10"
        style={{
          backgroundImage: 'radial-gradient(circle, #facc15 2px, transparent 2px)',
          backgroundSize: '40px 40px'
        }}
      />

      <div className="max-w-md w-full relative z-10">
        <div className="bg-comic-panel border-4 border-white p-8 shadow-[12px_12px_0px_0px_#facc15]">

          <div className="absolute -top-6 left-1/2 -translate-x-1/2 bg-comic-alert px-4 py-2 border-2 border-black rotate-[-2deg] shadow-lg">
            <span className="font-bold comic-font text-xl text-black">TOP SECRET CLEARANCE</span>
          </div>

          <h2 className="text-4xl text-white comic-font text-center mt-6 mb-8 uppercase">
            {isRegister ? 'New Hero Registration' : 'Identify Yourself'}
          </h2>

          {error && (
            <div className="bg-red-500 border-2 border-white p-2 mb-4 text-white font-mono text-center">
              ALERT: {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            {isRegister && (
              <div>
                <label className="block text-comic-secondary font-bold uppercase mb-2 comic-font text-lg">Hero Name</label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full bg-black border-2 border-white p-3 text-white font-mono focus:border-comic-accent outline-none"
                  placeholder="e.g. Code Avenger"
                />
              </div>
            )}

            <div>
              <label className="block text-comic-secondary font-bold uppercase mb-2 comic-font text-lg">Secure Frequency (Email)</label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-black border-2 border-white p-3 text-white font-mono focus:border-comic-accent outline-none"
                placeholder="hero@hq.com"
              />
            </div>

            <div>
              <label className="block text-comic-secondary font-bold uppercase mb-2 comic-font text-lg">Passcode</label>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-black border-2 border-white p-3 text-white font-mono focus:border-comic-accent outline-none"
                placeholder="••••••••"
              />
            </div>

            <ComicButton type="submit" className="w-full text-center flex justify-center" disabled={loading}>
              {loading ? 'AUTHENTICATING...' : (isRegister ? 'JOIN ALLIANCE' : 'ACCESS DASHBOARD')}
            </ComicButton>
          </form>

          <div className="mt-6 text-center">
            <button
              onClick={() => { setIsRegister(!isRegister); setError(null); }}
              className="text-gray-400 font-mono hover:text-white underline decoration-dashed underline-offset-4"
            >
              {isRegister ? 'Already have an ID? Login' : 'Need clearance? Register'}
            </button>
          </div>
        </div>

        <button onClick={onBack} className="mt-8 text-white font-bold comic-font text-xl hover:text-comic-accent block mx-auto">
          &larr; RETURN TO PUBLIC SECTOR
        </button>
      </div>
    </div>
  );
};