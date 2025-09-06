import React from 'react';

interface PrimaryButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
  disabled?: boolean;
  href?: string;
}

const PrimaryButton: React.FC<PrimaryButtonProps> = ({ 
  children, 
  onClick, 
  className = '',
  disabled = false,
  href
}) => {
  const baseClasses = `
    blm-btn px-8 py-3 rounded-2xl font-semibold text-white
    transition-all duration-300 inline-block text-center
    ${disabled ? 'btn-disabled' : ''}
    ${className}
  `;

  if (href && !disabled) {
    return (
      <a href={href} className={baseClasses}>
        {children}
      </a>
    );
  }

  return (
    <button 
      onClick={disabled ? undefined : onClick} 
      className={baseClasses}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export default PrimaryButton;