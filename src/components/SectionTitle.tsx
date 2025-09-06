import React from 'react';

type Props = {
  title: string;
  subtitle?: string;
  centered?: boolean;
  className?: string;
};

const SectionTitle: React.FC<Props> = ({
  title,
  subtitle,
  centered = false,
  className = '',
}) => {
  return (
    <div
      className={[
        'mb-12',
        centered ? 'flex flex-col items-center text-center' : '',
        className,
      ].join(' ')}
    >
      <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
        {title}
      </h2>

      {subtitle && (
        <p className="text-lg text-gray-400 leading-relaxed max-w-3xl mx-auto">
          {subtitle}
        </p>
      )}
    </div>
  );
};

export default SectionTitle;
