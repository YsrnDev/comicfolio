import React from 'react';

export const Loading: React.FC = () => {
    return (
        <div className="flex items-center justify-center min-h-screen bg-comic-dark">
            <div className="relative">
                <div className="w-16 h-16 border-4 border-white border-t-comic-accent rounded-full animate-spin"></div>
                <div className="absolute inset-0 flex items-center justify-center font-bold text-white comic-font text-xl animate-pulse">
                    LOADING
                </div>
            </div>
        </div>
    );
};
