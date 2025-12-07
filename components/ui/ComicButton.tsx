import React from 'react';

interface ComicButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'danger';
}

export const ComicButton: React.FC<ComicButtonProps> = ({ 
  children, 
  className = '', 
  variant = 'primary',
  ...props 
}) => {
  const baseStyles = "relative px-6 py-3 font-bold uppercase tracking-wider text-black border-2 border-black transition-all active:translate-x-[2px] active:translate-y-[2px] active:box-shadow-none comic-font text-xl";
  
  let variantStyles = "";
  let shadowStyle = "";

  switch (variant) {
    case 'primary':
      variantStyles = "bg-comic-accent hover:bg-yellow-300";
      shadowStyle = "shadow-[4px_4px_0px_0px_rgba(34,211,238,1)]"; // Cyan shadow
      break;
    case 'secondary':
      variantStyles = "bg-comic-secondary hover:bg-cyan-300";
      shadowStyle = "shadow-[4px_4px_0px_0px_rgba(244,114,182,1)]"; // Pink shadow
      break;
    case 'danger':
      variantStyles = "bg-comic-alert hover:bg-pink-300";
      shadowStyle = "shadow-[4px_4px_0px_0px_rgba(250,204,21,1)]"; // Yellow shadow
      break;
  }

  return (
    <button 
      className={`${baseStyles} ${variantStyles} ${shadowStyle} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};