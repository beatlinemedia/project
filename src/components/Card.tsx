import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
}

const Card: React.FC<CardProps> = ({ children, className = '', hover = true }) => {
  return (
    <div className={`
      bg-black rounded-2xl p-6 
      ${hover ? 'blm-card' : 'border border-white/10'} 
      ${className}
    `}>
      {children}
    </div>
  );
};

export default Card;