import React, { useState } from 'react';
import { SectionTitle } from '../ui/SectionTitle';
import { ComicButton } from '../ui/ComicButton';
import { Message } from '../../types';

interface ContactProps {
  onSendMessage?: (msg: Omit<Message, 'id' | 'timestamp' | 'read'>) => void;
}

export const Contact: React.FC<ContactProps> = ({ onSendMessage }) => {
  const [formData, setFormData] = useState({ codename: '', email: '', content: '' });
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent'>('idle');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.codename || !formData.email || !formData.content) return;
    
    setStatus('sending');
    
    setTimeout(() => {
      if (onSendMessage) {
        onSendMessage(formData);
      }
      setStatus('sent');
      setFormData({ codename: '', email: '', content: '' });
      setTimeout(() => setStatus('idle'), 3000);
    }, 1000);
  };

  return (
    <section id="contact" className="py-24 bg-comic-dark border-t-4 border-white pb-32">
      <div className="container mx-auto px-4">
        <SectionTitle title="SEND SIGNAL" subtitle="Calling all allies" />

        <div className="max-w-2xl mx-auto">
          <div className="bg-white p-8 md:p-12 border-4 border-black shadow-[12px_12px_0px_0px_#22d3ee] relative">
            {/* Tape effect */}
            <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-32 h-8 bg-yellow-200/50 rotate-[-2deg]"></div>
            
            <h3 className="text-3xl text-black comic-font mb-6 uppercase text-center">
              Join the Alliance or Offer a Mission
            </h3>

            {status === 'sent' ? (
              <div className="bg-green-100 border-2 border-green-500 p-6 text-center animate-in fade-in">
                <p className="text-green-800 font-bold comic-font text-2xl">TRANSMISSION RECEIVED!</p>
                <p className="text-green-700 font-mono mt-2">Stand by for response...</p>
              </div>
            ) : (
              <form className="space-y-6" onSubmit={handleSubmit}>
                <div>
                  <label className="block text-black font-bold uppercase mb-2 comic-font text-xl">Codename</label>
                  <input 
                    type="text" 
                    value={formData.codename}
                    onChange={e => setFormData({...formData, codename: e.target.value})}
                    className="w-full bg-gray-100 border-2 border-black p-3 text-black font-mono focus:bg-yellow-50 focus:shadow-[4px_4px_0px_0px_#000] outline-none transition-shadow"
                    placeholder="Enter your alias"
                    required
                  />
                </div>

                <div>
                  <label className="block text-black font-bold uppercase mb-2 comic-font text-xl">Frequency (Email)</label>
                  <input 
                    type="email" 
                    value={formData.email}
                    onChange={e => setFormData({...formData, email: e.target.value})}
                    className="w-full bg-gray-100 border-2 border-black p-3 text-black font-mono focus:bg-yellow-50 focus:shadow-[4px_4px_0px_0px_#000] outline-none transition-shadow"
                    placeholder="name@example.com"
                    required
                  />
                </div>

                <div>
                  <label className="block text-black font-bold uppercase mb-2 comic-font text-xl">Mission Details</label>
                  <textarea 
                    rows={4}
                    value={formData.content}
                    onChange={e => setFormData({...formData, content: e.target.value})}
                    className="w-full bg-gray-100 border-2 border-black p-3 text-black font-mono focus:bg-yellow-50 focus:shadow-[4px_4px_0px_0px_#000] outline-none transition-shadow"
                    placeholder="Describe your objective..."
                    required
                  ></textarea>
                </div>

                <div className="text-center pt-4">
                  <ComicButton type="submit" variant="danger" className="w-full md:w-auto text-xl" disabled={status === 'sending'}>
                    {status === 'sending' ? 'ENCRYPTING...' : 'TRANSMIT DATA'}
                  </ComicButton>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};